import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const ActivationPage = () => {
    const { activation_token } = useParams();
    console.log(activation_token)
    
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {

            const sendRequest = async () => {
                await axios
                    .post(`http://localhost:8000/auth/activation`, {
                        activation_token,
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        setError(true);
                    });
            };
            sendRequest();
        }
    }, [activation_token]);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {error ? (
                <p>Your token is expired!</p>
            ) : (
                <p>Your account has been created suceessfully!</p>
            )}
        </div>
    );
}
