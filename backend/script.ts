// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNuDp-uRilawcACN_5iPodZ3hQZzQjpMA",
  authDomain: "kassrin-coupon.firebaseapp.com",
  projectId: "kassrin-coupon",
  storageBucket: "kassrin-coupon.appspot.com",
  messagingSenderId: "29286327454",
  appId: "1:29286327454:web:11cfc5564a5d1f9b49878f",
  measurementId: "G-0Y875W9XW5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

async function getCoupons() {
    const couponsCol = collection(db, "coupons");
    const couponsSnapshot = await getDocs(couponsCol);
    const couponsList = couponsSnapshot.docs.map(doc => doc.data());
    console.log(couponsList);
  }
  
  getCoupons();
  