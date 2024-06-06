<?php

namespace model;

use PDO;

class DatabaseConnector
{
    private PDO $db;

    public function __construct()
    {
        $config = require __DIR__ . '/../../infrastructure/config.php';
        $this->db = new PDO('mysql:host=' . $config['db_host'] . ';dbname=' . $config['db_name'], $config['db_user'], $config['db_pass']);
    }

    public function query($sql, $params = []): bool|array
    {
        $stmt = $this->db->prepare($sql);

        if (!empty($params)) {
            foreach ($params as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }
        }

        $stmt->execute();

        $state = ($stmt->rowCount() > 0) ? 'success' : 'error';

        return array('query' => $stmt->fetchAll(PDO::FETCH_ASSOC), 'state' => $state);
    }

    public function getAll($table, $sql = '', $params = []): bool|array
    {
        return $this->query("SELECT * FROM $table" . $sql, $params);
    }

    public function getRow($sql, $field, $param)
    {
        $stmt = $this->db->prepare($sql);

        $stmt->execute(array(":$field" => '%'.$param.'%'));

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}