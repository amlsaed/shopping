// let productsinCard = localStorage.getItem("addedProducts");
var getname = localStorage.getItem("username");
var user_name = document.getElementById("user-info");



// function getProducts(){
//     if(productsinCard){
//         let added = JSON.parse(productsinCard)
//         drawUI(added);
//     }
    
// }

function drawUI(getproducts = []){
    let Allproducts = document.querySelector(".products");
    let noproducts = document.querySelector(".noproducts");

    if(JSON.parse(localStorage.getItem("addedProducts")).length ===0) {noproducts.innerHTML=`
       <span>No products in the shopping card</spn>
    `}
    let products = JSON.parse(localStorage.getItem("addedProducts")) || getproducts;

    let productsUi = products.map((item)=>{
       return `
       <div class="product-card" id=${item.id}>
                    <div class="badge">${item.rating.rate}</div>
                    <div class="product-tumb">
                      <img src=${item.image} alt="">
                    </div>
                    <div class="product-details">
                      <span class="product-catagory">${item.title}</span>
                      <h4><a onclick="saveItemdata(${item.id})" href="./details.html">Women leather bag</a></h4>
                      <p>${item.description}</p>
                      <div class="product-bottom-details">
                        <div class="product-price"><small>$96.00</small>${item.price}</div>
                        <div class="product-links">
                          <a href=""><i class="fa fa-heart"></i>fav</a>
                          <button onclick="removeFromCards(${item.id})">delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
       `
    })

    Allproducts.innerHTML = productsUi;
}
function Home(){
    if(getname){
        user_name.innerHTML="Hi " + getname;
        document.querySelector(".log_list").style.display="none";
        document.querySelector(".user_list").style.display="flex";
    }else{
        document.querySelector(".log_list").style.display="flex";
        document.querySelector(".user_list").style.display="none";
    }
}
function removeFromCards(id){
   if(JSON.parse(localStorage.getItem("addedProducts"))){
    let items = JSON.parse(localStorage.getItem("addedProducts"))
    let filtered = items.filter((item)=>item.id !== id)
    localStorage.setItem("addedProducts",JSON.stringify(filtered))
    drawUI(filtered)

   }
}
// getProducts();
Home();
drawUI();