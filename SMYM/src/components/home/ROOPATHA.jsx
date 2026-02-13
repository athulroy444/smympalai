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
        { name: "MAR. JOSEPH KALLARANGAT", role: "PATRON", image: patronImg, pos: 'center 13%', special: true },
        { name: "MSGR. SEBASTIAN VETHANATH", role: "VG. Incharge", image: msgrImg, pos: 'center 13%' },
        { name: "FR. MANI KOZHUPPANKUTTY", role: "DIRECTOR", image: dirImg, pos: 'center 13%' },
        { name: "SR. NAVEENA CMC", role: "JOINT DIRECTOR", image: jointdirImg, pos: 'center 13%' },
        { name: "MIJO JOY", role: "PRESIDENT", image: presidentImg, pos: 'center 53%' },
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

            <header style={styles.header}>
                <div style={styles.topBar}></div>
                <h1 style={styles.mainTitle}>SMYM-KCYM EPARCHY OF PALAI</h1>
                <div style={styles.subTitleBox}>
                    <span style={styles.subTitle}>EPARCHIAL EXECUTIVE 2026 - 2028</span>
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
        backgroundColor: '#050a18',
        color: '#f8fafc',
        minHeight: '100vh',
        padding: '60px 15px',
        fontFamily: "'Inter', sans-serif",
        backgroundImage: 'radial-gradient(circle at 50% 0%, #1a2a4a 0%, #050a18 100%)',
    },
    header: { textAlign: 'center', marginBottom: '50px' },
    topBar: { width: '40px', height: '3px', backgroundColor: '#fbbf24', margin: '0 auto 15px' },
    mainTitle: { fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em' },
    subTitleBox: {
        marginTop: '10px',
        padding: '6px 16px',
        background: 'rgba(251, 191, 36, 0.1)',
        borderRadius: '50px',
        display: 'inline-block',
        border: '1px solid rgba(251, 191, 36, 0.2)'
    },
    subTitle: { fontSize: '0.8rem', color: '#fbbf24', fontWeight: '700', letterSpacing: '1px' },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '20px',
        maxWidth: '1350px',
        margin: '0 auto',
    },
    card: {
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '14px',
        padding: '10px',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        cursor: 'pointer',
        overflow: 'hidden',
    },
    imageContainer: {
        // Height increased to 210px for a more professional portrait aspect ratio
        height: '210px',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '12px',
        backgroundColor: '#0f172a',
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
        background: 'linear-gradient(to bottom, transparent 65%, rgba(0,0,0,0.6) 100%)',
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
        color: '#fff',
        lineHeight: '1.3',
    },
    glassLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '0%',
        height: '3px',
        background: '#fbbf24',
        transition: 'width 0.4s ease',
    }
};

const hoverEffects = `
  @media (min-width: 1200px) {
    .members-grid {
      grid-template-columns: repeat(5, 1fr) !important;
    }
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    .members-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }

  .glass-card:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-8px);
    border: 1px solid rgba(251, 191, 36, 0.4);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  .glass-card:hover img {
    transform: scale(1.1);
  }

  .glass-card:hover .glass-line {
    width: 100%;
  }

  .special-card {
    border: 1px solid rgba(251, 191, 36, 0.3);
    background: rgba(251, 191, 36, 0.05);
  }
`;

export default SecretariatHome;