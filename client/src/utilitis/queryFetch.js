import axios from "axios";

const queryFetch = async (url) => {
  // console.log(url);
  const mealsData = await axios(`${import.meta.env.VITE_API_BASE_URL}/${url}`);
  // console.log(mealsData.data);
  return mealsData.data;
};

export default queryFetch;
