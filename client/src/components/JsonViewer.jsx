import { useState } from 'react';

export function JsonViewer({ layout }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-green-400 font-mono text-xs overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <span className="font-bold">Layout JSON</span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-3">
        {expanded ? (
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(layout, null, 2)}
          </pre>
        ) : (
          <div className="text-xs">
            <p>
              {layout.rootNodes?.[0]} →{' '}
              {layout.nodes?.[layout.rootNodes?.[0]]?.name}
            </p>
            <p>
              Size: {layout.nodes?.[layout.rootNodes?.[0]]?.width} ×{' '}
              {layout.nodes?.[layout.rootNodes?.[0]]?.height}
            </p>
            <p>
              Elements: {layout.nodes?.[layout.rootNodes?.[0]]?.children?.length}
            </p>
            <p className="mt-2 text-gray-500">Click "Expand" to view full JSON</p>
          </div>
        )}
      </div>
    </div>
  );
}
