require("dotenv").config();

const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");

const port = process.env.PORT || 3000;

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://ghorermeal.web.app",
  "https://ghorermeal.firebaseapp.com",
];

const createCorsOptions = ({ baseUrl = process.env.BASE_URL } = {}) => ({
  origin: (origin, callback) => {
    const allowedOrigins = [...DEFAULT_ALLOWED_ORIGINS, baseUrl].filter(
      Boolean,
    );

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
});

const createServer = () => {
  const decodedServiceKey = Buffer.from(
    process.env.FB_SERVICE_KEY,
    "base64",
  ).toString("utf-8");
  const serviceAccount = JSON.parse(decodedServiceKey);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const app = express();
  app.use(cors(createCorsOptions()));
  app.use(express.json());

  const verifyJWT = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).send({ message: "Unauthorized Access!" });
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      req.tokenEmail = decoded.email;
      next();
    } catch {
      return res.status(401).send({ message: "Unauthorized Access!" });
    }
  };

  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      const db = client.db(process.env.DB_NAME || "ghorer_meal");
      const mealsColl = db.collection("meals");
      const usersColl = db.collection("users");
      const rolesColl = db.collection("roles");
      const reviewsColl = db.collection("reviews");
      const favoriteColl = db.collection("favorite");
      const ordersColl = db.collection("orders");
      const contactRequestsColl = db.collection("contactRequests");

      // POST REQUESTS
      // meals
      app.post("/meals", async (req, res) => {
        const mealData = req.body;
        const result = await mealsColl.insertOne(mealData);
        res.send(result);
      });

      // users
      app.post("/users", async (req, res) => {
        const userData = req.body;
        const email = userData?.email?.trim();

        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }

        const existingUser = await usersColl.findOne({ email });

        if (existingUser) {
          const updatedProfile = {
            name: userData.name || existingUser.name || "User",
            profileImage:
              userData.profileImage || existingUser.profileImage || "",
            address: userData.address || existingUser.address || "N/A",
          };

          await usersColl.updateOne(
            { email },
            {
              $set: updatedProfile,
            },
          );

          const updatedUser = await usersColl.findOne({ email });

          return res.send({
            inserted: false,
            user: updatedUser,
          });
        }

        const result = await usersColl.insertOne({
          email,
          name: userData.name || "User",
          profileImage: userData.profileImage || "",
          address: userData.address || "N/A",
          role: "user",
          status: "active",
          createdAt: userData.createdAt || new Date().toISOString(),
        });
        const savedUser = await usersColl.findOne({ _id: result.insertedId });

        res.send({
          inserted: true,
          user: savedUser,
        });
      });

      // roles
      app.post("/roles", async (req, res) => {
        const userData = req.body;
        const userEmail = userData?.userEmail?.trim();

        if (!userEmail) {
          return res.status(400).json({ message: "User email is required" });
        }

        const account = await usersColl.findOne({ email: userEmail });

        if (account?.role === "chef" || account?.role === "admin") {
          return res.status(409).json({
            message: "This account already has chef access",
          });
        }

        const existingRequest = await rolesColl.findOne({
          userEmail,
        });
        if (existingRequest) {
          return res.status(409).json({
            message: "Your request is being processed. Wait for approval!",
          });
        }
        const result = await rolesColl.insertOne({
          ...userData,
          userEmail,
        });
        res.send(result);
      });

      // reviews
      app.post("/review/:id", async (req, res) => {
        const reviewData = req.body;
        const id = req.params.id;

        const findMeal = await mealsColl.findOne({ _id: new ObjectId(id) });
        if (!findMeal) {
          return res.status(404).json({ message: "Meal Not Found!" });
        }

        const existingReview = await reviewsColl.findOne({
          reviewerEmail: reviewData.reviewerEmail,
          foodId: id,
        });
        if (existingReview) {
          return res
            .status(409)
            .json({ message: "You have already reviewed this meal" });
        }
        const result = await reviewsColl.insertOne({
          ...reviewData,
          foodId: id,
          date: new Date().toISOString(),
        });
        res.send(result);
      });

      // favorite
      app.post("/favorite/:id", async (req, res) => {
        const favoriteData = req.body;
        const id = req.params.id;

        const find = await mealsColl.findOne({ _id: new ObjectId(id) });
        if (!find) {
          return res.status(404).json({ message: "Meal Not Found!" });
        }

        const existingFavorite = await favoriteColl.findOne({
          mealId: id,
          userEmail: favoriteData.userEmail,
        });
        if (existingFavorite) {
          return res
            .status(409)
            .json({ message: "Meal already exist in your favorite List" });
        }

        const result = await favoriteColl.insertOne({
          ...favoriteData,
          mealId: id,
          addedTime: new Date().toISOString(),
        });
        return res.send(result);
      });

      app.post("/orders", async (req, res) => {
        const ordersData = req.body;
        const orderTime = new Date().toISOString();

        const {
          mealName,
          foodId,
          chefId,
          chefName,
          userEmail,
          userAddress,
          estimatedDeliveryTime,
        } = ordersData;
        const quantity = Number(ordersData.quantity);
        const price = Number(ordersData.price);

        if (
          !mealName ||
          !foodId ||
          !chefId ||
          !chefName ||
          !userEmail ||
          !userAddress
        ) {
          return res.status(400).json({
            message: "Meal, chef, and customer details are required",
          });
        }

        if (!Number.isFinite(quantity) || quantity < 1) {
          return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        if (!Number.isFinite(price) || price <= 0) {
          return res.status(400).json({ message: "Price must be greater than 0" });
        }

        const result = await ordersColl.insertOne({
          mealName,
          foodId,
          chefId,
          chefName,
          userEmail,
          userAddress,
          estimatedDeliveryTime,
          quantity,
          price,
          orderStatus: "pending",
          paymentStatus: "pending",
          orderTime,
          updatedAt: orderTime,
        });
        res.send(result);
      });

      app.post("/contact-requests", async (req, res) => {
        const { name, email, subject, message, phone } = req.body;

        if (!name || !email || !subject || !message) {
          return res.status(400).json({
            message: "Name, email, subject, and message are required",
          });
        }

        const result = await contactRequestsColl.insertOne({
          name,
          email,
          subject,
          message,
          phone: phone || "",
          status: "new",
          createdAt: new Date().toISOString(),
        });

        res.send(result);
      });

      // GET REQUESTS
      // all meals
      app.get("/meals", async (req, res) => {
        const result = await mealsColl.find().toArray();
        res.send(result);
      });

      // Paginated meals
      app.get("/all-meals", async (req, res) => {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const search = req.query.search?.trim();
        const maxPrice = Number(req.query.maxPrice);
        const minRating = Number(req.query.minRating);
        const maxDeliveryTime = Number(req.query.maxDeliveryTime);

        const sortFieldByKey = {
          createdAt: "createdAt",
          price: "price",
          rating: "rating",
          chefExperience: "chefExperience",
        };
        const sortBy = sortFieldByKey[req.query.sortBy] || "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        const mealQuery = {};

        if (search) {
          mealQuery.$or = [
            { foodName: { $regex: search, $options: "i" } },
            { chefName: { $regex: search, $options: "i" } },
          ];
        }

        if (Number.isFinite(maxPrice) && maxPrice > 0) {
          mealQuery.price = { $lte: maxPrice };
        }

        if (Number.isFinite(minRating) && minRating > 0) {
          mealQuery.rating = { $gte: minRating };
        }

        if (Number.isFinite(maxDeliveryTime) && maxDeliveryTime > 0) {
          mealQuery["estimatedDeliveryTime.maxTime"] = {
            $lte: maxDeliveryTime,
          };
        }

        const total = await mealsColl.countDocuments(mealQuery);

        const meals = await mealsColl
          .find(mealQuery)
          .sort({ [sortBy]: order })
          .skip(skip)
          .limit(limit)
          .toArray();

        res.send({
          data: meals,
          total,
          page,
          totalPages: Math.max(1, Math.ceil(total / limit)),
        });
      });

      // single meal
      app.get("/meal/:id", async (req, res) => {
        const id = req.params.id;
        const result = await mealsColl.findOne({ _id: new ObjectId(id) });
        res.send(result);
      });

      // all chef meals
      app.get("/my-meal/:id", async (req, res) => {
        const chefId = req.params.id;
        const result = await mealsColl.find({ chefId }).toArray();
        res.send(result);
      });

      // all users
      app.get("/users", async (req, res) => {
        const result = await usersColl.find().toArray();
        res.send(result);
      });

      app.get("/home-chefs", async (req, res) => {
        const limit = parseInt(req.query.limit) || 6;
        const chefs = await usersColl
          .find({ role: "chef", chefId: { $exists: true, $ne: null } })
          .toArray();

        const chefSummaries = await Promise.all(
          chefs.map(async (chef) => {
            const chefMeals = await mealsColl
              .find({ chefId: chef.chefId })
              .sort({ _id: -1 })
              .limit(2)
              .toArray();
            const totalMeals = await mealsColl.countDocuments({
              chefId: chef.chefId,
            });

            return {
              _id: chef._id,
              chefId: chef.chefId,
              name: chef.name,
              email: chef.email,
              profileImage: chef.profileImage,
              address: chef.address,
              description: chef.description,
              totalMeals,
              featuredMeals: chefMeals.map((meal) => meal.foodName),
            };
          }),
        );

        const visibleChefs = chefSummaries
          .filter((chef) => chef.totalMeals > 0)
          .sort((firstChef, secondChef) => secondChef.totalMeals - firstChef.totalMeals)
          .slice(0, limit);

        res.send(visibleChefs);
      });

      // single user
      app.get("/user/:email", async (req, res) => {
        const email = req.params.email;
        const result = await usersColl.findOne({ email });
        res.send(result);
      });

      // all roles
      app.get("/roles", async (req, res) => {
        const result = await rolesColl.find().toArray();
        res.send(result);
      });

      //  user's favorite
      app.get("/favorite-meal/:email", async (req, res) => {
        const email = req.params.email;
        const result = await favoriteColl.find({ userEmail: email }).toArray();
        res.send(result);
      });
      //  all reviews
      app.get("/reviews", async (req, res) => {
        const result = await reviewsColl.find().toArray();
        res.send(result);
      });

      //  user's reviews
      app.get("/review/:email", async (req, res) => {
        const email = req.params.email;
        const result = await reviewsColl
          .find({ reviewerEmail: email })
          .toArray();
        res.send(result);
      });

      // all reviews for a meal
      app.get("/reviews/:id", async (req, res) => {
        const id = req.params.id;
        const result = await reviewsColl.find({ foodId: id }).toArray();
        res.send(result);
      });

      // order by single user
      app.get("/orders", async (req, res) => {
        const result = await ordersColl
          .find()
          .sort({ updatedAt: -1, orderTime: -1 })
          .toArray();
        res.send(result);
      });

      // order by single user
      app.get("/order/:email", async (req, res) => {
        const email = req.params.email;
        const result = await ordersColl
          .find({ userEmail: email })
          .sort({ updatedAt: -1, orderTime: -1 })
          .toArray();
        res.send(result);
      });

      // chef's order requests
      app.get("/order/chef/:id", async (req, res) => {
        const chefId = req.params.id;
        const result = await ordersColl
          .find({ chefId })
          .sort({ updatedAt: -1, orderTime: -1 })
          .toArray();
        res.send(result);
      });

      // PATCH REQUESTS
      // update role
      function generateChefId() {
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        return `chef-${randomNumber}`;
      }
      app.patch("/user/:email", async (req, res) => {
        const email = req.params.email;
        const { role } = req.query;
        const allowedRoles = ["user", "chef", "admin"];

        if (!allowedRoles.includes(role)) {
          return res.status(400).json({ message: "Invalid role" });
        }

        const existingUser = await usersColl.findOne({ email });

        if (!existingUser) {
          return res.status(404).json({ message: "User not found" });
        }

        if (existingUser.role === role) {
          return res.send(existingUser);
        }

        const update =
          role === "chef"
            ? {
                $set: {
                  role,
                  chefId: generateChefId(),
                },
              }
            : {
                $set: { role },
                $unset: { chefId: "" },
              };

        const result = await usersColl.findOneAndUpdate({ email }, update, {
          returnDocument: "after",
        });

        res.send(result);
      });

      // Order Process
      app.patch("/order/change-status/:id", async (req, res) => {
        const id = req.params.id;
        const { status } = req.query;
        const allowedStatus = ["accepted", "cancelled", "delivered"];

        if (!allowedStatus.includes(status)) {
          return res.status(400).json({ message: "Invalid order status" });
        }

        const query = { _id: new ObjectId(id) };
        const order = await ordersColl.findOne(query);

        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }

        const canAcceptOrder =
          order.orderStatus === "pending" && status === "accepted";
        const canCancelOrder =
          order.orderStatus === "pending" && status === "cancelled";
        const canDeliverOrder =
          order.orderStatus === "accepted" &&
          order.paymentStatus === "paid" &&
          status === "delivered";

        if (!canAcceptOrder && !canCancelOrder && !canDeliverOrder) {
          const message =
            status === "delivered" && order.paymentStatus !== "paid"
              ? "Order must be paid before delivery"
              : "This order cannot move to that status right now";

          return res.status(400).json({ message });
        }

        const result = await ordersColl.updateOne(query, {
          $set: {
            orderStatus: status,
            updatedAt: new Date().toISOString(),
            ...(status === "accepted" && {
              acceptedTime: new Date().toISOString(),
            }),
            ...(status === "cancelled" && {
              cancelledTime: new Date().toISOString(),
            }),
            ...(status === "delivered" && {
              deliveredTime: new Date().toISOString(),
            }),
          },
        });
        res.send(result);
      });

      app.patch("/meal/:id", async (req, res) => {
        const id = req.params.id;
        const mealData = req.body;
        const result = await mealsColl.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: mealData,
          },
        );
        res.send(result);
      });

      // DELETE REQUESTS
      // role request delete
      app.delete("/role/:email", async (req, res) => {
        const userEmail = req.params.email;
        const result = await rolesColl.deleteOne({ userEmail });
        res.send(result);
      });

      // favorite meal  delete
      app.delete("/favorite/:id", async (req, res) => {
        const id = req.params.id;
        const result = await favoriteColl.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      });

      // user review  delete
      app.delete("/review/:id", async (req, res) => {
        const id = req.params.id;
        const result = await reviewsColl.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      });

      // chef's meal  delete
      app.delete("/meal/:id", async (req, res) => {
        const id = req.params.id;
        const result = await mealsColl.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      });

      // STRIPE PAYMENT API
      app.post("/create-checkout-session", async (req, res) => {
        try {
          const orderId = req.body?._id;

          if (!ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid order id" });
          }

          const order = await ordersColl.findOne({
            _id: new ObjectId(orderId),
          });

          if (!order) {
            return res.status(404).json({ message: "Order not found" });
          }

          if (order.orderStatus !== "accepted") {
            return res.status(400).json({
              message: "Only accepted orders can move to payment",
            });
          }

          if (order.paymentStatus === "paid") {
            return res.status(400).json({
              message: "This order has already been paid",
            });
          }

          const quantity = Number(order.quantity);
          const totalPrice = Number(order.price);
          const unitAmount = Math.round((totalPrice / quantity) * 100);

          if (
            !Number.isFinite(quantity) ||
            quantity < 1 ||
            !Number.isFinite(totalPrice) ||
            totalPrice <= 0 ||
            unitAmount <= 0
          ) {
            return res.status(400).json({
              message: "This order has invalid payment details",
            });
          }

          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",

            line_items: [
              {
                price_data: {
                  currency: "bdt",
                  product_data: {
                    name: order.mealName,
                  },
                  unit_amount: unitAmount,
                },
                quantity,
              },
            ],

            customer_email: order.userEmail,

            metadata: {
              orderId,
              chefId: order.chefId,
              userEmail: order.userEmail,
              mealName: order.mealName,
              foodId: order.foodId,
            },

            success_url: `${process.env.BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/dashboard/my-orders`,
          });

          res.send({ url: session.url });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });

      // Retrieve STRIPE SESSION
      app.get("/session-status", async (req, res) => {
        const { session_id } = req.query;
        if (!session_id) {
          return res.status(400).json({ message: "Missing session_id" });
        }

        try {
          const session = await stripe.checkout.sessions.retrieve(session_id);
          const orderId = session.metadata?.orderId;
          let order = null;

          if (ObjectId.isValid(orderId)) {
            const orderQuery = { _id: new ObjectId(orderId) };
            const existingOrder = await ordersColl.findOne(orderQuery);

            if (
              session.payment_status === "paid" &&
              existingOrder?.paymentStatus !== "paid"
            ) {
              const paymentTime = new Date().toISOString();

              await ordersColl.updateOne(orderQuery, {
                $set: {
                  paymentStatus: "paid",
                  paymentTime,
                  updatedAt: paymentTime,
                },
              });
            }

            order = await ordersColl.findOne(orderQuery);
          }

          res.send({
            status: session.status,
            paymentStatus: session.payment_status,
            customerEmail:
              session.customer_details?.email || session.customer_email,
            orderId,
            mealName: order?.mealName || session.metadata?.mealName || "",
            orderStatus: order?.orderStatus || "",
            paymentTime: order?.paymentTime || null,
          });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!",
      );
    } finally {
      // Ensures that the client will close when you finish/error
    }
  }

  app.get("/", (req, res) => {
    res.send("Hello from Server..");
  });

  return {
    app,
    port,
    run,
  };
};

if (require.main === module) {
  const { app, port, run } = createServer();

  run().catch(console.dir);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = {
  createCorsOptions,
  createServer,
  DEFAULT_ALLOWED_ORIGINS,
};
