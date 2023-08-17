import express, { Express, Request, Response } from "express";
import { resolveHackerNoonUser } from "./molecules/hackernoon/atom";
import { getKarmaScore } from "./molecules/karma3labs/atom";
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

app.listen(port, () => {
  console.log(`[molecule-ext-1] running on port: ${port}`);
});
