import React from 'react';

// Assets
import animator1 from '../../assets/sr anns.jpeg';
import animator2 from '../../assets/sr blessy.jpeg';
import animator3 from '../../assets/sr nirmal.jpeg';
import syndicate1 from '../../assets/sam.jpg.jpeg';
import syndicate2 from '../../assets/Sijo Jose .jpg.jpeg';
import syndicate3 from '../../assets/Ann.jpg.jpeg';
import syndicate4 from '../../assets/Jesslet Mathew.jpg.jpeg';
import syndicate5 from '../../assets/ALPHONSA JOSEPH.jpg.jpeg';
import syndicate6 from '../../assets/Manju Thomas.jpg.jpeg';
import syndicate7 from '../../assets/Albert.jpg';
import syndicate8 from '../../assets/Melbin.jpg.jpeg';
import syndicate9 from '../../assets/Jose.jpg.webp';
import syndicate10 from '../../assets/Jeeva Michael Jose.jpg.jpeg';
import syndicate11 from '../../assets/Manu George .jpg.jpeg';
import syndicate12 from '../../assets/Zacharias.jpg.jpeg';
import syndicate13 from '../../assets/Ivanjpg.jpeg';
import syndicate14 from '../../assets/Alan George.jpg.jpeg';
import syndicate15 from '../../assets/AleenaRobins.jpg.jpeg';



const Roopatha = () => {
    const members = [
        { name: "SR.ANNS S.H", role: "ANIMATOR", image: animator1, zoom: 1.6, pos: 'center 10%' },
        { name: "SR NIRMAL THERES S.M.C", role: "ANIMATOR", image: animator3, zoom: 1.8, pos: 'center 20%' },
        { name: "SR BLESSY D.S.T", role: "ANIMATOR", image: animator2, zoom: 1.4, pos: 'center 15%' },

        { name: "SAM SUNNY", role: "Bharananganam", image: syndicate1, zoom: 1.2, pos: 'center 20%' },
        { name: "SIJO JOSE", role: "Cherpunkal", image: syndicate2, zoom: 1.5, pos: 'center 15%' },
        { name: "ANN MARIYA BABY", role: "Elanji", image: syndicate3, zoom: 1.2, pos: 'center 20%' },
        { name: "JESSLET MATHEW", role: "Kadaplamattom", image: syndicate4, zoom: 1.2, pos: 'center 20%' },
        { name: "ALPHOSA JOSEPH", role: "Koottickal", image: syndicate5, zoom: 1.8, pos: 'center 55%' },
        { name: "MANJU THOMAS", role: "Kozhuvanal", image: syndicate6, zoom: 1.2, pos: 'center 20%' },
        { name: "ALBERT SCARIA", role: "Kuravilangad", image: syndicate7, zoom: 1.2, pos: 'center 20%' },
        { name: "MELBIN MATHEW", role: "Moolamattom", image: syndicate8, zoom: 1.9, pos: 'center -35%' },
        { name: "JOSE ANTONY", role: "Muttuchira", image: syndicate9, zoom: 1.2, pos: 'center 20%' },
        { name: "JEEVA MICHAEL JOSE", role: "Pala", image: syndicate10, zoom: 1.9, pos: 'center 10%' },
        { name: "MANU GEORGE", role: "Poonjar", image: syndicate11, zoom: 1.2, pos: 'center 20%' },
        { name: "ZACHARIAS JAMES", role: "Pravithanam", image: syndicate12, zoom: 1.2, pos: 'center 20%' },
        { name: "IVAN MATHEW", role: "Ramapuram", image: syndicate13, zoom: 1.1, pos: 'center 15%' },
        { name: "ALAN GEORGE", role: "Teekoy", image: syndicate14, zoom: 1.9, pos: 'center 55%' },
        { name: "ALEENA ROBIN", role: "Thudanganadu", image: syndicate15, zoom: 1.5, pos: 'center 55%' },
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
                        {/* The Badge is only for the first 3 members (Animators) */}
                        {i < 3 && <div className="box-badge">ANIMATOR</div>}

                        <div className="img-wrapper">
                            <img
                                src={m.image}
                                alt={m.name}
                                className="profile-img"
                                style={{
                                    transform: `scale(${m.zoom || 1.2})`,
                                    objectPosition: m.pos || 'center 20%'
                                }}
                            />
                        </div>
                        <div className="details">
                            {/* Hide role tag for Animators as it is shown in the badge */}
                            {i >= 3 && (
                                <span className="role-tag" style={{ color: '#10b981' }}>
                                    {m.role}
                                </span>
                            )}
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
        padding: '80px 20px',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        fontFamily: "'Inter', sans-serif",
    },
    header: { textAlign: 'center', marginBottom: '60px' },
    sectionTitle: { color: '#1e293b', fontSize: '2.2rem', fontWeight: '900', letterSpacing: '1px' },
    underline: { width: '60px', height: '4px', background: '#E14B1F', margin: '15px auto' },
};

const customStyles = `
    .tiered-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr); 
        gap: 30px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .member-card {
        position: relative;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        overflow: hidden;
        border: 1px solid #f0f0f0;
        background: #ffffff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .box-badge {
        width: 100%;
        background: #E14B1F;
        color: #fff;
        font-size: 0.7rem;
        font-weight: 800;
        padding: 8px 0;
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 20px;
    }

    .top-tier {
        grid-column: span 4;
        background: #fffcfb;
        border: 1px solid #ffe8e0;
        padding-bottom: 25px; 
    }

    .sub-tier {
        grid-column: span 3;
        padding: 24px 16px;
        margin-top: 30px;
    }

    .img-wrapper {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 15px;
        border: 3px solid #f8f9fa;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .top-tier .img-wrapper {
        width: 120px;
        height: 120px;
        border-color: #ffe8e0;
    }

    .profile-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .role-tag {
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 1px;
        text-transform: uppercase;
        display: block;
        margin-bottom: 8px;
        color: #E14B1F !important;
    }

    .member-name {
        font-size: 1rem;
        color: #1e293b;
        margin: 0;
        line-height: 1.3;
        font-weight: 800;
    }

    .member-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        border-color: #E14B1F;
    }

    @media (max-width: 1100px) {
        .top-tier { grid-column: span 4; }
        .sub-tier { grid-column: span 4; }
    }

    @media (max-width: 950px) {
        .tiered-grid { gap: 20px; }
        .top-tier, .sub-tier { grid-column: span 6; margin-top: 0; }
    }
    @media (max-width: 500px) {
        .top-tier, .sub-tier { grid-column: span 12; padding: 25px; }
        .box-badge { margin-bottom: 15px; }
    }
`;

export default Roopatha;