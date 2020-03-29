class Graph {
	constructor() {
		this.adjacencyList = {};
	}
	addVertex(vertex) {
		if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
	}
	addEdge(v1, v2) {
		this.adjacencyList[v1].push(v2);
		this.adjacencyList[v2].push(v1);
	}
	addUniDirectionalEdge(v1, v2) {
		this.adjacencyList[v1].push(v2);
	}
	removeEdge(v1, v2) {
		this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
		this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
	}
	removeUniEdge(v1, v2) {
		this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
	}
	removeVertex(vertex) {
		while (this.adjacencyList[vertex].length) {
			const adjacentVertex = this.adjacencyList[vertex].pop();
			this.removeEdge(vertex, adjacentVertex);
		}
		delete this.adjavenvtList[vertex];
	}
}

const G = new Graph();
// G.addVertex('Warszawa');
// G.addVertex('Wrocław');
// G.addVertex('Kraków');

const cityList = [
	'Poznań',
	'Kraków',
	'Wrocław',
	'Warszawa',
	'Sosnowiec',
	'Łódź',
	'Gdańsk',
	'Radom'
];

for (let i = 0; i < cityList.length; i += 1) {
	G.addVertex(cityList[i]);
}

function addMultipleToGraph(input) {
	for (let i = 0; i < cityList.length; i += 1) {
		G.addEdge(cityList[i], cityList[input]);
	}
	G.removeEdge(cityList[input], cityList[input]);
	G.removeEdge(cityList[1], cityList[input]);
}
addMultipleToGraph(1);
addMultipleToGraph(2);

G.removeEdge('Kraków', 'Wrocław');
console.log(G);
G.removeVertex('Kraków');
console.log(G);
