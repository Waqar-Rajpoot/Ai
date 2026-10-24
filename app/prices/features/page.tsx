import { FeatureMatrixView } from "@/components/prices/FeatureMatrixView";
import { FEATURE_MATRIX_PAGE } from "@/lib/prices/featureMatrix";
import { buildPageMetadata } from "@/lib/shared/metadata";

export const metadata = buildPageMetadata(FEATURE_MATRIX_PAGE);

export default function FeaturesPage() {
  return <FeatureMatrixView />;
}
