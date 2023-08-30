// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {
    productionConfig,
    devConfig,
    productionEndpoint,
    devEndpoint,
} from "./db-info.js";

const IS_DEVELOPMENT = false,
    endpoint = IS_DEVELOPMENT ? devEndpoint : productionEndpoint,
    app = initializeApp(IS_DEVELOPMENT ? devConfig : productionConfig),
    auth = getAuth(app),
    db = getFirestore(app),
    analytics = getAnalytics(app);

export { endpoint, auth, db, analytics };
