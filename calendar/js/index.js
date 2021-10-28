const dayContent = document.querySelector('.dayContent')
const dayContentEdit = document.querySelector('.dayContentEdit')
const modalTitle2 = document.querySelector('#modal2')
const noContet = document.querySelector('.noContent')
const tbody = document.querySelector('tbody')
$(dayContentEdit).hide()

const btn = document.querySelector('#pesq')
const editButton = document.querySelector('#editButton')
const exitButton = document.querySelector('#exitButton')
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const modalBody1 = document.querySelector('#modal-body-1')

let messageDate
let anyMessage
const saveButton = document.querySelector('#saveButton')
const addButton = document.querySelector('#addButton')
$(saveButton).hide();
$(addButton).hide()

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
        $(noContet).hide()
        showLoading(modalBody1)

        let dataDay
        let day
        window.onclick = (e)=>{
            if (e.target == modal) {
                $(dayContent).show()
                $(dayContentEdit).hide()
                $(saveButton).hide()
                $(addButton).hide()
                $(editButton).show()
            }
        }

        if (!e.target.dataset.date) {
            const span = e.target
            day = $(span).parent()[0]
            dataDay = day.dataset.date
        }else{
            day = e.target
            dataDay = e.target.dataset.date
        }

        const data = new Date(dataDay)
        messageDate = `${data.getDate()}/${data.getMonth() +1}/${data.getFullYear()}`
        tbody.innerHTML = ''
        isAnyMessage(messageDate)

        $.ajax({
            type: "get",
            url: "./actions/load.php",
            data: {date:messageDate},
            success: function (response) {
                hideLoading(modalBody1)

                if (response == 'Sem anotações nessa data.') {
                    $(noContet).show()
                }else{
                    $(noContet).hide()
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

function isAnyMessage(messageDate){
    $.ajax({
        type: "post",
        url: "./actions/isAnyMessage.php",
        data: {date:messageDate},
        dataType:'json',
        success: function (response) {
        }
    });
}

modalContent.addEventListener('click', (e)=>{
    if (!e.target.dataset.index) {
        return
    } else {
        const index = e.target.dataset.index

        modalTitle2.innerHTML = ''
        dayContent.innerHTML = ''
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
                dayContent.innerHTML = dbElement[index].content
            }
        });
    }
})
