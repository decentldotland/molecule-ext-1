import express, { Express, Request, Response } from "express";
import { resolveHackerNoonUser } from "./molecules/hackernoon/atom";
import { getKarmaScore } from "./molecules/karma3labs/atom";
import { getArseedOwner } from "./molecules/arseed/atom";
import {
  moralisTokenBalance,
  moralisNftBalance,
} from "./molecules/balances/atom";
import type { Strategy } from "@/types";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("⚛️ molecule-ext-1 ⚛️");
});

app.get("/hackernoon/resolve/:address", async (req: Request, res: Response) => {
  const { address } = req.params;
  const profile = await resolveHackerNoonUser(address);
  res.send(profile);
});

app.get(
  "/karma3labs/score/:handle/:strategy",
  async (req: Request, res: Response) => {
    const { handle, strategy } = req.params;
    const options = {
      handle: handle,
      strategy: strategy as Strategy,
    };
    const profile = await getKarmaScore(options);
    res.send(profile);
  },
);

app.get("/arseed/verify/:txid/:pubkey", async (req: Request, res: Response) => {
  const { txid, pubkey } = req.params;

  const result = await getArseedOwner(txid, pubkey);
  res.send(result);
});

app.get(
  "/balance/token/:chain/:address/:contract",
  async (req: Request, res: Response) => {
    const { chain, address, contract } = req.params;

    if (!["eth", "goerli", "polygon", "bsc", "fantom"].includes(chain)) {
      res.send({ error: "invalid chain key supplied" });
      return;
    }

    const result = await moralisTokenBalance(address, contract, chain);
    res.send(result);
    return;
  },
);

app.get(
  "/balance/nft/:chain/:address/:contract",
  async (req: Request, res: Response) => {
    const { chain, address, contract } = req.params;

    if (!["eth", "goerli", "polygon", "bsc", "fantom"].includes(chain)) {
      res.send({ error: "invalid chain key supplied" });
      return;
    }
    const result = await moralisNftBalance(address, contract, chain);
    res.send(result);
    return;
  },
);

app.listen(port, () => {
  console.log(`[molecule-ext-1] running on port: ${port}`);
});
