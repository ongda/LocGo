  import BFS from './algos/BFS';
  import DijkstraIterator from './algos/DijkstraIterator';
  import Dijkstra from './algos/Dijkstra';
  import BidirectionalDijkstra from './algos/BidirectionalDijkstra';
  import Graph from './core/Graph';
  import { IN, OUT } from './core/constants';

const jKstra = {
    IN,
    OUT,
    Graph,
    algos: {
        BFS,
        Dijkstra,
        BidirectionalDijkstra,
        DijkstraIterator
    }
};
export default jKstra;
