import HeroCarousel from "../components/home/HeroCarousel";
import HistorySection from "../components/home/HistorySection";
import StatsSection from "../components/home/StatsSection";
import NewsSection from "../components/home/NewsSection";
import RoopathaExecutives from "../components/home/RoopathaExecutives";

function Home() {
    return (
        <>
            <HeroCarousel />
            <HistorySection />
            <RoopathaExecutives />
            <StatsSection />
            <NewsSection />
        </>
    );
}

export default Home;
