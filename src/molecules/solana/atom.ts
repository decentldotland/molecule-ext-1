import * as web3 from "@solana/web3.js";

export async function getSplTokenTransfer(
  sig : string,
  tokenAddr: string,
  addr1 : string,
  addr2: string,
): Promise<any> {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("mainnet-beta"),
      "confirmed",
    );

    const response: any = await connection.getTransaction(sig);
    const message: any = response.transaction.message;
    const meta: any = response.meta;

    const mints: any = meta.postTokenBalances
      .concat(meta.preTokenBalances)
      .flat()
      .map((tx: any) => tx.mint);
    const isTargetMint : boolean = mints.every((element: any) => element === tokenAddr);

    if (!isTargetMint) {
      throw new Error(`ERR_INVALID_TOKEN_ADDR`);
    }

    console.log(mints, isTargetMint);

    const addr1Pre : any = meta.preTokenBalances.find((tx: any) => tx.owner === addr1);
    const addr1Post : any = meta.postTokenBalances.find((tx: any) => tx.owner === addr1);
    const addr1Net: any =
      addr1Post.uiTokenAmount.uiAmount - addr1Pre.uiTokenAmount.uiAmount;

    const addr2Pre : any = meta.preTokenBalances.find((tx: any) => tx.owner === addr2);
    const addr2Post: any = meta.postTokenBalances.find((tx: any) => tx.owner === addr2);
    const addr2Net : any =
      addr2Post.uiTokenAmount.uiAmount - addr2Pre.uiTokenAmount.uiAmount;

    const res = {
      [addr1]: addr1Net,
      [addr2]: addr2Net,
      token_address: tokenAddr,
      sig: sig,
    };

    console.log(res);

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
}
