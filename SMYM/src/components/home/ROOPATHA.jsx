import React from 'react';
import patronImg from '../../assets/mar joseph.jpeg';
import msgrImg from '../../assets/vethanath.jpeg';
import dirImg from '../../assets/fr mani.jpeg';
import jointdirImg from '../../assets/sr.navvena.jpeg';
import presidentImg from '../../assets/mijo.jpeg';
import gensecretaryImg from '../../assets/sona.jpeg';
import vicepresidentImg1 from '../../assets/richal.jpeg';
import vicepresidentImg2 from '../../assets/abin.jpeg';
import secretaryImg from '../../assets/adon.jpeg';
import jointsecretaryImg from '../../assets/riya.jpeg';
import treasurerImg from '../../assets/jose.jpeg';
import kcymsyndicateImg1 from '../../assets/robin.jpeg';
import kcymsyndicateImg2 from '../../assets/senju.jpeg';
import globalpresidentImg from '../../assets/adv.sam.jpeg';
import statevicepresidentImg from '../../assets/adv.prathheksha.jpeg';
import statetreasurerImg from '../../assets/nikhil.jpeg';


const SecretariatHome = () => {
    const members = [
        { name: "MAR. JOSEPH KALLARANGAT", role: "PATRON", image: patronImg },
        { name: "MSGR. SEBASTIAN VETHANATH", role: "VG. Incharge", image: msgrImg },
        { name: "FR. MANI KOZHUPPANKUTTY", role: "DIRECTOR", image: dirImg },
        { name: "SR. NAVEENA CMC", role: "JOINT DIRECTOR", image: jointdirImg },
        { name: "MIJO JOY", role: "PRESIDENT", image: presidentImg },
        { name: "SONA A. MATHEW", role: "GEN. SECRETARY", image: gensecretaryImg },
        { name: "RACHEL MARY CHARLES", role: "VICE PRESIDENT", image: vicepresidentImg1 },
        { name: "ABIN THOMAS", role: "VICE PRESIDENT", image: vicepresidentImg2 },
        { name: "ADON TOMMY", role: "SECRETARY", image: secretaryImg },
        { name: "RIYA SABU", role: "JOINT SECRETARY", image: jointsecretaryImg },
        { name: "JOSE CHARLES", role: "TREASURER", image: treasurerImg },
        { name: "ROBIN T. JOSE", role: "KCYM STATE SYNDICATE", image: kcymsyndicateImg1 },
        { name: "SENJU JACOB", role: "KCYM STATE SYNDICATE", image: kcymsyndicateImg2 },
        { name: "ADV. SAM SUNNY", role: "SMYM GLOBAL PRESIDENT", image: globalpresidentImg },
        { name: "ADV. PRATEEKSHA RAJ", role: "SMYM STATE VICEPRESIDENT", image: statevicepresidentImg },
        { name: "NIKHIL FRANCIS", role: "SMYM STATE TREASURER", image: statetreasurerImg },
    ];

    return (
        <div style={styles.container}>
            <style>{hoverEffects}</style>

            {/* Header Section */}
            <header style={styles.header}>
                <div style={styles.topBar}></div>
                <h1 style={styles.mainTitle}>SMYM-KCYM EPARCHY OF PALAI</h1>
                <div style={styles.subTitleBox}>
                    <span style={styles.subTitle}>EPARCHIAL EXECUTIVE 2026 - 2028</span>
                </div>
            </header>

            {/* Modern Profile Grid */}
            <main style={styles.grid}>
                {members.map((m, i) => (
                    <div key={i} className="member-card" style={styles.card}>
                        <div style={styles.imageContainer}>
                            <div style={styles.imageBackground}></div>
                            <img
                                src={m.image || `https://ui-avatars.com/api/?name=${m.name}&background=1a3a3a&color=fff&size=256`}
                                alt={m.name}
                                style={styles.img}
                            />
                            <div style={styles.accentBorder}></div>
                        </div>

                        <div style={styles.infoBox}>
                            <span style={styles.roleTag}>{m.role}</span>
                            <h3 style={styles.nameText}>{m.name}</h3>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

// --- Professional CSS-in-JS ---
const styles = {
    container: {
        backgroundColor: '#0c053bff', // Deep Navy Midnight
        color: '#f8fafc',
        minHeight: '100vh',
        padding: '60px 20px',
        fontFamily: "'Inter', system-ui, sans-serif",
        backgroundImage: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '80px',
    },
    topBar: {
        width: '60px',
        height: '4px',
        backgroundColor: '#fbbf24',
        margin: '0 auto 20px',
        borderRadius: '2px',
    },
    mainTitle: {
        fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
        fontWeight: '900',
        letterSpacing: '-0.02em',
        margin: '0',
        color: '#ffffff',
    },
    subTitleBox: {
        marginTop: '15px',
        display: 'inline-block',
        padding: '8px 20px',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        borderRadius: '50px',
        backgroundColor: 'rgba(218, 239, 36, 0.05)',
    },
    subTitle: {
        fontSize: '1.1rem',
        color: '#fbbf24',
        fontWeight: '600',
        letterSpacing: '0.1em',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '40px 25px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    card: {
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
    },
    imageContainer: {
        position: 'relative',
        height: '240px',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '15px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
    },
    imageBackground: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
        zIndex: 1,
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    accentBorder: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: '#fbbf24',
        zIndex: 2,
    },
    infoBox: {
        textAlign: 'left',
        paddingLeft: '5px',
    },
    roleTag: {
        color: '#ef4444', // Red accent
        fontSize: '0.75rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        display: 'block',
        marginBottom: '4px',
    },
    nameText: {
        fontSize: '1rem',
        fontWeight: '700',
        margin: 0,
        color: '#f1f5f9',
        lineHeight: '1.4',
    },
    footer: {
        marginTop: '100px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '60px',
    },
    malayalamSecondary: {
        fontSize: '1.1rem',
        opacity: 0.7,
        maxWidth: '600px',
        margin: '0 auto 20px',
        lineHeight: '1.6',
    },
    malayalamPrimary: {
        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
        fontWeight: '900',
        margin: 0,
        background: 'linear-gradient(to bottom, #ffffff, #94a3b8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    }
};

const hoverEffects = `
  .member-card:hover {
    transform: translateY(-10px);
  }
  .member-card:hover img {
    transform: scale(1.05);
    transition: transform 0.4s ease;
  }
`;

export default SecretariatHome;