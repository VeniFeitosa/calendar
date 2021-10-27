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
        window.onclick = (e)=>{
            // console.log(e.target)
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
        // isAnyMessage(messageDate) ? console.log('show') : console.log('peba')
        // if (isAnyMessage(messageDate)) {
        //     console.log('tem anotação')
        // }else(
        //     console.log('nao tem anotacao')
        // )
        $.ajax({
            type: "get",
            url: "./actions/load.php",
            data: {date:messageDate},
            success: function (response) {
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
            // response ? console.log('Tem anotação') : console.log('Não tem anotação')
        }
    });
}


// Eventos dos botoões

// editButton.addEventListener('click', () =>{

//     $(dayContent).hide()
//     dayContentEdit.value = dayContent.innerHTML
//     $(dayContentEdit).show();
//     $(saveButton).show()
//     $(editButton).hide();
// })

exitButton.addEventListener('click', () => {
    // $(dayContent).show()
    // $(dayContentEdit).hide()
    // $(saveButton).hide()
    // $(addButton).hide()
    // $(editButton).show()
})

modalContent.addEventListener('click', (e)=>{
    if (!e.target.dataset.index) {
        return
    } else {
        const index = e.target.dataset.index
        $.ajax({
            type: "get",
            url: "./actions/load.php",
            data: {date:messageDate},
            success: function (response) {
                const dbElement = JSON.parse(response)

                modalTitle2.innerHTML = dbElement[index].titulo
                dayContent.innerHTML = dbElement[index].content
                // console.log(dbElement[index].content)
            }
        });
    }
})

/*saveButton.addEventListener('click', () => {
    dayContent.innerHTML = dayContentEdit.value
    $(dayContent).show()
    $(dayContentEdit).hide();
    $(saveButton).hide()
    $(editButton).show();
    // console.log(messageDate)

    $.ajax({
        type: "post",
        url: "./actions/save.php",
        data: {message:dayContent.innerHTML, date:messageDate},
        success: function (response) {
            if (response == "successSave") {
                toastr.success("Salvo com sucesso.", "Pronto!")
            }else if(response == "messageEmpty"){
                toastr.success("Salvo com sucesso.", "Pronto!")
                dayContent.innerHTML = 'Sem anotações nessa data.'
            }else {
                toastr.error("Erro ao salvar.", "Erro!")
            }
        }
    });
})

addButton.addEventListener('click', () =>{

    $(dayContent).hide()
    dayContentEdit.value = ''
    $(dayContentEdit).show();
    $(saveButton).show()
    $(editButton).hide();
    $(addButton).hide()
})*/

//teste
// const dayString = '4/11/2021'

// let str = 'Resposta recebida ---> '

// async function teste(dayString){
//     const res = await $.ajax({
//         type: "post",
//         url: "./actions/isAnyMessage.php",
//         data: {date:dayString},
//         dataType:'json'
//         }).done(function (response) {
//     })
//     return res ? strRes ='Retornou TRUE' : strRes = 'Retornou FALSE'
// }

// // if (teste(dayString)) {
// //     console.log('Retornou true')
// // }else{
// //     console.log('Retornou false')
// // }
// const getResult = async (str) => {
//     const result = await teste(dayString)
//     console.log(str += result)
//     // return str += result
// }
// // str = getResult(str)
// // // setTimeout(() =>{console.log(logResult)}, 1000)
// // console.log(str)
