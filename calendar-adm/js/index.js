//conteudo da segunda modal
const dayContent = document.querySelector('.contentM2')
//textarea na segunda modal
const dayContentEdit = document.querySelector('.dayContentEdit')
//div que contem os inputs da mensagem 
const form = document.querySelector('.form')
//input titulo
const titulo = document.querySelector('.titulo')
//titulo da segunda modal
const modalTitle2 = document.querySelector('#modal2')
//div para nenhuma anotacao
const noContent = document.querySelector('.noContent')
//tabela da modal 1
const tbody = document.querySelector('.contentM1')
//toda a primeira modal
const modal = document.querySelector('.modal')
//modal-body da primeira modal
const modalBody1 = document.querySelector('#modal-body-1')
//modal-content da primeira modal
const modalContent = document.querySelector('#mc1')

//vai armazenar a data clicada
let messageDate
//vai reeber o DOM do dia clicado
let dayClicked

//botão pesquisar
const btn = document.querySelector('#pesq')
//botão editar
const editButton = document.querySelector('#editButton')
//botões de fechar a modal
const exitButton = Array.from(document.querySelectorAll('.exitButton'))
//salvar mensagem num dia com anotações
const saveButton = document.querySelector('#saveButton')
//botão salvar mensagem num dia sem anotações
const saveNewButton = document.querySelector('#saveNewButton')
//adicionar mensagem num dia com anotações
const addButton = document.querySelector('#addButton')
//adicionar mensagem num dia sem anotações
const addNewButton = document.querySelector('#addNewButton')
//botão voltar para a modal 1 com anotações
const backButton = document.querySelector('#backButton')
//botão voltar para a modal 1 sem anotações
const backButton2 = document.querySelector('#backButton2')
//botão deletar mensagem
const delButton = document.querySelector('#delButton')
//div checkbox darkmode
const divDarkMode = document.querySelector('.form-switch')
//input do darkmode
const darkInput = document.querySelector('.form-check-input')

//escondendo elementos não usados ao carregar a página
$(form).hide()
$(saveButton).hide()
$(addNewButton).hide()
$(saveNewButton).hide()
$(backButton2).hide()
$(delButton).hide()

const data = new Date()

const themeState = localStorage['darkMode']

//configuração das toasts (alertas) show
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "1500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

//botão pesquisar
btn.addEventListener('click', () => {
    const dia = data.getDate()
    const ano = data.getFullYear()
    const mes = document.querySelector('#mes').value

    //carrega o calendário
    $('#calendar').calendar({
        date: `${mes}/${dia}/${ano}`,
        enableMonthChange: false,
        showTodayButton: false
    })
    const dias = Array.from(document.querySelectorAll('.day')).filter((element) => !element.classList.contains('header'))

    //pra cada dia do mês, checa se tem anotacao
    dias.forEach(element => {
        const data = new Date(element.dataset.date)
        const strDate = `${data.getDate()}/${data.getMonth() +1}/${data.getFullYear()}`
        const elemSpan = $(element).children()

        $.ajax({
            type: "post",
            url: "./actions/isAnyMessage.php",
            data: {date:strDate},
            dataType: 'json',
            success: function (response) {
                if (response) {
                    if (window.innerWidth <= 425) {
                        $(elemSpan).append('<span class="dateBadge position-absolute top-0 start-120 translate-middle p-1  border border-light rounded-circle"></span>')
                    }else{
                        $(elemSpan).append('<span class="dateBadge position-absolute top-0 start-100 translate-middle p-1  border border-light rounded-circle"></span>')
                    }
                }
            }
        });
    });

    const diasDealer = document.querySelector(".dias")

    //evento acionado quando algum dia é clickado
    diasDealer.addEventListener('click', (e) => {
        $(noContent).hide()
        showLoading(modalBody1)
        
        modalTitle2.dataset.id = "0"
        
        let dataDay
        let day

        dayClicked = e.target

        window.onclick = (e)=>{
            const modal2 = document.querySelectorAll('.modal')[1]

            if (e.target == modal) {
                modalTitle2.dataset.id = "0"
                
                $(dayContent).show()
                $(form).hide()
                $(saveButton).hide()
                $(addNewButton).hide()
                $(editButton).show()
                $(delButton).hide()

            }

            if (e.target == modal2) {
                modalTitle2.dataset.id = "0"
            }
        }

        if (!e.target.dataset.date) {
            const span = e.target
            day = $(span).parent()[0]
            dayClicked = $(span).parent()[0]
            dataDay = day.dataset.date
        }else{
            day = e.target
            dataDay = e.target.dataset.date
        }

        const data = new Date(dataDay)
        messageDate = `${data.getDate()}/${data.getMonth() +1}/${data.getFullYear()}`
        tbody.innerHTML = ''

        //carrega o conteudo da modal 1
        $.ajax({
            type: "get",
            url: "./actions/load.php",
            data: {date:messageDate},
            success: function (response) {
                hideLoading(modalBody1)
                if (response == 'Sem anotações nessa data.') {
                    $(noContent).show()
                    $(addNewButton).show()
                    $(addButton).hide()
                }else{
                    $(noContent).hide()
                    $(addNewButton).hide()
                    $(addButton).show()
                    const dbElement = JSON.parse(response)

                    dbElement.forEach((element,index) => {
                        generateTable(element,index)
                    });
                }
            }
        });

    })

})

