/**
 * JSON Validator - ensures LLM output has the expected structure
 */

// Post-process layout to fix missing normalized coordinates
// This is a safety net in case Claude forgets to include them
export function ensureNormalizedCoordinates(layout) {
  if (!layout || !layout.nodes) return layout;

  // Find canvas dimensions from root node
  const rootId = layout.rootNodes?.[0];
  const artboard = rootId ? layout.nodes[rootId] : null;
  const canvasWidth = artboard?.width || 1080;
  const canvasHeight = artboard?.height || 1080;

  // Fix all nodes
  for (const [id, node] of Object.entries(layout.nodes)) {
    if (!node) continue;

    // If has absolute coords but missing normalized coords, calculate them
    if (
      typeof node.x === 'number' &&
      typeof node.y === 'number' &&
      typeof node.width === 'number' &&
      typeof node.height === 'number'
    ) {
      if (typeof node.nx !== 'number') {
        node.nx = node.x / canvasWidth;
      }
      if (typeof node.ny !== 'number') {
        node.ny = node.y / canvasHeight;
      }
      if (typeof node.nw !== 'number') {
        node.nw = node.width / canvasWidth;
      }
      if (typeof node.nh !== 'number') {
        node.nh = node.height / canvasHeight;
      }
    }
  }

  return layout;
}

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
