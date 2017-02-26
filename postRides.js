    function postRides(direction, airport){
        console.log("I get called");
        var ref = firebase.database().ref();
	ref.on("value", function(snapshot) {
	//  console.log(snapshot.val());
	  }, function (errorObject) {
	//    console.log("The read failed: " + errorObject.code);
	    });
	 
         // Attach an asynchronous callback to read the data at our posts reference
	// ref.on("child_added", function(snapshot, prevChildKey) {
	//   var newPost = snapshot.val();
	//   console.log("Author: " + newPost.author);
	//   console.log("Title: " + newPost.title);
	  // console.log("Previous Post ID: " + prevChildKey);
//	});
	
	
	// Retrieve new posts as they are added to our database
      //	 ref.on("child_added", function(snapshot, prevChildKey) {
//	   var newPost = snapshot.val();
//	   console.log("Author: " + newPost.author);
//	   console.log("Title: " + newPost.title);
//	   console.log("Previous Post ID: " + prevChildKey);
//	 });


	 // Get the data on a post that has changed
//	 ref.on("child_changed", function(snapshot) {
//	   var changedPost = snapshot.val();
//	   console.log("The updated post title is " + changedPost.title);
//	 });

	 ref.child(direction + '/' + airport).once("value", function(data) {
             data.forEach(function(snapshot) {
	         $("#ride").append('<p>' + snapshot.val().from + 'to: ' + snapshot.val().to + 'day: ' + snapshot.val().when + '</p>').css('background-color', 'red');
	        // var node = document.getElementById('ride');
                // console.log(data.val());
		// console.log(snapshot.val().from);
//	         node.innerHTML.appendChild('<p>' + snapshot.val().from + 'to: ' + snapshot.val().to + 'day: ' + snapshot.val().when + '</p>');
	     });
});


}
