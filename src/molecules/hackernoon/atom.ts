import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_URL = `https://api.hackernoon.com/p/wallet`;

export async function resolveHackerNoonUser(address: string) {
  try {
    const requestData = {
      key: process.env.HACKERNOON_API_KEY,
      address: address,
    };
    const req = (await axios.post(API_URL, requestData)).data;
    return req;
  } catch (error) {
    console.log(error);
    return { handle: undefined };
  }
}
