import * as borsh from "borsh";
import { utils } from "near-api-js";
import { sha256 } from "js-sha256";

// Guide taken from https://docs.near.org/develop/integrate/backend-login

export async function authenticateNearSignature(
  // plaintext message that was signed
  message: string,
  // plaintext mainnet account used to sign message
  accountId: string,
  // plaintext publicKey used by the same account
  publicKey: string,
  // plaintext hex'd 32 byte-long random Uint8Array
  nonce: string,
  // plaintext signMessage signature
  signature: string
) {
  // A user is correctly authenticated if:
  // - The key used to sign belongs to the user and is a Full Access Key
  // - The object signed contains the right message and domain

  try {
    const full_key_of_user = await verifyFullKeyBelongsToUser(
      publicKey,
      accountId
    );
    const valid_signature = verifySignature(
      message,
      nonce,
      accountId,
      publicKey,
      signature
    );
    const validSignature = full_key_of_user && valid_signature;
    return { validSignature };
  } catch (error) {
    return {
      validSignature: false,
      error,
      message,
      nonce,
      accountId,
      publicKey,
      signature,
    };
  }
}

function verifySignature(
  message: string,
  nonce: string,
  recipient: string,
  publicKey: string,
  signature: string
) {
  // Reconstruct the payload that was **actually signed**
  const decodedNonce = Buffer.from(nonce, "hex");

  const payload = {
    // The tag's value is a hardcoded value as per
    // defined in the NEP [NEP413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md)
    tag: 2147484061,
    message,
    nonce: decodedNonce,
    recipient,
  };

  const borsh_schema = {
    struct: {
      tag: "u32",
      message: "string",
      nonce: { array: { type: "u8", len: 32 } },
      recipient: "string",
      callbackUrl: { option: "string" },
    },
  };

  const borsh_payload = borsh.serialize(borsh_schema, payload);
  const to_sign = Uint8Array.from(sha256.array(borsh_payload));

  // Reconstruct the signature from the parameter given in the URL
  let real_signature = Buffer.from(signature, "base64");

  // Use the public Key to verify that the private-counterpart signed the message
  const myPK = utils.PublicKey.from(publicKey);
  return myPK.verify(to_sign, real_signature);
}

async function verifyFullKeyBelongsToUser(
  publicKey: string,
  accountId: string
) {
  // Call the public RPC asking for all the users' keys
  let data = await fetch_all_user_keys(accountId);

  // if there are no keys, then the user could not sign it!
  if (!data || !data.result || !data.result.keys) return false;

  // check all the keys to see if we find the used_key there
  for (const k in data.result.keys) {
    if (data.result.keys[k].public_key === publicKey) {
      // Ensure the key is full access, meaning the user had to sign
      // the transaction through the wallet
      return data.result.keys[k].access_key.permission == "FullAccess";
    }
  }

  return false; // didn't find it
}

// Aux method
async function fetch_all_user_keys(accountId: string) {
  const keys = await fetch("https://rpc.mainnet.near.org", {
    method: "post",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: `{"jsonrpc":"2.0", "method":"query", "params":["access_key/${accountId}", ""], "id":1}`,
  })
    .then((data) => data.json())
    .then((result) => result);
  return keys;
}
