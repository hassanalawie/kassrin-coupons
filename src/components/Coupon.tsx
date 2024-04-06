import React from 'react';
import { CouponType } from '../App';
import './Coupon.css';

type CouponProps = {
  coupon: CouponType;
};

const Coupon: React.FC<CouponProps> = ({ coupon }) => {
  const { Name, color, secondaryColor, ID } = coupon;
  
  return (
    <div className="coupon">
      <div className='left'  style={{ backgroundColor: color }}>
        <h1>THIS COUPON IS VALID FOR</h1>
        <p className='couponName'>{Name.toUpperCase()}</p>
        <p>Valid Until: April 7th 2025</p>
      </div>
      <div  className='right'  style={{ backgroundColor: secondaryColor }}>
        <div className="rotate">
        <p className='loveCoupon'>LOVE COUPON</p>
        <p className='couponID'>{ID}</p>
        </div>
      </div>
    </div>
  );
};

export default Coupon;