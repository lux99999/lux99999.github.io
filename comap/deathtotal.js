
class DeathTotal {

	constructor(census, deaths, detail, colors) {
		this.census = census.counties.counties;
		this.deaths = deaths.counties.counties;
		this.detail = detail;
		this.colors = colors;
	}

	refresh(cutoff) {
		var that = this;
		this.census.forEach(function(census, fips) {
			var deaths = that.deaths.get(fips);
			if (deaths) {
				var population = census.population;
				var deaths = deaths.total(cutoff);
				var deathsPerMillion = Math.trunc((1000000 * deaths) / population);
				var deathsPercent = Math.trunc((100000 * deaths) / population) / 1000;
				var detail = census.name + "<br />Population: " + population.toLocaleString() + "<br />Deaths: " + deaths.toLocaleString() + "<br />Percent dead: " + deathsPercent.toLocaleString() + "%";
				var logDeaths = Math.log10(1 + deathsPerMillion);
				var logPop = Math.log10(1 + population);
				var h = 120 + Math.trunc((logPop - 3) * 120 / 4);
				var s = Math.trunc(30 + (logDeaths * 70 / 4));
				var l = 80 - Math.trunc(logDeaths * 60 / 4);
				if (population == 1) {
					detail = census.name;
					l = 100;
				}
				//console.log(logPop, logDeaths, census.name);
				that.colors.set(fips, h, s, l);
				that.detail.set(fips, detail);
			}
		});
	}
}

