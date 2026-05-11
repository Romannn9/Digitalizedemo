#!/usr/bin/env python3
"""Strip Co-authored-by lines from a commit message (stdin+stdout, or file path as argv[1])."""
import sys


def strip_lines(data: str) -> str:
    lines = data.splitlines(True)
    out = [ln for ln in lines if not ln.lstrip().lower().startswith("co-authored-by:")]
    return "".join(out).rstrip("\n") + "\n"


def main() -> None:
    if len(sys.argv) > 1:
        path = sys.argv[1]
        with open(path, encoding="utf-8", errors="replace") as f:
            raw = f.read()
        text = strip_lines(raw)
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(text)
    else:
        sys.stdout.write(strip_lines(sys.stdin.read()))


if __name__ == "__main__":
    main()
