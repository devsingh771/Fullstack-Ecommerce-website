import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  const targetId = product?.id || product?._id;
  const imageSrc = product?.image || product?.imageUrl || "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80";
  const brandName = product?.brand || product?.title || "Exclusive Collection";
  const productTitle = product?.title2 || (product?.brand ? product?.title : "Premium Apparel");

  const handleNavigation = () => {
    if (targetId) {
      navigate(`/product/${targetId}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigation();
    }
  };

  return (
    <div
      onClick={handleNavigation}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${productTitle} by ${brandName}`}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-[15rem] sm:w-[15rem] mx-auto sm:mx-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="h-[13rem] w-[10rem] mt-4">
        <img
          className="object-cover object-top w-full h-full rounded-md"
          src={imageSrc}
          alt={productTitle}
        />
      </div>

      <div className="p-4 text-center w-full">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {brandName}
        </h3>
        <p className="mt-1 text-sm text-gray-500 truncate w-full px-2">
          {productTitle}
        </p>
      </div>
    </div>
  );
};

export default HomeProductCard;
