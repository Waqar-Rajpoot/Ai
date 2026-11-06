import { HubView } from "@/components/hub/HubView";
import { NEWS_HUB } from "@/lib/hub/hubs";

export default function NewsHubPage() {
  return <HubView hub={NEWS_HUB} />;
}