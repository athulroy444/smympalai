import React from 'react';
import { useData } from '../../context/DataContext';
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
    const { siteSettings } = useData();
    const members = [
        { name: "MAR. JOSEPH KALLARANGAT", role: "PATRON", image: patronImg, pos: 'center 10%', zoom: 1.2, special: true },
        { name: "MSGR. SEBASTIAN VETHANATH", role: "VG. Incharge", image: msgrImg, pos: 'center 9%', zoom: 1.0 },
        { name: "FR. MANI KOZHUPPANKUTTY", role: "DIRECTOR", image: dirImg, pos: 'center 28%', zoom: 1.0 },
        { name: "SR. NAVEENA CMC", role: "JOINT DIRECTOR", image: jointdirImg, pos: 'center 13%', zoom: 1.2 },
        { name: "MIJO JOY", role: "PRESIDENT", image: presidentImg, pos: 'center 53%', zoom: 1.2 },
        { name: "SONA A. MATHEW", role: "GEN. SECRETARY", image: gensecretaryImg, pos: 'center 68%', zoom: 1.2 },
        { name: "RACHEL MARY CHARLES", role: "VICE PRESIDENT", image: vicepresidentImg1, zoom: 1.2 },
        { name: "ABIN THOMAS", role: "VICE PRESIDENT", image: vicepresidentImg2, zoom: 1.2 },
        { name: "ADON TOMMY", role: "SECRETARY", image: secretaryImg, zoom: 1.2 },
        { name: "RIYA SABU", role: "JOINT SECRETARY", image: jointsecretaryImg, pos: 'center 48%', zoom: 1.6 },
        { name: "JOSE CHARLES", role: "TREASURER", image: treasurerImg, zoom: 1.2 },
        { name: "ROBIN T. JOSE", role: "KCYM STATE SYNDICATE", image: kcymsyndicateImg1, zoom: 1.2 },
        { name: "SENJU JACOB", role: "KCYM STATE SYNDICATE", image: kcymsyndicateImg2, pos: 'center 28%', zoom: 1.2 },
        { name: "ADV. SAM SUNNY", role: "SMYM GLOBAL PRESIDENT", image: globalpresidentImg, pos: 'center 98%', zoom: 1.2 },
        { name: "ADV. PRATEEKSHA RAJ", role: "SMYM STATE VICEPRESIDENT", image: statevicepresidentImg, zoom: 1.2 },
        { name: "NIKHIL FRANCIS", role: "SMYM STATE TREASURER", image: statetreasurerImg, zoom: 1.2 },
    ];

    return (
        <div style={styles.container}>
            <style>{hoverEffects}</style>

            <header style={styles.header}>
                <div style={styles.topBar}></div>
                <h1 style={styles.mainTitle}>SMYM-KCYM EPARCHY OF PALAI</h1>
                <div style={styles.subTitleBox}>
                    <span style={styles.subTitle}>
                        {siteSettings.welcome_text || "EPARCHIAL EXECUTIVE 2026 - 2028"}
                    </span>
                </div>
            </header>

            <main className="members-grid" style={styles.grid}>
                {members.map((m, i) => (
                    <div key={i} className={`glass-card ${m.special ? 'special-card' : ''}`} style={styles.card}>
                        <div style={styles.imageContainer}>
                            <img
                                src={m.image}
                                alt={m.name}
                                style={{
                                    ...styles.img,
                                    transform: `scale(${m.zoom || 1.2})`,
                                    // Default to top-center to ensure faces are visible
                                    objectPosition: m.pos || 'center 15%'
                                }}
                            />
                            <div style={styles.imageOverlay}></div>
                        </div>

                        <div style={styles.infoBox}>
                            <span style={{
                                ...styles.roleTag,
                                color: m.special ? '#fbbf24' : '#ef4444'
                            }}>
                                {m.role}
                            </span>
                            <h3 style={styles.nameText}>{m.name}</h3>
                        </div>

                        <div className="glass-line" style={styles.glassLine}></div>
                    </div>
                ))}
            </main>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#f8f9fa',
        color: '#1e293b',
        minHeight: '100vh',
        padding: '60px 15px',
        fontFamily: "'Inter', sans-serif",
    },
    header: { textAlign: 'center', marginBottom: '50px' },
    topBar: { width: '40px', height: '3px', backgroundColor: '#E14B1F', margin: '0 auto 15px' },
    mainTitle: { fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.02em' },
    subTitleBox: {
        marginTop: '10px',
        padding: '6px 16px',
        background: 'rgba(225, 75, 31, 0.05)',
        borderRadius: '50px',
        display: 'inline-block',
        border: '1px solid rgba(225, 75, 31, 0.15)'
    },
    subTitle: { fontSize: '0.8rem', color: '#E14B1F', fontWeight: '700', letterSpacing: '1px' },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '20px',
        maxWidth: '1350px',
        margin: '0 auto',
    },
    card: {
        position: 'relative',
        background: '#ffffff',
        border: '1px solid #edf2f7',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        borderRadius: '16px',
        padding: '12px',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        cursor: 'pointer',
        overflow: 'hidden',
    },
    imageContainer: {
        height: '210px',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '12px',
        backgroundColor: '#f1f5f9',
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
    },
    imageOverlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.5) 100%)',
    },
    infoBox: {
        padding: '0 4px 6px',
    },
    roleTag: {
        fontSize: '0.65rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: '4px',
    },
    nameText: {
        fontSize: '0.85rem',
        fontWeight: '700',
        color: '#1e293b',
        lineHeight: '1.3',
    },
    glassLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '4px',
        background: '#E14B1F',
        transition: 'width 0.4s ease',
    }
};

const hoverEffects = `
  @media (min-width: 1200px) {
    .members-grid {
      grid-template-columns: repeat(5, 1fr) !important;
    }
  }

  @media (max-width: 767px) {
    .members-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
      gap: 15px !important;
    }
    .glass-card { padding: 10px !important; }
    #root h1 { font-size: 1.8rem !important; }
  }

  .glass-card:hover {
    transform: translateY(-8px);
    border: 1px solid #E14B1F !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .glass-card:hover img {
    transform: scale(1.1);
  }

  .glass-card:hover .glass-line {
    width: 100%;
  }

  .special-card {
    border: 1px solid rgba(225, 75, 31, 0.2) !important;
    background: #fffafa !important;
  }
`;

export default SecretariatHome;