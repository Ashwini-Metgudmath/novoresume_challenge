const { default: Product } = require("../../frontend/src/components/product/product");

module.exports = (
  firstName,
  lastName,
  billingAdress,
  postalCode,
  email,
  phNumber, 
  products
) => {

    let total = 0;
    const productsList = products.map((product, index) =>{
        total = total+product.price;
    return `<div>
                <h4>${product.title}</h4>
                <p>${product.description}</p>
            </div>`
    })

 return  `
<!DOCTYPE html>
<html>
    <head>
    <style>
    body{
font-family: sans-serif, serif;

}
.heading{
text-align: left;
background-color: #F5F5F5;
border-radius: 20px;
margin-left: 3rem;
margin-right: 3rem;
padding: 0.001rem;
padding-left: 2rem;
}

.user-info{
display: flex;
flex-direction: row;
margin-top: 2rem;
margin-left: 7rem;
margin-right: 5rem;
}

.info{
margin-right: 15rem;
margin-left: 2rem;
}

.bill{
display: flex;
}
.push {
margin-left: auto;
margin-right: 3rem;
}
.col1{
margin-right: 2rem;
}
.col2{
margin-left: 2rem;;
}


</style>
    </head>
    
    <body>
        <div class="heading">
            <h1>Billing Information</h1>
        </div>
        <div class="user-info">
            <div class="col1">
                <h3>First Name  Last name</h3>
                <p>${firstName}  ${lastName}</p>
                <h3>Billing Adress</h3>
                <p>${billingAdress}</p>
                <h3>Postal Code</h3>
                <p>${postalCode}</p>
            </div>
            <div >
                <h3>Email</h3>
                <p>${email}</p>
                <h3>Telephone number</h3>
                <p>${phNumber}</p>
            </div>
        </div>
        <div class="heading">
            <h1>Products</h1>
        </div>
        <div >
        <div></div>
            <div class="products">
            ${productsList}
            </div>
           
        </div>
        <div class="heading bill">
            <div><h1>Total</h1></div>
            <div class="push" ><h1>$${total}</h1></div>
        </div>
        <footer>
            <div class="bill">
                <div><h4>09/08/2020</h4></div>
                <div class="push"><h4>page 1</h4></div>
            </div>
        </footer>
    </body>
    </html>`;

      
};
