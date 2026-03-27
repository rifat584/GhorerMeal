import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Seller/MyMeals";
import ManageOrders from "../pages/Dashboard/Seller/OrderRequests";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import MealDetails from "../pages/PlantDetails/MealDetails";
import ManageRequest from "../pages/Dashboard/Admin/ManageRequest";
import CreateMeal from "../pages/Dashboard/Seller/CreateMeal";
import OrderRequests from "../pages/Dashboard/Seller/OrderRequests";
import MyMeals from "../pages/Dashboard/Seller/MyMeals";
import MyReview from "../pages/Dashboard/Customer/MyReview";
import FavoriteMeal from "../pages/Dashboard/Customer/FavoriteMeal";
import PaymentSuccess from "../pages/Dashboard/Customer/PaymentSuccess";
import AllMeals from "../pages/Meals/AllMeals";
import ChefRoute from "./ChefRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-meals",
        element: <AllMeals />,
      },
      {
        path: "/meal/:id",
        element: <PrivateRoute>
          <MealDetails />
        </PrivateRoute>,
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // common
      {
        path: 'stat',
        element: (
          <AdminRoute>
            <Statistics />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      // seller
      {
        path: "create-meal",
        element: (
          <ChefRoute>
            <CreateMeal />
          </ChefRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <ChefRoute>
            <MyMeals />
          </ChefRoute>
        ),
      },
      {
        path: "order-requests",
        element: (
          <ChefRoute>
            <OrderRequests />
          </ChefRoute>
        ),
      },
      // Admin
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-request",
        element: (
          <AdminRoute>
            <ManageRequest />
          </AdminRoute>
        ),
      },
      // user
      {
        path: "my-orders",
        element: (
          <UserRoute>
            <MyOrders />
          </UserRoute>
        ),
      },
      {
        path: "my-review",
        element: (
          <UserRoute>
            <MyReview />
          </UserRoute>
        ),
      },
      {
        path: "favorite-meal",
        element: (
          <UserRoute>
            <FavoriteMeal />
          </UserRoute>
        ),
      },
    ],
  },
]);
