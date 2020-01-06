import React, { useState } from "react";
import "./Login.css";
import { Auth } from "aws-amplify";
import LoaderButton from '../components/LoaderButton';
import { useFormFields } from "../libs/hooksLib";

export default function Login(props) {
    // It returns a pair of values: the current state and a function that updates it
    // unlike this.setState in a class, updating a state variable always replaces it instead of merging it.
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Redirect to home if user is actually loged in
    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(fields.email, fields.password);
            props.userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id="email" className="form-control" type="email" placeholder="Email" autoFocus
                        value={fields.email} onChange={handleFieldChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input id="password" className="form-control" type="password" placeholder="Pasword"
                        value={fields.password} onChange={handleFieldChange} />
                </div>
                <LoaderButton type="submit" className="btn btn-outline-dark btn-block"
                    disabled={!validateForm()} isLoading={isLoading}>Login</LoaderButton>
            </form>
        </div>
    );
}