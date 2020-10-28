import axios from "axios";
const base_url = "http://localhost:8080";

export const loginUser = async (userData) => {
  return await axios.post(`${base_url}/users/login`, JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const registerUser = async (userData) => {
  console.log("entered calls");
  console.log(userData);
  return await axios.post(
    `${base_url}/users/register`,
    JSON.stringify(userData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const logoutUser = async (userData) => {
  return await axios.post(`${base_url}/users/logout`, userData);
};

// ITEMS

export const getAllItems = async (userId, token) => {
  console.log("calls offer: " + token);
  return await axios.get(`${base_url}/users/${userId}/offer`, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
};

export const saveBillingInfo = async (userId, billingInfo) => {
  return await axios.post(
    `${base_url}/users/${userId}/billing-info`,
    JSON.stringify(billingInfo),
    {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }
  );
};

export const saveProducts = async (userId, offerInfo) => {
  return await axios.post(
    `${base_url}/users/${userId}/products`,
    JSON.stringify(offerInfo),
    {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }
  );
};

export const generatePdf = async (userId, data) => {
  // Hint: This is where you need to call the backend endpoint for PDF generation
  // Hint: Find the endpoint under backend/routes/users.js

  return await axios.post(
    `${base_url}/users/${userId}/offer`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }
  );
};

export const fetchPdf = async () => {
  return await axios.get(`${base_url}/users/fetch-pdf`, {
    responseType: "blob",
  });
};
