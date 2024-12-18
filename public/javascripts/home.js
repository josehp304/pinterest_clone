var logout_btn = document.querySelector('.logout')

logout_btn.addEventListener("click",(e)=>{
    fetch("/localhost:3000/logout",{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },body:JSON.stringify({key:'value'})
    })
})