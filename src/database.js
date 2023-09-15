// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {
    productionConfig,
    devConfig,
    productionRoot,
    devRoot,
} from "./db-info.js";
import { loadStripe } from "@stripe/stripe-js";

const IS_DEVELOPMENT = false,
    apiRoot = IS_DEVELOPMENT ? devRoot : productionRoot,
    app = initializeApp(IS_DEVELOPMENT ? devConfig : productionConfig),
    auth = getAuth(app),
    db = getFirestore(app),
    analytics = getAnalytics(app),
    STRIPE_PUBLISHABLE_KEY = // starts with pk_
        "pk_test_51NkqsAIqFJteETEQYpW5MiSPJwYnYUJD64Ruj6alMHmX83hELPfACDnOu8mKPgB8hvDhzvANH26gsjIpb3JOMg3500I8ocfYtY",
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export { IS_DEVELOPMENT, apiRoot, auth, db, analytics, stripePromise };
