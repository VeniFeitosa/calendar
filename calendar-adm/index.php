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
    
    <link rel="stylesheet" type="text/css" href="css/page.css"/>

    <title>Calendar</title>
</head>

<body>
    <div class="container">
        <div class="cont-header">
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
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">Modo Escuro</label>
            </div>
        </div>
        
        <div id="calendar"></div>
    <div>

    <!-- Primeira Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="modal1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" id="mc1">
                <div class="modal-header" id="mh1">
                    <h4 class="modal-title" id="modal1"></h4>
                    <button type="button" class="btn-close exitButton" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center" id="modal-body-1">
                    <div class="noContent">
                        <h5>Sem anotações nessa data.</h5>
                    </div>
                    <div class="table-responsive-sm">
                        <table class="table table-bordered align-middle">
                            <tbody class="contentM1">
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div class="modal-footer" id="mf1">
                        <button type="button" class="btn btn-success" id="addNewButton" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Adicionar</button>
                        <button type="button" class="btn btn-primary" id="addButton" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Segunda Modal -->
    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="modal2" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content" id="mc2">
                <div class="modal-header" id="mh2">
                    <h4 class="modal-title" id="modal2"></h4>
                    <button type="button" class="btn-close exitButton" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="contentM2"></p>
                    <div class="form">
                        <div class="mb-3">
                            <label for="titulo" class="form-label">Título da Anotação</label>
                            <input type="text" class="form-control titulo" id="titulo">
                        </div>
                        <div class="mb-2">
                            <label for="anot" class="form-label">Conteúdo da anotação</label>
                            <textarea id="anot" class="form-control dayContentEdit" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" id="mf2">
                    <button class="btn btn-secondary" id="backButton" data-bs-target="#exampleModal" data-bs-toggle="modal">Voltar</button>
                    <button class="btn btn-secondary" id="backButton2" data-bs-target="#exampleModal" data-bs-toggle="modal">Voltar</button>
                    <button type="button" class="btn btn-primary" id="saveButton" >Salvar</button>
                    <button type="button" class="btn btn-success" id="saveNewButton" >Salvar</button>
                    <button type="button" class="btn btn-primary" id="editButton" >Editar</button>
                    <button type="button" class="btn btn-danger" id="delButton" >Excluir</button>
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