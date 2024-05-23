import axios from "axios";
import { ChangePasswordData, DeleteAccountData } from "./types";

class UsersFetch {
  async findOneWithoutPolls(id: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${id}/without-polls`
    );
    return axiosRes;
  }

  async findOneWithPolls(id: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${id}/with-polls`
    );
    return axiosRes;
  }

  async findOneMinimized(id: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${id}/minimized`
    );
    return axiosRes;
  }

  async findOneWithToken(token: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/${token}/findone-with-token`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }

  async changeName(id: string, fullName: string, token: string) {
    const axiosRes = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/change-name/${id}`,
      {
        fullName,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }

  async changeAvatar(id: string, avatar: string, token: string) {
    const axiosRes = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/change-avatar/${id}`,
      {
        avatar,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }

  async changeBio(id: string, bio: string, token: string) {
    const axiosRes = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/change-bio/${id}`,
      {
        bio,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }

  async changePassword(id: string, data: ChangePasswordData, token: string) {
    const axiosRes = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/change-password/${id}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }

  async deleteOne(id: string, data: DeleteAccountData, token: string) {
    const axiosRes = await axios.delete(
      `${import.meta.env.VITE_API_URL}/users/${id}`,
      {
        data,
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }
}

export const usersFetch = new UsersFetch();
