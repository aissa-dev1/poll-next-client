import axios from "axios";
import { CreatePollData, LikePollData, VotePollOptionData } from "./types";

class PollsFetch {
  async findAll() {
    const axiosRes = await axios.get(`${import.meta.env.VITE_API_URL}/polls`);
    return axiosRes;
  }

  async findOne(id: string) {
    const axiosRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/polls/${id}`
    );
    return axiosRes;
  }

  async createOne(data: CreatePollData, token: string) {
    const axiosRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/polls/create-one`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }

  async likeOne({ id, fanId }: LikePollData, token: string) {
    const axiosRes = await axios.patch(
      `${import.meta.env.VITE_API_URL}/polls/like-one/${id}?fanId=${fanId}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }

  async voteOneOption({ id, fanId, index }: VotePollOptionData, token: string) {
    const axiosRes = await axios.patch(
      `${
        import.meta.env.VITE_API_URL
      }/polls/vote-one-option/${id}?fanId=${fanId}&index=${index}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }

  async deleteOne(id: string, token: string) {
    const axiosRes = await axios.delete(
      `${import.meta.env.VITE_API_URL}/polls/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return axiosRes;
  }
}

export const pollsFetch = new PollsFetch();