//Funções
function showLoading(element){
    $(element).append('<div class="spinner-border text-dark" role="status"><span class="visually-hidden">Loading...</span></div>')
}
function hideLoading(element){
    $(element).find('.spinner-border').remove()
}

//gera a tabela com as anotações
function generateTable(element, index) {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    const td2 = document.createElement('td')
    const button = document.createElement('button')

    const titulo = document.createTextNode(`${element.titulo}`)
    const abrir = document.createTextNode('Abrir')

    td.classList.add('dayTitle')
    td.appendChild(titulo)
    tr.appendChild(td)

    button.classList.add('btn','btn-primary', 'w-100','open')
    button.setAttribute('data-bs-target', '#exampleModalToggle2')
    button.setAttribute('data-bs-toggle', 'modal')
    button.setAttribute('data-index', `${index}`)
    button.appendChild(abrir)

    td2.appendChild(button)
    td2.classList.add('tdButton')
    tr.appendChild(td2)

    tbody.appendChild(tr)
}

function setDarkMode() {
    localStorage['darkMode'] = 'on'
    
    let r = document.querySelector(':root')
    let mh1 = document.querySelector('#mh1')
    let mf1 = document.querySelector('#mf1')
    let mh2 = document.querySelector('#mh2')
    let mf2 = document.querySelector('#mf2')
    let mc2 = document.querySelector('#mc2')

    modalContent.style.setProperty('background-color', '#2c3e50')
    mc2.style.setProperty('background-color', '#2c3e50')
    mh1.style.setProperty('border-bottom','none')
    mf1.style.setProperty('border-top','none')
    mh2.style.setProperty('border-bottom','none')
    mf2.style.setProperty('border-top','none')
    
    r.style.setProperty('--mainWhite', '#ECF0F1')
    r.style.setProperty('--dayColor', '#2c3e50')
    r.style.setProperty('--dayColorHover', '#172e44')
    r.style.setProperty('--disabledColor', '#aaa')
    r.style.setProperty('--todayColor', '#ffa500')
    
}

