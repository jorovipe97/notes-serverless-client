import React, { useState } from "react";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { Auth } from "aws-amplify";
import "./Signup.css";

export default function Signup(props) {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: ""
    });
    const [newUser, setNewUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password
            });
            console.log(newUser);
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);

            props.userHasAuthenticated(true);
            props.history.push("/");
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <div className="form-group">
                    <label htmlFor="confirmationCode">Confirmation Code:</label>
                    <input id="confirmationCode" className="form-control" type="tel" placeholder="Confirmation code" autoFocus
                        value={fields.confirmationCode} onChange={handleFieldChange} />
                    <small class="text-muted">
                        Please check your email for the code.
                    </small>
                </div>
                <LoaderButton
                    type="submit"
                    className="btn btn-outline-dark btn-block btn-lg"
                    disabled={!validateConfirmationForm()}
                    isLoading={isLoading}>Verify</LoaderButton>
            </form>
        );
    }

    function renderForm() {
        return (
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Password:</label>
                    <input id="confirmPassword" className="form-control" type="password" placeholder="Pasword Again"
                        value={fields.confirmPassword} onChange={handleFieldChange} />
                </div>
                <LoaderButton
                    type="submit"
                    className="btn btn-outline-dark btn-block btn-lg"
                    disabled={!validateForm()}
                    isLoading={isLoading}>Signup</LoaderButton>
            </form>
        );
    }

    return (
        <div className="Signup">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}