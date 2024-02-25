"use strict";

(function () {
    var userLoggedIn = sessionStorage.getItem("user");

    if (!userLoggedIn) {
        // Redirect to login if no user is logged in
        window.location.href = "/login";
    }
})();
