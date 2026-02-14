import React from 'react';

// Assets
import animator1 from '../../assets/sr anns.jpeg';
import animator2 from '../../assets/sr blessy.jpeg';
import animator3 from '../../assets/sr nirmal.jpeg';
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
        { name: "SR.ANNS S.H", role: "", image: animator1, special: true },
        { name: "MSGR. SEBASTIAN VETHANATH", role: "VG. Incharge", image: animator2 },
        { name: "FR. MANI KOZHUPPANKUTTY", role: "DIRECTOR", image: animator3 },
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
            <style>{customStyles}</style>

            <div style={styles.header}>
                <h2 style={styles.sectionTitle}>EPARCHIAL SYNDICATE MEMBERS</h2>
                <div style={styles.underline}></div>
            </div>

            <main className="tiered-grid">
                {members.map((m, i) => (
                    <div key={i} className={`member-card ${i < 3 ? 'top-tier' : 'sub-tier'}`}>
                        {/* The Badge is now sized to the Card Box, not the circular image */}
                        {i < 3 && <div className="box-badge">ANIMATOR</div>}

                        <div className="img-wrapper">
                            <img src={m.image} alt={m.name} className="profile-img" />
                        </div>
                        <div className="details">
                            <span className="role-tag" style={{ color: m.special ? '#fbbf24' : '#10b981' }}>
                                {m.role}
                            </span>
                            <h3 className="member-name">{m.name}</h3>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

const styles = {
    container: {
        padding: '60px 20px',
        backgroundColor: '#060a0f',
        backgroundImage: 'radial-gradient(circle at center, #0a1a12 0%, #05080a 100%)',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
    },
    header: { textAlign: 'center', marginBottom: '50px' },
    sectionTitle: { color: '#fff', fontSize: '1.9rem', fontWeight: '800', letterSpacing: '2px' },
    underline: { width: '50px', height: '3.5px', background: '#10b981', margin: '12px auto' },
};

const customStyles = `
    .tiered-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr); 
        gap: 25px;
        max-width: 1160px;
        margin: 0 auto;
    }

    .member-card {
        position: relative;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: all 0.3s ease;
        overflow: hidden; /* Clips the badge to the box width */
        border: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Badge sized to the Box (Card) */
    .box-badge {
        width: 100%;
        background: #fbbf24;
        color: #000;
        font-size: 0.65rem;
        font-weight: 900;
        padding: 6px 0;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 20px; /* Space between badge and image */
    }

    .top-tier {
        grid-column: span 4;
        background: rgba(16, 185, 129, 0.07);
        padding-bottom: 25px; 
        /* Notice: top padding is 0 to let badge hit the top edge */
    }

    .sub-tier {
        grid-column: span 3;
        background: rgba(255, 255, 255, 0.02);
        padding: 20px 14px;
        margin-top: 30px; /* Keeps images aligned since sub-tier has no badge */
    }

    .img-wrapper {
        width: 95px;
        height: 95px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 12px;
        border: 2px solid rgba(255, 255, 255, 0.1);
    }

    .top-tier .img-wrapper {
        width: 110px;
        height: 110px;
        border-color: rgba(16, 185, 129, 0.4);
    }

    .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .role-tag {
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        display: block;
        margin-bottom: 6px;
    }

    .member-name {
        font-size: 0.95rem;
        color: #fff;
        margin: 0;
        line-height: 1.25;
        font-weight: 700;
    }

    .member-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.08);
    }

    @media (max-width: 950px) {
        .tiered-grid { gap: 15px; }
        .top-tier, .sub-tier { grid-column: span 6; margin-top: 0; }
    }
    @media (max-width: 500px) {
        .top-tier, .sub-tier { grid-column: span 12; padding: 20px; }
        .box-badge { margin-bottom: 15px; }
    }
`;

export default Roopatha;