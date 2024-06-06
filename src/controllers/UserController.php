<?php

namespace controllers;
use model\Jobs;
use model\Users;

class UserController
{
    private Users $user;
    public function __construct()
    {
        $this->user = new Users();
    }
    public function add($data): array
    {
        return $this->user->make($data);
    }
    public function upsertUser($data): array
    {
        return $this->user->change($data);
    }
    public function getUsers(): bool|array
    {
        return $this->user->getAll();
    }

    public function deleteUser($id): bool|array
    {
        $jobs = new Jobs();
        $jobs->deleteUserJob($id);
        return $this->user->delete($id);
    }
}