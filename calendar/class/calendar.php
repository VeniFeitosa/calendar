<?php
class Calendar {
    private $db;

    function connect(){
        try {
            $this->db = new PDO("mysql:dbname=calendar;host=localhost;port=3308;charset=utf8","root", "");
        } catch (PDOException $e) {
            echo $e->getMessage() ;
        }
    }

    function loadClient($date){
        $sql = $this->db->prepare("SELECT anotacao.id, anotacao.titulo, anotacao.content, data_anotacao.data_anot
         FROM anotacao JOIN data_anotacao 
         ON data_anotacao.id = anotacao.id_data 
         WHERE data_anotacao.data_anot = ?");

        $sql->bindParam(1, $date);
        $sql->execute();

        if ($sql->rowCount() > 0) {
            //existe uma anotação

            $result = $sql->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);

        }else{
            //nao existe anotacao
            echo 'Sem anotações nessa data.';
        }
    }

    function isAnyMessage($date){
        $sql = $this->db->prepare("SELECT anotacao.id, anotacao.titulo, anotacao.content, data_anotacao.data_anot
        FROM anotacao JOIN data_anotacao 
        ON data_anotacao.id = anotacao.id_data 
        WHERE data_anotacao.data_anot = ?");
        $sql->bindParam(1, $date);
        $sql->execute();
        $result = false;
        if ($sql->rowCount() > 0) {
            //tem anotação
            $result = true;
        } else {
            //não tem
            $result = false;
        }
        return $result;
    }
}