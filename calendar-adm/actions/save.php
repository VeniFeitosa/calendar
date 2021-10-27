<?php

$message = $_POST['message'];
$title = $_POST['title'];
$date = $_POST['date'];
$id = $_POST['id'];

require_once('../class/calendar.php');

$c = new Calendar();
$c->connect();
$c->save($title, $message, $date, $id);

// echo "mensagem ---> | $message | data ---> | $date |";