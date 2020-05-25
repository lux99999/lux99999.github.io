
class DeathsCounty {

	constructor(data) {
		var that = this;
		this.fips = data["FIPS"].toString().padStart(5, "0");
		var deaths = new Map();
		Object.keys(data).forEach(function(item) {
			var date = Date.parse(item);
			if (date) {
				deaths.set(date, data[item]);
			}
		});
		var entries = [...deaths.entries()];
		this.deaths = entries.sort((a, b) => b[0] - a[0]);
	}

	avg(cutoff, max) {

		var i = 0;
		while (i < (this.deaths.length - 1) && this.deaths[i][0] > cutoff) {
			i++;
		}

		max += i;
		if (max > this.deaths.length - 1) {
			max = this.deaths.length - 1;
		}

		var total = 0;
		var count = 0;
		while (i < max) {
			var j = i + 1;
			var cur = this.deaths[i][1];
			var next = this.deaths[j][1];
			var diff = cur - next;
			total += diff;
			count += 1;
			i++;
		}

		var avg = Math.round(total / count);
		if (avg <= 0) {
			avg = 0;
		}

		return avg;
	}

	total(cutoff) {
		var i = 0;
		while (i < (this.deaths.length - 1) && this.deaths[i][0] > cutoff) {
			i++;
		}
		return this.deaths[i][1];
	}
}

class DeathsCounties {
	constructor() {
		this.counties = new Map();
	}

	addCounty(data) {
		try {
			var county = new DeathsCounty(data);
			this.counties.set(county.fips, county);
		} catch (error) {
			//console.log(error);
		}
	}
}

class Deaths {
	constructor(cb) {
		this.file = "time_series_covid19_deaths_US.csv";
		this.counties = new DeathsCounties();
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

