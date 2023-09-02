import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { stripePromise } from "../../../database.js";

export default function Subscribe({ user }) {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm {...{ user }} />
            </Elements>
        </div>
    );
}
