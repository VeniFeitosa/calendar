// var resAjax = $.ajax({
//     type: "post",
//     url: "./actions/isAnyMessage.php",
//     data: {date:dayString},
//     dataType:'json'
//   }).done(function (response) {
//     // return response
//     if (response) {
//       // console.log(isMessage)
//        str = 'show'
//     }else{
//       // console.log('nao')
//        str = 'notShow'
//     }
// })
const dayString = '7/1/2021'

function teste(dayString){
    $.ajax({
        type: "post",
        url: "./actions/isAnyMessage.php",
        data: {date:dayString},
        dataType:'json'
        }).done(function (response) {
        return response
    })
}

async function teste2(){
    try {
        const res = await teste(dayString)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}
teste2()

