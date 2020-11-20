const express = require("express");


const app = express();


app.use(express.static('public'));

app.get("/",function(request, response){
    response.sendFile(__dirname  + "/homepage/index.html");

});
app.get("/about",function(request, response){
    response.sendFile(__dirname  + "/AboutUs/about.html");

});
app.get("/contact",function(request, response){
    response.sendFile(__dirname  + "/contactus/contact.html");

});
app.get("/range",function(request, response){
    response.sendFile(__dirname  + "/Our Range/range.html");

});
app.get("/cart",function(request, response){
    response.sendFile(__dirname  + "/Our Range/cart.html");
});
app.get("/stores",function(request, response){
    response.sendFile(__dirname  + "/stores/stores.html");

});
app.get("/checkout",function(request, response){
    response.sendFile(__dirname  + "/Checkout/checkout.html");

});
app.get("/payment",function(request, response){
    response.sendFile(__dirname  + "/Checkout/payment.html");

});

app.get("/account",function(request, response){
    response.sendFile(__dirname  + "/MyAccount/acc.html");

});


app.listen(3000,function()
{
      console.log("Server started at 3000");
});
