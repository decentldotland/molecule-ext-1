import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function moralisTokenBalance(
  eoa_address: string,
  token_contract: string,
  chain: string,
) {
  try {
    const res = (
      await axios.get(
        `https://deep-index.moralis.io/api/v2/${eoa_address}/erc20?chain=${chain}&token_addresses%5B0%5D=${token_contract}`,
        {
          headers: {
            Accept: "application/json",
            "X-API-Key": process.env.MORALIS_API_TOKEN,
          },
        },
      )
    )?.data;
    const data = res?.[0];
    data.final_bal = Number(data.balance) / 10 ** data.decimals;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function moralisNftBalance(
  eoa_address: string,
  nft_contract: string,
  chain: string,
) {
  try {
    const res = (
      await axios.get(
        `https://deep-index.moralis.io/api/v2/${eoa_address}/nft?chain=${chain}&format=decimal&token_addresses%5B0%5D=${nft_contract}&media_items=false`,
        {
          headers: {
            Accept: "application/json",
            "X-API-Key": process.env.MORALIS_API_TOKEN,
          },
        },
      )
    )?.data;

    if (res?.result?.length) {
      return { isHolder: true };
    }

    return { isHolder: false };
  } catch (error) {
    console.log(error);
    return { isHolder: false };
  }
}
