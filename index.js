let automobile = [
    {id: 1, title: 'Mersedes', price: 50000, img: 'https://lh3.googleusercontent.com/proxy/n3dIU2Jeeg4qnNPbMTVyyNeLsfRBSH1GJUqJCkH8SHXyroU1ZlhzaAc6FdsXW_QLZRFj9r_VYcGtt-uhXPQpHjmmRKE'},
    {id: 2, title: 'BMW', price: 40000, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/BMW_G11_IMG_2002.jpg/1200px-BMW_G11_IMG_2002.jpg'},
    {id: 3, title: 'Opel', price: 20000, img: 'https://kolesa-uploads.ru/-/e0599038-3198-4770-b3b4-e1dc0ccdb149/opel-astra-sports-tourer-front1-mini.jpg'}
]

const toHTML = automobile =>`
<div class="col">
<div class="card" >
    <img style='height: 300px;' class="card-img-top" src="${automobile.img}" alt="${automobile.title}">
    <div class="card-body">
      <h5 class="card-title">${automobile.title}</h5>
      
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${automobile.id}">Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-btn="remove"  data-id="${automobile.id}">Удалить</a>
    </div>
  </div>
</div>`

function render(){
    const html = automobile.map(toHTML).join('')
    document.querySelector('#automobile').innerHTML = html
}

render()

const priceModal = $.modal({ 
    title: 'Цена на автомобиль',
    closable: true,
   
    width: '400px',
    footerButtons: [
         {text:'Закрыть', type: 'primary', handler(){
            console.log('Primary btn clicked')
            priceModal.close()
        }},
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const automobi = automobile.find(f => f.id === id)

    if(btnType === 'price'){
        
        priceModal.setContent(`
        <p>Цена на ${automobi.title}: <strong>${automobi.price}$</strong></p>
        `)

        priceModal.open()  
    } else if (btnType === 'remove'){
        $.confirm({
            title:'Вы уверены',
            content:`<p>Вы удаляете автомобиль: <strong>${automobi.title}</strong></p>`
            
        }).then (()=> {
            automobile = automobile.filter(f => f.id !== id)
            render()
        }).catch(()=>{
            console.log('Cancel')
        })

      
    }
})