<?php

namespace model;
class Jobs
{
    private DatabaseConnector $pdo;

    public function __construct()
    {
        $this->pdo = new DatabaseConnector();
    }
    public function make($jobs): array
    {
        $sql = "INSERT INTO previous_jobs (user_id, start_date, end_date, organization_name) VALUES (:user_id, :start_date, :end_date, :organization_name)";
        return $this->pdo->query($sql, $jobs);
    }
    public function getUserJobs($userId): array
    {
        $sql = "SELECT * FROM previous_jobs WHERE user_id = :user_id";
        return $this->pdo->query($sql, ["user_id" => $userId]);
    }
    public function change($data): array
    {
        $sql = "UPDATE previous_jobs SET start_date = :start_date, end_date = :end_date, organization_name = :organization_name WHERE id = :id";
        return $this->pdo->query($sql, $data);
    }
    public function deleteUserJob($userId): bool|array
    {
        $sql = "DELETE FROM previous_jobs WHERE user_id = :user_id";
        return $this->pdo->query($sql, ["user_id" => $userId]);
    }

    public function delete($id): bool|array
    {
        $sql = "DELETE FROM previous_jobs WHERE id = :id";
        return $this->pdo->query($sql, ["id" => $id]);
    }
}