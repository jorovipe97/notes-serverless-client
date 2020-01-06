import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./BillingForm.css";

function BillingForm({ isLoading, onSubmit, ...props }) {
    const [fields, handleFieldChange] = useFormFields({
        name: "",
        storage: ""
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCardComplete, setIsCardComplete] = useState(false);

    isLoading = isProcessing || isLoading;

    function validateForm() {
        return (
            fields.name !== "" &&
            fields.storage !== "" &&
            isCardComplete
        );
    }

    async function handleSubmitClick(event) {
        event.preventDefault();

        setIsProcessing(true);

        const { token, error } = await props.stripe.createToken({ name: fields.name });

        setIsProcessing(false);

        onSubmit(fields.storage, { token, error });
    }

    return (
        <form className="BillingForm" onSubmit={handleSubmitClick}>
            {/* <FormGroup bsSize="large" controlId="storage">
                <ControlLabel>Storage</ControlLabel>
                <FormControl
                    min="0"
                    type="number"
                    value={fields.storage}
                    onChange={handleFieldChange}
                    placeholder="Number of notes to store"
                />
            </FormGroup> */}
            <div className="form-group">
                <label htmlFor="storage">Storage</label>
                <input id="storage" min="0" className="form-control" type="number" placeholder="Number of notes to store" autoFocus
                    value={fields.storage} onChange={handleFieldChange} />
            </div>
            <hr />
            {/* <FormGroup bsSize="large" controlId="name">
                <ControlLabel>Cardholder&apos;s name</ControlLabel>
                <FormControl
                    type="text"
                    value={fields.name}
                    onChange={handleFieldChange}
                    placeholder="Name on the card"
                />
            </FormGroup> */}
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" className="form-control" type="text" placeholder="Name on the card"
                    value={fields.name} onChange={handleFieldChange} />
            </div>
            {/* <ControlLabel>Credit Card Info</ControlLabel> */}
            <label htmlFor="credi-card">Credit Card Info</label>
            <CardElement
                id="credi-card"
                className="card-field"
                onChange={e => setIsCardComplete(e.complete)}
                hidePostalCode={true}
                style={{
                    base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
                }}
            />
            {/* Hide zip code field (CP on spanish) 
            https://github.com/stripe/react-stripe-elements/issues/20
            */}
            <LoaderButton
                className="btn btn-outline-dark btn-block btn-lg"
                isLoading={isLoading}
                disabled={!validateForm()}
            >
                Purchase
      </LoaderButton>
        </form>
    );
}

export default injectStripe(BillingForm);