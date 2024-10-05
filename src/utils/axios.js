import axios from "axios";
import UrlApi from "./Url";
import { printData } from "src/helper/publicFunction";

const axiosServices = axios.create({
  baseURL: UrlApi.baseUrl, // Set your base API URL here
  timeout: 20000, // Set a timeout (in milliseconds) for requests
  headers: {
    "Content-Type": "application/json",
    // You can add any other common headers here
  },
});

// interceptor for http
// Request Interceptor: Handle request errors or add common request headers
axiosServices.interceptors.request.use(
  (config) => {
    // You can modify the request config here, add headers, etc.
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle response errors
axiosServices.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response errors here
    if (error.response) {
      // The server responded with an error
      printData({
        name: "Server Error:",
        data: error?.response?.data,
        type: "error",
      });
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made, but there was no response from the server
      printData({
        name: "Network Error:",
        data: error?.message,
        type: "error",
      });
      return Promise.reject(
        new Error("Network error, please try again later.")
      );
    } else {
      // Something else caused the request to fail
      printData({
        name: "Request Error:",
        data: error?.message,
        type: "error",
      });
      return Promise.reject(
        new Error("An error occurred while making the request.")
      );
    }
  }
);
export default axiosServices;
