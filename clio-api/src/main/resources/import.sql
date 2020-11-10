INSERT INTO roles (id, rolename) VALUES (1, 'rookie');
INSERT INTO roles (id, rolename) VALUES (2, 'indexer');
INSERT INTO roles (id, rolename) VALUES (3, 'proofer');
INSERT INTO roles (id, rolename) VALUES (4, 'archivist');

INSERT INTO users (id, username, email, password, role_id, first_name, last_name) VALUES (1, 'rookie', 'rookie@email.com', '$2a$10$wKA2CWgUb0k8ew37ttCVj.khlDVRmZyYfAMHVaIsR1iEkhNVCv/fW', (SELECT id FROM roles WHERE rolename = 'rookie'), 'First', 'Rookie');
INSERT INTO users (id, username, email, password, role_id, first_name, last_name) VALUES (2, 'indexer', 'indexer@email.com', '$2a$10$wKA2CWgUb0k8ew37ttCVj.khlDVRmZyYfAMHVaIsR1iEkhNVCv/fW', (SELECT id FROM roles WHERE rolename = 'indexer'), 'First', 'Indexer');
INSERT INTO users (id, username, email, password, role_id, first_name, last_name) VALUES (3, 'proofer', 'proofer@email.com', '$2a$10$wKA2CWgUb0k8ew37ttCVj.khlDVRmZyYfAMHVaIsR1iEkhNVCv/fW', (SELECT id FROM roles WHERE rolename = 'proofer'), 'First', 'Proofer');
INSERT INTO users (id, username, email, password, role_id, first_name, last_name) VALUES (4, 'archivist', 'archivist@email.com', '$2a$10$wKA2CWgUb0k8ew37ttCVj.khlDVRmZyYfAMHVaIsR1iEkhNVCv/fW', (SELECT id FROM roles WHERE rolename = 'archivist'), 'First', 'Archivist');

INSERT INTO scores (id, user_id, day, month, year, score) VALUES (1, 1, 5, 5, 5, 5);
INSERT INTO scores (id, user_id, day, month, year, score) VALUES (2, 2, 15, 15, 15, 15);
INSERT INTO scores (id, user_id, day, month, year, score) VALUES (3, 3, 25, 25, 25, 25);
INSERT INTO scores (id, user_id, day, month, year, score) VALUES (4, 4, 35, 35, 35, 35);