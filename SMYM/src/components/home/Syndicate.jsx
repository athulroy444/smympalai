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

const Roopatha = () => {
    const members = [
        { name: "MAR. JOSEPH KALLARANGAT", role: "PATRON", image: patronImg, special: true },
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
    ];

    return (
        <div style={styles.container}>
            <style>{hoverEffects}</style>

            <div style={styles.header}>
                <h2 style={styles.sectionTitle}>EPARCHIAL SYNDICATE MEMBERS</h2>
                <div style={styles.underline}></div>
            </div>

            <main style={styles.grid}>
                {members.map((m, i) => (
                    <div key={i} className="glass-card" style={{
                        ...styles.patronCard,
                        border: m.special ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <div style={styles.imageWrapper}>
                            <img
                                src={m.image}
                                alt={m.name}
                                style={styles.patronImg}
                            />
                        </div>

                        <div style={styles.content}>
                            <span style={{
                                ...styles.roleLabel,
                                color: m.special ? '#fbbf24' : '#ef4444'
                            }}>
                                {m.role}
                            </span>
                            <h3 style={styles.patronName}>{m.name}</h3>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px 20px',
        fontFamily: "'Inter', sans-serif",
        backgroundImage: 'radial-gradient(circle at 50% 0%, #1a2a4a 0%, #050a18 100%)',
        minHeight: '400px'
    },
    header: { textAlign: 'center', marginBottom: '30px' },
    sectionTitle: { color: '#fff', fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' },
    underline: { width: '50px', height: '3px', background: '#fbbf24', margin: '0 auto' },

    grid: {
        display: 'grid',
        // This ensures the cards are small and wrap nicely
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '15px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    patronCard: {
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '12px 15px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '15px',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    },
    imageWrapper: {
        width: '65px', // Very compact image size
        height: '65px',
        borderRadius: '50%', // Circular for a clean "executive" look
        overflow: 'hidden',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        flexShrink: 0
    },
    patronImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'top'
    },
    content: {
        flex: 1,
        overflow: 'hidden'
    },
    roleLabel: {
        fontSize: '0.6rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        display: 'block'
    },
    patronName: {
        fontSize: '0.9rem',
        color: '#ffffff',
        margin: '2px 0',
        fontWeight: '700',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
};

const hoverEffects = `
  .glass-card:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
  .glass-card:hover img {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

export default Roopatha;