
class Detail {

	constructor(census) {
		this.detail = new Map();
		this.ready = false;
	}

	prepare(census) {
		var that = this;
		document.getElementById('detail').innerHTML = "";
		if (census.ready && !this.ready) {
			census.counties.counties.forEach(function(census, fips) {
				var id = "FIPS_" + fips;
				var path = document.getElementById("map");
				path = path.getSVGDocument();
				path = path.getElementById(id);
				if (path) {
					that.set(fips, "");
					path.addEventListener('mouseover', function() {
						document.getElementById('detail').innerHTML = that.detail.get(fips);
					});
				}
			});
		}
	}

	set(fips, text) {
		this.detail.set(fips, text);
	}

	get(fips, text) {
		return this.detail.get(fips);
	}
}

