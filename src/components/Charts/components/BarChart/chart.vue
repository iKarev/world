<template>
  <div>
    <svg class="arr"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import _ from "lodash";

export default {
  props: ["issues"],
  data() {
    return {
      chart: null
    };
  },
  watch: {
    issues(val) {
      if (this.chart != null) this.chart.remove();
      this.renderChart(val);
    }
  },
  methods: {
    renderChart(issuesVal) {
      const margin = 60;
      const svgWidth = 1000;
      const svgHeight = 600;
      const chartWidth = 1000 - 2 * margin;
      const chartHeight = 600 - 2 * margin;

      const svg = d3
        .select("svg.arr")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
      this.chart = svg
        .append("g")
        .attr("transform", `translate(${margin}, ${margin})`);
      const yScale = d3
        .scaleLinear()
        .range([chartHeight, 0])
        .domain([0, _.maxBy(issuesVal, "issues").issues]);
      this.chart
        .append("g")
        .call(d3.axisLeft(yScale).ticks(_.maxBy(issuesVal, "issues").issues));
      const xScale = d3
        .scaleBand()
        .range([0, chartWidth])
        .domain(issuesVal.map(s => s.day))
        .padding(0.1);
      this.chart
        .append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

      const barGroups = this.chart
        .selectAll("rect")
        .data(issuesVal)
        .enter();

      barGroups
        .append("rect")
        .attr("class", "bar")
        .attr("opacity", 0.8)
        .attr("x", g => xScale(g.day))
        .attr("y", g => yScale(g.issues))
        .attr("height", g => chartHeight - yScale(g.issues))
        .attr("width", xScale.bandwidth())
        .attr("width", xScale.bandwidth())
        .on("mouseenter", function(actual, i) {
          d3.select(this)
            .transition()
            .duration(300)
            .attr("opacity", 1)
            .attr("x", a => xScale(a.day) - 5)
            .attr("width", xScale.bandwidth() + 10);
          barGroups
            .append("text")
            .attr("opacity", 0)
            .attr("class", "value")
            .attr("fill", "white")
            .attr("pointer-events", "none")
            .attr("x", a => xScale(a.day) + xScale.bandwidth() / 2)
            .attr("y", a => yScale(a.issues) + 25)
            .attr("text-anchor", "middle")
            .text((a, idx) => (idx !== i.index ? "" : `${a.issues} issues`))
            .transition()
            .duration(450)
            .attr("opacity", 1);
        })
        .on("mouseleave", function() {
          d3.selectAll(".issues").attr("opacity", 1);
          d3.select(this)
            .transition()
            .duration(300)
            .attr("opacity", 0.8)
            .attr("x", a => xScale(a.day))
            .attr("width", xScale.bandwidth());
          svg.selectAll(".value").remove();
        });

      svg
        .append("text")
        .attr("class", "label")
        .attr("x", -(chartHeight / 2) - margin)
        .attr("y", margin / 2.4)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Issues opened");

      svg
        .append("text")
        .attr("class", "label")
        .attr("x", chartWidth / 2 + margin)
        .attr("y", chartHeight + margin * 1.7)
        .attr("text-anchor", "middle")
        .text("Days");

      svg
        .append("text")
        .attr("class", "title")
        .attr("x", chartWidth / 2 + margin)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .text("Issues in the past 1 week");
    }
  }
};
</script>
