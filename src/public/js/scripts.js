$('#btn-like').click(function(e){
    e.preventDefault()
    let videoID = $(this).data('id')
    
    $.post('/video/' + videoID + '/like')
        .done(data => {
            $('.likes-count').text(data.likes)
        })
})

$('#btn-delete').click(function(e){
    e.preventDefault()
    const password = prompt('Ingresa contraseña para eliminar contenido...')
    if(password === 'P4ssw0rd'){
        const response = confirm('¿Seguro que desea eliminar video?')
        if(response){
            let videoID = $(this).data('id')
            $.ajax({
                url: '/video/' + videoID,
                type: 'DELETE'
            })
            .done(data=>{
                window.location.href = '/'
            })
        }
    }else{
        alert('Contraseña inválida')
    }
})

$('#btn-edit').click(function(e){
    e.preventDefault()
    const password = prompt('Ingresa contraseña para editar contenido...')
    if(password === 'P4ssw0rd'){
        const res = confirm('¿Seguro que desea editar video?')
        if(res) {
            var videoID = $(this).data('id')
            $.ajax({
                url: '/video/edit/' + videoID,
                type: 'GET'
            })
            .done(data => {
                window.location = '/video/edit/' + videoID
            })
        }
    } else {
        alert('Contraseña inválida')
    }
})


let dateText = document.getElementsByClassName('date-text')
let arrayDates = Array.from(dateText)
let newArrayDates = arrayDates.map(el=>el.textContent)

newArrayDates.map((el, i)=>{
    dateText[i].innerHTML = newArrayDates[i].substr(0,10)
})