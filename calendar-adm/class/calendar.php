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

    // function insertMessage($title, $message, $id){
    //     $sql = $this->db->prepare("INSERT INTO anotacao(titulo, content, id_data) VALUES($title, $message, $id)");

    //     if ($sql->execute()) {
    //         return true;
    //     } else {
    //         return false;
    //     }
        
    // }

    function save($title ,$message, $date){
        $sqlAlready = $this->db->prepare("SELECT id FROM anotacao WHERE 
        id_data = (SELECT id FROM data_anotacao WHERE data_anot = ?)");
        if (true) {
            # code...
        } else {
            # code...
        }
        

        $sql = $this->db->prepare("INSERT INTO anotacao(titulo, content, id_data) 
        VALUES(?, ?, (SELECT id FROM data_anotacao WHERE data_anot = ?))");
        $sql->bindParam(1, $title);
        $sql->bindParam(2, $message);
        $sql->bindParam(3, $date);

        if ($sql->execute()) {
            echo 'successSave';
        } else {
            echo 'Erro ao inserir!';
        }
        
    }

    function saveNew($title ,$message, $date){
        $sqlData = $this->db->prepare("INSERT INTO data_anotacao(data_anot) VALUES(?)");
        $sqlData->bindParam(1, $date);

        if ($sqlData->execute()) {
            //adicionar a menssagem
            $sql = $this->db->prepare("INSERT INTO anotacao(titulo, content, id_data) 
            VALUES(?, ?, (SELECT id FROM data_anotacao WHERE data_anot = ?))");
            $sql->bindParam(1, $title);
            $sql->bindParam(2, $message);
            $sql->bindParam(3, $date);

            if ($sql->execute()) {
                echo 'successSave';
            } else {
                echo 'Erro ao inserir!';
            }
        } else {
            echo 'Não foi possível adicionar essa data!';
        }
        
    }

    function load($date){
        $sql = $this->db->prepare("SELECT anotacao FROM anotacoes WHERE data_anot=?");
        $sql->bindParam(1, $date);
        $sql->execute();
        if ($sql->rowCount() > 0) {
            //existe uma anotação
            $result = $sql->fetch(PDO::FETCH_ASSOC);
            if ($result['anotacao'] == '') {
                echo 'Sem anotações nessa data.';               
            } else {
                echo $result['anotacao'];
            }
            
        }else{
            //nao existe anotacao
            echo 'Sem anotações nessa data.';
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

            // if ($result['anotacao'] == '') {
            //     echo 'Sem anotações nessa data.';               
            // } else {
            //     echo $result['anotacao'];
            // }
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