import './index.css';
import { useLayoutAgent } from './hooks/useLayoutAgent';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { WireframePreview } from './components/WireframePreview';
import { JsonViewer } from './components/JsonViewer';

function App() {
  const { layout, messages, isLoading, error, sendMessage } = useLayoutAgent();

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Layout Design Agent</h1>
        <p className="text-blue-100 text-sm">Chat-based design transformation</p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden gap-4 p-4">
        {/* Left: Chat */}
        <div className="w-1/3 flex flex-col bg-white rounded-lg shadow overflow-hidden">
          <ChatWindow messages={messages} isLoading={isLoading} />
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
          {error && (
            <div className="px-4 py-2 bg-red-100 text-red-800 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Middle: Wireframe Preview */}
        <div className="w-1/3 bg-white rounded-lg shadow overflow-hidden flex flex-col">
          <div className="bg-gray-800 text-white px-4 py-2 font-bold">
            Design Preview
          </div>
          <div className="flex-1 overflow-auto">
            <WireframePreview layout={layout} />
          </div>
        </div>

        {/* Right: JSON Viewer */}
        <div className="w-1/3 rounded-lg shadow overflow-hidden">
          <JsonViewer layout={layout} />
        </div>
      </div>
    </div>
  );
}

export default App;
