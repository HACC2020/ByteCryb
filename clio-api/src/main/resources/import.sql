INSERT INTO roles (id, rolename) VALUES (1, 'rookie');
INSERT INTO roles (id, rolename) VALUES (2, 'indexer');
INSERT INTO roles (id, rolename) VALUES (3, 'proofer');
INSERT INTO roles (id, rolename) VALUES (4, 'archivist');

INSERT INTO users (id, username, email, password, role_id, first_name, last_name) VALUES (1, 'rookie', 'rookie@email.com', '$2a$10$wKA2CWgUb0k8ew37ttCVj.khlDVRmZyYfAMHVaIsR1iEkhNVCv/fW', (SELECT id FROM roles WHERE rolename = 'rookie'), 'First', 'Rookie');
INSERT INTO users (id, username, email, password, role_id, first_name, last_name) VALUES (2, 'indexer', 'indexer@email.com', '$2a$10$wKA2CWgUb0k8ew37ttCVj.khlDVRmZyYfAMHVaIsR1iEkhNVCv/fW', (SELECT id FROM roles WHERE rolename = 'indexer'), 'First', 'Indexer');
INSERT INTO users (id, username, email, password, role_id, first_name, last_name) VALUES (3, 'proofer', 'proofer@email.com', '$2a$10$wKA2CWgUb0k8ew37ttCVj.khlDVRmZyYfAMHVaIsR1iEkhNVCv/fW', (SELECT id FROM roles WHERE rolename = 'proofer'), 'First', 'Proofer');
INSERT INTO users (id, username, email, password, role_id, first_name, last_name) VALUES (4, 'archivist', 'archivist@email.com', '$2a$10$wKA2CWgUb0k8ew37ttCVj.khlDVRmZyYfAMHVaIsR1iEkhNVCv/fW', (SELECT id FROM roles WHERE rolename = 'archivist'), 'First', 'Archivist');

INSERT INTO scores (id, user_id, date, score) VALUES (1, 1, CURRENT_DATE, 5);
INSERT INTO scores (id, user_id, date, score) VALUES (2, 2, CURRENT_DATE, 15);
INSERT INTO scores (id, user_id, date, score) VALUES (3, 3, CURRENT_DATE, 25);
INSERT INTO scores (id, user_id, date, score) VALUES (4, 4, CURRENT_DATE, 35);
INSERT INTO scores (id, user_id, date, score) VALUES (5, 1, CURRENT_DATE + 1, 55);

INSERT INTO jobs (id, name, category_id, status, xml_id, num_indexed, size, points) VALUES (1, 'test1', 1, 1, 1, 0, 2, 3);
INSERT INTO jobs (id, name, category_id, status, xml_id, num_indexed, size, points) VALUES (2, 'test2', 1, 1, 2, 0, 3, 5);

INSERT INTO badges (id, name, score, description, color) VALUES (1, 'First Index', 1, 'Indexed first record', '#00ff00');
INSERT INTO badges (id, name, score, description, color) VALUES (2, 'Baby Steps', 50, '50 Points', '87ceeb');
INSERT INTO badges (id, name, score, description, color) VALUES (3, 'Bronze', 100, '100 Points', '#cd7f32');
INSERT INTO badges (id, name, score, description, color) VALUES (4, 'Copper', 200, '200 Points', '#b87333');
INSERT INTO badges (id, name, score, description, color) VALUES (5, 'Gold', 1000, '1000 Points', '#ffd700');
INSERT INTO badges (id, name, score, description, color) VALUES (6, 'Platinum', 5000, '5000 Points', '#e5e4e2');
INSERT INTO badges (id, name, score, description, color) VALUES (7, 'Diamond', 10000, '10000 Points', '#b9f2ff');
INSERT INTO badges (id, name, score, description, color) VALUES (8, 'Neverending Supporter', 50000, '50000 Points', '#000000');
INSERT INTO badges (id, name, score, description, color) VALUES (9, 'Unoffical Archivist', 100000, '100000 Points', '#3D2314');

INSERT INTO awards (id, user_id, badge_id) VALUES (1, 1, 1);
INSERT INTO awards (id, user_id, badge_id) VALUES (2, 1, 3);