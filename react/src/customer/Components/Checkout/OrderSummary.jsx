import React, { useState, useEffect } from "react";
import { Badge, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, placeOrder } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { getCart } from "../../../Redux/Customers/Cart/Action";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector(state => state);
  const [showSuccess, setShowSuccess] = useState(false);

  console.log("orderId ", order.order);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const handleCreatePayment = () => {
    if (order.order?.id) {
      dispatch(placeOrder(order.order.id))
        .then(() => {
          if (jwt) {
            dispatch(getCart(jwt));
          }
          setShowSuccess(true);
          setTimeout(() => {
            navigate("/account/order");
          }, 3000);
        })
        .catch((err) => {
          console.error("Failed to place order:", err);
        });
    }
  };
  

  return (
    <div className="space-y-5">
        <div className="p-5 shadow-lg rounded-md border ">
            <AddressCard address={order.order?.shippingAddress}/>
        </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 ">
          <div className=" space-y-3">
            {order.order?.orderItems.map((item) => (
              <>
                <CartItem item={item} showButton={false}/>
              </>
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
                <span>Price ({order.order?.totalItem} item)</span>
                <span>₹{order.order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-₹{order.order?.discounte}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">₹{order.order?.totalDiscountedPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" }}
            >
              Payment
            </Button>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <style>{`
            @keyframes scale {
              0%, 100% { transform: none; }
              50% { transform: scale3d(1.1, 1.1, 1); }
            }
            @keyframes fill {
              100% { box-shadow: inset 0px 0px 0px 40px #22c55e; }
            }
            @keyframes stroke {
              100% { stroke-dashoffset: 0; }
            }
            .checkmark__circle {
              stroke-dasharray: 166;
              stroke-dashoffset: 166;
              stroke-width: 2;
              stroke-miterlimit: 10;
              stroke: #22c55e;
              fill: none;
              animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .checkmark {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              display: block;
              stroke-width: 2;
              stroke: #fff;
              stroke-miterlimit: 10;
              margin: 0 auto;
              box-shadow: inset 0px 0px 0px #22c55e;
              animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s;
            }
            .checkmark__check {
              transform-origin: 50% 50%;
              stroke-dasharray: 48;
              stroke-dashoffset: 48;
              animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }
            @keyframes confetti-fall {
              0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
              100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
            }
            .confetti-piece {
              position: absolute;
              width: 8px;
              height: 16px;
              border-radius: 2px;
              animation: confetti-fall 2.5s ease-out forwards;
            }
          `}</style>
          
          <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center justify-center border border-gray-100 overflow-hidden transform scale-100 transition-all duration-300">
            {/* Confetti pieces */}
            {[...Array(20)].map((_, i) => {
              const colors = ["bg-red-500", "bg-yellow-400", "bg-blue-500", "bg-pink-500", "bg-green-500", "bg-purple-500"];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              const randomLeft = `${Math.random() * 100}%`;
              const randomDelay = `${Math.random() * 1.5}s`;
              return (
                <div
                  key={i}
                  className={`confetti-piece ${randomColor}`}
                  style={{
                    left: randomLeft,
                    top: '-10px',
                    animationDelay: randomDelay,
                  }}
                />
              );
            })}

            <svg className="checkmark mb-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
            <p className="text-gray-500 text-sm text-center">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <p className="text-indigo-600 text-xs font-semibold mt-6 animate-pulse">
              Redirecting to your orders...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
