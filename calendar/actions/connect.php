<?php
try {
    $db = new PDO("mysql:dbname=calendar;host=localhost;port=3308","root", "");
    echo "conectado";
} catch (PDOException $e) {
    echo $e->getMessage() ;
}