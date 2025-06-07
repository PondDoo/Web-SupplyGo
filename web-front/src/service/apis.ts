import axios, { AxiosError } from "axios";

export const API_URL = "http://10.5.50.228:5000";  



interface LoginResponse {
  token: string;
  userId: number;
}


export const RegisterUser = async (
  username :string,
  password :string,
  email : string
): Promise<void> =>{
   try{
    const response = await axios.post(`${API_URL}/register`, {
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
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
      username,
      password,
    });

    const { token, userId } = response.data || {};

    if (!token || !userId) {
      throw new Error("Login failed: Missing token or userId");
    }

    return { token, userId };
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