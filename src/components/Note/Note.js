import React, { useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import {
  MdEditDocument,
  MdDeleteOutline,
  MdDeleteForever,
} from "react-icons/md";
import "./Note.css";

const Note = ({ index, note, editNote, deleteNote }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editedColor, setEditedColor] = useState(note.color || "#FAF9F6");
  const [editedImage, setEditedImage] = useState(note.image);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    editNote(index, {
      ...note,
      title: editedTitle,
      content: editedContent,
      color: editedColor,
      image: editedImage,
    });
    setEditing(false);
  };

  const handleDelete = () => {
    deleteNote(index);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      {isEditing ? (
        <>
          <input
            className="edited-title"
            placeholder="Title"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            placeholder="Add a note..."
            className="edited-subtitle"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="change-color">
            <label htmlFor="change-color">Change Background Color : </label>
            <input
              id="change-color"
              className="edited-color-bg"
              type="color"
              value={editedColor}
              onChange={(e) => setEditedColor(e.target.value)}
            />
          </div>

          <div className="add-edited-image">
            <label htmlFor="addImage">
              <RiImageAddFill
                className="add-image"
                style={{ fill: "#575757" }}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Change Image"
              />
            </label>
            <input
              id="addImage"
              className="edited-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {editedImage && (
            <div className="editedimage form-image">
              <img
                src={editedImage}
                alt="NoteImage"
                style={{ width: "100%", height: "100%" }}
              />
              <MdDeleteForever
                className="remove"
                style={{ fill: "#575757" }}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Remove Image"
                onClick={() => setEditedImage(null)}
              />
            </div>
          )}
          <button className="save" onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          {note.image && (
            <img src={note.image} alt="Note" style={{ maxWidth: "100%" }} />
          )}
          <h3 className="title">{note.title}</h3>
          <p className="subtitle">{note.content}</p>
          <div className="note-actions">
            <MdEditDocument
              style={{ fill: "#575757" }}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Edit"
              className="action"
              onClick={handleEdit}
            />
            <MdDeleteOutline
              style={{ fill: "#575757" }}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Delete"
              className="action"
              onClick={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
