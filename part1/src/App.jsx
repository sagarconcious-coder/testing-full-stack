import { useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const response = await fetch("http://localhost:3000/notes");
    const data = await response.json();
    console.log(data, typeof data);

    setNotes(data);
  };
  const renderNotes = () => {
    return notes.map((note) => {
      const { id, title, content } = note;
      return (
        <li key={id}>
          <strong>{title}</strong>: {content}
        </li>
      );
    });
  };
  return (
    <div>
      <div>
        <button onClick={fetchNotes}>Get Notes</button>
        <ul>{renderNotes()}</ul>
      </div>
    </div>
  );
};

export default App;
