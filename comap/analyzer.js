
class Analyzer {
	constructor(census, covid) {
		this.census = census.counties.counties;
		this.covid = covid.counties.counties;
	}

	analyze() {
		var that = this;
		this.census.forEach(function(census, fips) {
			var covid = that.covid.get(fips);
			if (covid) {
				var population = census.population;
				var cases = covid.avg(7);
				var casesPerMillion = Math.trunc((1000000 * cases) / population);
				var detail = census.name + "<br />Population: " + population.toLocaleString() + "<br />Cases per day per million population: " + casesPerMillion.toLocaleString() + "<br />Cases per day: " + cases.toLocaleString();
				var logCases = Math.log10(1 + casesPerMillion);
				var logPop = Math.log10(1 + population);
				var h = 120 + Math.trunc((logPop - 3) * 120 / 4);
				var s = Math.trunc(30 + (logCases * 70 / 3));
				var v = 80 - Math.trunc(logCases * 60 / 3);
				var color = "hsl(" + h + ", " + s + "%, " + v + "%)";
				console.log(color, logPop, logCases, census.name);
				var id = "FIPS_" + fips;
				var path = document.getElementById("map");
				path = path.getSVGDocument();
				path = path.getElementById(id);
				if (path) {
					path.setAttribute("fill", color)
					path.addEventListener('mouseover', function() {
						document.getElementById('status').innerHTML = detail;
					});
				}
			}
		});
	}
}

