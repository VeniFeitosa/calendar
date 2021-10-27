const dayContent = document.querySelector('.contentM2')
const dayContentEdit = document.querySelector('.dayContentEdit')
const form = document.querySelector('.form')
const titulo = document.querySelector('.titulo')
const modalTitle2 = document.querySelector('#modal2')
const noContent = document.querySelector('.noContent')
const tbody = document.querySelector('.contentM1')
$(form).hide()

const btn = document.querySelector('#pesq')
const editButton = document.querySelector('#editButton')
const exitButton = Array.from(document.querySelectorAll('.exitButton'))
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')

let messageDate
let anyMessage
let dayClicked

const saveButton = document.querySelector('#saveButton')
const saveNewButton = document.querySelector('#saveNewButton')
const addButton = document.querySelector('#addButton')
const addNewButton = document.querySelector('#addNewButton')
const backButton = document.querySelector('#backButton')
const backButton2 = document.querySelector('#backButton2')
$(saveButton).hide()
$(addNewButton).hide()
$(saveNewButton).hide()
$(backButton2).hide()

const data = new Date()

//toastr config
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

btn.addEventListener('click', () => {
    const dia = data.getDate()
    const ano = data.getFullYear()
    const mes = document.querySelector('#mes').value

    // console.log(`${dia}/${mes}/${ano}`)
    $('#calendar').calendar({
        date: `${mes}/${dia}/${ano}`,
        enableMonthChange: false,
        showTodayButton: false
    })
    const dias = Array.from(document.querySelectorAll('.day')).filter((element) => !element.classList.contains('header'))

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
                        $(elemSpan).append('<span class="dateBadge position-absolute top-0 start-120 translate-middle p-1 bg-warning border border-light rounded-circle"></span>')
                    }else{
                        $(elemSpan).append('<span class="dateBadge position-absolute top-0 start-100 translate-middle p-1 bg-warning border border-light rounded-circle"></span>')
                    }
                }
            }
        });
    });

    const diasDealer = document.querySelector(".dias")

    diasDealer.addEventListener('click', (e) => {
        let dataDay
        let day

        dayClicked = e.target

        window.onclick = (e)=>{
            // console.log(e.target)
            if (e.target == modal) {
                $(dayContent).show()
                $(form).hide()
                $(saveButton).hide()
                $(addNewButton).hide()
                $(editButton).show()
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

        // e.classList.toggle('clicked')

        const data = new Date(dataDay)
        messageDate = `${data.getDate()}/${data.getMonth() +1}/${data.getFullYear()}`
        tbody.innerHTML = ''

        $.ajax({
            type: "get",
            url: "./actions/load.php",
            data: {date:messageDate},
            success: function (response) {
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


// Eventos dos botoões

editButton.addEventListener('click', () =>{
    console.log()
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
    // $(saveButton).show()
    $(editButton).hide()
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
    $(addNewButton).hide()
    $(backButton).show()
    $(backButton2).hide()
})

backButton.addEventListener('click', () => {
    // $(dayContent).show()
    // $(form).hide()
    $(saveButton).hide()
    $(saveNewButton).hide()
    $(addNewButton).hide()
    // $(editButton).show()
    // console.log('exit')
})

backButton2.addEventListener('click', () => {
    // $(dayContent).show()
    // $(form).hide()
    $(saveButton).hide()
    $(saveNewButton).hide()
    $(backButton).show()
    $(backButton2).hide()
    $(addNewButton).show()
    $(addButton).hide()
    // $(editButton).show()
    // console.log('exit')
})

exitButton.forEach(element => {
    element.addEventListener('click', () => {
        // $(dayContent).show()
        // $(form).hide()
        $(saveButton).hide()
        $(saveNewButton).hide()
        // $(addNewButton).show()
        // $(editButton).show()
        // console.log('exit')
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

        const index = e.target.dataset.index
        $.ajax({
            type: "get",
            url: "./actions/load.php",
            data: {date:messageDate},
            success: function (response) {
                const dbElement = JSON.parse(response)

                modalTitle2.innerHTML = dbElement[index].titulo
                modalTitle2.setAttribute('data-id', dbElement[index].id)
                dayContent.innerHTML = dbElement[index].content
                // console.log(dbElement[index].content)
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

    $.ajax({
        type: "post",
        url: "./actions/save.php",
        data: {message:dayContent.innerHTML, title:modalTitle2.innerHTML, date:messageDate},
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
            }
        }
    });
})

saveNewButton.addEventListener('click', () => {
    dayContent.innerHTML = dayContentEdit.value
    modalTitle2.innerHTML = titulo.value
    $(dayContent).show()
    $(form).hide()
    $(saveNewButton).hide()
    $(editButton).show()

    $.ajax({
        type: "post",
        url: "./actions/saveNew.php",
        data: {message:dayContent.innerHTML, title:modalTitle2.innerHTML, date:messageDate},
        success: function (response) {
            if (response == "successSave") {
                toastr.success("Salvo com sucesso.", "Pronto!")
                tbody.innerHTML = ''
                generateContent(messageDate)
                // loadCalendar(data, messageDate)
                if (window.innerWidth <= 425) {
                    $(dayClicked).children().append('<span class="dateBadge position-absolute top-0 start-120 translate-middle p-1 bg-warning border border-light rounded-circle"></span>')
                }else{
                    $(dayClicked).children().append('<span class="dateBadge position-absolute top-0 start-100 translate-middle p-1 bg-warning border border-light rounded-circle"></span>')
                }
            }else if(response == "messageEmpty"){
                toastr.success("Salvo com sucesso.", "Pronto!")
                dayContent.innerHTML = 'Sem anotações nessa data.'
            }else {
                toastr.error("Erro ao salvar.", "Erro!")
            }
        }
    });
})

function generateContent(messageDate){
    $.ajax({
        type: "get",
        url: "./actions/load.php",
        data: {date:messageDate},
        success: function (response) {
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
}
