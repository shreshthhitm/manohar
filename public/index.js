
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDglr5HLdOstQJsiRQ01Nje1N90izaitqY",
    authDomain: "manohar-280dc.firebaseapp.com",
    databaseURL: "https://manohar-280dc.firebaseio.com",
    projectId: "manohar-280dc",
    storageBucket: "manohar-280dc.appspot.com",
    messagingSenderId: "402827788048",
    appId: "1:402827788048:web:3d4c0196603c950d856f95",
    measurementId: "G-B3CHT37CXM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth.Auth.Persistence.LOCAL;

 $("#btn-logout").click(function () {
  alert("logged out");
  document.querySelector('#log').style.display='block';
  document.querySelector('#btn-logout').style.display='none';
  firebase.auth().signOut();
});


 var users=firebase.database().ref().child("users");
$("#sign").click(function()
{
var email=$("#exampleInputEmail1").val();
var password=$("#exampleInputPassword1").val();
var name=$("#name").val();

var number=$("#number").val();
var re_pass=$("#repeat-pass").val();
  //Create User with Email and Password
  if(password == re_pass)
  {
     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    window.alert("Message: "+ errorMessage);
    });
     var newuser=users.push();
    firebase.database().ref('users/'+newuser.key).set({
       username:email,
       password:password,
       name:name,
       number:number,
       address:-1,
       state:-1,
       city:-1,
       zip:-1
      //  mycart: {
      //   "pro1":"hello"
      //   },
    });
    
  }
  else{
    alert("passwords do not match");
  }
});


$("#btn-login").click(function()
{
var email=$("#exampleInputEmail").val();
var password=$("#exampleInputPassword").val();

if(email!=""&&password!=""){
    var result = firebase.auth().signInWithEmailAndPassword(email,password);
    result.catch(function(error)
    {
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log(errorCode);
      console.log(errorMessage);
      window.alert("Message: "+ errorMessage);
    });
   
}
else{
  window.alert("Please fill out all fields.");
}
});




// adding cart
// var currentkey;
// function check(key){
//   firebase.auth().onAuthStateChanged(function(user){
//       if(!user)
//       {
//         alert("please login");
//       }
//       else{
//        var curruser = firebase.auth().currentUser;
//        curremail=user.email;
//        firebase.database().ref('users').on('value',snap=>{
//           snap.forEach(childsnap=>{
//             var cem=childsnap.child("username").val();
//             if(cem==curremail)
//             {
//                currentkey=childsnap.key;
//                firebase.database().ref('users/'+currentkey+'/mycart/'+key).set({
//                   key:key,
//                 });
//             }
//           });

//        });
  //       firebase.database().ref('products/' + key).on('value', snapshot => {
  //         var name=snapshot.val().name;
  //         var price=snapshot.val().price;
  //         alert("1 "+name+" added");
          
  //       });

  //     }
  //   });
  // }

