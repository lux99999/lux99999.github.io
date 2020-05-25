
class CensusCounty {
	constructor(data) {
		this.fips = data["STATE"].toString().padStart(2, "0") + data["COUNTY"].toString().padStart(3, "0");
		this.name = data["CTYNAME"];
		this.population = data["POPESTIMATE2019"];
	}
}

class CensusCounties {
	constructor() {
		this.counties = new Map();
	}

	addCounty(data) {
		try {
			var county = new CensusCounty(data);
			this.counties.set(county.fips, county);
		} catch (error) {
		}
	}
}

class Census {
	constructor(cb) {
		//this.url = "https://www2.census.gov/programs-surveys/popest/datasets/2010-2019/counties/totals/co-est2019-alldata.csv";
		this.file = "co-est2019-alldata.csv";
		this.counties = new CensusCounties();
		this.ready = false;
		this.cb = cb;
		var that = this;
		Papa.parse(this.file, {
			header: true,
			download: true,
			dynamicTyping: true,
			complete: function(results) {
				results.data.forEach(data => that.counties.addCounty(data));
				that.ready = true;
				that.cb();
			}
		});
	}
}

