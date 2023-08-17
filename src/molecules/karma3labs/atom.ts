import axios from "axios";
import type { Strategy } from "@/types";

interface KarmaOptions {
  strategy: Strategy;
  handle: string;
}

export async function getKarmaScore(opts: KarmaOptions) {
  try {
    const req = (
      await axios.get(
        `https://lens-api.k3l.io/profile/score?strategy=${opts.strategy}&handle=${opts.handle}`,
      )
    )?.data;
    if (req?.score) {
      return req;
    }

    return {score: undefined};
  } catch (error) {
    console.log(error);
    return { score: undefined };
  }
}
