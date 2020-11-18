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
const caminhos = [];
const t = [];
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
    for (let linha = 0; linha < length; linha++) {
        const minDistanceIndex = minDistance(dist, visited);
        visited[minDistanceIndex] = true;
    
        for (let coluna = 0; coluna < length; coluna++) {
            if(calculateRoute(visited, coluna, graph, minDistanceIndex, dist)) {
                dist[coluna] = dist[minDistanceIndex] + graph[minDistanceIndex][coluna];
                t.push([minDistanceIndex, coluna]);
            }        
        }
    }
    let index = t.length -1;
    let ultimo = t.length;
    while(index > -1) {
        if (t[index][1] === ultimo) {
            caminhos.push(t[index][1]);
            ultimo = t[index][0];
        }
        index--;
    }
    caminhos.push(0);
    const rota = caminhos.reverse();
    return rota;
}

const minDistance = (dist, visited) => {
    let min = INF;
    let minIndex = -1;
    for (let v = 0; v < dist.length; v++) {
        if (visited[v] === false && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }''
    return minIndex;
}

const calculateRoute = (visited, coluna, graph, u, dist) => {
    const isVisited = visited[coluna];
    const hasDistance = graph[u][coluna] !== 0;
    const isReal = dist[u] !== INF;
    const isMinorDistance = dist[u] + graph[u][coluna] < dist[coluna];
    return !isVisited && hasDistance && isReal && isMinorDistance;
}


var dist = dijkstra(graph, 0, 6);
let gasto = [];
for (i = 0; i < dist.length; i++){
    // if (dist[i] != INF) {
    //     gasto.push(dist[i] * 3.00 + 2.5)
    // }
    
    
    console.log(i+1 + '\t\t' + dist[i]);
}
// console.log(gasto);



//https://youtu.be/rZ5xpH3WedM?t=4084