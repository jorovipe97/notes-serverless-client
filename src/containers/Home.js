import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { LinkContainer } from 'react-router-bootstrap';
import "./Home.css";

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        console.dir(notes);
        setNotes(notes);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      // Custom links https://reacttraining.com/react-router/web/example/custom-link
      i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <li className="pointer list-group-item">
            <h4>{note.content.trim().split("\n")[0]}</h4>
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </li>
        </LinkContainer>
      ) : (
          <LinkContainer key="new" to="/notes/new">
            <li className="pointer list-group-item">
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </li>
          </LinkContainer>
        )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    )
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h1>Your Notes</h1>
        <ul className="list-group">
          {!isLoading && renderNotesList(notes)}
        </ul>
      </div>

    )
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}