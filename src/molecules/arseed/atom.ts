import axios from "axios";

export async function getArseedOwner(txid: string, pubkey: string) {
  try {
    const req = (
      await axios.get(`https://arseed.web3infra.dev/bundle/tx/${txid}`)
    )?.data;
    if (req?.owner === pubkey) {
      return { result: true };
    }

    return { result: false };
  } catch (error) {
    console.log(error);
    return { result: false };
  }
}
