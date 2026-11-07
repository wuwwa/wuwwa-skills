# Land or Water Eval

Saved 2026-11-07. The user expects this idea to be useful for a forthcoming project.

[Karpathy's post](https://x.com/karpathy/status/2105909609487872075) describes asking a model “Land or Water?” with latitude/longitude text for 16,200 points, then plotting its answers. It quotes [celestepoasts' results post](https://x.com/celestepoasts/status/2103232383139057950); both source links belong to this one reference.

To turn it into a reproducible evaluation, define the exact coordinate grid and order, model/version, prompt, decoding settings and accepted labels. Save raw responses, parse failures and retries. Compare against an appropriate geospatial ground truth rather than treating a plausible map as accuracy evidence.

The source does not establish the grid geometry or reproducibility settings. Do not invent those as recovered facts. Estimate API calls/cost and confirm the intended model before running a large experiment. No API calls, model benchmark or 16,200-point run was executed here.
