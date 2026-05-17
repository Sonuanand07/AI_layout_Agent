export function WireframePreview({ layout }) {
  if (!layout || !layout.rootNodes || !layout.nodes) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Invalid layout data</p>
      </div>
    );
  }

  const rootId = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];

  if (!artboard) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Artboard not found</p>
      </div>
    );
  }

  const aspectRatio = artboard.height / artboard.width;

  return (
    <div className="w-full h-full flex flex-col overflow-auto bg-gray-100 p-4">
      <div
        className="relative mx-auto"
        style={{
          width: '100%',
          maxWidth: '300px',
          paddingBottom: `${aspectRatio * 100}%`,
          backgroundColor: artboard.data?.backgroundColor || '#f0f0f0',
          border: '2px solid #999',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {artboard.children && artboard.children.map((childId) => {
          const node = layout.nodes[childId];
          if (!node) return null;

          const bgColor = getColorForType(node.type);
          const isText = node.type === 'text';
          const isImage = node.type === 'image';

          return (
            <div
              key={childId}
              style={{
                position: 'absolute',
                left: `${node.nx * 100}%`,
                top: `${node.ny * 100}%`,
                width: `${node.nw * 100}%`,
                height: `${node.nh * 100}%`,
                backgroundColor: isImage ? '#e0e0e0' : bgColor,
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '2px',
                fontSize: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}
              title={`${node.name} (${node.type})`}
            >
              <span
                style={{
                  fontSize: '7px',
                  fontWeight: 'bold',
                  color: '#333',
                  wordWrap: 'break-word',
                }}
              >
                {isText ? `T: ${node.data?.content?.substring(0, 10)}` : node.name}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-xs text-gray-600 text-center">
        <p>{artboard.width}×{artboard.height}px</p>
        <p>{artboard.children?.length || 0} elements</p>
      </div>
    </div>
  );
}

function getColorForType(type) {
  const colors = {
    image: 'rgba(100, 150, 255, 0.3)',
    text: 'rgba(255, 200, 100, 0.4)',
    shape: 'rgba(255, 100, 100, 0.4)',
  };
  return colors[type] || 'rgba(200, 200, 200, 0.3)';
}
