
  var rkey;

  firebase.auth().onAuthStateChanged(function(user){
    if(user)
    {
      var user = firebase.auth().currentUser;

  useremail=user.email;
  
  
firebase.database().ref('users/' ).on("value",function(snapshot){
 
    snapshot.forEach(function(childsnap){
      
         if(useremail==childsnap.val().username.toLowerCase()){
             rkey=childsnap.key;
         }
    
        })
    })
}
 
});

  $("#pay").click(function() {
  var address = document.getElementById("address").value;
        
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;
  var zip = document.getElementById("zip").value;
firebase.database().ref('users/'+ rkey ).update({
    address : address,
     state:state,
     city:city,
     zip:zip
  });
})

