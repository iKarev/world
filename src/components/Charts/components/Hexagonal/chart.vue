<template>
  <div>
    <svg class="hexagonal"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import _ from "lodash";

export default {
  data: () => ({
    radius: 40,
    xp: 100,
    yp: 60
  }),
  mounted() {
    this.renderChart();
  },
  methods: {
    addTiles(container, hexagon, columns, lines) {
      for (let i = 0; i < columns * lines; i += 1) {
        const line = Math.floor(i / columns);
        container
          .append("path")
          .attr("d", hexagon)
          .attr("stroke", "red")
          .attr("stroke-width", 2)
          .attr("fill", "rgba(255,0,0,0.4)")
          .attr(
            "transform",
            `translate(${(i % columns) * 3 * this.radius +
              (line % 2 ? 0 : 60)}, ${line * 35})`
          );
      }
      return container;
    },
    renderChart() {
      const h = Math.sqrt(3) / 2;
      const hexagonData = [
        { x: this.radius + this.xp, y: this.yp },
        { x: this.radius / 2 + this.xp, y: this.radius * h + this.yp },
        { x: -this.radius / 2 + this.xp, y: this.radius * h + this.yp },
        { x: -this.radius + this.xp, y: this.yp },
        { x: -this.radius / 2 + this.xp, y: -this.radius * h + this.yp },
        { x: this.radius / 2 + this.xp, y: -this.radius * h + this.yp }
      ];

      const drawHexagon = d3
        .line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveLinearClosed);
      // .tension("0.25");
      const svgContainer = d3
        .select("svg.hexagonal")
        .attr("width", 1000)
        .attr("height", 600);

      const enterElements = this.addTiles(
        svgContainer,
        drawHexagon(hexagonData),
        6,
        13
      );
    }
  }
};
</script>
