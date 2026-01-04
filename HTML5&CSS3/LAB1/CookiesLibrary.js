//&Cookies Library

//?Set Cookie Function
function setCookie(cookiename, cookieval, expdays) {
  if (expdays) {
    var date = new Date();
    date.setTime(date.getTime() + expdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + date.toUTCString();
    document.cookie =
      encodeURIComponent(cookiename) +  //~ method encodes special characters including: , / ? : @ & = + $ #
      "=" +
      encodeURIComponent(cookieval) +
      ";" +
      expires; //persistant cookie
  } else {
    document.cookie =
      encodeURIComponent(cookiename) + "=" + encodeURIComponent(cookieval); //session cookie
  }
}

//?Get Cookie Function
function allCookiesList() {
  var cookiesArr = {}; // Using an Object to store key-value pairs

  if (document.cookie === "") return cookiesArr; // specific check to avoid errors if no cookies exist

  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    // We decode and trim the key
    var key = decodeURIComponent(cookies[i].split("=")[0].trim());

    // We decode the value
    var value = decodeURIComponent(cookies[i].split("=")[1]);

    cookiesArr[key] = value;
  }

  return cookiesArr;
}

//?Get All Cookies List Function
function getCookie(cookiename) {
  //as the previous function but with (cookiename) parameter to return one by name
  var cookiesArr = allCookiesList();
  return cookiesArr[cookiename]; //return from array after we pushed on it all cookies the wanted cookie by its name
}

//?Delete Cookie Function
function deleteCookie(cookiename, cookieval, expdays) {
  //as setcookie function but with subtraction of time
  if (expdays) {
    var date = new Date();
    date.setTime(date.getTime() - expdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + date.toUTCString();
    document.cookie =
      encodeURIComponent(cookiename) +
      "=" +
      encodeURIComponent(cookieval) +
      ";" +
      expires; //persistant cookie
  } else {
    document.cookie =
      encodeURIComponent(cookiename) + "=" + encodeURIComponent(cookieval); //session cookie
  }
}

//?Has Cookie Function
function hasCookie(cookiename) {
  if (getCookie(cookiename) != undefined) {
    return true;
  } else {
    return false;
  }
}
