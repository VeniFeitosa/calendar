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

    function save($message, $date){
        $sql = $this->db->prepare("SELECT anotacao FROM anotacoes WHERE data_anot = ?");
        $sql->bindParam(1, $date);
        $sql->execute();
        if ($sql->rowCount() > 0) {
            
            $sql = $this->db->prepare("UPDATE anotacoes SET anotacao=? WHERE data_anot=?");
            $sql->bindParam(1, $message);
            $sql->bindParam(2, $date);

            if ($sql->execute()) {
                if ($message == '') {
                    echo "messageEmpty";
                }else{
                    echo "successSave";
                }
                
            }else{
                echo "errorSave";
            }
        }else{
            
            $sql = $this->db->prepare("INSERT INTO anotacoes(anotacao, data_anot) VALUES(?,?)");
            $sql->bindParam(1, $message);
            $sql->bindParam(2, $date);
            
            if ($sql->execute()) {
                echo "successSave";
            }else{
                echo "errorSave";
            }
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