var rootRef=firebase.database().ref().child("products");
   
  rootRef.on("child_added",childSnap=>{
    // alert("hi");
    // snap.forEach(childSnap=>{
      var name=childSnap.child("name").val();
      var price=childSnap.child("price").val();
      var type=childSnap.child("type").val();
       var image=childSnap.child("image").val();
    
      if(type=="biscuit")
      {
          $("#biscuit").append(
            "<div class='col-md-3' style='display:inline-block; margin-bottom:20px'><div class='card ' ><img src='"+image+"' class='card-img-top' alt='image'><div class='card-body' >"
            +"<h5 style='text-align:center;text-transform:uppercase;'>"+name+
            "</h5>"+"<p class='card-text' style='inline-block' >"+price+"<i class='fas fa-cart-plus add-to-cart' onclick=addproduct('"+childSnap.key+"')  style='position:absolute;right:0; padding-right:10px;'>"+"</i>"+"</p>"+"</div></div></div>");

      }
      if(type=="sweets")
      {
          $("#sweets").append(
            "<div class='col-md-3' style='display:inline-block;margin-bottom:20px'><div class='card '  ><img src='..' class='card-img-top' alt='image'><div class='card-body' >"
            +"<h5 >"+name+
            "</h5>"+"<p class='card-text' style='display:inline;'>"+price+"</p>"+"</div></div></div>");
      }
    // });
    
  });

 function addproduct(key){
  cartnumbers();
   firebase.database().ref('products/' + key).on('value', snapshot => {
          var name=snapshot.val().name;
          var price=snapshot.val().price;
          let product={
            id:key,
            tag:name,
            name:name,
            price:price,
           
            inCart:0
          }
         setItems(product);  
         totalCost(product); 
    });
 }
 function cartnumbers(product, action) {
  let producNumbers =localStorage.getItem('cartnumbers');
  producNumbers = parseInt(producNumbers);

  let cartItems =localStorage.getItem('productsincart');
  cartItems = JSON.parse(cartItems);

  if( action ) {
     localStorage.setItem("cartnumbers", producNumbers - 1);
      document.querySelector('.cart span').textContent = producNumbers - 1;
      console.log("action running");
  } else if(producNumbers){
   localStorage.setItem('cartnumbers',producNumbers+1);
    document.querySelector('.cart span').textContent=producNumbers+1;
  }
  else{
   localStorage.setItem('cartnumbers',1);
    document.querySelector('.cart span').textContent=1;
  }
}

 function setItems(product){
  let cartItems=localStorage.getItem('productsincart');
  cartItems=JSON.parse(cartItems);
  if(cartItems!=null){
    if(cartItems[product.tag]==undefined){
      cartItems={
        ...cartItems,
        [product.tag]:product
      }
    }
    cartItems[product.tag].inCart+=1;
  }
  else{
      product.inCart=1;
     cartItems={
       [product.tag]:product
    }

  }

 localStorage.setItem("productsincart",JSON.stringify(cartItems));
 }
 function onLoadCartNumbers(){
  let producNumbers=localStorage.getItem('cartnumbers');
  if(producNumbers){
    document.querySelector('.cart span').textContent=producNumbers;
  }
 }


 function totalCost(product,action){
     let cartCost=localStorage.getItem('totalCost');
     if( action) {
      cartCost=parseInt(cartCost);

     localStorage.setItem("totalCost", cartCost - product.price);
  } else
     if(cartCost!=null){
      cartCost=parseInt(cartCost);
     localStorage.setItem("totalCost",cartCost+product.price);
     }
     else{
     localStorage.setItem("totalCost",product.price);
     }
 }
 function displayCart() {
  let cartItems =localStorage.getItem('productsincart');
  cartItems = JSON.parse(cartItems);
console.log(cartItems);
  let cart =localStorage.getItem("totalCost");
  cart = parseInt(cart);

  let productContainer = document.querySelector('.products');
  
  if( cartItems && productContainer ) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map( (item, index) => {
          productContainer.innerHTML += 
          `<div class="product col-md-4 col-sm-3"  style="text-align: center; "><ion-icon name="close-circle"></ion-icon><img class="sm-hide" src="./images/${item.tag}.jpg" />
              <span class=" ">${item.name}</span>
          </div>
          <div class="price  col-md-2 col-sm-3"  style="text-align: center;"><i class="fas fa-rupee-sign">  </i>&nbsp ${item.price}</div>
          <div class="quantity col-md-3 col-sm-3" style="text-align: center;align-items: center;">
              <ion-icon class="decrease  " name="arrow-dropleft-circle"></ion-icon>
                  <span>${item.inCart}</span>
              <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
          </div>
          <div class="total sm-hide md-col-3 col-sm-3" style="text-align: center;align-items: center;"><i class="fas fa-rupee-sign"> </i>&nbsp ${item.inCart * item.price}</div>`;
      });

      productContainer.innerHTML += `
          <div class="basketTotalContainer">
              <h4 class="basketTotalTitle">Basket Total</h4>
              <h4 class="basketTotal"><i class="fas fa-rupee-sign"></i>&nbsp${cart}</h4>
          </div>`

      deleteButtons();
      manageQuantity();
  }
}