function offDarkMode() {
    localStorage['darkMode'] = 'off'
    
    let r = document.querySelector(':root')
    let mh1 = document.querySelector('#mh1')
    let mf1 = document.querySelector('#mf1')

    modalContent.style.setProperty('background-color', '#ffff')
    mc2.style.setProperty('background-color', '#ffff')
    exitButton[0].style.setProperty('background-color', '#c1c4c7')
    mh1.style.setProperty('border-bottom','none')
    mf1.style.setProperty('border-top','none')
    mh2.style.setProperty('border-bottom','none')
    mf2.style.setProperty('border-top','none')
    
    r.style.setProperty('--mainWhite', '#000000')
    r.style.setProperty('--dayColor', '#d4e1ed')
    r.style.setProperty('--dayColorHover', '#c1c4c7')
    r.style.setProperty('--disabledColor', '#856b6b')
    r.style.setProperty('--todayColor', '#358de9')
}

$(document).ready( ()=>{
    console.log(localStorage['darkMode'])
    if (localStorage['darkMode'] == 'on') {
        // setDarkMode()
        $(darkInput).click()
        divDarkMode.classList.add('on')
        setDarkMode()
    }
} )


// Eventos dos botoões

editButton.addEventListener('click', () =>{
    $(dayContent).hide()
    titulo.value = modalTitle2.innerHTML
    dayContentEdit.value = dayContent.innerHTML

    $(form).show();
    $(saveButton).show()
    $(editButton).hide();
})

addNewButton.addEventListener('click', () =>{

    $(dayContent).hide()
    titulo.value = ''
    dayContentEdit.value = ''
    modalTitle2.innerHTML = messageDate
    $(form).show();

    $(editButton).hide()
    $(delButton).hide()
    $(addNewButton).hide()
    $(backButton).hide()
    $(backButton2).show()
    $(saveNewButton).show()
})

addButton.addEventListener('click', () =>{

    $(dayContent).hide()
    titulo.value = ''
    dayContentEdit.value = ''
    modalTitle2.innerHTML = messageDate
    $(form).show();
    $(saveButton).show()
    $(saveNewButton).hide()
    $(editButton).hide()
    $(delButton).hide()
    $(addNewButton).hide()
    $(backButton).show()
    $(backButton2).hide()
})

backButton.addEventListener('click', () => {
    
    $(saveButton).hide()
    $(saveNewButton).hide()
    $(addNewButton).hide()

    modalTitle2.dataset.id = "0"
})

backButton2.addEventListener('click', () => {
    $(saveButton).hide()
    $(saveNewButton).hide()
    $(backButton).show()
    $(backButton2).hide()
    $(addNewButton).show()
    $(addButton).hide()
})

exitButton.forEach(element => {
    element.addEventListener('click', () => {
        $(saveButton).hide()
        $(saveNewButton).hide()

        modalTitle2.dataset.id = "0"
    })
})


modalContent.addEventListener('click', (e)=>{
    if (!e.target.dataset.index) {
        return
    } else {
        $(form).hide()
        $(saveButton).hide()
        $(dayContent).show()
        $(editButton).show()
        $(delButton).show()

        modalTitle2.innerHTML = ''
        dayContent.innerHTML = ''

        const index = e.target.dataset.index
        showLoading(modalTitle2)
        showLoading(dayContent)
        $.ajax({
            type: "get",
            url: "./actions/load.php",
            data: {date:messageDate},
            success: function (response) {
                hideLoading(modalTitle2)
                hideLoading(dayContent)
                const dbElement = JSON.parse(response)

                modalTitle2.innerHTML = dbElement[index].titulo
                modalTitle2.setAttribute('data-id', dbElement[index].id)
                dayContent.innerHTML = dbElement[index].content
            }
        });
    }
})

saveButton.addEventListener('click', () => {
    dayContent.innerHTML = dayContentEdit.value
    modalTitle2.innerHTML = titulo.value
    const messageId = modalTitle2.dataset.id
    $(dayContent).show()
    $(form).hide()
    $(saveButton).hide()
    $(editButton).show()
    $(delButton).show()

    $.ajax({
        type: "post",
        url: "./actions/save.php",
        data: {
            message:dayContent.innerHTML,
            title:modalTitle2.innerHTML,
            date:messageDate,
            id:messageId
        },
        success: function (response) {
            if (response == "successSave") {
                toastr.success("Salvo com sucesso.", "Pronto!")
                tbody.innerHTML = ''
                generateContent(messageDate)
                $(backButton2).hide()
                $(backButton).show()
            }else if(response == "messageEmpty"){
                toastr.success("Salvo com sucesso.", "Pronto!")
                dayContent.innerHTML = 'Sem anotações nessa data.'
            }else {
                toastr.error("Erro ao salvar.", "Erro!")
                backButton.click()
            }
        }
    });
})

