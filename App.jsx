import './App.css'
import Flow from './Flow'

const defaultData = {
  "nodes": [
    {
      "id": "dndnode_0",
      "type": "outputcustom",
      "position": {
        "x": 369.6666666666668,
        "y": -77
      },
      "data": {
        "label": "outputcustom node",
        "textareaValue": ""
      },
      "sourcePosition": "right",
      "targetPosition": "left",
      "dragHandle": ".ant-card-head",
      "measured": {
        "width": 300,
        "height": 147
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "dndnode_1",
      "type": "gptsettings",
      "position": {
        "x": 29.026429558607163,
        "y": -77.42448812300148
      },
      "data": {
        "label": "gptsettings node",
        "textareaValue": ""
      },
      "sourcePosition": "right",
      "targetPosition": "left",
      "dragHandle": ".ant-card-head",
      "measured": {
        "width": 300,
        "height": 385
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "dndnode_3",
      "type": "gptmessage",
      "position": {
        "x": -317.4244881230015,
        "y": -76.51294558175579
      },
      "data": {
        "label": "gptmessage node",
        "textareaValue": ""
      },
      "sourcePosition": "right",
      "targetPosition": "left",
      "dragHandle": ".ant-card-head",
      "measured": {
        "width": 300,
        "height": 414
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "dndnode_4",
      "type": "inputcustom",
      "position": {
        "x": -655.8630819295652,
        "y": -74.48550809453415
      },
      "data": {
        "label": "inputcustom node",
        "textareaValue": ""
      },
      "sourcePosition": "right",
      "targetPosition": "left",
      "dragHandle": ".ant-card-head",
      "measured": {
        "width": 300,
        "height": 147
      },
      "selected": false,
      "dragging": false
    }
  ],
  "edges": [
    {
      "source": "dndnode_1",
      "target": "dndnode_0",
      "id": "xy-edge__dndnode_1-dndnode_0"
    },
    {
      "source": "dndnode_3",
      "target": "dndnode_1",
      "id": "xy-edge__dndnode_3-dndnode_1"
    },
    {
      "source": "dndnode_4",
      "target": "dndnode_3",
      "id": "xy-edge__dndnode_4-dndnode_3"
    }
  ]
}

const defaultInitialNodes = defaultData.nodes;
const defaultInitialEdges = defaultData.edges;

function App() {
  return (
    <>
    <div style={{ height: '100%', width: '100%' }}>
        <Flow initialEdges={defaultInitialEdges} initialNodes={defaultInitialNodes} />
      </div>
    </>
  )
}

export default App
