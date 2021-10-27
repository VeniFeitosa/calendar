<?php

$message = $_POST['message'];
$title = $_POST['title'];
$date = $_POST['date'];

require_once('../class/calendar.php');

$c = new Calendar();
$c->connect();
$c->saveNew($title, $message, $date);

// echo "Título ---> $title | mensagem ---> | $message | data ---> | $date |";