saveNewButton.addEventListener('click', () => {
    if (titulo.value == '') {
        toastr.warning('O Título está vazio!')
    }else if(dayContentEdit.value == ''){
        toastr.warning('O conteúdo está vazio!')
    }else{
        dayContent.innerHTML = dayContentEdit.value
        modalTitle2.innerHTML = titulo.value
        $(dayContent).show()
        $(form).hide()
        $(saveNewButton).hide()
        $(editButton).show()
        $(delButton).show()

        $.ajax({
            type: "post",
            url: "./actions/saveNew.php",
            data: {message:dayContent.innerHTML, title:modalTitle2.innerHTML, date:messageDate},
            success: function (response) {
                if (response == "successSave") {
                    toastr.success("Salvo com sucesso.", "Pronto!")
                    tbody.innerHTML = ''
                    generateContent(messageDate)
                    if (window.innerWidth <= 425) {
                        $(dayClicked).children().append('<span class="dateBadge position-absolute top-0 start-120 translate-middle p-1  border border-light rounded-circle"></span>')
                    }else{
                        $(dayClicked).children().append('<span class="dateBadge position-absolute top-0 start-100 translate-middle p-1  border border-light rounded-circle"></span>')
                    }
                }else if(response == "messageEmpty"){
                    toastr.success("Salvo com sucesso.", "Pronto!")
                    dayContent.innerHTML = 'Sem anotações nessa data.'
                }else {
                    toastr.error("Erro ao salvar.", "Erro!")
                }
            }
        });
    }
})

delButton.addEventListener('click', ()=>{
    const res = window.confirm("Você quer mesmo excluir a anotação?")
    const messageId = modalTitle2.dataset.id

    if (res) {
        //deletar a mensagem
        $.ajax({
            type: "get",
            url: "./actions/delete.php",
            data: {id:messageId},
            success: function (response) {
                if (response == 'successDel') {
                    toastr.success("Deletado com sucesso.", "Pronto!")
                    tbody.innerHTML = ''
                    generateContent(messageDate)
                } else {
                    toastr.error("Erro ao deletar.", "Erro!")
                }
            }
        });
        backButton.click()
    } else {
        return
    }
})

divDarkMode.addEventListener('click', (e) => {
    // if (divDarkMode.dataset.dark == 'off') {
    //     divDarkMode.dataset.dark.toggle = 'on'
    // }

    // if (divDarkMode.dataset.dark == 'on') {
    //     divDarkMode.dataset.dark = 'off'
    // }
    if (e.target.classList.contains('form-switch')) {
        return
    }else if(e.target.classList.contains('form-check-label')){
        return
    }else{
        divDarkMode.classList.toggle('on')
    }

    if (divDarkMode.classList.contains('on')) {
        setDarkMode()
    }else{
        offDarkMode()
    }
})

function generateContent(messageDate){
    showLoading(modalBody1)
    $.ajax({
        type: "get",
        url: "./actions/load.php",
        data: {date:messageDate},
        success: function (response) {
            hideLoading(modalBody1)
            if (response == 'Sem anotações nessa data.') {
                $(noContent).show()
                $(addNewButton).show()
                $(addButton).hide()
                $(dayClicked).children().find('.dateBadge').remove()
            }else{
                $(noContent).hide()
                $(addNewButton).hide()
                $(addButton).show()
                const dbElement = JSON.parse(response)

                dbElement.forEach((element,index) => {
                    generateTable(element,index)
                });
            }
        }
    });
}