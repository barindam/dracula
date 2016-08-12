import {each} from 'lodash/collection'

/**
 * Base class for rendering nodes
 *
 * Can transform coordinates to fit onto the canvas
 */
export default class Renderer {

  /**
   * @param {DomElement|String} element target dom element or querySelector
   * @param {Graph} graph Dracula Graph instance
   * @param {number} width (optional) width of the canvas, default 400
   * @param {number} height (optional) height of the canvas, default 300
   */
  constructor(element, graph, width, height) {
    this.graph = graph
    // Convert a query into a dom element
    if (typeof element === 'string') {
      let selector = typeof $ !== 'undefined' ? $ : (q => document.querySelector(q))
      element = selector(element)
    }
    this.element = element
    this.width = width || 400
    this.height = height || 300
    this.radius = 40
  }

  /**
   * Scale the nodes within the canvas dimensions
   * Keep a distance to the canvas edges of half a node radius
   */
  draw() {
    this.factorX = (this.width - 2 * this.radius) /
                      (this.graph.layoutMaxX - this.graph.layoutMinX)

    this.factorY = (this.height - 2 * this.radius) /
                      (this.graph.layoutMaxY - this.graph.layoutMinY)

    each(this.graph.nodes, node => this.drawNode(node))
    each(this.graph.edges, edge => this.dawEdge(edge))
  }

  translate(point) {
    return [
      Math.round((point[0] - this.graph.layoutMinX) * this.factorX + this.radius),
      Math.round((point[1] - this.graph.layoutMinY) * this.factorY + this.radius)
    ]
  }

  drawNode(node) { // eslint-disable-line no-unused-vars
    throw new Error('not implemented')
  }

  drawEdge(edge) { // eslint-disable-line no-unused-vars
    throw new Error('not implemented')
  }

}
