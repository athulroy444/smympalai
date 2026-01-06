import HeroCarousel from "../components/home/HeroCarousel";
import HistorySection from "../components/home/HistorySection";
import StatsSection from "../components/home/StatsSection";
import NewsSection from "../components/home/NewsSection";

function Home() {
    return (
        <>
            <HeroCarousel />
            <HistorySection />
            <StatsSection />
            <NewsSection />
        </>
    );
}

export default Home;
