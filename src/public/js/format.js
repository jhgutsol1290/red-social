'use strict'

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

const duration = document.querySelector('.duration-text').textContent
const res = duration.replace('.', ':')
document.querySelector('.duration-text').innerHTML = res