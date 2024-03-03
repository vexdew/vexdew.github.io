/* main.js */
/* Authors: Christopher Gugelmeier, Andrei Koshelev */
/* Student ID: 100852340, 100894383 */
/* Date of Completion: 01-27-2024 */

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

$(document).ready(function() {
    // Function to fetch event data using AJAX
    function fetchEvents() {
        $.ajax({
            url: 'events.json', // URL of the JSON file or external API endpoint
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                displayEvents(data); // Once data is fetched successfully, display events
            },
            error: function(xhr, status, error) {
                console.error('Error fetching events:', error);
            }
        });
    }

    // Function to display events on the page
    function displayEvents(events) {
        var eventsContainer = $('<div id="events-container"></div>'); // Create events container
        events.forEach(function(event) {
            var eventItem = $('<div class="event-item">');
            eventItem.append('<h2>' + event.title + '</h2>');
            eventItem.append('<p>Date: ' + event.date + '</p>');
            eventItem.append('<p>Location: ' + event.location + '</p>');
            eventItem.append('<p>Description: ' + event.description + '</p>');
            eventsContainer.append(eventItem);
        });
        $('body').append(eventsContainer); // Append events container to body
    }

    // Call fetchEvents function to load event data when the page is loaded
    fetchEvents();
});



function searchWebsite() {
	var searchTerm = document.getElementById("searchBar").value.trim().toLowerCase();

	// Redirect based on the searchTerm
	switch (searchTerm) {
		case 'home':
			window.location.href = '/home';
			break;
		case 'services':
			window.location.href = '/services';
			break;
		case 'blog':
			window.location.href = '/blog';
			break;
		case 'login':
			window.location.href = '/login';
			break;
		case 'register':
			window.location.href = '/register';
			break;
		case 'privacy':
			window.location.href = '/privacy';
			break;
		case 'terms':
			window.location.href = '/terms';
			break;
		case 'contact':
			window.location.href = '/contact';
			break;
		default:
			alert('Page not found.'); // Handle the case where the search term doesn't match
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

function ContactFormValidation() {
    let form = $("#contact-form");

    form.submit(function(event) {
        let invalidFields = [];
        
        // Validate firstName
        if (!ValidateField("#firstName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/)) {
            invalidFields.push("First Name");
        }

        // Validate lastName
        if (!ValidateField("#lastName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/)) {
            invalidFields.push("Last Name");
        }

        // Validate phoneNumber
        if (!ValidateField("#phoneNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/)) {
            invalidFields.push("Phone Number");
        }

        // Validate emailAddress
        if (!ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/)) {
            invalidFields.push("Email Address");
        }

        // Validate password
        if (!ValidateField("#password", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            invalidFields.push("Password");
        }

        // Validate confirmPassword
        if (!ValidateField("#confirmPassword", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            invalidFields.push("Confirm Password");
        }

        // If there are invalid fields, display alert message
        if (invalidFields.length > 0) {
            event.preventDefault();
            alert("Please correct the following fields:\n- " + invalidFields.join("\n- "));
        }
    });
}


    /**
     *
     * This function validates input for contact and edit pages.
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id, regular_expression, error_message){
		let inputField = $(input_field_id);
        let messageArea = $("#messageArea");
        // let fullNamePattern =  /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/;

		inputField.on("blur", function () {
			let inputFieldText = $(this).val();
			if (!regular_expression.test(inputFieldText)) {
				// Fail validation
				inputField.addClass("is-invalid");
				messageArea.addClass("alert alert-danger").text(error_message).show();
			} else {
				// Pass validation
				inputField.removeClass("is-invalid");
				messageArea.removeClass("alert alert-danger").hide();
			}
		});
		if (!regular_expression.test(inputFieldText)) {
			inputField.addClass("is-invalid");
			return false;
		} else {
			inputField.removeClass("is-invalid");
			return true;
		}
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

// Define the search functionality in a separate function
function initializeSearch() {
    var searchBar = document.getElementById("searchBar");
    if (searchBar) { // Check if searchBar exists
        searchBar.addEventListener("input", function() {
            var inputVal = this.value.trim().toLowerCase();
            var suggestions = document.getElementById("suggestions");

            // Clear previous suggestions
            suggestions.innerHTML = '';
            suggestions.style.display = 'none';

            if (inputVal.length > 0) {
                var suggestedWord = '';
                switch (inputVal[0]) {
                    case 's':
                        suggestedWord = 'services';
                        break;
                    // Add more cases as needed
                }

                if (suggestedWord.startsWith(inputVal)) {
                    suggestions.style.display = 'block';
                    var div = document.createElement('div');
                    div.classList.add('suggestion-item');
                    div.textContent = suggestedWord;
                    div.onclick = function() {
                        window.location.href = '/' + suggestedWord; // Redirect
                    };
                    suggestions.appendChild(div);
                }
            }
        });
    }
}


