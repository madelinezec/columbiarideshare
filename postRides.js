    function loadRides(direction, airport){
        var ref = firebase.database().ref();
	ref.on("value", function(snapshot) {
	  console.log(snapshot.val());
	  }, function (errorObject) {
	   console.log("The read failed: " + errorObject.code);
	    });
          var x = 0;
	 ref.child(direction + '/' + airport).once("value", function(data) {
             data.forEach(function(snapshot) {
             var userName = snapshot.val().user; 



$("#ride").append(`
<div class="style">
    <img src="${snapshot.val().id}" style="width:68px;height:68px;"/>
    <p>${snapshot.val().user}</p>
    <ul class="styling">
    <li>${snapshot.val().when} ${snapshot.val().from} - ${snapshot.val().to}</li>
    <li>${snapshot.val().comments}</li>
    <button type="button" class="btn btn-outline-info" onclick="initMessenger('${snapshot.val().user}','${snapshot.val().reference}')">join this ride</button>
    </ul>
</div>`);

	
 console.log(userName);
       });
        console.log('ID : ' + $("#ride").html());
});
     console.log('ID : ' + $("#ride").html());
}


    function initMessenger(name, reference){
       console.log('initMessenger called with this reference: ' + reference);
       if(window.currentUser){
           console.log('you are signed in');
           document.getElementById('convoHeader').innerHTML = name;
           document.getElementById('messages-card').style.display = "";
	   window.friendlyChat = new FriendlyChat(reference);
	   
       }else{
           document.getElementById('id01').style.display='block';   
           console.log('you are not signed in');
       }

    } 

function logConsole(){
 window.onload = function() {
      
    console.log('ID : ' + $('.ride').text());
console.log(inner);

      console.log('honey im home');
    };
}
