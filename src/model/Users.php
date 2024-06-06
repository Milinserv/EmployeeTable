<?php

namespace model;

class Users
{
    private DatabaseConnector $pdo;
    public function __construct()
    {
        $this->pdo = new DatabaseConnector();
    }
    public function make($user): array
    {
        $sql = "INSERT INTO users (last_name, first_name, middle_name, date_of_birth, gender) VALUES (:last_name, :first_name, :middle_name, :date_of_birth, :gender)";
        return $this->pdo->query($sql, $user);
    }
    public function change($user): bool|array
    {
        $sql = "UPDATE users SET last_name = :last_name, first_name = :first_name, middle_name = :middle_name, date_of_birth = :date_of_birth, gender = :gender WHERE id = :id";
        return $this->pdo->query($sql, $user);
    }
    public function getAll(): bool|array
    {
        return $this->pdo->getAll('users');
    }

    public function delete($id): bool|array
    {
        $sql = "DELETE FROM users WHERE id = :id";
        return $this->pdo->query($sql, ['id' => $id]);
    }
}