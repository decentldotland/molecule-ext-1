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

## License
This project is licensed under the [MIT License](./LICENSE)
