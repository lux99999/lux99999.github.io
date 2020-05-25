
class Population {

	constructor(census, detail, colors) {
		this.census = census.counties.counties;
		this.detail = detail;
		this.colors = colors;
	}

	refresh(cutoff) {
		var that = this;
		this.census.forEach(function(census, fips) {
			var population = census.population;
			var detail = census.name + "<br />Population: " + population.toLocaleString();
			var logPop = Math.log10(1 + population);
			var h = 120 + Math.trunc((logPop - 3) * 120 / 4);
			var s = Math.trunc(30 + ((logPop - 3) * 70 / 4));
			var l = 80 - Math.trunc((logPop - 3) * 60 / 4);
			//var s = 100;
			//var l = 80;
			if (population == 1) {
				detail = census.name;
				l = 100;
			}
			//console.log(logPop, census.name);
			that.colors.set(fips, h, s, l);
			that.detail.set(fips, detail);
		});
	}
}

