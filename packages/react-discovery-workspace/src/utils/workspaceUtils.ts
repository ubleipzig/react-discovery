import {
  Corner,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  updateTree,
} from 'react-mosaic-component'
import dropRight from 'lodash/dropRight'

export const createNode = (windowCount): number => ++windowCount

export const autoArrange = (currentNode, setCurrentNode): void => {
  const leaves = getLeaves(currentNode)
  const newTree: any = createBalancedTreeFromLeaves(leaves)
  setCurrentNode(newTree)
}

export const addToTopRight = (currentNode, setCurrentNode, windowCount): void => {
  if (currentNode) {
    const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
    const parent = getNodeAtPath(currentNode, dropRight(path)) as MosaicParent<number>;
    const destination = getNodeAtPath(currentNode, path) as MosaicNode<number>;
    const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row';

    let first: MosaicNode<number>;
    let second: MosaicNode<number>;
    if (direction === 'row') {
      first = destination;
      second = ++windowCount;
    } else {
      first = ++windowCount;
      second = destination;
    }

    updateTree(currentNode, [
      {
        path,
        spec: {
          $set: {
            direction,
            first,
            second,
          },
        },
      },
    ]);
  } else {
    createNode(windowCount);
  }
  setCurrentNode(currentNode);
}

