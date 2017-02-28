    function googleSignin(){
        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
    // ...
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
          // ...
       });
 
       function rideToPressed(){
        event.preventDefault();
	console.log("correct you got here");
           var e = document.getElementById("airport");
           var airportSelect = e.options[e.selectedIndex].text;
           
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
	   writeRideTo(airportSelect, res, fromTime, toTime, text);

       }

       function writeRideTo(airportSelect, date, startTime, endTime, text){
          var ref = firebase.database().ref();
          var postsRef = ref.child('TOairport/' + airportSelect); 
          var newPostRef = postsRef.push(); 
          newPostRef.set({
               //aiport: airportSelect,
	       when: date, 
	       from: startTime, 
	       to: endTime,
               comments: text
	   });
       }


function rideFromPressed(){
        event.preventDefault();
           var e = document.getElementById("airport");
           var airportSelect = e.options[e.selectedIndex].text;
    
           var date = $("#datepicker").datepicker('getDate');
           var res = String(date);
           console.log(res);
           res = res.substr(0,15);
           console.log('new res' + res);
           var fromTime = $("#startTime").val();
           var toTime = $("#endTime").val();
           var text = $("#comment").val();

           console.log(airportSelect);
           console.log(fromTime + ' ' + toTime);

           writeRideFrom(airportSelect, res, fromTime, toTime);

       }

       function writeRideFrom(airportSelect, date, startTime, endTime, text){
          var ref = firebase.database().ref();
          var postsRef = ref.child('FROMairport/' + airportSelect);
          var newPostRef = postsRef.push();
          newPostRef.set({
               //aiport: airportSelect,
               when: date,
               from: startTime,
               to: endTime,
	       comments: text
           });
       }
