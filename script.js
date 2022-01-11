$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        700:{
            items:2
        },
        1000:{
            items:3
        },
        // 1400:{
        //     items:3
        // }
    }
});

// login-page
// Get the modal
var modal = document.getElementById('login');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//  CART ICON WITH BADGE

//  let count=0;
//  function cart() {
//      count+=1;
//      a.innerHTML=count;
//      a.style.display = "block";
     
//  }


//  SHOW NO OF UNITS IN CART
var a=document.getElementById("kart");
function cart() {
    let count=0;
  carts.forEach((item)=>{
    count+=item.numberofunits;

  });
  a.innerHTML=count;
  if (count==0) {
    a.style.display = "none";
      
  }
  else{
  a.style.display = "block";
  }
}
     


 
  

//  home page product section
const NewProduct = document.querySelector('#renderproducts');
const addtocartEl= document.querySelector('#addtocartrender');
const subtotalEl= document.querySelector('.subtotal');


// show function products
function showproduct(){
    products.forEach((product) =>{
        NewProduct.innerHTML +=`<div class="col-6 col-md-4 d-flex justify-content-center">
        <div class="card mx-auto" style="width: 15rem">
          <img
            src="${product.imgsrc}"
            class="card-img-top p-2"
            alt="${product.name}"
          />
          <div class="card-body">
            <h3 class="card-title">${product.name}</h3>
            <h4 class="card-text">$${product.price}</h4>
            <a class="btn btn-primary item-cart" onclick="maincart(${product.id})" style="width:100%">Add to Cart</a>
            <a href="#" class="btn btn-primary item-cart mt-2" style="width:100%">Buy now</a>
          </div>
        </div>
      </div> 
        ` 


    });

}
showproduct();//for showing the products on page

// cart array
let carts=JSON.parse(localStorage.getItem("CART")) ||[];
updatecart();

// add to cart
function maincart(id){
    // if products already exist in cart
    if(carts.some((item)=> item.id===id)){
        changeNumberOfUnits('plus',id);
    }
    else{
        const item = products.find((product)=> product.id === id);
        carts.push({
            ...item,
            numberofunits:1,
        });
    }
    updatecart();
};

// updatecart
function  updatecart(){
    rendercartItems();
    rendersubtotal();
   // save cart to localStorage
   localStorage.setItem("CART",JSON.stringify(carts));


   
};
// CALCULATE AND RENDER SUBTOTAL
function rendersubtotal() {
    let totalPrice=0, totalItems=0;
    carts.forEach((item)=>{
        totalPrice+=item.price*item.numberofunits;
        totalItems+=item.numberofunits;
    });
    subtotalEl.innerHTML= `subtotal(${totalItems} items):$${ totalPrice.toFixed(2)}`
    cart();

    
}
// render cart items
function rendercartItems(){
    addtocartEl.innerHTML="";// clear cart element
    carts.forEach((item)=>{
        addtocartEl.innerHTML+=`<div>
        <div class="text-center">
            <div class="row mt-3">
                <div class="col-6 d-flex flex-column  justify-content-center align-items-center ">
                    <img  class=" img-fluid"src="${item.imgsrc}" alt="${item.name}" style="width:13rem">
                    <p class="px-3">${item.name}</p>
                  
                </div>
                
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <span class="minus" onclick="changeNumberOfUnits('minus',${item.id})"><i class="bi bi-dash-circle-fill"></i></span>&nbsp;
                    <span > ${item.numberofunits}&nbsp;&nbsp; </span>
                    <span class="plus" onclick="changeNumberOfUnits('plus',${item.id})"><i class="bi bi-plus-circle-fill"></i></span>
                </div>
                <div class="col-3 d-flex justify-content-center align-items-center" >$${item.price}</div>
                <div  class="col-12 d-flex justify-content-center align-items-center"><span  onclick="removeItemFromCart(${item.id})">Remove <i class="bi bi-trash"></i></span></div>

            </div>
        </div>
    </div>`
    })
    
}


// REMOVE ITEM FROM CART
function removeItemFromCart(id) {
    carts= carts.filter((item)=>item.id !==id);

 updatecart();   
}
//  CHANGE NUMBER OF UNITS
function changeNumberOfUnits(action,id){
    carts= carts.map((item)=>{
        let oldnumberofunits= item.numberofunits
        if(item.id===id ){
            if(action==='minus'&& oldnumberofunits > 1){
                oldnumberofunits--;

            }
            else if(action==='plus' && oldnumberofunits< item.instock){
                oldnumberofunits++;
            }

        }
        return{
            ...item,
            numberofunits: oldnumberofunits,
        };

    });
    updatecart();
     
}
