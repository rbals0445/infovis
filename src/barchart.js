class Barchart {
	margin = {
		top: 10,
		right: 100,
		bottom: 40,
		left: 40,
	};

	constructor(svg, data, idx = 0, flag, width = 300, height = 300) {
		this.svg = svg;
		this.data = data;
		this.width = width;
		this.height = height;
		this.padding = 30;
		this.rectWidth = 40;
		this.idx = idx;
		this.flag = flag;

		this.handlers = {};
	}

	initialize() {
		console.log(this.data);
		const temp = this.data.slice(0, 12 * (this.idx + 1));
		this.svg = d3
			.select(this.svg)
			.append("svg")
			.attr("width", this.width)
			.attr("height", this.height)
			.style("border", "1px solid rgba(0,0,0,0.1");

		// xAxis
		const xAxisScale = d3
			.scaleBand()
			.domain(temp.map((d, i) => i)) // 실제값의 범위
			.range([this.padding, this.width - this.padding]) // 변환할 값의 범위
			.padding(0.1);
		const xAxis = d3
			.axisBottom()
			.scale(xAxisScale)
			.tickFormat((d) => d + 1);

		// yAxis
		const yAxisScale = d3
			.scaleLinear()
			.domain([d3.min(temp), d3.max(temp)]) // 실제값의 범위
			.range([this.height - this.padding, this.padding]); // 변환할 값의 범위(역으로 처리)
		const yAxis = d3
			.axisLeft()
			.scale(yAxisScale)
			.tickFormat((d) => (this.flag ? d + "일" : d + "°C"));

		const xAxisTranslate = this.width - this.padding;
		this.svg
			.append("g")
			.attr("class", "x-axis")
			.call(xAxis)
			.attr("transform", `translate(0, ${xAxisTranslate})`);

		this.svg
			.append("g")
			.attr("class", "y-axis")
			.call(yAxis)
			.attr("transform", `translate(${this.padding}, 0)`);

		this.svg.append("g").attr("class", "val");
		this.svg
			.selectAll("rect")
			.data(temp)
			.enter()
			.append("rect")
			.attr("height", (d) => this.height - yAxisScale(d) - this.padding)
			.attr("width", xAxisScale.bandwidth())
			.attr("x", (d, i) => xAxisScale(i))
			.attr("y", (d) => yAxisScale(d))
			.attr("fill", "orange")
			.on("mouseover", onMouseOver)
			.on("mouseout", onMouseOut);

		this.svg
			.select(".val")
			.selectAll("text")
			.data(temp)
			.enter()
			.append("text")
			.attr("x", (d, i) => xAxisScale(i) + xAxisScale.bandwidth() / 2)
			.attr("y", (d) => yAxisScale(d))
			.text((d) => d)
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "black")
			.attr("text-anchor", "middle");

		function onMouseOut(d, i) {
			d3.select(this).transition().duration(400).style("fill", "orange");
			d3.select(".val")
				.selectAll("text")
				.filter((d, index) => index === i);
		}

		function onMouseOver(d, i) {
			d3.select(this).transition().duration(400).style("fill", "red");
			d3.select(".val")
				.selectAll("text")
				.filter((d, index) => index === i)
				.attr("display", "block");
		}
	}

	update(num, elem, t) {
		this.svg.remove();

		this.svg = elem;
		const temp = t.slice(12 * (num - 1), 12 * num);
		// xAxis
		this.svg = d3
			.select(this.svg)
			.append("svg")
			.attr("width", this.width)
			.attr("height", this.height)
			.style("border", "1px solid rgba(0,0,0,0.1");

		// xAxis
		const xAxisScale = d3
			.scaleBand()
			.domain(temp.map((d, i) => i)) // 실제값의 범위
			.range([this.padding, this.width - this.padding]) // 변환할 값의 범위
			.padding(0.1);
		const xAxis = d3
			.axisBottom()
			.scale(xAxisScale)
			.tickFormat((d) => d + 1);

		// yAxis
		const yAxisScale = d3
			.scaleLinear()
			.domain([d3.min(temp), d3.max(temp)]) // 실제값의 범위
			.range([this.height - this.padding, this.padding]); // 변환할 값의 범위(역으로 처리)
		const yAxis = d3
			.axisLeft()
			.scale(yAxisScale)
			.tickFormat((d) => (this.flag ? d + "일" : d + "°C"));

		const xAxisTranslate = this.width - this.padding;
		this.svg
			.append("g")
			.attr("class", "x-axis")
			.call(xAxis)
			.attr("transform", `translate(0, ${xAxisTranslate})`);

		this.svg
			.append("g")
			.attr("class", "y-axis")
			.call(yAxis)
			.attr("transform", `translate(${this.padding}, 0)`);

		this.svg.append("g").attr("class", "val");
		this.svg
			.selectAll("rect")
			.data(temp)
			.enter()
			.append("rect")
			.attr("height", (d) => this.height - yAxisScale(d) - this.padding)
			.attr("width", xAxisScale.bandwidth())
			.attr("x", (d, i) => xAxisScale(i))
			.attr("y", (d) => yAxisScale(d))
			.attr("fill", "orange")
			.on("mouseover", onMouseOver)
			.on("mouseout", onMouseOut);

		this.svg
			.select(".val")
			.selectAll("text")
			.data(temp)
			.enter()
			.append("text")
			.attr("x", (d, i) => xAxisScale(i) + xAxisScale.bandwidth() / 2)
			.attr("y", (d) => yAxisScale(d))
			.text((d) => d)
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "black")
			.attr("text-anchor", "middle");

		function onMouseOut(d, i) {
			d3.select(this).transition().duration(400).style("fill", "orange");
			d3.select(".val")
				.selectAll("text")
				.filter((d, index) => index === i);
		}

		function onMouseOver(d, i) {
			d3.select(this).transition().duration(400).style("fill", "red");
			d3.select(".val")
				.selectAll("text")
				.filter((d, index) => index === i)
				.attr("display", "block");
		}
	}
}
