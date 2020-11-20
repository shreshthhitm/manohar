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
             var name = childsnap.val().name;
             var contact = childsnap.val().number;
             var email = childsnap.val().username;
             var address = childsnap.val().address;
             var city = childsnap.val().city;
             var state = childsnap.val().state;
             var zip = childsnap.val().zip;
             $("#userName").append("<span>"+name +"</span>");
             $("#userEmail").append("<span>"+email +"</span>");
             $("#userContact").append("<span>"+contact +"</span>");
             if(address!="-1" && city!="-1" && state!="-1" && zip!="-1"){
                 $("#userAddress").append("<span>"+address +"</span>");
                 $("#userCity").append("<span>"+city +"</span>");
                 $("#userZip").append("<span>"+zip +"</span>");
                 $("#userState").append("<span>"+state +"</span>");
             }
           } 
        })
    })
}
 
});
$(window).on('shown.bs.modal', function() {
      $('#signup').modal('show');
      firebase.database().ref('users/' + rkey).on('value', function(snapshot) {
          document.getElementById('email1').value = snapshot.val().username;
          document.getElementById('number1').value = snapshot.val().number;
          document.getElementById('name1').value = snapshot.val().name;
          if(snapshot.val().address!="-1" && snapshot.val().city!="-1" && snapshot.val().state!="-1" && snapshot.val().zip!="-1"){
              document.getElementById('city1').value = snapshot.val().city;
             document.getElementById('state1').value = snapshot.val().state;
             document.getElementById('zip1').value = snapshot.val().zip;
             document.getElementById('address1').value = snapshot.val().address;
          }
      })
  });

$("#editChanges").click(function() {
      var name = document.getElementById('name1').value;
     
      var contact = document.getElementById('number1').value;
      var address = document.getElementById('address1').value;
      var city = document.getElementById('city1').value;
      var state = document.getElementById('state1').value;
      var zip = document.getElementById('zip1').value;
      firebase.database().ref('users/' + rkey).update({
          name: name,
          number: contact,
          city:city,
          address:address,
          zip:zip,
          state:state
      });
      window.alert("Your Changes have been done!");
      window.location.reload();
  });