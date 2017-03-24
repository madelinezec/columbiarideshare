 function initApp() {
     this.auth = firebase.auth();
       this.database = firebase.database();
	 console.log('initApp called');
      firebase.auth().getRedirectResult().then(function(result) {
        //    document.getElementById('quickstart-sign-in').textContent = 'LOG OUT';
        //    console.log('changing log out value');
         //   document.getElementById('quickstart-sign-in').addEventListener('click', googleSignOut);
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // [START_EXCLUDE]
         console.log('you got access token');
         
        } else {
          console.log('you dont have access token');
          // [END_EXCLUDE]
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
           
            window.currentUser = user;
	    console.log(user);
	    console.log('success');
	    document.getElementById('quickstart-sign-in').textContent = 'LOG OUT';
	    document.getElementById('quickstart-sign-in').addEventListener('click', googleSignOut);
          return true;
        }else{
	document.getElementById('quickstart-sign-in').textContent = 'LOGIN';
	document.getElementById('quickstart-sign-in').addEventListener('click', 
	function(){
	    document.getElementById('id01').style.display='block';
	    });
	
         // 
         return false; 
	}
    });
   }
 function googleSignOut(){
    console.log('sign out called');
    firebase.auth().signOut();
  window.location = "index.html";
 }

 function googleSignin(){
    console.log('you get called');
	    event.preventDefault();
	    var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithRedirect(provider);
    }

function facebookSignIn(){
    event.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);

}


   function rideToPressed(){
       event.preventDefault();
       if(window.currentUser){    

	console.log("correct you got here");
           var e = document.getElementById("airport");
           var airportSelect = e.options[e.selectedIndex].text;
           if(airportSelect.indexOf(' ') > -1){
               airportSelect = airportSelect.substring(0, airportSelect.indexOf(' ')); 
           }
           var date = $("#datepicker").datepicker('getDate');
           var res = String(date);
           console.log(res);
           res = res.substr(0,15);
           console.log('new res' + res);
	   var fromTime = $("#startTime").val();
	   var toTime = $("#endTime").val();
	   
	   console.log(airportSelect);
	   console.log(fromTime + ' ' + toTime);
	   var text = document.getElementById('comment').value;
	   console.log(text);
	   
	   writeRideTo(airportSelect, currentUser.displayName, currentUser.email, currentUser.photoURL, res, fromTime, toTime, text);
          }else{
              console.log('you are definitely not signed in');
              document.getElementById('id01').style.display='block';
              console.log('you are not signed in');
          }
          

       }

       function writeRideTo(airportSelect, userName, userEmail, photoID, date, startTime, endTime, text){
          var ref = firebase.database().ref();
          var postsRef = ref.child('TOairport/' + airportSelect); 
          var newPostRef = postsRef.push();
          var postID = newPostRef.key;
          console.log(postID); 
          newPostRef.set({
               reference: postID,
	       user: userName,
	       email: userEmail,
	       id: photoID,
	       when: date, 
	       from: startTime, 
	       to: endTime,
               comments: text
	   });
          var file = "to" + airportSelect + ".html";
          console.log('redirect to here: ' + file);
          window.location = file; 
       }


function rideFromPressed(){
           event.preventDefault();
           if(window.currentUser){
           console.log("correct you got here");
           var e = document.getElementById("airport");
           var airportSelect = e.options[e.selectedIndex].text;
           
           if(airportSelect.indexOf(' ') > -1){
               airportSelect = airportSelect.substring(0, airportSelect.indexOf(' '));
           }
           var date = $("#datepicker").datepicker('getDate');
           var res = String(date);
           console.log(res);
           res = res.substr(0,15);
           console.log('new res' + res);
           var fromTime = $("#startTime").val();
           var toTime = $("#endTime").val();

           console.log(airportSelect);
           console.log(fromTime + ' ' + toTime);
           var text = document.getElementById('comment').value;
           console.log(text);

           writeRideFrom(airportSelect, currentUser.displayName, currentUser.email, currentUser.photoURL, res, fromTime, toTime, text);
           }else{
               document.getElementById('id01').style.display='block';
               console.log('you are not signed in');

            }
       }

       function writeRideFrom(airportSelect, userName, userEmail, photoID, date, startTime, endTime, text){
          var ref = firebase.database().ref();
          var postsRef = ref.child('FROMairport/' + airportSelect);
          var newPostRef = postsRef.push();
          var postID = newPostRef.key;
          newPostRef.set({
               reference: postID,
               user: userName,
               email: userEmail,
               id: photoID,
               when: date,
               from: startTime,
               to: endTime,
               comments: text
           });
          var file = "from" + airportSelect + ".html";
          console.log('redirect to here: ' + file);
          window.location = file;
       }
