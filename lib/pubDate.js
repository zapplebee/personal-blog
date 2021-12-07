import { execSync } from "child_process";
import { DateTime } from "luxon";

const pubDateMap = new Map();

export function getPubDates(filePath) {
  if (!pubDateMap.has(filePath)) {
    const history = execSync(
      `git --no-pager log --pretty=format:"%at" -- ${filePath}`
    )
      .toString("utf-8")
      .split("\n")
      .map((t) => DateTime.fromSeconds(Number(t)));

    pubDateMap.set(filePath, history);
    return history;
  }

  return pubDateMap.get(filePath);
}
