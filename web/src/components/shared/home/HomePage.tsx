import { FeaturedChannelsCarousel } from "./FeaturedChannelsCarousel";
import RandomCategories from "./RandomCategories";
import RecommendedChannels from "./RecommendedChannels";
import StreamsPage from "./StreamsPage";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 gap-y-8">
      <FeaturedChannelsCarousel />

      {}

      <RandomCategories />

      <StreamsPage />
    </div>
  );
}
