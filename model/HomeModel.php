<?php

Class Home extends Model
{
    public function get_connection($users = null) {
      $req = "SELECT * FROM users WHERE login = :login AND password = :pwd";
      $execute = $this->db->prepare($req);
      $execute->execute(array(
          'login' => $users['login'],
          'pwd' => $users['pwd']
        ));
      return $execute->fetch(PDO::FETCH_ASSOC);
    }
    public function check_info($users = null){
      $req = "SELECT * FROM users WHERE login = :login OR mail = :email";
      $execute = $this->db->prepare($req);
      $execute->execute(array(
          'login' => $users['login'],
          'email' => $users['email']
        ));
      $result = $execute->fetchAll();
      if (count($result) > 0) {
        return FALSE; // IF ACCOUNT ALREADY EXISTS
      }
      else {
        return TRUE; // IF OK
      }
    }
    public function get_register($users = null)
    {
      $req = "
      INSERT INTO users (login, lastname, firstname, birthdate, mail, password)
      VALUES (:login, :lastname, :firstname, :birthdate, :email, :pwd)";
      $execute = $this->db->prepare($req);
      $execute->execute(array(
          'login' => $users['login'],
          'lastname' => $users['lastname'],
          'firstname' => $users['firstname'],
          'birthdate' => $users['bthd'],
          'email' => $users['email'],
          'pwd' => $users['pwd']
        ));
    }

}
