const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    fetch('/weather?address='+search.value).then((response) => {
   
     
         response.json().then((data) => {
             if(data.error)
                 return console.log(data.error)
             else   
                 return document.getElementById('result').innerHTML = "Location: " + data.Location + "<br>" + "Temprature:" +   data.Tempreature + 'C'
         })
     
        })
}) 