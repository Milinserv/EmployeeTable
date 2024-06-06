<?php

namespace controllers;
use model\Jobs;

class JobController
{
    private Jobs $job;
    public function __construct()
    {
        $this->job = new Jobs();
    }

    public function add($data): array
    {
        return $this->job->make($data);
    }
    public function getJobs($id): array
    {
        return $this->job->getUserJobs($id);
    }
    public function upsertJob($data): array
    {
        return $this->job->change($data);
    }
    public function deleteJob($id): array
    {
        return $this->job->delete($id);
    }
}
