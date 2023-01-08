var user_name = document.getElementById("user-info");
var logoutBtn = document.getElementById("logOut");

var getname = localStorage.getItem("username");
// fetch api
logoutBtn.addEventListener("click",logOut);





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




function logOut(e){
    window.location="./login.html";
}

Home();
// ====================products



function drawUI(products){
    let Allproducts = document.querySelector(".products");
    let productsUi = products.map((item)=>{
      console.log(item)

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
                          <button onclick="addTofavorite(${item.id})"><i class="fa fa-heart" style="color:${item.liked==true?"red":"" }"></i>fav</button>
                          <button onclick="addedToCard(${item.id})"><i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
       `
    })

    Allproducts.innerHTML = productsUi;
}

drawUI(JSON.parse(localStorage.getItem("products")) || fetch("https://fakestoreapi.com/products")
.then((res) => res.json())
.then((products) => {
  localStorage.setItem("products",JSON.stringify(products));
  let ourproducts = JSON.parse(localStorage.getItem("products")).map((ele)=>{return {...ele,qty:1}})
  localStorage.setItem("products",JSON.stringify(ourproducts));
}));


var badge = document.querySelector(".shopping_icon span");


let addedItems=localStorage.getItem("addedProducts")
?JSON.parse(localStorage.getItem("addedProducts")):[];




let AllItems = [];
function addedToCard(id){

  if(localStorage.getItem('products')){

    let chosenCard = JSON.parse(localStorage.getItem("products")).find((item)=> item.id == id);

    let Fitems = AllItems.find((i) => i.id == chosenCard.id);
    console.log(Fitems)

   if(Fitems){
    AllItems.map((item)=>item.qty+=1);
    chosenCard.qty += 1;
   }else{
      AllItems.push(chosenCard);
   }

   document.querySelector(".shopping_list ul").innerHTML=""
   AllItems.forEach((item)=>
   document.querySelector(".shopping_list ul").innerHTML+=`
           <li>${item.title} ${item.qty}</li>`
   )



    let addedLength = document.querySelectorAll(".shopping_list ul li")
    addedItems = [...addedItems,chosenCard];
    let uniqueProductts = getuniqueId(addedItems,"id")
    localStorage.setItem("addedProducts",JSON.stringify(uniqueProductts));
    
    badge.style.display="block";
    badge.innerHTML= addedLength.length ;


    

  }else{
    window.location="./login.html"
  }
  
}

function getuniqueId(arr,filterArr){
    let unique = arr
    .map((item)=>item[filterArr])
    .map((item,i,final)=>final.indexOf(item)===i && i)
    .filter((item)=> arr[item])
    .map((item)=> arr[item])
     return unique;

}

document.querySelector(".shopping_icon button").addEventListener("click",Openmenu)
function Openmenu(){
    if(document.querySelector(".shopping_list ul").innerHTML !=""){
        document.querySelector(".shopping_list").classList.toggle("openmenu")
    }
}

document.querySelector(".show_all").addEventListener("click",cardPage);
function cardPage(){
    window.location="./shoppingcard.html"
}

// ==============================
if(addedItems){
    addedItems.map((item)=>{
        document.querySelector(".shopping_list ul").innerHTML+=`<li>${item.title} ${item.qty}</li>`;
        let addedLength = document.querySelectorAll(".shopping_list ul li");
        badge.style.display="block";
        badge.innerHTML= addedLength.length;
    })
}


function saveItemdata(id){
    localStorage.setItem("productId",id);
    window.location="./details.html"
}

// ====================================
let searchBtn = document.getElementById("search-input");

searchBtn.addEventListener("keyup",function(e){
  Search(e.target.value,JSON.parse(localStorage.getItem("products")));
  if(e.target.value.trime===''){
    drawUI(JSON.parse(localStorage.getItem("products")))
  }
})
function Search(title,myArr){
  let arr = myArr.filter((items)=>items.title.indexOf(title) != -1);
  drawUI(arr)
}


let favoritmes= localStorage.getItem("productsfavorite")
     ? JSON.parse(localStorage.getItem("productsfavorite")):[]
function addTofavorite(id){
  if (localStorage.getItem("username")){
    let choosenItems = JSON.parse(localStorage.getItem('products')).find((item)=> item.id === id);
    // let uniqueProductts =
    favoritmes =[...favoritmes,choosenItems]
    choosenItems.liked = true;
    let uniqueProductts = getuniqueId(favoritmes,"id")

    localStorage.setItem("productsfavorite",JSON.stringify(uniqueProductts))

    let updated = JSON.parse(localStorage.getItem("products"))
    .map((item)=>{
       if(item.id === choosenItems.id){
        return {...item,liked:true};
       }else{
        return {...item};
       }
    })
    localStorage.setItem("products",JSON.stringify(updated));
    drawUI(updated)
  }else{
    window.location = "login.html";
  }}
  
