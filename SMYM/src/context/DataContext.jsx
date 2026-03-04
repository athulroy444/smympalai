import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import darshanamPdf from '../assets/Darshanam.pdf';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

    // --- HELPER FOR LOCAL STORAGE ---
    const getCached = (key, fallback) => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    };

    // --- STATE INITIALIZATION (With Caching) ---
    const [foronaList, setForonaList] = useState(() => getCached('cache_foronas', []));
    const [activities, setActivities] = useState(() => getCached('cache_activities', []));
    const [news, setNews] = useState(() => getCached('cache_news', []));
    const [roopathaExecutives, setRoopathaExecutives] = useState(() => getCached('cache_execs', []));

    const [loading, setLoading] = useState(true);
    const [eventsList, setEventsList] = useState([]);
    const [heroSlides, setHeroSlides] = useState([]);
    const [siteSettings, setSiteSettings] = useState({});

    const [karmaRekha, setKarmaRekha] = useState({
        title: "Karma Rekha 2025 (Darshanam)",
        link: darshanamPdf
    });

    // --- FETCH & CACHE LOGIC ---
    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);

            const safeFetch = async (url, setter, cacheKey, isArray = true) => {
                try {
                    const res = await axios.get(url);
                    const data = isArray ? (Array.isArray(res.data) ? res.data : []) : (res.data || {});

                    setter(data);
                    // Update Cache
                    if (cacheKey) localStorage.setItem(cacheKey, JSON.stringify(data));

                    console.log(`DataContext: ${cacheKey} synced.`);
                } catch (err) {
                    console.error(`DataContext Sync Error (${url}):`, err.message);
                }
            };

            // Fetch everything in parallel
            await Promise.all([
                safeFetch(`${API_BASE}/api/content/activities`, setActivities, "cache_activities"),
                safeFetch(`${API_BASE}/api/content/news`, setNews, "cache_news"),
                safeFetch(`${API_BASE}/api/content/events`, setEventsList, null),
                safeFetch(`${API_BASE}/api/content/executives`, setRoopathaExecutives, "cache_execs"),
                safeFetch(`${API_BASE}/api/data/foronas`, setForonaList, "cache_foronas"),
                safeFetch(`${API_BASE}/api/content/hero-slides`, setHeroSlides, null),
                safeFetch(`${API_BASE}/api/content/settings`, setSiteSettings, null, false)
            ]);

            setLoading(false);
        };

        fetchContent();
    }, [API_BASE]);

    // --- THE REST OF YOUR ACTIONS (addMember, updateNews, etc. remain the same) ---
    // ... (Keep all your addMember, addNews, deleteMember functions here)

    // --- UPDATE KARMA REKHA ---
    const updateKarmaRekha = (data) => {
        setKarmaRekha(data);
    };

    // --- UPLOAD HELPER ---
    const uploadImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const res = await axios.post(`${API_BASE}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return { url: res.data.url };
        } catch (err) {
            console.error("Upload failed", err);
            return { error: err.response?.data?.message || "Server error" };
        }
    };

    return (
        <DataContext.Provider value={{
            foronaList,
            activities,
            news,
            roopathaExecutives,
            eventsList,
            heroSlides,
            siteSettings,
            karmaRekha,
            loading,
            API_BASE,
            uploadImage,
            updateKarmaRekha,
            // Export all your other functions here...
            fetchMembers: async (id) => { /* your existing code */ },
            addMember: async (data) => { /* your existing code */ },
            // ... copy the rest of your value object from your original file
        }}>
            {children}
        </DataContext.Provider>
    );
};