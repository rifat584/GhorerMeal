import CreateMealForm from "../../../components/Form/CreateMealForm";
import {
  DashboardActionLink,
  DashboardPage,
} from "../../../components/Dashboard/DashboardUI";

const CreateMeal = () => {
  return (
    <DashboardPage
      title="Create a meal"
      description="Add a new meal with clear pricing, realistic delivery timing, and enough detail for customers to order with confidence."
      action={<DashboardActionLink to="/dashboard/my-meals">View my meals</DashboardActionLink>}
    >
      <CreateMealForm />
    </DashboardPage>
  );
};

export default CreateMeal;
