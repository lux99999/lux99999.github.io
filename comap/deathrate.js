
class DeathRate {

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
				var deaths = deaths.avg(cutoff, 7);
				var deathsPerMillion = Math.trunc((1000000 * deaths) / population);
				var detail = census.name + "<br />Population: " + population.toLocaleString() + "<br />Deaths per day per million population: " + deathsPerMillion.toLocaleString() + "<br />Deaths per day: " + deaths.toLocaleString();
				var logDeaths = Math.log10(1 + deathsPerMillion);
				var logPop = Math.log10(1 + population);
				var h = 120 + Math.trunc((logPop - 3) * 120 / 4);
				var s = Math.trunc(30 + (logDeaths * 70 / 2));      // log scale
				var l = 80 - Math.trunc(logDeaths * 60 / 2);        // log scale
				if (deaths < 5 && deathsPerMillion > 10) {
					deathsPerMillion = 10; // noise filter for sparse populations
				}
				s = Math.trunc(40 + (deathsPerMillion * 60 / 25)); // linear scale
				l = Math.trunc(80 - (deathsPerMillion * 60 / 25)); // linear scale
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

