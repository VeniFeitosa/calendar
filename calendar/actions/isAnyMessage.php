<?php
$date = $_POST['date'];

require_once('../class/calendar.php');

$c = new Calendar();
$c->connect();
echo json_encode($c->isAnyMessage($date));