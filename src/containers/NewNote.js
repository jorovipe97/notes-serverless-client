import React, { useRef, useState } from "react";
// import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { API } from "aws-amplify";
import { s3Upload } from '../libs/awsLib';
import "./NewNote.css";

export default function NewNote(props) {
    // The argument of useRef is the initial value of the .content of the created object
    const file = useRef(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return content.length > 0;
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.dir(file);
        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB.`
            );
            return;
        }

        setIsLoading(true);

        try {
            const attachment = file.current ? 
                await s3Upload(file.current)
                : null;

            await createNote({ content, attachment });
            setIsLoading(false);
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function createNote(note) {
        // the first argument is the name of the api on the index.js file
        // on the Amplify.configure({}) method
        return API.post("notes", "/notes", {
            body: note
        });
    }

    return (
        <div className="NewNote">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" className="form-control" autoFocus
                        value={content} onChange={(e) => setContent(e.target.value)} />
                </div>

                <div className="form-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="attachment" onChange={handleFileChange} />
                        <label className="custom-file-label" htmlFor="attachment">Choose file...</label>
                    </div>
                </div>

                <LoaderButton
                    className="btn btn-outline-dark btn-block btn-lg"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}>
                    Create
                </LoaderButton>
            </form>
        </div>
    );
}