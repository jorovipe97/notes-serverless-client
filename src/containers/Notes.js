import React, { useRef, useState, useEffect } from "react";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { API, Storage } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import "./Notes.css";

export default function Notes(props) {
    const file = useRef(null);
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadNote() {
            return API.get("notes", `/notes/${props.match.params.id}`);
        }

        async function onLoad() {
            try {
                const note = await loadNote();
                const { content, attachment } = note;

                if (attachment) {
                    note.attachmentURL = await Storage.vault.get(attachment);
                }

                setContent(content);
                setNote(note);
            } catch (e) {
                alert(e);
            }
        }

        onLoad();
    }, [props.match.params.id]);

    function validateForm() {
        return content.length > 0;
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    function saveNote(note) {
        return API.put("notes", `/notes/${props.match.params.id}`, {
            body: note
        });
    }

    async function handleSubmit(event) {
        let attachment;

        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB.`
            );
            return;
        }

        setIsLoading(true);

        try {
            if (file.current) {
                attachment = await s3Upload(file.current);
            }

            await saveNote({
                content,
                // TODO: Delete old attachment from s3
                // See the final of this chapter: https://serverless-stack.com/chapters/save-changes-to-a-note.html
                // The new attachment or the previous one
                attachment: attachment || note.attachment
            });
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsLoading(false);
        }
    }

    function deleteNote() {
        return API.del("notes", `/notes/${props.match.params.id}`);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            // TODO: Delete the s3 file from s3
            await deleteNote();
            props.history.push("/");
        } catch (e) {
            alert(e);
            setIsDeleting(false);
        }
    }

    return (
        <div className="Notes">
            {note && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" className="form-control" autoFocus
                            value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                    {note.attachment && (
                        <div className="form-group">
                            <label htmlFor="attachment">Attachment</label>
                            <div id="attachment" className="form-control-static">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={note.attachmentURL}>
                                    {formatFilename(note.attachment)}
                                </a>
                            </div>
                        </div>
                    )}
                    <div className="form-group">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="attachment" onChange={handleFileChange} />
                            <label className="custom-file-label" htmlFor="attachment">Choose file...</label>
                        </div>
                    </div>
                    <LoaderButton
                        type="submit"
                        className="btn btn-primary btn-block btn-lg"
                        isLoading={isLoading}
                        disabled={!validateForm()}>
                        Save
                    </LoaderButton>
                    <LoaderButton
                        className="btn btn-danger btn-block btn-lg"
                        onClick={handleDelete}
                        isLoading={isDeleting}>
                        Delete
                    </LoaderButton>
                </form>
            )}
        </div>
    );
}