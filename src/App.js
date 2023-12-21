import React, { useState, useEffect } from "react";
import Note from "./components/Note/Note";
import NoteForm from "./components/NoteForm/NoteForm";
import SearchBar from "./components/SearchBar/SearchBar";
import { Tooltip } from "react-tooltip";
import { IoBulbOutline } from "react-icons/io5";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    return storedNotes;
  });

  const [filteredNotes, setFilteredNotes] = useState([...notes]);
  const [isGridView, setGridView] = useState(true);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    setFilteredNotes([...notes]);
  }, [notes]);

  const addNote = (title, content, backgroundColor, image) => {
    setNotes((prevNotes) => [
      { title, content, color: backgroundColor, image },
      ...prevNotes,
    ]);
  };

  const editNote = (index, updatedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = updatedNote;
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = [...notes];
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
    }
  };

  const handleSearch = (query) => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
    setFilteredNotes(filtered);
  };

  const toggleLayout = () => {
    setGridView((prev) => !prev);
  };

  return (
    <div>
      <Tooltip id="my-tooltip" />
      <SearchBar
        onSearch={handleSearch}
        toggleLayout={toggleLayout}
        isGridView={isGridView}
      />
      <NoteForm addNote={addNote} />
      {notes.length === 0 && (
        <div className="empty">
          <IoBulbOutline className="bulb" />
          <p>Notes you add will appear here</p>
        </div>
      )}

      {notes.length !== 0 && (
        <div className="notes-heading">
          <p>Your Notes</p>
        </div>
      )}

      <div className={isGridView ? "notes-container" : "notes-list"}>
        {filteredNotes.map((note, index) => (
          <Note
            key={index}
            index={index}
            note={note}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
