function myFunction() {
    var x = document.getElementById("PASSWORD");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }