import type { HubConfig } from "./hubTypes";
import { ABOUT_HUB, COMPARE_HUB, LEARN_HUB, NEWS_HUB, PRICES_HUB, SOCIETY_HUB, TOOLS_HUB } from "./hubs";

/** Every hub, used to build "Keep exploring" links. */
export const ALL_HUBS: readonly HubConfig[] = [LEARN_HUB, COMPARE_HUB, PRICES_HUB, TOOLS_HUB, SOCIETY_HUB, NEWS_HUB, ABOUT_HUB];