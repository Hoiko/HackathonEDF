<?php

class Database
{
    protected $db;

    public function __construct()
    {

    try {
     $this->db = new PDO('mysql:host=localhost;dbname=hackathon_edf;', 'root', '');
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
    catch (Exception $e)
    {
      die('Error : ' . $e->getMessage());
    }
    }
}
