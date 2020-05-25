
class Colors {
	set(fips, h, s, l) {
		var id = "FIPS_" + fips;
		var color = "hsl(" + h + ", " + s + "%, " + l + "%)";
		var path = document.getElementById("map");
		path = path.getSVGDocument();
		path = path.getElementById(id);
		if (path) {
			path.setAttribute("fill", color)
		}
	}
}

