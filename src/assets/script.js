
document.querySelectorAll('input').forEach((item)=>{
    item.addEventListener("focus",function(){
        item.previousElementSibling.className = 'label-selected';
    })
    item.addEventListener("blur",function(){
        if(item.value = ''){
        item.previousElementSibling.className = '';

        }
    })
})

