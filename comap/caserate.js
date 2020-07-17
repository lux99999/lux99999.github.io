
class CaseRate {

	constructor(census, cases, detail, colors) {
		this.census = census.counties.counties;
		this.cases = cases.counties.counties;
		this.detail = detail;
		this.colors = colors;
	}

	refresh(cutoff) {
		var that = this;
		this.census.forEach(function(census, fips) {
			var cases = that.cases.get(fips);
			if (cases) {
				var population = census.population;
				var cases = cases.avg(cutoff, 7);
				var casesPerMillion = Math.trunc((1000000 * cases) / population);
				var detail = census.name + "<br />Population: " + population.toLocaleString() + "<br />Cases per day per million population: " + casesPerMillion.toLocaleString() + "<br />Cases per day: " + cases.toLocaleString();
				var logCases = Math.log10(1 + casesPerMillion);
				var logPop = Math.log10(1 + population);
				var h = 120 + Math.trunc((logPop - 3) * 120 / 4);
				var s = Math.trunc(30 + (logCases * 70 / 3));      // log scale
				var l = 80 - Math.trunc(logCases * 60 / 3);        // log scale
				if (cases < 5 && casesPerMillion > 200) {
					casesPerMillion = 200; // noise filter for sparse populations
				}
				s = Math.trunc(40 + (casesPerMillion * 60 / 500)); // linear scale
				l = Math.trunc(80 - (casesPerMillion * 60 / 500)); // linear scale
				if (population == 1) {
					detail = census.name;
					l = 100;
				}
				//console.log(logPop, logCases, census.name);
				that.colors.set(fips, h, s, l);
				that.detail.set(fips, detail);
			}
		});
	}
}

