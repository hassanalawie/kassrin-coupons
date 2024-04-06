import React, { useEffect, useState } from 'react';
import './App.css';
// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import Coupon from './components/Coupon';

// Define the Coupon type
export type CouponType = {
  Available: boolean;
  ID: number;
  Name: string;
  color: string;
  secondaryColor: string;
};

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNuDp-uRilawcACN_5iPodZ3hQZzQjpMA",
  authDomain: "kassrin-coupon.firebaseapp.com",
  projectId: "kassrin-coupon",
  storageBucket: "kassrin-coupon.appspot.com",
  messagingSenderId: "29286327454",
  appId: "1:29286327454:web:11cfc5564a5d1f9b49878f",
  measurementId: "G-0Y875W9XW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);

  useEffect(() => {
    async function fetchCoupons() {
      const couponsCol = collection(db, "coupons");
      const couponsSnapshot = await getDocs(couponsCol);
      const couponsList = couponsSnapshot.docs
        .map(doc => {
          const data = doc.data();
          // Map and cast the data to CouponType
          const coupon: CouponType = {
            Available: data.Available,
            ID: data.ID,
            Name: data.Name,
            color: data.color,
            secondaryColor: data.secondaryColor
          };
          return coupon;
        })
        .filter(coupon => coupon.Available); // Only include available coupons
      setCoupons(couponsList);
    }

    fetchCoupons();
  }, []);


  const doTheUseCoupon = async (couponId: number) => {
    if (!selectedCoupon) return;

    // Query the 'coupons' collection for the coupon with the matching Name
    const couponsCol = collection(db, "coupons");
    const q = query(couponsCol, where("ID", "==", couponId));
  
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        // Update the 'Available' field of the matched document
        const couponRef = doc(db, "coupons", document.id);
        await updateDoc(couponRef, {
          Available: false
        });
      });
  
      // Update the local state to reflect the change
      setCoupons(coupons.map(c => c.ID === couponId ? { ...c, Available: false } : c));
  
      // Close the modal
      setSelectedCoupon(null);
  
    } catch (error) {
      console.error("Error updating coupon: ", error);
    }
  };

  const handleCouponClick = (coupon: CouponType) => {
    setSelectedCoupon(coupon);
  };
  const handleUseClick = () => {
    if (selectedCoupon) {
      doTheUseCoupon(selectedCoupon.ID).catch(console.error);
    }
  };
  return (
    <div className={`App ${selectedCoupon ? 'overlay' : ''}`}>
      <div>
        <h1 className='title'>A special present for a special birthday!</h1>
        <p className='subtitle'>Hi Kessel(ring(ringyring)). THIS IS THE FIRST TIME WE GET TO CELEBARATE YOUR BIRTHDAY TOGETHER!! I hope you liked the stickers, I'm really glad you got a new laptop because this was wayyy better than my other ideas. Sodastream, Pompom slippers, new school bag (this was a good idea but you probably know why I couldn't get you this). I really want to make sure you feel very special today, because you're a very special girl with a boyfriend who loves everything about you.
        I have compiled a bunch of coupons for you to use throughout the year. These are NON-NEGOTIABLE. Meaning if you use one of these coupons I must comply. I love you so much and I am looking forward to doing all of these things. please don't make me go to Guelph if we're not in Waterloo. USE AS MANY AS YOU WANT!!! I will make more if we run out or if some are unusable.</p>
      </div>
      <div className="coupons-list">
      {coupons.filter(coupon => coupon.Available).map((coupon) => ( // Apply the filter here
        <div className='couponDiv' key={coupon.Name} onClick={() => handleCouponClick(coupon)}>
          <Coupon coupon={coupon}/> 
        </div>
      ))}
      </div>
      {selectedCoupon && (
        <div className="modal">
          <div className="modal-content">
            <Coupon coupon={selectedCoupon}/>
            <div className="buttons">
              <div className='use' onClick={handleUseClick}>Use</div>
              <div className='closeButton' onClick={() => setSelectedCoupon(null)}>Close</div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
