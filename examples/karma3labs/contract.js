export async function handle(state, action) {
  const input = action.input;

  if (input.function === "getKarmaScore") {
    const { stratety, handle } = input;
    ContractAssert(
      ["followship", "engagement", "influencer", "creator"].includes(stratety),
      "ERROR_UNSUPPORTED_STRATEGY",
    );

    ContractAssert(
      typeof handle === "string" && handle.trim().length,
      "ERROR_INVALID_HANDLE",
    );

    const req = (
      await EXM.deterministicFetch(
        `${state.molecule_endpoint}/karma3labs/score/${handle}/${stratety}`,
      )
    )?.asJSON();

    state.scores.push({
      handle: handle,
      strategy: stratety,
      score: req.score,
      req_id: SmartWeave.transaction.id,
    });

    return { state };
  }
}
