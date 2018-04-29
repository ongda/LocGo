//'use strict'
/* global jKstra */
//var jKstra = require('./jKstra');

// import jKstra from "./jKstra";
// //import { Graph } from './core/Graph';
// //import Dijkstra  from './algos/Dijkstra';
//
// let myGraph = new jKstra.Graph();
// let n = [];
// n.push(myGraph.addVertex(0));
// n.push(myGraph.addVertex(1));
// n.push(myGraph.addVertex(1));
// n.push(myGraph.addVertex(3));
// n.push(myGraph.addVertex(4));
// //
// myGraph.addEdgePair(n[0], n[1], 6);
// myGraph.addEdgePair(n[1], n[2], 4);
// myGraph.addEdgePair(n[0], n[2], 8);
// myGraph.addEdgePair(n[0], n[3], 16);
// myGraph.addEdgePair(n[1], n[3], 10);
// myGraph.addEdgePair(n[2], n[3], 7);
// myGraph.addEdgePair(n[3], n[4], 5);
// myGraph.addEdgePair(n[2], n[4], 4);
// ////
// var opt = { flagKey: '_dijkstra' };
// var dijkstra = new jKstra.algos.Dijkstra(myGraph, opt);
// //var dijkstra = new jKstra.algos.BidirectionalDijkstra(myGraph,opt);
//
// const options = {
//     edgeCost: e => e.data
// };
// var path = dijkstra.shortestPath(n[0], n[4], options);
// console.log(path.map(function (e) { return e.data; }).join());
// // => [9, 2, 10]
// //let a = 5;
// console.log('Done!');
