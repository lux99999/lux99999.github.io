
class When {
	update() {
		var oldest = Date.parse("1/23/20");
		var newest = Date.now();
		var when = document.getElementById("when").value;
		var span = newest - oldest;
		var cutoff = oldest + Math.trunc(when * span / 1000);
		var date = new Date();
		date.setTime(cutoff);
		var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate();
		document.getElementById("date").innerHTML = dateStr;
		return cutoff;
	}
}

