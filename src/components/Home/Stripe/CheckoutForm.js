import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { apiRoot, db } from "../../../database.js";
import SignOut from "../../SignOut.js";

function CheckoutForm({ user }) {
    // collect data from the user
    const [name, setName] = useState(""),
        // Delfai Subscription product ID
        priceId = "price_1NkyTGIqFJteETEQIt6tjy2I";

    // stripe items
    const stripe = useStripe();
    const elements = useElements();

    return (
        <div className="grid gap-4 m-auto">
            {user.paid ? (
                <p>Already subscribed!</p>
            ) : (
                <>
                    <input
                        placeholder="Name on card..."
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <CardElement />
                    <div id="user-options">
                        <button
                            className="standard-btn"
                            onClick={createSubscription}
                            disabled={!stripe}
                        >
                            subscribe
                        </button>
                        <SignOut />
                    </div>
                </>
            )}
        </div>
    );

    async function createSubscription() {
        try {
            // create a payment method
            const paymentMethod = await stripe?.createPaymentMethod({
                type: "card",
                card: elements?.getElement(CardElement),
                billing_details: {
                    name,
                    email: user.email,
                },
            });

            // call the backend to create subscription
            const response = await fetch(`${apiRoot}/payment/subscribe`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        paymentMethod: paymentMethod?.paymentMethod?.id,
                        name,
                        email: user.email,
                        priceId,
                    }),
                }).then((res) => res.json()),
                { clientSecret, subscriptionId } = response;

            const confirmPayment = await stripe?.confirmCardPayment(
                clientSecret
            );

            if (confirmPayment?.error) {
                alert(confirmPayment.error.message);
            } else {
                try {
                    await updateDoc(doc(db, "users", user.email), {
                        paid: true,
                        subscriptionId,
                    });
                    alert("Success! Check your email for the invoice.");
                    window.location.reload();
                } catch (err) {
                    console.error(err);
                    alert(
                        "You successfully subscribed, but there was an error logging it. Please contact al@fern.haus"
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default CheckoutForm;
