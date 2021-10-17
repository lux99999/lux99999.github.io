
class Menu {

    populate(routes) {
        this.clear();
        var menu = document.getElementById('menu');
        routes.routes.forEach(function(route) {
            var a = document.createElement("a");
            a.innerHTML = route.name;
            a.target = route.name;
            a.href = route.url();
            menu.appendChild(a);
            var br = document.createElement("br");
            menu.appendChild(br);
		});
    }

    clear() {
        var menu = document.getElementById('menu');
        while (menu.firstChild) {
            menu.removeChild(menu.firstChild);
        }
    }

}

