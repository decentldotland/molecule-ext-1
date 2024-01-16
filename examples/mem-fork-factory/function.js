export async function handle(state, action) {
  const input = action.input;

  if (input.function === "fork") {
    const { id, network } = input;

    ContractAssert(
      ["mainnet", "testnet"].includes(network),
      "ERR_INVALID_NETWORK_KEY",
    );

    const forked = (
      await EXM.deterministicFetch(`${state.forking_molecule}/${id}/${network}`)
    ).asJSON();

    state.forks.push({
      master: id,
      fork: forked.function_id,
      target_network: network,
    });

    return { state };
  }
}
