DROP TABLE IF EXISTS users, social_network CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY, 
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50),
  date_of_birth DATE
);

CREATE TABLE social_network(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(30) NOT NULL,
  account_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);