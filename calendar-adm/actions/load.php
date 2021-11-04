<?php

$date = $_GET['date'];

require_once('../class/calendar.php');

$c = new Calendar();
$c->connect();
//retorna as anotações do dia em forma de json
$c->loadClient($date);