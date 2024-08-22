// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import config from "./db-info.js";

const IS_DEVELOPMENT = false,
    app = initializeApp(config),
    auth = getAuth(app),
    db = getFirestore(app),
    analytics = getAnalytics(app);

export { IS_DEVELOPMENT, auth, db, analytics };
