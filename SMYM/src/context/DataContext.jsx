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

    // --- LEGACY/MOCKED DATA (Preserved for existing features) ---
    const [foronaList, setForonaList] = useState([
        { name: "Aruvithura", executives: [], units: [] },
        { name: "Bharananganam", executives: [], units: [] },
        { name: "Cherpunkal", executives: [], units: [] },
        { name: "Kozhuvanal", executives: [], units: [] },
        { name: "Kadaplamattom", executives: [], units: [] },
        { name: "Kothanalloor", executives: [], units: [] },
        { name: "Koothattukulam", executives: [], units: [] },
        { name: "Kuravilangad", executives: [], units: [] },
        { name: "Pravithanam", executives: [], units: [] },
        {
            name: "Pala",
            executives: [
                { name: "Fr. Thomas", post: "Director" },
                { name: "Albin Soby", post: "President" }
            ],
            units: [
                { name: "Cathedral", executives: [{ name: "John Doe", post: "President" }, { name: "Jane Smith", post: "Secretary" }] },
                { name: "Lalam", executives: [{ name: "Peter Parker", post: "President" }] },
                { name: "Kadanad", executives: [] },
                { name: "Pravithanam", executives: [] }
            ]
        },
        { name: "Poonjar", executives: [], units: [] },
        { name: "Moolamattom", executives: [], units: [] },
        { name: "Thudanganad", executives: [], units: [] },
        { name: "Teekoy", executives: [], units: [] },
        { name: "Muttuchira", executives: [], units: [] },
        { name: "Kadanad", executives: [], units: [] },
        { name: "Ramapuram", executives: [], units: [] },
        { name: "Kootickal", executives: [], units: [] },
        { name: "Elanji", executives: [], units: [] },
        { name: "Kaduthuruthy", executives: [], units: [] }
    ]);

    // Use 127.0.0.1 to avoid Windows IPv6 localhost issues
    const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

    // --- FETCH FROM BACKEND ---
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const actRes = await axios.get(`${API_BASE}/api/content/activities`);
                if (Array.isArray(actRes.data)) {
                    setActivities(actRes.data);
                }

                const newsRes = await axios.get(`${API_BASE}/api/content/news`);
                if (Array.isArray(newsRes.data)) {
                    setNews(newsRes.data);
                }

                const evRes = await axios.get(`${API_BASE}/api/content/events`);
                if (Array.isArray(evRes.data)) {
                    setEventsList(evRes.data);
                }

                const execRes = await axios.get(`${API_BASE}/api/content/executives`);
                if (Array.isArray(execRes.data)) {
                    setRoopathaExecutives(execRes.data);
                }

                console.log("Content successfully fetched from DB.");
            } catch (err) {
                console.error("Error fetching content from DB:", err);
            }
        };

        fetchContent();
    }, []);

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

    const updateUnitExecutives = (foronaName, unitName, newExecutives) => {
        setForonaList(prevList => {
            return prevList.map(forona => {
                if (forona.name === foronaName) {
                    return {
                        ...forona,
                        units: forona.units.map(u =>
                            u.name === unitName ? { ...u, executives: newExecutives } : u
                        )
                    };
                }
                return forona;
            });
        });
    };

    const updateForonaExecutives = (foronaName, newExecutives) => {
        setForonaList(prevList => {
            return prevList.map(forona => {
                if (forona.name === foronaName) {
                    return { ...forona, executives: newExecutives };
                }
                return forona;
            });
        });
    };

    // --- UNIT ACTIONS (Members & Registration) ---

    // FETCH MEMBERS
    const fetchMembers = async (unitId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/unit/members/${unitId}`);
            return res.data;
        } catch (err) {
            console.error("Fetch members failed", err);
            return [];
        }
    };

    // ADD MEMBER
    const addMember = async (memberData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/unit/members', memberData);
            return res.data;
        } catch (err) {
            console.error("Add member failed", err);
            return null;
        }
    };

    // DELETE MEMBER
    const deleteMember = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/unit/members/${id}`);
            return true;
        } catch (err) {
            console.error("Delete member failed", err);
            return false;
        }
    };

    // FETCH EVENTS (From DB for registration)
    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/unit/events');
            return res.data;
        } catch (err) {
            console.error("Fetch events failed", err);
            return [];
        }
    };

    // REGISTER FOR EVENT
    const registerForEvent = async (registrationData) => {
        try {
            await axios.post('http://localhost:5000/api/unit/register', registrationData);
            return true;
        } catch (err) {
            console.error("Registration failed", err);
            return false;
        }
    };

    // FETCH EXISTING REGISTRATIONS
    const fetchRegistrations = async (unitId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/unit/registrations/${unitId}`);
            return res.data;
        } catch (err) {
            console.error("Fetch registrations failed", err);
            return [];
        }
    };

    return (
        <DataContext.Provider value={{
            foronaList,
            registerUnit,
            updateUnitExecutives,
            updateForonaExecutives,
            activities,
            news,
            addActivity,
            addNews,
            fetchMembers, // New
            addMember, // New
            deleteMember, // New
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
            updateKarmaRekha // New
        }}>
            {children}
        </DataContext.Provider>
    );
};
