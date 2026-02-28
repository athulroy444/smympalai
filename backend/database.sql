CREATE DATABASE IF NOT EXISTS smym_palai;
USE smym_palai;

-- 1. Foronas Table
CREATE TABLE IF NOT EXISTS foronas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Units Table
CREATE TABLE IF NOT EXISTS units (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    forona_id INT,
    FOREIGN KEY (forona_id) REFERENCES foronas(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, forona_id) 
);

-- 3. Users Table (Authentication)
-- Stores login credentials for Units, Foronas, and Admin
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE, -- Unit Name or Forona Name or 'admin'
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'forona', 'unit') NOT NULL,
    entity_id INT, -- Links to units.id or foronas.id based on role. Null for admin.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Executives Table
-- Stores executives for both Units and Foronas
CREATE TABLE IF NOT EXISTS executives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    post VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    image_url VARCHAR(255),
    entity_type ENUM('forona', 'unit') NOT NULL,
    entity_id INT NOT NULL, -- ID from 'foronas' or 'units' table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Activities Table (For the Activities Page)
CREATE TABLE IF NOT EXISTS activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50) DEFAULT 'People', -- Storing icon name (e.g., 'People', 'Heart')
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. News/Events Table (For the News Section)
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    event_date DATE,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Members Table
CREATE TABLE IF NOT EXISTS members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    dob DATE,
    house_name VARCHAR(150),
    phone VARCHAR(20),
    unit_id INT, -- Belongs to a specific Unit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Event Registrations (Which members registered for which event)
-- events table is currently 'news' but ideally we should have a separate events table or just use news as events (since they have dates)
-- For this, I will assume we register for 'news' items (as they have dates) OR create a separate 'events_list' table.
-- To keep it simple based on user request "Upcoming Events", let's create a dedicated 'events' table or just use 'news' if user considers them same.
-- The mocked frontend used: { id: 1, title: 'Youth Camp 2024'... }
-- Let's create a dedicated 'events' table to match the frontend mock.

CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    event_date DATE,
    location VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    member_id INT NOT NULL,
    unit_id INT NOT NULL, -- To track which unit registered them
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);


-- CLEAR EXISTING DATA FOR FRESH START
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE units;
TRUNCATE TABLE foronas;
SET FOREIGN_KEY_CHECKS = 1;

-- SEED DATA (Official List)
INSERT INTO foronas (id, name) VALUES 
(1, 'Elanji'),
(2, 'Koottickal'),
(3, 'Kaduthuruthy'),
(4, 'Kothanalloor'),
(5, 'Bharananganam'),
(6, 'Aruvithura'),
(7, 'Ramapuram'),
(8, 'Kozhuvanal'),
(9, 'Teekoy'),
(10, 'Koothattukulam'),
(11, 'Kadanad'),
(12, 'Pala'),
(13, 'Muttuchira'),
(14, 'Cherpunkal'),
(15, 'Pravithanam'),
(16, 'Kadaplamattam'),
(17, 'Kuravilangad'),
(18, 'Thudanganadu'),
(19, 'Poonjar'),
(20, 'Moolamattom');

