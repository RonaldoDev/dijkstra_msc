const graph = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 2, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]
  ];
const gasCost = 4;
const autonomy = 0.10;
const tollCost = [
    4,2,5,10,7,9
]

const INF = Number.MAX_SAFE_INTEGER;
const dijkstra = (graph, source, destination) => {
    const dist = [];
    const visited = []
    const { length } = graph;
    for (let i = 0; i < length; i++) {
        dist[i] = INF;
        visited[i] = false;
    }
    dist[source] = 0;
    for (let i = 0; i < destination; i++) {
        const minDistanceIndex = minDistance(dist, visited);
        visited[minDistanceIndex] = true;
    
        for (let j = 0; j < destination; j++) {
            if(calculateRoute(visited, j, graph, minDistanceIndex, dist)) {
                dist[j] = dist[minDistanceIndex] + graph[minDistanceIndex][j];
            }        
        }
    }
    return dist;
}

const minDistance = (dist, visited) => {
    let min = INF;
    let minIndex = -1;
    for (let v = 0; v < dist.length; v++) {
        if (visited[v] === false && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
}

const calculateRoute = (visited, v, graph, u, dist) => {
    const isVisited = visited[v];
    const hasDistance = graph[u][v] !== 0;
    const isReal = dist[u] !== INF;
    const isMinorDistance = dist[u] + graph[u][v] < dist[v];
    return !isVisited && hasDistance && isReal && isMinorDistance;
}


var dist = dijkstra(graph, 0, 6);
let gasto = [];
for (i = 0; i < dist.length; i++){
    if (dist[i] != INF) {
        gasto.push(dist[i] * 3.00 + 2.5)
    }
    
    
    console.log(i+1 + '\t\t' + dist[i]);
}
console.log(gasto);



//https://youtu.be/rZ5xpH3WedM?t=4084