/* main.js */
/* Authors: Christopher Gugelmeier, Andrei Koshelev */
/* Student ID: 100852340, 100894383 */
/* Date of Completion: 01-27-2024 */

/**
 * Check for what is written in the search and change pages based on what is in.
 */
function searchWebsite() {
    let searchQuery = document.getElementById("searchBar");

    switch (searchQuery.value.toLowerCase())
    {
        case "blog":
            location.href = "/blog"
            break;
        case "careers":
            location.href = "/careers"
            break;
        case "contact":
            location.href = "/contact"
            break;
        case "home":
            location.href = "/index"
            break;
        case "portfolio":
            location.href = "/portfolio"
            break;
        case "privacy":
            location.href = "/privacy"
            break;
        case "services":
            location.href = "/services"
            break;
        case "team":
            location.href = "/team"
            break;
        case "terms":
            location.href = "/terms"
            break;
        default:
            searchQuery.classList.add("bad-search")
            searchQuery.value = "";
            searchQuery.placeholder = "Page not found!";
            break;
    }
}

// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    //slides[slideIndex-1].style.display = "block";
    //dots[slideIndex-1].className += " active";
    //captionText.innerHTML = dots[slideIndex-1].alt;
}

/**
 * Request information form the api
 */
function fetchAPI() {
    let period = $("#period-select");
    period.value = '1';
    let apiKey = "biQYeejT5hAGS3wWTLb98G98pl8tM1Yo";
    let url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period.value}.json?api-key=${apiKey}`;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            let response = JSON.parse(xhr.responseText);

            if (response.success !== false) {
                displayAPI(response);
            }
            else {
                console.error("Failed to retrieve data");
            }
        }
        else {
            console.error("The request failed!");
        }
    };

    xhr.send();
}

/**
 * What to display based on the api call
 */
function displayAPI(response) {
    let apiContainer = $("#apiContainer");
    apiContainer.append(
        `<h1>Article: </h1>
            <ul>
                <li>
                    <a target="_blank" href="${response.results[0].url}">${response.results[0].title}</a>
                </li>
            </ul>`
    );
}

// Function: closePopup
// Description: Closes the popup by setting its display property to 'none'.
// Parameters: None
// Return Value: None
function closePopup() {
    var popupContainer = document.getElementById('popup-container');
    if (popupContainer) {
        popupContainer.style.display = 'none';
    }
}

(function() {

    // For ....... (Services.html)
    // Function: toggleAccordion
    // Description: Toggles the active state of an accordion panel and expands or collapses it.
    // Parameters: None
    // Return Value: None
    function toggleAccordion() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }

    // Get all elements with class "accordion"
    var acc = document.getElementsByClassName("accordion");

    // Add a click event listener to each accordion element
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", toggleAccordion);
    }

    // JavaScript to handle the Load More button and Popup functionality ....... (Blog.html)

    // Get references to DOM elements
    // var loadMoreBtn = document.getElementById('load-more-btn');
    // var loadMoreBtn1 = document.getElementById('load-more-btn1');
    // var popupContainer = document.getElementById('popup-container');
    // var hiddenContent = document.getElementById("hiddenContent");
    // var hiddenContent1 = document.getElementById("hiddenContent1");
    // var cardContainer = document.getElementById("cardContainer");
    // Function to hide initial content
    // function hideInitialContent(elementId) {
    //     var element = document.getElementById(elementId);
    //     if (element) {
    //         element.style.display = "none";
    //     }
    // }

// Within your DOMContentLoaded event listener
    document.addEventListener("DOMContentLoaded", function() {
        var hiddenContent = document.getElementById("hiddenContent");
        if (hiddenContent) hiddenContent.style.display = "none";

        var hiddenContent1 = document.getElementById("hiddenContent1");
        if (hiddenContent1) hiddenContent1.style.display = "none";

        // var loadMoreBtn = document.getElementById('load-more-btn');
        // if (loadMoreBtn) {
        //     loadMoreBtn.addEventListener('click', function() {
        //         var hiddenContent = document.getElementById("hiddenContent");
        //         if (hiddenContent) {
        //             hiddenContent.style.display = hiddenContent.style.display === "none" ? "block" : "none";
        //             loadMoreBtn.innerText = hiddenContent.style.display === "none" ? "Load More" : "Show Less";
        //         }
        //     });
        // }

        document.body.addEventListener('click', function(e) {
            if (e.target && e.target.id === 'load-more-btn') {
                var hiddenContent = document.getElementById("hiddenContent");
                toggleVisibility(hiddenContent, e.target);
            } else if (e.target && e.target.id === 'load-more-btn1') {
                var hiddenContent1 = document.getElementById("hiddenContent1");
                toggleVisibility(hiddenContent1, e.target);
            }
        });

        function toggleVisibility(content, button) {
            if (content) {
                content.style.display = content.style.display === "none" ? "block" : "none";
                button.innerText = content.style.display === "none" ? "Load More" : "Show Less";
            }
        }


    });



    function LoadHeader(html_data){
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }

    function LoadFooter(){
        $.get("./views/components/footer.html", function(html_data){
            $("footer").html(html_data);
        });
    }

    function LoadContent(){
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();

        $.get(`./${page_name}.html`, function(html_data){
            $("main").html(html_data);
            callback();
        });
    }

    function CheckLogin() {
        let user = sessionStorage.getItem("user");
        let userDisplayName = sessionStorage.getItem("userDisplayName");

        if (user && userDisplayName) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-undo"></i> Logout</a>`);
        } else {
            $("#login").html(`<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
        }

        $("#logout").on("click", function() {
            sessionStorage.clear();
            location.href = "/home"; // Redirect to home page after logout
            // $("#welcomeAlert").hide();
            // sessionStorage.clear();
        });
    }










    function DisplayHomePage()
    {
        console.log("Called DisplayHomePage...")

        // $("#AboutUsBtn").on("click", ()=>{
        //     location.href = "about.html";
        // } );
        //
        // $("main").append(`<p id="MainParagraph" class="mt-3">This is my paragraph</p>`)
        //
        // $("body").append(`<article class="container">
        //                 <p id="ArticleParagraph" class="mt-3">This is my article paragraph<p/></article>`)

    }


    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()...");
        ContactFormValidation();
        $("#registerForm").on("submit", function(event) {
            // Prevent the form from submitting immediately
            event.preventDefault();

            ContactFormValidation();

            // Check if passwords match
            var password = $("#password").val();
            var confirmPassword = $("#confirmPassword").val();
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                $("#confirmPassword").focus();
                // Prevent form submission
                return false;
            }

            this.submit();
        });
    }


    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage()...");

        let messageArea = $("#messageArea");

        $("#loginButton").on("click", function() {
            let username = $("#username").val();
            let password = $("#password").val();

            $.get("./data/users.json", function(data) {
                let success = false;
                let newUser = {};

                for (const user of data.users) {
                    if (username === user.Username && password === user.Password) {
                        newUser = user;
                        success = true;
                        break;
                    }
                }

                if (success) {
                    let userDisplayName = newUser.DisplayName || newUser.Username;
                    sessionStorage.setItem("user", JSON.stringify(newUser)); // Storing user data
                    sessionStorage.setItem("userDisplayName", userDisplayName); // Storing user display name
                    console.log("User logged in:", newUser);
                    messageArea.removeAttr("class").hide();
                    location.href = "/blog"; // Redirect to home page after successful login
                } else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Credentials").show();
                }
            });
        });

        $("#cancelButton").on("click", function() {
            document.forms[0].reset();
            location.href = "/home"; // Redirect to home page if login is canceled
        });
    }

    function DisplayPrivacyPage()
    {
        console.log("Called DisplayPrivacyPage")
    }

    function DisplayTermsPage()
    {
        console.log("Called DisplayTermsPage")
    }

    function DisplayContactPage()
    {
        console.log("Called DisplayContactPage");


        ContactFormValidation();
    }

    function Display404Page(){
        console.log("Called Display404Page()...")
    }

    function ActiveLinkCallback(){
        switch(router.ActiveLink){
            case "home": return DisplayHomePage;
            // case "about": return DisplayAboutPage;
            // case "services": return DisplayServicePage;
            // case "contact-list": return DisplayContactPage;
            // case "products": return DisplayProductPage;
            case "register": return DisplayRegisterPage;
            case "login": return DisplayLoginPage;
            // case "blog": return DisplayBlogPage;
            case "privacy": return DisplayPrivacyPage;
            case "terms": return DisplayTermsPage;
            case "contact": return DisplayContactPage;
            // case "edit": return DisplayEditPage;
            case "404": return Display404Page;
            default:
                console.error("ERROR: callback function does not exist " + router.ActiveLink);
                break;
        }
    }

    function capitalizeFirstCharacter(str){
        return str.charAt(0).toUpperCase() + str.splice(1);
    }

    function ContactFormValidation(){
        //firstName
        ValidateField("#firstName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First name.");

        //lastName
        ValidateField("#lastName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid Last name.");

        //phoneNumber
        ValidateField("#phoneNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid phone number.");

        //emailAddress
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address.");

        //password
        ValidateField("#password", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Please enter a valid password that contains at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");

        //confirmPassword
        ValidateField("#confirmPassword", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Please enter a valid confirm password that contains at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");

    }


    /**
     *
     * This function validates input for contact and edit pages.
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id, regular_expression, error_message){
        let messageArea = $("#messageArea");
        // let fullNamePattern =  /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/;

        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                // fail validation
                $(this).trigger("focus").trigger("select");
                // "Please enter in a valid first and last name (ex First [Middle] Lastname)"
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else{
                // pass validation
                messageArea.removeClass("class").hide();
            }

        });

    }


    function Start() {
        console.log("App Started...");

        // Fetch the header HTML content
        $.get("./views/components/header.html", function(html_data) {
            // Pass the HTML data to the LoadHeader function
            LoadHeader(html_data);
        });
        LoadContent();
        LoadFooter();

        // Check login status when the app starts
        CheckLogin();
    }

    window.addEventListener("load", Start)
})()



