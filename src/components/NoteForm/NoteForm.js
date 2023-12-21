import React, { useState, useRef, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { IoIosColorPalette } from "react-icons/io";
import "./NoteForm.css";

const NoteForm = ({ addNote }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#FAF9F6");

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        isExpanded
      ) {
        setExpanded(false);
        // Save note only if it is not empty
        if (title.trim() !== "" || content.trim() !== "" || image) {
          addNote(title, content, backgroundColor, image);
          setTitle("");
          setContent("");
          setImage(null);
          setBackgroundColor("#FAF9F6");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, content, addNote, isExpanded, image]);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "" || content.trim() !== "" || image) {
      addNote(title, content, backgroundColor, image);
      setTitle("");
      setContent("");
      setImage(null);
      setExpanded(false);
      setBackgroundColor("#FAF9F6");
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className={`note-form ${isExpanded ? "expanded" : ""}`} ref={formRef}>
      <input
        type="text"
        placeholder={isExpanded ? "Title" : "Take a note..."}
        onClick={handleExpand}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isExpanded && (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {image && (
            <div className="form-image">
              <img src={image} alt="NoteIamge" style={{ maxWidth: "100%" }} />
              <MdDeleteForever
                className="remove"
                style={{ fill: "#575757", zIndex: 2 }}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Remove Photo"
                onClick={() => setImage(null)}
              />
            </div>
          )}
          <div className="bottom-options">
            <div className="bottom-options-left">
              <label htmlFor="addImage">
                <RiImageAddFill
                  className="add-image"
                  style={{ fill: "#575757" }}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Add Image"
                />
              </label>
              <input
                id="addImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label htmlFor="addColor">
                <IoIosColorPalette
                  className="add-image"
                  style={{ fill: "#575757" }}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Set Background"
                />
              </label>
              <input
                id="addColor"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>

            <div>
              <button type="submit">Close</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default NoteForm;
