const data = document.getElementById('comments-text').textContent
    const separador = '.'
  
    const newArray = data.split(separador)
    const dataText = document.getElementById('comments-text')
  
    document.getElementById('comments-text').textContent = ''
    newArray.map((el, i)=>{
      dataText.innerHTML += `
        <li>${el}.</li>
      `
    })  