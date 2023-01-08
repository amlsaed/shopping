let pro_name = document.getElementById("product_name");
let pro_desc = document.getElementById("product_desc");
let pro_size = document.getElementById("pro-size");
let pro_size_value;
let pro_img = document.getElementById("pro_img");
let pro_img_value;

let pro_add = document.getElementById("add_btn");
let pro_form = document.getElementById("add_form");

pro_size.addEventListener("change",function(e){
    pro_size_value =  e.target.value
})
pro_img.addEventListener("change",function(e){
    let file = this.file[0]
    pro_img_value =  e.target.value;
    if(file.type == "image/jpeg" || file.type == "image/png"){
         alert("type");
         return;
    }
})


pro_form.addEventListener("submit",function(e){
    e.preventDefault();
    let name_val = pro_name.value;
    let desc_val = pro_desc.value;
    let getAll = JSON.parse(localStorage.getItem("products"));
    let obj={
        id: getAll.length + 1,
        title: name_val,
        price:22.3, 
        description:desc_val,
        category:"men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", 
        qty:1,
        rating:{},
    }
    let new_pros = [...getAll,obj]
    localStorage.setItem("products",JSON.stringify(new_pros))
     console.log(obj);
     new_pros=[];

}
)
