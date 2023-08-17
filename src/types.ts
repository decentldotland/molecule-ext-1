const STRATEGIES = [
  "followship",
  "engagement",
  "influencer",
  "creator",
] as const;

export type Strategy = (typeof STRATEGIES)[number];
