const MAINNET_TXS_BROADCASTER_URL = `https://mem-cli-server-482a8c7c1299.herokuapp.com/mem-cli`;
const CARBON_TXS_BROADCASTER_URL = `https://mem-testnet.xyz/deploy`;

import axios from "axios";
function generateFunctionFormat(sourceCode: number[], state: string): any {
  const dataTx = {
    contractOwner: "",
    contentType: "application/javascript",
    contractSrc: sourceCode,
    initState: state,
  };

  const tags = [
    { name: "Content-Type", value: "application/javascript" },
    { name: "Owner", value: "" },
    { name: "App-Name", value: "EM" },
    { name: "Type", value: "Serverless-Function" },
    { name: "EM-Bundled", value: "true" },
    { name: "Size", value: String(sourceCode.length) },
  ];

  return { dataTx, tags };
}

export async function deployFunction(
  id: string,
  network: string,
  state?: string,
): Promise<any> {
  const { contractSrc, initState } = (
    await axios.get(`https://arweave.net/${id}`)
  )?.data;
  let chosenState;

  if (state) {
    chosenState = atob(state);
  } else {
    chosenState = initState;
  }

  if (network === "mainnet") {
    const data = JSON.stringify(
      generateFunctionFormat(contractSrc, chosenState),
    );

    const options = {
      method: "post",
      url: MAINNET_TXS_BROADCASTER_URL,
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
    };

    const response = await fetch(MAINNET_TXS_BROADCASTER_URL, options);

    if (response.ok) {
      const data = await response.json();
      return { function_id: data.txid } as any;
    }

    throw new Error(response.statusText);
  }

  const body = {
    src: contractSrc,
    state: chosenState,
  };

  const function_id = (await axios.post(CARBON_TXS_BROADCASTER_URL, body))?.data
    ?.function_id;

  return { function_id } as any;
}
