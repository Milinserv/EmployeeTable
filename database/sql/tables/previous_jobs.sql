CREATE TABLE previous_jobs
(
    id                INT PRIMARY KEY AUTO_INCREMENT,
    user_id           INT,
    start_date        DATE,
    end_date          DATE,
    organization_name TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id)
);