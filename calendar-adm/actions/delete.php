<?php

$id = $_GET['id'];

require_once('../class/calendar.php');

$c = new Calendar();
$c->connect();
//deleta a anotação
$c->deleteMessage($id);