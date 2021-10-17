
class Route {

	constructor(data) {
        this.name = data["route_short_name"] + " " + data["route_long_name"];
        this.id = data["route_id"];
	}

    url() {
        return "https://primary.sfmta.gtfs.media/gtfs/api/v1/agencies/SFMTA/routes/"
            + this.id
            + "/nextbus_map?pattern_stop=https://www.sfmta.com/{stop_code}&pattern_route=https://www.sfmta.com/routes/{route_id}";
    }
}

class Routes {

    addRoute(data) {
        var route = new Route(data);
        var replace = true;
        if (this.routes.has(route.name)) {
            var old_id = parseInt(this.routes.get(route.name).id);
            var new_id = parseInt(route.id);
            if (new_id <= old_id) {
                replace = false;
            }
        }
        if (replace) {
            this.routes.set(route.name, route);
        }
    }
  
	constructor(cb) {
		this.file = "routes.txt";
		this.ready = false;
		this.cb = cb;
        this.routes = new Map();
		var that = this;
		Papa.parse(this.file, {
			header: true,
			download: true,
			dynamicTyping: true,
			complete: function(results) {
				results.data.forEach(data => that.addRoute(data));
				that.ready = true;
				that.cb();
			}
		});
	}
}

