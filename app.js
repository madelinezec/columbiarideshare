    function initDatabase(){
        var database = firebase.database();
	//var ref = firebase.database.ref();

    }
    
    function googleSignin(){
        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        console.log('bitch ok');
    }

    firebase.auth().getRedirectResult().then(function(result) {
        console.log('bitch okkkrr');
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


       function submitRidePressed(){
        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
           var e = document.getElementById("airport");
           var airportSelect = e.options[e.selectedIndex].text;
           
           var date = $("#datepicker").datepicker('getDate');
           
	   var fromTime = $("#startTime").val();
	   var toTime = $("#endTime").val();
	   
	   console.log(airportSelect);
           console.log(date);
	   console.log(fromTime + ' ' + toTime);

	   writeRide(airportSelect, date, fromTime, toTime);

       }

       function writeRide(airportSelect, date, startTime, endTime){
           firebase.database().ref().set({
               aiport: airportSelect,
	       day: date, 
	       from: startTime, 
	       to: endTime
	   });
       }
