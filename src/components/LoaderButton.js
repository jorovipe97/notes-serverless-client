import React from "react";
import "./LoaderButton.css";
import { FaSync } from 'react-icons/fa';

export default function LoaderButton({
    isLoading,
    className = "",
    disabled = false,
    ...props
}) {
    // The reamining props
    // console.log(JSON.stringify(props, null, 2));
    return (
        <button
            className={`LoaderButton ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >

            {isLoading && <FaSync className="spinning"/>}
            {props.children}
        </button>
    );
}