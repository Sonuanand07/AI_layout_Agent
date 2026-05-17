/**
 * JSON Validator - ensures LLM output has the expected structure
 */
export function validateLayout(layout) {
  if (!layout) {
    throw new Error('Layout is null or undefined');
  }

  if (!Array.isArray(layout.rootNodes)) {
    throw new Error('rootNodes must be an array');
  }

  if (typeof layout.nodes !== 'object' || layout.nodes === null) {
    throw new Error('nodes must be an object');
  }

  for (const id of layout.rootNodes) {
    if (!layout.nodes[id]) {
      throw new Error(`Missing root node with id: ${id}`);
    }
  }

  // Validate all nodes have required properties
  for (const [id, node] of Object.entries(layout.nodes)) {
    if (!node.id) {
      throw new Error(`Node ${id} is missing required 'id' property`);
    }
    if (typeof node.x !== 'number' || typeof node.y !== 'number') {
      throw new Error(`Node ${id} must have numeric x and y coordinates`);
    }
    if (typeof node.width !== 'number' || typeof node.height !== 'number') {
      throw new Error(`Node ${id} must have numeric width and height`);
    }
    if (typeof node.nx !== 'number' || typeof node.ny !== 'number' ||
        typeof node.nw !== 'number' || typeof node.nh !== 'number') {
      throw new Error(`Node ${id} must have normalized coordinates (nx, ny, nw, nh)`);
    }
  }

  return true;
}

export function validateChatResponse(response) {
  if (!response) {
    throw new Error('Response is null');
  }

  if (typeof response.explanation !== 'string') {
    throw new Error('Response must have an explanation string');
  }

  if (typeof response.updatedLayout !== 'object') {
    throw new Error('Response must have an updatedLayout object');
  }

  validateLayout(response.updatedLayout);
  return true;
}
