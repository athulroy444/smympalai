import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {

    // --- KARMA REKHA ---
    const [karmaRekha, setKarmaRekha] = useState({
        title: "Karma Rekha 2025",
        link: "#"
    });

    const updateKarmaRekha = (data) => {
        setKarmaRekha(data);
        // Persist to backend if needed (skipped for now as per minimal requirement, easy to add)
    };

    // --- DB ACTIONS (Previously Defined) ---
    const [activities, setActivities] = useState([]);
    const [news, setNews] = useState([]);
    const [eventsList, setEventsList] = useState([]); // Registrable Events

    // --- ROOPATHA EXECUTIVES ---
    const [roopathaExecutives, setRoopathaExecutives] = useState([]);
    const [heroSlides, setHeroSlides] = useState([]);
    const [siteSettings, setSiteSettings] = useState({});

    const updateRoopathaExecutive = async (id, updatedData) => {
        // Optimistic
        setRoopathaExecutives(prev => prev.map(ex => ex.id === id ? { ...ex, ...updatedData } : ex));
        try {
            await axios.put(`${API_BASE}/api/content/executives/${id}`, updatedData);
        } catch (err) {
            console.error("Failed to update exec", err);
        }
    };

    const addRoopathaExecutive = async (newExec) => {
        try {
            console.log("Sending new executive via fetch:", newExec);
            const response = await fetch(`${API_BASE}/api/content/executives`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExec),
            });

            if (!response.ok) {
                // Try to parse error message
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server responded with ${response.status}`);
            }

            console.log("Add successful (fetch). Refetching...");

            // Re-fetch all to get images (since response doesn't have it anymore)
            const execRes = await axios.get(`${API_BASE}/api/content/executives`);
            setRoopathaExecutives(execRes.data);
        } catch (err) {
            console.error("Failed to add exec (fetch)", err);
            throw err;
        }
    };

    const deleteRoopathaExecutive = async (id) => {
        setRoopathaExecutives(prev => prev.filter(ex => ex.id !== id));
        try {
            await axios.delete(`${API_BASE}/api/content/executives/${id}`);
        } catch (err) {
            console.error("Failed to delete exec", err);
        }
    };

    const [foronaList, setForonaList] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

    // --- FETCH FROM BACKEND ---
    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            const safeFetch = async (url, setter, label, isArray = true) => {
                try {
                    const res = await axios.get(url);
                    if (isArray) {
                        setter(Array.isArray(res.data) ? res.data : []);
                    } else {
                        setter(res.data || {});
                    }
                    console.log(`DataContext: ${label} fetched.`);
                } catch (err) {
                    console.error(`DataContext: Error fetching ${label}:`, err.message);
                }
            };

            await Promise.all([
                safeFetch(`${API_BASE}/api/content/activities`, setActivities, "Activities"),
                safeFetch(`${API_BASE}/api/content/news`, setNews, "News"),
                safeFetch(`${API_BASE}/api/content/events`, setEventsList, "Events"),
                safeFetch(`${API_BASE}/api/content/executives`, setRoopathaExecutives, "Executives"),
                safeFetch(`${API_BASE}/api/data/foronas`, setForonaList, "Foronas"),
                safeFetch(`${API_BASE}/api/content/hero-slides`, setHeroSlides, "Hero Slides"),
                safeFetch(`${API_BASE}/api/content/settings`, setSiteSettings, "Settings", false)
            ]);

            setLoading(false);
        };

        fetchContent();
    }, [API_BASE]);

    // --- ADD ACTIONS ---
    const addActivity = async (activityData) => {
        try {
            await axios.post(`${API_BASE}/api/content/activities`, activityData);
            // Refresh
            const res = await axios.get(`${API_BASE}/api/content/activities`);
            setActivities(res.data);
            return true;
        } catch (err) {
            console.error("Failed to add activity", err);
            return false;
        }
    };

    const addNews = async (newsData) => {
        try {
            const res = await axios.post(`${API_BASE}/api/content/news`, newsData);
            setNews(prev => [...prev, res.data]);
            return true;
        } catch (err) {
            console.error("Failed to add news", err);
            return false;
        }
    };

    const updateNews = async (id, updatedData) => {
        // Optimistic update for demo
        setNews(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
        try {
            // In a real app: await axios.put(`${API_BASE}/api/content/news/${id}`, updatedData);
        } catch (err) {
            console.error("Failed to update news", err);
        }
    };

    const deleteNews = async (id) => {
        try {
            await axios.delete(`${API_BASE}/api/content/news/${id}`);
            setNews(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const addEvent = async (eventData) => {
        try {
            const res = await axios.post(`${API_BASE}/api/content/events`, eventData);
            setEventsList(prev => [...prev, res.data]);
            return true;
        } catch (err) {
            console.error("Failed to add event", err);
            return false;
        }
    };

    const deleteEvent = async (id) => {
        try {
            await axios.delete(`${API_BASE}/api/content/events/${id}`);
            setEventsList(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    // --- LEGACY ACTIONS ---
    const registerUnit = (foronaName, unitName, unitExecutives) => {
        setForonaList(prevList => {
            return prevList.map(forona => {
                if (forona.name === foronaName) {
                    const unitExists = forona.units.some(u => u.name === unitName);
                    if (unitExists) {
                        return {
                            ...forona,
                            units: forona.units.map(u =>
                                u.name === unitName ? { ...u, executives: unitExecutives } : u
                            )
                        };
                    } else {
                        return {
                            ...forona,
                            units: [...forona.units, { name: unitName, executives: unitExecutives }]
                        };
                    }
                }
                return forona;
            });
        });
    };

    const updateUnitExecutives = async (foronaName, unitName, newExecutives) => {
        const forona = foronaList.find(f => f.name === foronaName);
        if (!forona) return;
        const unit = forona.units.find(u => u.name === unitName);
        if (!unit) return;

        await updateExecutivesDirectly('unit', unit.id, newExecutives);
    };

    const updateExecutivesDirectly = async (entityType, entityId, newExecutives) => {
        try {
            await axios.post(`${API_BASE}/api/data/executives`, {
                entityType,
                entityId,
                executives: newExecutives
            });
            // Update local state by refetching foronas
            const res = await axios.get(`${API_BASE}/api/data/foronas`);
            setForonaList(res.data);
            return true;
        } catch (err) {
            console.error(`Failed to update ${entityType} executives`, err);
            return false;
        }
    };

    const updateForonaExecutives = async (foronaName, newExecutives) => {
        const forona = foronaList.find(f => f.name === foronaName);
        if (!forona) return;

        try {
            await axios.post(`${API_BASE}/api/data/executives`, {
                entityType: 'forona',
                entityId: forona.id,
                executives: newExecutives
            });

            // Refetch
            const res = await axios.get(`${API_BASE}/api/data/foronas`);
            setForonaList(res.data);
        } catch (err) {
            console.error("Failed to update forona executives", err);
        }
    };

    // --- UNIT ACTIONS (Members & Registration) ---

    // FETCH MEMBERS
    const fetchMembers = async (unitId) => {
        try {
            const res = await axios.get(`${API_BASE}/api/unit/members/${unitId}`);
            return res.data;
        } catch (err) {
            console.error("Fetch members failed", err);
            return [];
        }
    };

    // ADD MEMBER
    const addMember = async (memberData) => {
        try {
            const res = await axios.post(`${API_BASE}/api/unit/members`, memberData);
            return res.data;
        } catch (err) {
            console.error("Add member failed", err);
            return null;
        }
    };

    // DELETE MEMBER
    const deleteMember = async (id) => {
        try {
            await axios.delete(`${API_BASE}/api/unit/members/${id}`);
            return true;
        } catch (err) {
            console.error("Delete member failed", err);
            return false;
        }
    };

    // Parish Activities
    const fetchUnitActivities = async (unitId) => {
        try {
            const res = await axios.get(`${API_BASE}/api/unit/activities/${unitId}`);
            return res.data;
        } catch (err) {
            console.error("Fetch activities failed", err);
            return [];
        }
    };

    const addUnitActivity = async (data) => {
        try {
            const res = await axios.post(`${API_BASE}/api/unit/activities`, data);
            return res.data;
        } catch (err) {
            console.error("Add activity failed", err);
            return null;
        }
    };

    const deleteUnitActivity = async (id) => {
        try {
            await axios.delete(`${API_BASE}/api/unit/activities/${id}`);
            return true;
        } catch (err) {
            console.error("Delete activity failed", err);
            return false;
        }
    };

    // FETCH EVENTS (From DB for registration)
    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/unit/events`);
            return res.data;
        } catch (err) {
            console.error("Fetch events failed", err);
            return [];
        }
    };

    // REGISTER FOR EVENT
    const registerForEvent = async (registrationData) => {
        try {
            await axios.post(`${API_BASE}/api/unit/register`, registrationData);
            return true;
        } catch (err) {
            console.error("Registration failed", err);
            return false;
        }
    };

    // FETCH EXISTING REGISTRATIONS
    const fetchRegistrations = async (unitId) => {
        try {
            const res = await axios.get(`${API_BASE}/api/unit/registrations/${unitId}`);
            return res.data;
        } catch (err) {
            console.error("Fetch registrations failed", err);
            return [];
        }
    };

    // --- ADMIN ACTIONS ---
    const fetchAllMembers = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/admin/members`);
            return res.data;
        } catch (err) {
            console.error("Fetch all members failed", err);
            return [];
        }
    };

    const fetchAllExecutives = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/admin/executives`);
            return res.data;
        } catch (err) {
            console.error("Fetch all executives failed", err);
            return [];
        }
    };

    const fetchAllRegistrations = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/admin/registrations`);
            return res.data;
        } catch (err) {
            console.error("Fetch all registrations failed", err);
            return [];
        }
    };

    const fetchAdminStats = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/admin/stats`);
            return res.data;
        } catch (err) {
            console.error("Fetch admin stats failed", err);
            return { units: 0, foronas: 0, members: 0, events: 0 };
        }
    };

    const addHeroSlide = async (slideData) => {
        try {
            await axios.post(`${API_BASE}/api/content/hero-slides`, slideData);
            const res = await axios.get(`${API_BASE}/api/content/hero-slides`);
            setHeroSlides(res.data);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const deleteHeroSlide = async (id) => {
        try {
            await axios.delete(`${API_BASE}/api/content/hero-slides/${id}`);
            setHeroSlides(prev => prev.filter(s => s.id !== id));
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const updateSetting = async (key, value) => {
        try {
            await axios.post(`${API_BASE}/api/content/settings`, { key, value });
            setSiteSettings(prev => ({ ...prev, [key]: value }));
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    return (
        <DataContext.Provider value={{
            foronaList,
            registerUnit,
            updateUnitExecutives,
            updateForonaExecutives,
            updateExecutivesDirectly,
            activities,
            news,
            addActivity,
            addNews,
            fetchMembers, // New
            addMember, // New
            deleteMember, // New
            fetchUnitActivities,
            addUnitActivity,
            deleteUnitActivity,
            fetchEvents, // New
            registerForEvent, // New

            fetchRegistrations, // New
            roopathaExecutives, // New
            addRoopathaExecutive, // New
            updateRoopathaExecutive, // New
            deleteRoopathaExecutive, // New
            updateNews, // New
            deleteNews, // New
            eventsList, // New
            addEvent, // New
            deleteEvent, // New
            karmaRekha, // New
            updateKarmaRekha, // New
            fetchAllMembers,
            fetchAllExecutives,
            fetchAllRegistrations,
            fetchAdminStats,
            heroSlides,
            siteSettings,
            addHeroSlide,
            deleteHeroSlide,
            updateSetting,
            loading
        }}>
            {children}
        </DataContext.Provider>
    );
};
