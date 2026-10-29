import type { BestForRoundup, BestForSlug } from "../types";
import { overallRoundup } from "./overall";
import { codingRoundup } from "./coding";
import { writingRoundup } from "./writing";
import { agentsRoundup } from "./agents";
import { valueRoundup } from "./value";
import { cheapAndFastRoundup } from "./cheapAndFast";
import { openWeightsRoundup } from "./openWeights";
import { localRoundup } from "./local";
import { studentsRoundup } from "./students";
import { smallBusinessRoundup } from "./smallBusiness";
import { imageRoundup } from "./image";
import { videoRoundup } from "./video";

export const BEST_FOR_ROUNDUPS: Readonly<Record<BestForSlug, BestForRoundup>> = {
  overall: overallRoundup,
  coding: codingRoundup,
  writing: writingRoundup,
  agents: agentsRoundup,
  value: valueRoundup,
  "cheap-and-fast": cheapAndFastRoundup,
  "open-weights": openWeightsRoundup,
  local: localRoundup,
  students: studentsRoundup,
  "small-business": smallBusinessRoundup,
  image: imageRoundup,
  video: videoRoundup,
};