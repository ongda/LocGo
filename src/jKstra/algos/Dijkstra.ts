﻿import DijkstraIterator from '../algos/DijkstraIterator';
import NodeFlagger from './nodeFlagger';
import { SETTLED } from '../core/constants';

class Dijkstra {
    nodeFlagger: NodeFlagger;
    options: any;
    graph: any;
    constructor(graph, opts) {
        this.graph = graph;
        this.options = { flagKey: '_dijkstra', ...opts };
        this.nodeFlagger = new NodeFlagger(this.graph, this.options.flagKey);
    }

    rebuildPath(end) {
        const edges = [];
        let edge;
        // going upward in the tree until the first vertex (with no incoming edge)
        while ((edge = this.nodeFlagger.getFlags(end).inc) !== null) {
            edges.push(edge);
            end = edge.from;
        }
        return edges.reverse();
    }

    static defaultTraversalOptions = {
        isFinished: () => false
    }

    /**
    The most common use of Dijkstra traversal
    */
    shortestPath(source, target, opts) {
        const options = opts || {};
        options.isFinished = () => this.nodeFlagger.getFlags(target).state === SETTLED;

        const found = this.traverse(source, options);
        if (found) {
            return this.rebuildPath(target);
        }
        return null;
    }

    /**
    Traverse the graph using Dijkstra's algorithm,
    starting from source, with the specified options
    */
    traverse(source, opts) {
        const options = {...Dijkstra.defaultTraversalOptions, ...opts };
        const dijkstraIterator = new DijkstraIterator(this.graph, source, opts);

        // simply loop over the iterator until it ends
        while (!dijkstraIterator.next().done && !options.isFinished()) { }

        // if false, means the whole graph was traversed
        return options.isFinished();
    }
};

export default Dijkstra;
