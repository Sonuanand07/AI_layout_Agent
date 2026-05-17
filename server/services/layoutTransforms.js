/**
 * Layout transformation functions
 * These are deterministic, safe transformations applied by the backend
 */

export function resizeArtboard(layout, newWidth, newHeight) {
  if (!layout || !layout.rootNodes || !layout.nodes) {
    throw new Error('Invalid layout structure');
  }

  const updated = structuredClone(layout);
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];

  if (!artboard) {
    throw new Error('Root artboard not found');
  }

  const oldWidth = artboard.width;
  const oldHeight = artboard.height;

  artboard.width = newWidth;
  artboard.height = newHeight;

  // Recompute absolute coordinates for all children using normalized values
  if (artboard.children && Array.isArray(artboard.children)) {
    artboard.children.forEach((childId) => {
      const node = updated.nodes[childId];
      if (node) {
        node.x = node.nx * newWidth;
        node.y = node.ny * newHeight;
        node.width = node.nw * newWidth;
        node.height = node.nh * newHeight;
      }
    });
  }

  return updated;
}

export function moveNode(layout, nodeId, direction) {
  if (!layout || !layout.nodes || !layout.nodes[nodeId]) {
    throw new Error('Invalid layout or node not found');
  }

  const updated = structuredClone(layout);
  const node = updated.nodes[nodeId];
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];

  if (!artboard) {
    throw new Error('Root artboard not found');
  }

  const padding = 20;
  const centerX = artboard.width / 2;
  const centerY = artboard.height / 2;

  switch (direction.toLowerCase()) {
    case 'top':
      node.y = padding;
      node.ny = padding / artboard.height;
      break;
    case 'bottom':
      node.y = artboard.height - node.height - padding;
      node.ny = (artboard.height - node.height - padding) / artboard.height;
      break;
    case 'center':
      node.x = centerX - node.width / 2;
      node.y = centerY - node.height / 2;
      node.nx = (centerX - node.width / 2) / artboard.width;
      node.ny = (centerY - node.height / 2) / artboard.height;
      break;
    case 'left':
      node.x = padding;
      node.nx = padding / artboard.width;
      break;
    case 'right':
      node.x = artboard.width - node.width - padding;
      node.nx = (artboard.width - node.width - padding) / artboard.width;
      break;
    case 'higher':
    case 'up':
      node.y = Math.max(padding, node.y - 50);
      node.ny = node.y / artboard.height;
      break;
    case 'lower':
    case 'down':
      node.y = Math.min(artboard.height - node.height - padding, node.y + 50);
      node.ny = node.y / artboard.height;
      break;
  }

  return updated;
}

export function resizeNode(layout, nodeId, scaleFactor) {
  if (!layout || !layout.nodes || !layout.nodes[nodeId]) {
    throw new Error('Invalid layout or node not found');
  }

  const updated = structuredClone(layout);
  const node = updated.nodes[nodeId];
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];

  if (!artboard) {
    throw new Error('Root artboard not found');
  }

  node.width = node.width * scaleFactor;
  node.height = node.height * scaleFactor;
  node.nw = node.nw * scaleFactor;
  node.nh = node.nh * scaleFactor;

  // Update font size if it's a text node
  if (node.type === 'text' && node.style && node.style.visual && node.style.visual.fontSize) {
    node.style.visual.fontSize = Math.round(node.style.visual.fontSize * scaleFactor);
  }

  return updated;
}

export function changeTextContent(layout, nodeId, newContent) {
  if (!layout || !layout.nodes || !layout.nodes[nodeId]) {
    throw new Error('Invalid layout or node not found');
  }

  const updated = structuredClone(layout);
  const node = updated.nodes[nodeId];

  if (node.type !== 'text') {
    throw new Error('Node is not a text node');
  }

  if (!node.data) {
    node.data = {};
  }

  node.data.content = newContent;
  return updated;
}

export function changeFontSize(layout, nodeId, newSize) {
  if (!layout || !layout.nodes || !layout.nodes[nodeId]) {
    throw new Error('Invalid layout or node not found');
  }

  const updated = structuredClone(layout);
  const node = updated.nodes[nodeId];

  if (node.type !== 'text') {
    throw new Error('Node is not a text node');
  }

  if (!node.style) node.style = {};
  if (!node.style.visual) node.style.visual = {};

  const oldFontSize = node.style.visual.fontSize || 48;
  node.style.visual.fontSize = Math.max(8, Math.min(200, newSize));

  // Update height proportionally
  const sizeRatio = node.style.visual.fontSize / oldFontSize;
  node.height = node.height * sizeRatio;
  node.nh = node.nh * sizeRatio;

  return updated;
}
