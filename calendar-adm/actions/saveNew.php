<?php

$message = $_POST['message'];
$title = $_POST['title'];
$date = $_POST['date'];

require_once('../class/calendar.php');

$c = new Calendar();
$c->connect();
//salva uma anotação em uma nova data
//ou em uma data existente, mas sem anotações
$c->saveNew($title, $message, $date);