import axios from "axios";

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
}

export const usersFetch = new UsersFetch();
