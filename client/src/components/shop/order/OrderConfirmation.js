import React, { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Navber, Footer, CartModal } from "../partials";

const OrderConfirmation = () => {
    const history = useHistory();
    const location = useLocation();
    const orderData = location.state || {};

    return (
        <Fragment>
            <Navber />
            <CartModal />
            <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 mb-12">
                {/* Success Banner */}
                <div className="bg-green-100 border border-green-400 rounded-lg p-6 mb-8 text-center">
                    <svg
                        className="w-16 h-16 text-green-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h1 className="text-3xl font-bold text-green-700 mb-2">
                        Order Successfully Placed!
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Thank you for shopping with ShopEZ. Your order has been confirmed.
                    </p>
                </div>

                {/* Order Details */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="py-4 px-6 text-xl font-semibold border-t-4 border-yellow-700 bg-gray-50">
                            Order Details
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Order Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded">
                                    <div className="text-sm text-gray-500 mb-1">Order ID</div>
                                    <div className="font-semibold text-gray-800">
                                        {orderData.transactionId || "N/A"}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded">
                                    <div className="text-sm text-gray-500 mb-1">Order Date</div>
                                    <div className="font-semibold text-gray-800">
                                        {new Date().toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded">
                                    <div className="text-sm text-gray-500 mb-1">
                                        Payment Method
                                    </div>
                                    <div className="font-semibold text-gray-800">
                                        Cash on Delivery
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded">
                                    <div className="text-sm text-gray-500 mb-1">
                                        Total Amount
                                    </div>
                                    <div className="font-semibold text-green-600 text-lg">
                                        ${orderData.amount || 0}.00
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Details */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                    Shipping Details
                                </h3>
                                <div className="bg-gray-50 p-4 rounded space-y-2">
                                    <div className="flex">
                                        <span className="text-gray-500 w-24">Address:</span>
                                        <span className="font-medium">
                                            {orderData.address || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-24">Phone:</span>
                                        <span className="font-medium">
                                            {orderData.phone || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-24">Status:</span>
                                        <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            Pending
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Products Ordered */}
                            {orderData.products && orderData.products.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                                        Products Ordered
                                    </h3>
                                    <div className="space-y-3">
                                        {orderData.products.map((product, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between bg-gray-50 p-4 rounded"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-medium">{product.name || "Product"}</span>
                                                    <span className="text-gray-500">
                                                        x{product.quantitiy || 1}
                                                    </span>
                                                </div>
                                                <span className="font-semibold">
                                                    ${product.price ? product.quantitiy * product.price : 0}.00
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Estimated Delivery */}
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="text-blue-700 font-medium">
                                        Estimated delivery: 2-5 business days
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mt-6">
                        <div
                            onClick={() => history.push("/")}
                            style={{ background: "#303031" }}
                            className="flex-1 text-center cursor-pointer px-6 py-3 text-white font-semibold rounded"
                        >
                            Continue Shopping
                        </div>
                        <div
                            onClick={() => history.push("/user/profile")}
                            className="flex-1 text-center cursor-pointer px-6 py-3 border-2 border-gray-800 text-gray-800 font-semibold rounded hover:bg-gray-100"
                        >
                            View My Account
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    );
};

export default OrderConfirmation;
