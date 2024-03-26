"use strict";

let core = {}; // Ensure the core namespace exists

(function() {
    class Router {
        constructor() {
            this._routingTable = [];
            this._activeLink = '/';
            this.init();
        }

        init() {
            window.addEventListener('popstate', (e) => {
                this.loadContent(location.pathname);
            });

            document.addEventListener('click', (e) => {
                if (e.target.matches("[data-link]")) {
                    e.preventDefault();
                    this.navigateTo(e.target.href);
                }
            });

            this.loadContent(location.pathname);
        }

        navigateTo(url) {
            history.pushState(null, null, url);
            this.loadContent(url);
        }

        async loadContent(url) {
            const route = url === '/' ? '/home' : url;
            try {
                const response = await fetch(`./views/content${route}.html`);
                const content = await response.text();
                document.querySelector('main').innerHTML = content;
                this._activeLink = url;
            } catch (error) {
                console.error('Page not found', error);
				this.navigateTo('/');
            }
        }
    }

    core.Router = Router;
})(core);

// Instantiate and expose the router globally
const router = new core.Router();
