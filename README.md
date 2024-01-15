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
- `network` : where to fork it `"mainnet" || "testnet"`
- `state (optional)` : override the forked state with a new one encoded in Base64 (`btoa('{"keyA": "valueA"}')`)

## License
This project is licensed under the [MIT License](./LICENSE)
