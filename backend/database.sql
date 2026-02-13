CREATE DATABASE IF NOT EXISTS smym_db;
USE smym_db;

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


-- SEED DATA (Optional Examples)
-- INSERT INTO foronas (name) VALUES ('Pala'), ('Erattupetta');
-- INSERT INTO units (name, forona_id) VALUES ('Cathedral', 1);

-- Seed Activities
INSERT INTO activities (title, description, icon_name) VALUES 
('Youth Camps', 'Annual leadership and spiritual camps designed to mold the character of our youth.', 'People'),
('Social Service', 'Charity drives, blood donation camps, and housing projects for the needy.', 'Heart'),
('Cultural Events', 'Arts festivals and sports tournaments to foster unity and talent.', 'CalendarEvent');

-- Seed News
INSERT INTO news (title, event_date, description) VALUES
('Diocesan Youth Assembly 2026', '2026-01-15', 'Join us for the annual gathering of youth representatives from all parishes.'),
('Charity Drive for Flood Relief', '2026-02-02', 'SMYM Palai launches a new initiative to support families affected by recent floods.'),
('Lenten Retreat: Return to Him', '2026-03-10', 'A 3-day spiritual retreat focused on prayer, fasting, and renewal.'),
('New Executive Committee Elected', '2026-01-05', 'Meet the new leaders who will guide SMYM Palai for the next term.');

-- Seed Events (Matching Frontend Mock)
INSERT INTO events (id, title, event_date, location) VALUES
(1, 'Youth Camp 2024', '2024-04-15', 'Pala'),
(2, 'Bible Kalotsavam', '2024-05-20', 'Kottayam'),
(3, 'Leadership Summit', '2024-06-10', 'Bharananganam');
