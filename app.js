 function initApp() {
     this.auth = firebase.auth();
       this.database = firebase.database();
	 console.log('initApp called');
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            currentUser = user;
	    console.log(user);
	    console.log('success');
        //
        }else{
         //  
	}
    });
   }


 function googleSignin(){
        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

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
	   
	   writeRideTo(airportSelect, currentUser.displayName, currentUser.email, currentUser.photoURL, res, fromTime, toTime, text);

       }

       function writeRideTo(airportSelect, userName, userEmail, photoID, date, startTime, endTime, text){
          var ref = firebase.database().ref();
          var postsRef = ref.child('TOairport/' + airportSelect); 
          var newPostRef = postsRef.push(); 
          newPostRef.set({
               //aiport: airportSelect,
	       user: userName,
	       email: userEmail,
	       id: photoID,
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
