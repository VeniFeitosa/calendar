<?php
$date = $_POST['date'];

require_once('../class/calendar.php');

$c = new Calendar();
$c->connect();
//retorna true ou false
//para carregar o badge
echo json_encode($c->isAnyMessage($date));