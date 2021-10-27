<?php

$message = $_POST['message'];
$date = $_POST['date'];

require_once('../class/calendar.php');

$c = new Calendar();
$c->connect();
$c->save($message, $date);

// echo "mensagem ---> | $message | data ---> | $date |";