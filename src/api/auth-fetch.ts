import axios from "axios";
import { LoginData, RegisterData } from "./types";

class AuthFetch {
  async register(data: RegisterData) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      data
    );
    return axiosRes;
  }

  async login(data: LoginData) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      data
    );
    return axiosRes;
  }
}

export const authFetch = new AuthFetch();
