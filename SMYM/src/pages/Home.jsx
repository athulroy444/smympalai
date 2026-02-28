import HeroCarousel from "../components/home/HeroCarousel";
import KarmaRekha from "../components/home/KarmaRekha";
import HistorySection from "../components/home/HistorySection";
import StatsSection from "../components/home/StatsSection";
import NewsSection from "../components/home/NewsSection";
import SecretariatPage from "../components/home/ROOPATHA";
import SyndicatePage from "../components/home/Syndicate";
import BrowseForonaSection from "../components/home/BrowseForonaSection";

function Home() {
    console.log("Home Page: Rendering...");
    try {
        return (
            <>
                <HeroCarousel />
                <HistorySection />
                <SecretariatPage />
                <SyndicatePage />
                <BrowseForonaSection />
                <KarmaRekha />
                <StatsSection />
                <NewsSection />
            </>
        );
    } catch (err) {
        console.error("Home Page: Fatal Error!", err);
        return <div className="p-5 text-center"><h1>Something went wrong.</h1><p>{err.message}</p></div>;
    }
}

export default Home;
