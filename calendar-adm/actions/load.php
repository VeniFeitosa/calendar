<?php

$date = $_GET['date'];

require_once('../class/calendar.php');

$c = new Calendar();
$c->connect();
// $c->load($date);
$c->loadClient($date);

// echo "Carregar a menssagem da data | $date |";