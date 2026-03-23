import { useState } from 'react';
import { format } from 'date-fns';

// Component 1: Individual Note Item (Reverted to your original sticky note style)
function NoteItem({ note, onDelete }: { note: any; onDelete: (id: number) => void }) {
  return (
    <div className="note-item">
      <div>
        <div className="note-text">{note.text}</div>
        <div className="note-date">
          Added: {format(note.timestamp, 'PPpp')}
        </div>
      </div>
      <button 
        className="delete-button" 
        onClick={() => onDelete(note.id)}
      >
        ✕
      </button>
    </div>
  );
}

// Component 2: Input Area
function NoteInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [input, setInput] = useState('');
  
  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };

  return (
    <div className="input-group">
      <input 
        className="note-input"
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a quick note..."
      />
      <button className="add-button" onClick={handleAdd}>
        Add Note
      </button>
    </div>
  );
}

// Main App Component
function App() {
  const [notes, setNotes] = useState<{ id: number; text: string; timestamp: Date }[]>([]);
  
  // Set to "1.0.0" for first release, "1.1.0" for the update demonstration
  const appVersion = "1.0.0"; 

  const addNote = (text: string) => {
    setNotes([...notes, { id: Date.now(), text, timestamp: new Date() }]);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };


  return (
    <>
      <div className="version-tag">v{appVersion}</div>
      <div className="container">
        <h1 className="title">ZenNotes 📝</h1>
        <NoteInput onAdd={addNote} />
        <div>
          {notes.map(note => (
            <NoteItem key={note.id} note={note} onDelete={deleteNote} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;