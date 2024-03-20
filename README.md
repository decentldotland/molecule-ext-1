<p align="center">
  <a href="https://molecule.sh">
    <img src="https://raw.githubusercontent.com/decentldotland/molecule/main/img/molecule.svg" height="180">
  </a>
  <h3 align="center"><code>@decentdotland/molecule-ext-1</code></h3>
  <p align="center">An extension for MEM's molecule library</p>
</p>

## Endpoints

### Base API endpoint: https://molext1.com

### 1- Hackernoon Handle Resolver

```bash
GET /hackernoon/resolve/:address
```

- `address`: EVM EOA address

### 2- Get Karma3Labs Lens score

```bash
GET /karma3labs/score/:handle/:strategy
```

- `handle`: Lens handle (with or without `.lens`)
- `strategy` : `any of ["followship","engagement","influencer","creator"]`

### 3- Verify Arseed TX Owner

```bash
GET /arseed/verify/:txid/:pubkey
```
- `txid` : The Arseed data TXID
- `pubkey` : Arweave wallet public key (modulus n)

### 4- Fetch EVM Assets Balances

#### A- EVM token balance

```bash
GET /balance/token/:chain/:address/:contract
```

- `chain`: `any of ["eth", "goerli", "polygon", "bsc", "fantom"]`
- `address`: EOA address
- `contract`: token contract address

#### B- EVM NFT balance

```bash
GET /balance/nft/:chain/:address/:contract
```

- `chain`: `any of ["eth", "goerli", "polygon", "bsc", "fantom"]`
- `address`: EOA address
- `contract`: NFT contract address

#### N.B: B return `{isHolder: bool}` 

#### C- Get Transaction Object

```bash
GET /tx/:chain/:address/:txid
```

- `chain`: `any of ["eth", "goerli", "polygon", "bsc", "fantom", "base", "arbitrum"]`
- `address`: EOA address
- `txid`: the transaction hash

### 5- Fork a MEM Function

```bash
GET /mem/fork/:id/:network/:state?
```
- `id` : id of the function to be forked (has to be mainnet function)
- `network` : target network `"mainnet" || "testnet"`
- `state (optional)` : override the forked state with a new one encoded in Base64 (`btoa('{"keyA": "valueA"}')`)

#### MEM Forks Factory: [RqQg3j58tzuNc2zhrc16sjqeToGvKu23QlmKBGolkyI](https://api.mem.tech/api/state/RqQg3j58tzuNc2zhrc16sjqeToGvKu23QlmKBGolkyI)

### 6- Get an SPL Transfer

```bash
GET /solana/spl/:sig/:token_address/:addr1/:addr2
```

- `sig`: the transfer signature (TXID)
- `token_address`: the token smart contract address
- `addr1`: the first EOA in this action
- `addr2`: the second EOA in this action

### 7- Verify signMessage signature on Near [NEP-0413](https://github.com/near/NEPs/blob/master/neps/nep-0413.md)
```bash
GET /near/signature/:message/:nonce/:accountId/:publicKey/:signature
```
- `message`: plaintext message that was signed
- `accountId`: plaintext mainnet account used to sign message
- `publicKey`: plaintext publicKey used by the same account from signMessage function
- `nonce`: plaintext 32 byte-long random Uint8Array turned into hex
```ts
const challenge = randomBytes(32);
let nonce = challenge.toString("hex");
```
- `signature`: plaintext signature from signMessage function

### 8- Dry Run Data AO message

```bash
GET /ao/dryrundata/:pid/:tags/:data?
```

- `pid`: the AO process id
- `tags` : the tags array in base64 format
- `data (optional)`: the message data

## License
This project is licensed under the [MIT License](./LICENSE)
