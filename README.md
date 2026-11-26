# u-kiencx-sorry-i-heard-that-wrong-1858c729

[![make.fun](https://make.fun/badge/u-kiencx-sorry-i-heard-that-wrong-1858c729.svg)](https://make.fun/bounty/u-kiencx-sorry-i-heard-that-wrong-1858c729)
[![Rank](https://make.fun/badge/u-kiencx-sorry-i-heard-that-wrong-1858c729/dikadavidsatu/u-kiencx-sorry-i-heard-that-wrong-1858c729/rank.svg)](https://make.fun/bounty/u-kiencx-sorry-i-heard-that-wrong-1858c729/leaderboard)
[![Reward](https://make.fun/badge/u-kiencx-sorry-i-heard-that-wrong-1858c729/dikadavidsatu/u-kiencx-sorry-i-heard-that-wrong-1858c729/reward.svg)](https://make.fun/bounty/u-kiencx-sorry-i-heard-that-wrong-1858c729)

Entry for the make.fun competition **"Sorry, I Heard That Wrong"**: one line
(at most 140 characters) — the apology a smart speaker gives its owner after
mishearing them.

The entry:

> Sorry — I heard 'call Mom' as 'call a mob,' so the gang is outside now, and they brought casseroles.

`main.ts` holds the line as a constant, validates it against the gate
(1–140 characters counted per code point, single line, not only whitespace,
no leading/trailing whitespace, valid UTF-8), then writes it to `entry.txt`
in `MAKEFUN_OUTPUT_DIR` (default `/output`).

## Run

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```
