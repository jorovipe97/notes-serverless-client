import React, { useState } from "react";
import "./Login.css";
import { Auth } from "aws-amplify";
import LoaderButton from '../components/LoaderButton';

export default function Login(props) {
    // It returns a pair of values: the current state and a function that updates it
    // unlike this.setState in a class, updating a state variable always replaces it instead of merging it.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Redirect to home if user is actually loged in
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(email, password);
            props.userHasAuthenticated(true);
            // Router props
            props.history.push('/');
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email-field">Email:</label>
                    <input id="email-field" className="form-control" type="email" placeholder="Email" autoFocus
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password-field">Password:</label>
                    <input id="password-field" className="form-control" type="text" placeholder="Pasword"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <LoaderButton type="submit" className="btn btn-outline-dark btn-block"
                    disabled={!validateForm()} isLoading={isLoading}>Login</LoaderButton>
                {/* <button type="submit" class="btn btn-outline-dark btn-block"
                    disabled={!validateForm()}>Login</button> */}
            </form>
        </div>
    );
}