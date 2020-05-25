
class CasesCounty {

	constructor(data) {
		var that = this;
		this.fips = data["FIPS"].toString().padStart(5, "0");
		var cases = new Map();
		Object.keys(data).forEach(function(item) {
			var date = Date.parse(item);
			if (date) {
				cases.set(date, data[item]);
			}
		});
		var entries = [...cases.entries()];
		this.cases = entries.sort((a, b) => b[0] - a[0]);
	}

	avg(cutoff, max) {

		var i = 0;
		while (i < (this.cases.length - 1) && this.cases[i][0] > cutoff) {
			i++;
		}

		max += i;
		if (max > this.cases.length - 1) {
			max = this.cases.length - 1;
		}

		var total = 0;
		var count = 0;
		while (i < max) {
			var j = i + 1;
			var cur = this.cases[i][1];
			var next = this.cases[j][1];
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
		while (i < (this.cases.length - 1) && this.cases[i][0] > cutoff) {
			i++;
		}
		return this.cases[i][1];
	}
}

class CasesCounties {
	constructor() {
		this.counties = new Map();
	}

	addCounty(data) {
		try {
			var county = new CasesCounty(data);
			this.counties.set(county.fips, county);
		} catch (error) {
			//console.log(error);
		}
	}
}

class Cases {
	constructor(cb) {
		this.file = "time_series_covid19_confirmed_US.csv";
		this.counties = new CasesCounties();
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

