import HeroCarousel from "../components/home/HeroCarousel";
import KarmaRekha from "../components/home/KarmaRekha";
import HistorySection from "../components/home/HistorySection";
import StatsSection from "../components/home/StatsSection";
import NewsSection from "../components/home/NewsSection";
import SecretariatPage from "../components/home/ROOPATHA";

function Home() {
    return (
        <>
            <HeroCarousel />
            <HistorySection />
            <SecretariatPage />

            <KarmaRekha />
            <StatsSection />
            <NewsSection />
        </>
    );
}

export default Home;
