const graph = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 2, 50, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]
];
const gasCost = 4;
const autonomy = 0.10;
const tollCost = [
    4,2,5,10,7,9
];
const INF = Number.MAX_SAFE_INTEGER;

const dijkstra = (graph, source, destination) => {
    const routePoints = [];
    const path = [];
    const { length } = graph;
    const distances = Array(length).fill(INF);
    const visited = Array(length).fill(false);

    distances[source] = 0;
    for (let row = 0; row < length; row++) {
        const minDistanceIndex = minDistance(distances, visited);
        visited[minDistanceIndex] = true;
    
        for (let column = 0; column < length; column++) {
            if(validateBestPath(visited, column, graph, minDistanceIndex, distances)) {
                distances[column] = weightFunction(distances[minDistanceIndex],graph[minDistanceIndex][column], column);
                routePoints.push([minDistanceIndex, column]);
            }        
        }
    }
    let index = length -1;
    let lastValue = destination - 1;
    while(index > -1) {
        if (routePoints[index][1] === lastValue) {
            path.push(routePoints[index][1]);
            lastValue = routePoints[index][0];
        }
        index--;
    }
    path.push(0);
    const paths = path.reverse();
    const totalDistance = distances[destination - 1];
    const travelCost = totalDistance * (autonomy * gasCost) + paths.reduce((prev, curr, index) => index > 0 ? prev + tollCost[curr]: prev, 0)
    return {
        route: path.toString(),
        totalDistance,
        travelCost
    }
}

const weightFunction = (origin, destination, position) => {
    const travelCost = (autonomy * gasCost) + tollCost[position];
    return origin + destination * travelCost;
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

const validateBestPath = (visited, column, graph, u, distances) => {
    const isVisited = visited[column];
    const hasDistance = graph[u][column] !== 0;
    const isReal = distances[u] !== INF;
    const isMinorDistance = weightFunction(distances[u], graph[u][column], column) < distances[column];
    return !isVisited && hasDistance && isReal && isMinorDistance;
}


let response = dijkstra(graph, 0, 4);
console.log(response)