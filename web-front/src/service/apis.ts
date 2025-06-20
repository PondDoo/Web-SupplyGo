import axios, { AxiosError } from "axios";

export const API_URL = "http://10.5.50.228:5000";  



interface LoginResponse {
  token: string;
}


export const RegisterUser = async (
  username :string,
  password :string,
  email : string
): Promise<void> =>{
   try{
    const response = await axios.post(`${API_URL}/api/register`, {
      username,
      password,
      email
    });
    

   }catch
     (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const errorMsg =
      err.response?.data?.message ||
      err.message ||
      "Register error";

    console.error("Register error:", errorMsg);
    throw new Error(errorMsg);
   }
}


export const loginUser = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/api/login`, {
      username,
      password,
    });

    const { token, } = response.data || {};

    if (!token) {
      throw new Error("Login failed: Missing token ");
    }

    return { token};
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const errorMsg =
      err.response?.data?.message ||
      err.message ||
      "An unknown login error occurred";

    console.error("Login error:", errorMsg);
    throw new Error(errorMsg);
  }
};