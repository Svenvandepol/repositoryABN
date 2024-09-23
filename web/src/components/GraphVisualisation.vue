<template>
  <div>
    <div ref="graph"></div>
    <div v-if="selectedNode" class="details">
      <h3>{{ selectedNode.name }}</h3>
      <p>{{ selectedNode.description }}</p>
      <button @click="deselectNode">Deselect</button>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';


const apiPort = process.env.API_PORT || 3000;
const host = 'http://77.173.109.239';

export default {
  data() {
    return {
      data: [],
      selectedNode: null
    };
  },
  methods: {
    fetchGraphData() {
      fetch(`${host}:${apiPort}/api/data`)
        .then(response => response.json())
        .then(data => {
          this.data = data;
          this.createGraph();
        });
    },
    createGraph() {

  const width = window.innerWidth;
  const height = window.innerHeight;

  const svg = d3.select(this.$refs.graph)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)  
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%') 
    .style('height', height)
    .append('g')
    .attr('transform', `translate(${60},${0})`);

  const root = d3.stratify()
    .id(d => d.name)
    .parentId(d => d.parent)(this.data);

  const treeLayout = d3.tree().size([height, width-125]);
  const nodes = treeLayout(root);

  // Draw links (paths between nodes)
  svg.selectAll('path')
    .data(nodes.links())
    .enter()
    .append('path')
    .attr('d', d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x))
    .attr('fill', 'none')
    .attr('stroke', '#ccc');

  // Draw nodes (rectangles)
  const nodeGroup = svg.selectAll('g')
    .data(nodes.descendants())
    .enter()
    .append('g')
    .attr('transform', d => `translate(${d.y},${d.x})`)
    .on('click', (event, d) => this.selectNode(d.data));

  nodeGroup.append('rect')
    .attr('width', 120)
    .attr('height', 50)
    .attr('x', -60)
    .attr('y', -25)
    .attr('fill', '#fff')
    .attr('stroke', '#000')
    .attr('rx', 10)
    .attr('ry', 10);

  nodeGroup.append('text')
    .attr('dx', 0)
    .attr('dy', 5)
    .attr('text-anchor', 'middle')
    .text(d => d.data.name);
},
    selectNode(node) {
      this.selectedNode = node;
    },
    deselectNode() {
      this.selectedNode = null;
    }
  },
  mounted() {
    this.fetchGraphData();
  }
};
</script>

<style>
.details {
  position: absolute;
  top: 20px;
  left: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
.graph-container {
  display: flex;
  position: relative;
}

.graph-area {
  flex-grow: 1;
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 10;
}

.sidebar-content {
  position: relative;
}

h3 {
  margin: 0;
  padding-bottom: 10px;
}

p {
  font-size: 14px;
  color: #555;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

rect {
  cursor: pointer;
}

rect:hover {
  stroke: #333;
  stroke-width: 2;
}
</style>
