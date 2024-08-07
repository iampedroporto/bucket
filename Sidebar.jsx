

function Sidebar () {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Entrada
      </div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'inputcustom')} draggable>
        Input
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'process')} draggable>
        Processamento
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'gptsettings')} draggable>
        GPT Settings
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'gptmessage')} draggable>
        GPT Message
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'outputcustom')} draggable>
        Output
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Saída
      </div>
    </aside>
  );
}

export default Sidebar;