function manageQuantity() {
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');
  let currentQuantity = 0;
  let currentProduct = '';
  let cartItems =localStorage.getItem('productsincart');
  cartItems = JSON.parse(cartItems);

  for(let i=0; i < increaseButtons.length; i++) {
      decreaseButtons[i].addEventListener('click', () => {
          console.log(cartItems);
          currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
          console.log(currentQuantity);
          currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent;
          console.log(currentProduct);

          if( cartItems[currentProduct].inCart > 1 ) {
              cartItems[currentProduct].inCart -= 1;
              cartnumbers(cartItems[currentProduct], "decrease");
              totalCost(cartItems[currentProduct], "decrease");
             localStorage.setItem('productsincart', JSON.stringify(cartItems));
              displayCart();
          }
      });

      increaseButtons[i].addEventListener('click', () => {
          console.log(cartItems);
          currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
          console.log(currentQuantity);
          currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent;
          console.log(currentProduct);

          cartItems[currentProduct].inCart += 1;
          cartnumbers(cartItems[currentProduct]);
          totalCost(cartItems[currentProduct]);
         localStorage.setItem('productsincart', JSON.stringify(cartItems));
          displayCart();
      });
  }
}

function deleteButtons() {
  let deleteButtons = document.querySelectorAll('.product ion-icon');
  let productNumbers =localStorage.getItem('cartnumbers');
  let cartCost =localStorage.getItem("totalCost");
  let cartItems =localStorage.getItem('productsincart');
  cartItems = JSON.parse(cartItems);
  let productName;
  console.log(cartItems);

  for(let i=0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', () => {
          productName = deleteButtons[i].parentElement.textContent.trim();
          console.log(productName);
         localStorage.setItem('cartnumbers', productNumbers - cartItems[productName].inCart);
         localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

          delete cartItems[productName];
         localStorage.setItem('productsincart', JSON.stringify(cartItems));

          displayCart();
          onLoadCartNumbers();
      })
  }
}
// firebase.auth().onAuthStateChanged(function(user){
//   if(user)
//   {
//     var user = firebase.auth().currentUser;
// var useremail=user.email;


// firebase.database().ref('users/' ).on("value",function(snapshot){
//     snapshot.forEach(function(childsnap){
//          if(useremail==childsnap.username){
//           document.getElementById('firstName').value = snapshot.val().name;
//           document.getElementById('contact').value = snapshot.val().number;
//           document.getElementById('email').value = snapshot.val().username;
//          }
//     })
  

// });
// }})

$("#checkout").click(function (){
  let producNumbers =localStorage.getItem('cartnumbers');
  producNumbers = parseInt(producNumbers);

  firebase.auth().onAuthStateChanged(function(user){
      if(!user)
      {
        alert("please login");
      }

      else{ if(producNumbers==0){
    alert("Your Cart is empty");}
  

  else{
    window.location.href="/checkout";
    
  }}

     

    });

  
  // if(producNumbers==0){
  //   alert("Your Cart is empty");}
  

  // else{
  //   window.location.href="checkout/checkout-page.html"
  // }




    
});

onLoadCartNumbers();
displayCart();

// contactus
var firstname,lastname,email,comment;
function ReadInput(){
  firstname=document.getElementById('fname').value;
  lastname=document.getElementById('lname').value;
  email=document.getElementById('email').value;
  comment=document.getElementById('comment').value;
}

 var contacts=firebase.database().ref().child("contacts");
$("#submit").click(function(){
  
  ReadInput();

  var newcontact=contacts.push();
  firebase.database().ref('contacts/'+newcontact.key).set({
     firstname:firstname,
      lastname:lastname,
    email:email,
    comment:comment,
  });
  document.querySelector('.alert').style.display='block';
  setTimeout(function(){
    document.querySelector('.alert').style.display='none';
  },3000);
});









