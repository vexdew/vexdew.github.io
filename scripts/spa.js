$(document).ready(function() {
    // Function to load page content
    function loadPageContent(page) {
        $("#main-content").load(`./views/content/${page}.html`, function(response, status, xhr) {
            if (status === "error") {
                $("#main-content").html("<p>Sorry, there was an error loading the page.</p>");
                // Handle 404 or other errors if necessary
            }
        });
    }

    // Load the home page content by default or based on the current route
    let initialPage = 'home'; // Determine this based on your routing logic
    loadPageContent(initialPage);
});
