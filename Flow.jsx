/* eslint-disable react/prop-types */
import { useRef, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Position,
  Background
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Sidebar from './Sidebar';
import ProcessNode from './ProcessNode';
import GPTSettingsNode from './GPTSettingsNode';
import GPTMessageNode from './GPTMessageNode';
import InputNode from './InputNode';
import OutputNode from './OutputNode';
import { Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import './index.css';

const CustomButton = ({ onClick }) => (
  <Button type="text" icon={<SaveOutlined />} onClick={onClick} />
);


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ initialNodes = [], initialEdges = [] }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const nodeTypes = useMemo(() => ({
    process: (props) => <ProcessNode {...props} updateNode={updateNode} />,
    gptsettings: GPTSettingsNode,
    gptmessage: GPTMessageNode,
    inputcustom: InputNode,
    outputcustom: OutputNode,
  }), []);

  const onConnect = (params) => {
    const { source, target } = params;

    if (source === target) {
      alert('Um nó não pode se conectar a si mesmo.');
      return;
    }

    const sourceHasOutgoingEdge = edges.some(edge => edge.source === source);
    const targetHasIncomingEdge = edges.some(edge => edge.target === target);

    if (!sourceHasOutgoingEdge && !targetHasIncomingEdge) {
      setEdges((eds) => addEdge(params, eds));
    } else {
      alert('Um nó não pode ter mais de uma conexão entrando ou saindo.');
    }
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node`, textareaValue: '' },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        dragHandle: '.ant-card-head'
      };

      setNodes((nds) => {
        const nodeExists = nds.some(node => node.type === type);
        if (nodeExists && type === 'input') {
          alert('Você não pode adicionar mais de um nó do tipo "entrada"');
          return nds;
        }
        if (nodeExists && type === 'output') {
          alert('Você não pode adicionar mais de um nó do tipo "saída"');
          return nds;
        }

        return nds.concat(newNode)
      });
    },
    [screenToFlowPosition, setNodes],
  );

  const saveFlow = () => {
    const elements = { nodes, edges };
    console.log(JSON.stringify(elements, null, 2)); 
    message.success('Salvo com sucesso!');
  };

  const updateNode = useCallback(({id, label, content}) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: label,
              content: content,
            },
          };
        }

        return node;
      }),
    );
  }, [setNodes]);



  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          maxZoom={1.5}
          fitView
          style={{ width: '100%', height: '100%' }}
        >
          <Controls>
            <CustomButton onClick={saveFlow} />
          </Controls>
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
};

const Flow = ({initialNodes, initialEdges}) => (
  <ReactFlowProvider>
    <DnDFlow initialEdges={initialEdges} initialNodes={initialNodes} />
  </ReactFlowProvider>
);

export default Flow;
