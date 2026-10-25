import type { Explainer } from "../explainerTypes";
import { CHATGPT_ADS_FREE_GO } from "./chatgptAdsFreeGo";
import { EU_AI_ACT_OMNIBUS } from "./euAiActOmnibus";

/** Every published explainer. To add one, create a file in this folder and list it here. */
export const EXPLAINERS: readonly Explainer[] = [EU_AI_ACT_OMNIBUS, CHATGPT_ADS_FREE_GO];