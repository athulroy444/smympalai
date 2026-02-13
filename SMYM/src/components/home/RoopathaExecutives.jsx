import React from 'react';

// --- STYLES (Injected directly for single-file use) ---
const styles = `
  .poster-container {
    background: linear-gradient(135deg, #1d4342 0%, #163534 100%);
    min-height: 100vh;
    padding: 40px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    text-align: center;
  }

  .header-section h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
    font-weight: 800;
    margin: 0;
    letter-spacing: -1px;
  }

  .header-section h2 {
    font-size: clamp(1.2rem, 4vw, 2.5rem);
    font-weight: 700;
    margin-top: 5px;
  }

  .officials-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px 15px;
    max-width: 1200px;
    margin: 50px auto;
  }

  /* Responsive Grid for Mobile */
  @media (max-width: 900px) { .officials-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 600px) { .officials-grid { grid-template-columns: repeat(2, 1fr); } }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .img-wrapper {
    position: relative;
    width: 140px;
    height: 170px;
    z-index: 1;
  }

  .profile-pic {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #e0e0e0;
    position: relative;
    z-index: 2;
    border-radius: 2px;
  }

  .slant-bg {
    position: absolute;
    top: 5px;
    left: 8px;
    width: 100%;
    height: 100%;
    background: #fccb05; /* Yellow */
    clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%);
    z-index: 0;
  }

  .label-stack {
    width: 160px;
    margin-top: -15px;
    z-index: 3;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }

  .role-label {
    background: #d32f2f;
    color: white;
    font-size: 0.65rem;
    font-weight: bold;
    padding: 3px 2px;
    text-transform: uppercase;
  }

  .name-label {
    background: #fccb05;
    color: #1a3a3a;
    font-size: 0.8rem;
    font-weight: 900;
    padding: 5px 2px;
    min-height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .malayalam-text {
    margin-top: 60px;
  }

  .malayalam-main { font-size: 1.2rem; margin-bottom: 10px; opacity: 0.9; }
  .malayalam-big { font-size: 4rem; font-weight: 900; margin: 0; }
`;

// --- DATA ---
const members = [
    { role: "PATRON", name: "MAR. JOSEPH KALLARANGAT" },
    { role: "VG. Incharge", name: "MSGR. SEBASTIAN VETHANATH" },
    { role: "DIRECTOR", name: "FR. MANI KOZHUPPANKUTTY" },
    { role: "JOINT DIRECTOR", name: "SR. NAVEENA CMC" },
    { role: "PRESIDENT", name: "MIJO JOY" },
    { role: "GEN. SECRETARY", name: "SONA A. MATHEW" },
    { role: "VICE PRESIDENT", name: "RACHEL MARY CHARLES" },
    { role: "VICE PRESIDENT", name: "ABIN THOMAS" },
    { role: "SECRETARY", name: "ADON TOMMY" },
    { role: "JOINT SECRETARY", name: "RIYA SABU" },
    { role: "TREASURER", name: "JOSE CHARLES" },
    { role: "KCYM STATE SYNDICATE", name: "ROBIN T. JOSE" },
    { role: "KCYM STATE SYNDICATE", name: "SENJU JACOB" },
    { role: "SMYM GLOBAL PRESIDENT", name: "ADV. SAM SUNNY" },
    { role: "SMYM STATE VICEPRESIDENT", name: "ADV. PRATEEKSHA RAJ" },
    { role: "SMYM STATE TREASURER", name: "NIKHIL FRANCIS" },
];

const SecretariatHome = () => {
    return (
        <div className="poster-container">
            <style>{styles}</style>

            <header className="header-section">
                <h1>SMYM-KCYM EPARCHY OF PALAI</h1>
                <h2>EPARCHIAL SECRETARIAT 2026-28</h2>
            </header>

            <div className="officials-grid">
                {members.map((m, i) => (
                    <div className="card" key={i}>
                        <div className="img-wrapper">
                            {/* Replace src with actual image paths like /images/mijo.jpg */}
                            <img
                                src={`https://ui-avatars.com/api/?name=${m.name}&background=random&size=200`}
                                className="profile-pic"
                                alt={m.name}
                            />
                            <div className="slant-bg"></div>
                        </div>
                        <div className="label-stack">
                            <div className="role-label">{m.role}</div>
                            <div className="name-label">{m.name}</div>
                        </div>
                    </div>
                ))}
            </div>

            <footer className="malayalam-text">
                <p className="malayalam-main">പാലാ രൂപത യുവജനപ്രസ്ഥാനത്തെ നയിക്കാൻ നിയുക്തരായിരിക്കുന്ന പുതിയ ഭാരവാഹികൾക്ക്</p>
                <h2 className="malayalam-big">അഭിവാദ്യങ്ങൾ</h2>
            </footer>
        </div>
    );
};

export default SecretariatHome;