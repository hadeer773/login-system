  //for authentication
  var username = localStorage.getItem('sessionUsername')
  if (username == null) {
      location.replace('https://' + location.hostname + 'login.html')
  }



  