export const createRandomNode: any = (nodes: []) => {
  const rand = Math.random()
  const length = nodes && nodes.length
  const randomIndex = Math.floor(rand * length)
  return nodes[randomIndex]
}
