<?php
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
    
    <link rel="stylesheet" type="text/css" href="css/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/theme.css"/>
    <link rel="stylesheet" type="text/css" href="css/page.css"/>

    <title>Calendar</title>
</head>

<body>
    <div class="container">
        <div class="form-group">
            <label for="mes" id="labelMes"> Selecione o mês </label>
            <div class="input-group">
            <select name="mes" id="mes" class="form-select">
                <?php 
                $monthMap = [
                'Janeiro', 'Fevereiro', 'Março',
                'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
                'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                
                for ($i=0; $i < 12 ; $i++) {
                    $mes = $i + 1;
                    echo '<option value="' . $mes . '">' .  $monthMap[$i] . '</option>';
                }
                ?>
            </select>
            <button class="btn" type="button" id="pesq"> Pesquisar </button>
            </div>
        </div>
        <div id="calendar"></div>
    <div>

    <!-- Primeira Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="modal1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modal1"></h4>
                    <button type="button" class="btn-close" id="exitButton" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-body-1">
                    <div class="noContent">
                        <h5>Sem anotações nessa data.</h5>
                    </div>
                    <div class="table-responsive-sm">
                        <table class="table table-bordered align-middle">
                            <tbody>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="exitButton" data-bs-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary" id="editButton" >Editar</button>
                        <button type="button" class="btn btn-primary" id="saveButton" >Salvar</button>
                        <button type="button" class="btn btn-primary" id="addButton" >Adicionar</button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <!-- Segunda Modal -->
    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="modal2" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modal2"></h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="dayContent"></p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-bs-target="#exampleModal" data-bs-toggle="modal">Voltar</button>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-kQtW33rZJAHjgefvhyyzcGF3C5TFyBQBA13V1RKPf4uH+bwyzQxZ6CmMZHmNBEfJ" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>

    <script src="js/calendar.js"></script>
    <script src="js/index.js"></script>
</body>

</html>