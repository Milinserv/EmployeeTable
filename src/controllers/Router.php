<?php

namespace controllers;

class Router
{
    private UserController $userController;
    public JobController $jobController;

    public function __construct()
    {
        $this->userController = new UserController();
        $this->jobController = new JobController();
    }

    public function handleRequest($action, $data = ''): bool|string
    {
        return match ($action) {
            'createUser' => json_encode($this->userController->add($data['user'])),
            'changeUser' => json_encode($this->userController->upsertUser($data['user'])),
            'deleteUser' => json_encode($this->userController->deleteUser($data['user'])),
            'getAllUsers' => json_encode($this->userController->getUsers()),
            'createJob' => json_encode($this->jobController->add($data['job'])),
            'getJobsUser' => json_encode($this->jobController->getJobs($data['id'])),
            'upsertJob' => json_encode($this->jobController->upsertJob($data['job'])),
            'deleteJob' => json_encode($this->jobController->deleteJob($data['jobId'])),
            default => json_encode('Unexpected route!'),
        };
    }

}