function CreateProduct(){

    let product={};

    product.id=document.getElementById("id").value;
    product.title=document.getElementById("name").value;
    product.description=document.getElementById("description").value;
    product.price=document.getElementById("price").value;
    product.rating=document.getElementById("rating").value;
    product.type=document.getElementById("type").value;
    console.log(product)

    fetch("http://localhost:3000/product",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product),
        // mode:"cors"
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        document.getElementById("addform").reset(); //reset() function will reset the form after clicking the update button that is present in modal.
       document.getElementById("message").innerHTML= `<p class="alert alert-success"> ${data.message} Successfully</p>`

    }).catch((err)=>{
        console.log(err);
    })

}


//Form Validation or Add Product validation.

function validateId(){
    let id=document.getElementById("id").value;
    if(id==""){
        document.getElementById("idError").innerText="Id should not be empty";
        return false;
    }
    if(isNaN(id)){
        document.getElementById("idError").innerText="Id must contain only number";
        return false;
    }
    document.getElementById("idError").innerText = "";
    return true;

}

function validateName(){
    let name=document.getElementById("name").value;
    let exp=new RegExp("[A-Za-z]{3,}");

    if(name==""){
        document.getElementById("nameError").innerText="Name Should not be an empty";
        return false;
    }

    if(!exp.test(name)){
        document.getElementById("nameError").innerText="Name Should not be an empty";
        return false;
    }
    document.getElementById("nameError").innerText="";
    return true
}

function validateDescription(){
    let description=document.getElementById("description").value;
    let exp = new RegExp("^[a-zA-Z0-9!@#$&?.\"' ]{10,}");

    if(description==""){
        document.getElementById("DescriptionError").innerText="Description should not be an empty";
        return false;
    }
    if(!exp.test(description)){
        document.getElementById("DescriptionError").innerText="Description must contain atleast 10 characters";
        return false;
    }
    document.getElementById("DescriptionError").innerText="";
    return true;   
}

function validatePrice(){
    let price=document.getElementById("price").value;

    if(price==""){
        document.getElementById("priceError").innerText="Price should be an empty";
        return false;
    }
    if(isNaN(price)){
        document.getElementById("priceError").innerText="Price must contain only number";
        return false;
    }
    document.getElementById("priceError").innerText="";
    return true;
}


function validatingType(){
    let type=document.getElementById("type").value;
    let exp = /^[a-zA-Z ]*$/;
    if(type==""){
        document.getElementById("typeError").innerText="Type Should not be an empty";
        return false;
    }
    if(!exp.test(type)){
        document.getElementById("typeError").innerText="Type should not contain a number";
        return false;
     }
     document.getElementById("typeError").innerText="";
     return true;

}

let errorcount=0;
function validateForm(){
    if (validateId() == false) {
        errorcount++;
    }
    if(validateName()==false){
        errorcount++;
    }
    if (validateDescription() == false) {
        errorcount++;
    }
    if (validatePrice() == false) {
        errorcount++;
    }
  
    if (validatingType() == false) {
        errorcount++;
    }

    console.log(errorcount);

    if(errorcount==0){
        CreateProduct();
    }

    errorcount=0;
}