INSERT INTO units (name, forona_id) VALUES 
-- 1. Elanji
('Josegiri', 1), ('Marangoly', 1), ('Mulakkulam', 1), ('Mutholapuram', 1), ('Piravom', 1), ('Santhipuram', 1), ('Xavierpuram', 1),
-- 2. Koottickal
('Yendayar', 2), ('Malayinchippara', 2), ('Parathanam', 2), ('Cholathadam', 2), ('Velanilam', 2), ('Kavaly', 2),
-- 3. Kaduthuruthy
('Arunootimangalam', 3), ('Kaduthuruthy', 3), ('Keezhoor', 3), ('Mannar', 3), ('Poozhikkol', 3), ('Thuruthipally', 3),
-- 4. Kothanalloor
('Kothanalloor', 4), ('Kalathoor', 4), ('Eravimangalam', 4), ('Vedagiri', 4), ('Sleevapuram', 4), ('Mannarappara', 4), ('Manvettom', 4), ('Perumthuruthu', 4), ('Nambiakulam', 4),
-- 5. Bharananganam
('Ambaranirappel', 5), ('Bharananganam', 5), ('Choondacherry', 5), ('Edamattom', 5), ('Mallikasserry', 5), ('Plassnal', 5), ('Poovathodu', 5), ('Kizhaparayar', 5), ('Edappady', 5), ('Vilakkumadom', 5),
-- 6. Aruvithura
('Aruvithura', 6), ('Chemmalamattom', 6), ('Chettuthodu', 6), ('Thidanadu', 6), ('Varianickadu', 6), ('Maniyamkulm', 6), ('Kalathookadavu', 6), ('Moonnilav', 6), ('Edamaruk', 6), ('Vakakkadu', 6), ('Nellapara', 6), ('Pious Mount', 6), ('Chennadu', 6),
-- 7. Ramapuram
('Ramapuram', 7), ('Kondadu', 7), ('Kurinji', 7), ('Neerumthanam', 7), ('Ezhachery', 7), ('Anthayalam', 7), ('Karoor', 7), ('Chakkambuzha', 7),
-- 8. Kozhuvanal
('Alphonsagiri', 8), ('Mattakkara', 8), ('Kozhuvanal', 8), ('Moozhoor', 8), ('Karimpani', 8), ('Paika', 8), ('Urulikunnam', 8), ('Manjamattam', 8), ('Manalumkal', 8), ('Kanjiramattam', 8),
-- 9. Teekoy
('Teekoy', 9), ('Mavady', 9), ('Ayyampara', 9), ('Adukkom', 9), ('Santhigiri', 9), ('Vagamon', 9), ('Vellikulam', 9), ('Mangalagiri', 9),
-- 10. Koothattukulam
('Koothattukulam', 10), ('Vadakara', 10), ('Thirumarady', 10), ('Kakkoor', 10), ('Periyapuram', 10), ('Poovakulam', 10), ('Udayagiri', 10),
-- 11. Kadanad
('Kadanad', 11), ('Kurumannu', 11), ('Geovally', 11), ('Anthinadu', 11), ('Aimcombu', 11), ('Pizhaku', 11), ('Manathoor', 11), ('Kavumkandam', 11),
-- 12. Pala
('Arunapuram', 12), ('Kizhathadiyoor', 12), ('Kudakkachira', 12), ('Lalam New', 12), ('Lalam Old', 12), ('Nelliyani', 12), ('Paingalam', 12), ('Palakkad', 12), ('Poovarany', 12), ('Cathedral', 12), ('Meenachil', 12), ('Moonani', 12), ('Valavoor', 12),
-- 13. Muttuchira
('Muttuchira', 13), ('Kanjirathanam', 13), ('Jaigiri', 13), ('Alphonsapuram', 13), ('Malapuram', 13), ('Fathimapuram', 13), ('Valachira', 13),
-- 14. Cherpunkal
('CHERPUNKAL', 14), ('KURUVINAL', 14), ('MEVADA', 14), ('PADUVA', 14), ('CHEMPILAVU', 14), ('MUTHOLY', 14), ('THODANAL', 14),
-- 15. Pravithanam
('Kaveekunnu', 15), ('Elamthottam', 15), ('Mundankal', 15), ('Vezhanganam', 15), ('Narianganam', 15), ('Ullanadu', 15), ('Kayyoor', 15), ('Pravithanam', 15),
-- 16. Kadaplamattam
('Palakkattumala', 16), ('Palayam', 16), ('Marangattupilly', 16), ('Kadplamattam', 16), ('Mangalaram', 16), ('Vayala', 16), ('Koodalloor', 16),
-- 17. Kuravilangad
('Kuravilangad', 17), ('Vakkad', 17), ('Ratnagiri', 17), ('Mannackanad', 17), ('Kalikavu', 17), ('Kattampack', 17), ('Monipally', 17), ('kurichithanam', 17),
-- 18. Thudanganadu
('Thudanganadu', 18), ('Gagultha', 18), ('Sibigiri', 18), ('Melukavumattam', 18), ('Maryland', 18), ('Neeloor', 18), ('Illiyari', 18), ('Kakkomb', 18),
-- 19. Poonjar
('Poonjar', 19), ('Payyanithottam', 19), ('Kunnonny', 19), ('Kaippally', 19), ('Peringulam', 19), ('Adivaram', 19), ('Maniamkunnu', 19),
-- 20. Moolamattom
('Kudayathoor', 20), ('Arakkulam new', 20), ('Edadu', 20), ('Elappally', 20), ('Chakkikkavu', 20), ('Velliyamattom', 20), ('Kulamavu', 20), ('Moolamattom', 20), ('Arakkulam old', 20), ('Loordh mount', 20);

-- Seed Activities
INSERT IGNORE INTO activities (title, description, icon_name) VALUES 
('Youth Camps', 'Annual leadership and spiritual camps designed to mold the character of our youth.', 'People'),
('Social Service', 'Charity drives, blood donation camps, and housing projects for the needy.', 'Heart'),
('Cultural Events', 'Arts festivals and sports tournaments to foster unity and talent.', 'CalendarEvent');

-- Seed News
INSERT IGNORE INTO news (title, event_date, description) VALUES
('Diocesan Youth Assembly 2026', '2026-01-15', 'Join us for the annual gathering of youth representatives from all parishes.'),
('Charity Drive for Flood Relief', '2026-02-02', 'SMYM Palai launches a new initiative to support families affected by recent floods.'),
('Lenten Retreat: Return to Him', '2026-03-10', 'A 3-day spiritual retreat focused on prayer, fasting, and renewal.'),
('New Executive Committee Elected', '2026-01-05', 'Meet the new leaders who will guide SMYM Palai for the next term.');

-- Seed Events (Matching Frontend Mock)
INSERT IGNORE INTO events (id, title, event_date, location) VALUES
(1, 'Youth Camp 2024', '2024-04-15', 'Pala'),
(2, 'Bible Kalotsavam', '2024-05-20', 'Kottayam'),
(3, 'Leadership Summit', '2024-06-10', 'Bharananganam');

-- Seed Members (Categorized by Units)
INSERT IGNORE INTO members (full_name, dob, house_name, phone, unit_id) VALUES
('Abin Joseph', '2002-05-12', 'Kallarackal House', '9876543210', 1), -- Josegiri (Elanji)
('Sona Sunny', '2003-08-22', 'Maliackal House', '9876543211', 1), -- Josegiri (Elanji)
('Mijo Kurian', '2001-11-05', 'Tharayil House', '9876543212', 8), -- Yendayar (Koottickal)
('Riya Sabu', '2004-01-30', 'Puthuppally House', '9876543213', 14), -- Arunootimangalam (Kaduthuruthy)
('Adon Tommy', '2002-09-15', 'Chettaniyil House', '9876543214', 20), -- Kothanalloor (Kothanalloor)
('Jose Charles', '2003-12-25', 'Kuzhikandam House', '9876543215', 29); -- Ambaranirappel (Bharananganam)

-- Seed Registrations
INSERT IGNORE INTO registrations (event_id, member_id, unit_id) VALUES
(1, 1, 1),
(1, 2, 1),
(2, 3, 8),
(3, 4, 14);
