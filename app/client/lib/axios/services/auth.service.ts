import axiosInstance from "../axiosConfig";
import { authEndpoints } from "../endpoints";

export const LoginUser = async (loginPayload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(
      authEndpoints.loginUser,
      loginPayload
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const RegisterUser = async (registerPayload: {
  username: string;
  email: string;
  password: string;
  interests?: string[];
}) => {
  try {
    const response = await axiosInstance.post(
      authEndpoints.registerUser,
      registerPayload
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const VerifyToken = async () => {
  try {
    const response = await axiosInstance.post(authEndpoints.verifyToken);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const UpdateProfile = async (interests: string[]) => {
  try {
    const response = await axiosInstance.patch(authEndpoints.updateProfile, {
      interests,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
