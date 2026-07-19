import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";

const orderStatus = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delevered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector(store => store);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  useEffect(() => {
    dispatch(getOrderHistory({ jwt }));
  }, [jwt]);

  const handleFilterChange = (value) => {
    setSelectedStatuses((prev) =>
      prev.includes(value) ? prev.filter((status) => status !== value) : [...prev, value]
    );
  };

  const matchesFilter = (orderStatusValue) => {
    if (selectedStatuses.length === 0) return true;
    return selectedStatuses.some((status) => {
      if (status === "onTheWay") {
        return ["PLACED", "CONFIRMED", "SHIPPED"].includes(orderStatusValue);
      }
      if (status === "delevered") {
        return orderStatusValue === "DELIVERED";
      }
      if (status === "cancelled") {
        return orderStatusValue === "CANCELLED";
      }
      if (status === "returned") {
        return orderStatusValue === "RETURNED";
      }
      return false;
    });
  };

  const filteredOrders = [...(order.orders || [])]
    .filter((orderItem) => matchesFilter(orderItem.orderStatus))
    .sort((a, b) => b.id - a.id);
  return (
    <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5} className="">
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filters</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`filter-${option.value}`}
                    name="orderStatus"
                    value={option.value}
                    type="checkbox"
                    checked={selectedStatuses.includes(option.value)}
                    onChange={() => handleFilterChange(option.value)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`filter-${option.value}`}
                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Box className="space-y-5 ">
            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white border rounded-md shadow-sm">
                <div className="bg-indigo-50 text-indigo-600 p-4 rounded-full mb-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Found</h3>
                <p className="text-gray-500 max-w-sm">
                  {selectedStatuses.length > 0 
                    ? "Try clearing some status filters to view all your order history." 
                    : "You haven't placed any orders yet."}
                </p>
              </div>
            ) : (
              filteredOrders.map((orderItem) => (
                <div key={orderItem.id} className="bg-white border rounded-xl shadow-sm overflow-hidden mb-6 hover:shadow-md transition-shadow duration-300">
                  {/* Order Section Header */}
                  <div className="bg-gray-50/70 border-b px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Order Placed</p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5">
                          {new Date(orderItem.orderDate || orderItem.createdAt || Date.now()).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Price</p>
                        <p className="text-xs font-bold text-green-700 mt-0.5">₹{orderItem.totalDiscountedPrice}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Ship To</p>
                        <p className="text-xs text-gray-700 font-semibold mt-0.5">
                          {orderItem.shippingAddress?.firstName} {orderItem.shippingAddress?.lastName}
                        </p>
                        {orderItem.shippingAddress && (
                          <p className="text-[10px] text-gray-500 mt-0.5 max-w-xs leading-normal">
                            {orderItem.shippingAddress.streetAddress}, {orderItem.shippingAddress.city}, {orderItem.shippingAddress.state} - {orderItem.shippingAddress.zipCode}
                          </p>
                        )}
                        {orderItem.shippingAddress?.mobile && (
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Ph: {orderItem.shippingAddress.mobile}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-bold tracking-wider">Order ID #{orderItem.id}</p>
                      <div className="mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          orderItem.orderStatus === "DELIVERED"
                            ? "bg-green-100 text-green-800"
                            : orderItem.orderStatus === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>{orderItem.orderStatus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="divide-y divide-gray-100">
                    {orderItem?.orderItems?.map((item) => (
                      <OrderCard item={item} order={orderItem} key={item.id} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
