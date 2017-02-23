    function googleSignin(){
       var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    firebase.auth().getRedirectResult().then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });

