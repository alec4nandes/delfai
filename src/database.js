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

const IS_DEVELOPMENT = true,
    apiRoot = IS_DEVELOPMENT ? devRoot : productionRoot,
    app = initializeApp(IS_DEVELOPMENT ? devConfig : productionConfig),
    auth = getAuth(app),
    db = getFirestore(app),
    analytics = getAnalytics(app),
    STRIPE_PUBLISHABLE_KEY = // starts with pk_
        "pk_live_51NkqsAIqFJteETEQERqhFTfbQgmgbaa4DW9KDN4Ho7p502UpB7dcLQzT6hde2eSbZ4nsI9Ec7KfNUxWzTYyHEjmu00COsdM6o4",
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export { IS_DEVELOPMENT, apiRoot, auth, db, analytics, stripePromise };
