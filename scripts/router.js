"use strict";

(function () {
    class Router {
        constructor() {
            this.ActiveLink = "";
        }

        get ActiveLink(){
            return this._activeLink;
        }

        set ActiveLink(link){
            this._activeLink = link;
        }

        /**
         * This method adds a new route to the routing table
         * @param route
         * @returns {void}
         */
        Add(route){
            this._routingTable.push(route);
        }

        /**
         * This method replaces the reference for the routing table with a new one
         * @param routingTable
         * @returns {void}
         */
        AddTable(routingTable){
            this._routingTable = routingTable;
        }

        /**
         * This method finds and returns the index of the route in the Routing table or -1 if the route does not exist.
         * @param route
         * @returns {*}
         */
        Find(route){
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a route from the routing table. It returns true if it succeeds (delete a route),
         * false otherwise
         * @param route
         * @returns {boolean}
         */
        Remove(route){
            if(this.Find(route) > - 1){
                this._routingTable.splice(this.Find(route), 1);
                return true;
            }
            return false;
        }

        /**
         * This method returns the routing table contents in a comma delimited separated string
         * @returns {string}
         */
        toString(){
            return this._routingTable.toString();
        }
    }
    core.Router = Router;
})(core || (core = {}));

// instantiate a new router
let router = new core.Router();

// Add default routers to our routing table
router.AddTable( [
    "/",
    "/home",
    "/portfolio",
    "/services",
    "/team",
    "/blog",
    "/login",
    "/register",
    "/privacy",
    "/terms",
    "/contact",
    "/events",
    "/gallery",
    "/statistics"
])

let route = location.pathname;

router.ActiveLink = (router.Find(route) > -1)
                  ? ( (route) === "/") ? "home" : route.substring(1)
                  : ("404");