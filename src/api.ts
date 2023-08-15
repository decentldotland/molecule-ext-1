import express, { Express, Request, Response } from "express";
import { resolveHackerNoonUser } from "./molecules/hackernoon/atom";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("⚛️ molecule-2 ⚛️");
});

app.get("/resolve-hn/:address", async (req: Request, res: Response) => {
  const { address } = req.params;
  const profile = await resolveHackerNoonUser(address);
  res.send(profile);
});

app.listen(port, () => {
  console.log(`[molecule-2] running on port: ${port}`);
});
