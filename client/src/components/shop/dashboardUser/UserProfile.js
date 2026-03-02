import { imageURL } from "../../../config/config";
import React, { Fragment, useContext, useEffect } from "react";
import moment from "moment";
import Layout from "./Layout";
import { DashboardUserContext } from "./Layout";
import { fetchOrderByUser } from "./Action";

const ProfileComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const userDetails = data.userDetails !== null ? data.userDetails : "";
  const orders = data.OrderByUser || [];

  useEffect(() => {
    fetchOrderByUser(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8 space-y-6">
        {/* User Profile Card */}
        <div className="shadow-lg border rounded-lg overflow-hidden">
          <div className="py-4 px-6 text-lg font-semibold border-t-2 border-yellow-700 bg-gray-50">
            My Account
          </div>
          <hr />
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold">
                {userDetails.name ? userDetails.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {userDetails.name || "User"}
                </h2>
                <p className="text-gray-500">{userDetails.email || ""}</p>
                {userDetails.phoneNumber && (
                  <p className="text-gray-500 text-sm">
                    Phone: {userDetails.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="shadow-lg border rounded-lg overflow-hidden">
          <div className="py-4 px-6 text-lg font-semibold border-t-2 border-yellow-700 bg-gray-50">
            Order History
          </div>
          <hr />
          <div className="overflow-auto p-4">
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">
                          Order #{order.transactionId || index + 1}
                        </span>
                        {order.status === "Not processed" && (
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                            {order.status}
                          </span>
                        )}
                        {order.status === "Processing" && (
                          <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full font-semibold">
                            {order.status}
                          </span>
                        )}
                        {order.status === "Shipped" && (
                          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold">
                            {order.status}
                          </span>
                        )}
                        {order.status === "Delivered" && (
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold">
                            {order.status}
                          </span>
                        )}
                        {order.status === "Cancelled" && (
                          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                            {order.status}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {moment(order.createdAt).format("lll")}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-wrap items-center space-x-2 mb-2 md:mb-0">
                        {order.allProduct.map((product, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2 bg-gray-100 rounded px-2 py-1 text-sm"
                          >
                            {product.id && product.id.pImages && (
                              <img
                                className="w-8 h-8 object-cover rounded"
                                src={imageURL(product.id.pImages[0], "products")}
                                alt="product"
                              />
                            )}
                            <span>{product.id ? product.id.pName : "Product"}</span>
                            <span className="text-gray-500">x{product.quantitiy}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-semibold text-lg">
                          ${order.amount}.00
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span>Address: {order.address}</span>
                      <span className="ml-4">Phone: {order.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-lg">
                No orders yet. Start shopping!
              </div>
            )}
            <div className="text-sm text-gray-600 mt-4">
              Total {orders ? orders.length : 0} order(s) found
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserProfile = (props) => {
  return (
    <Fragment>
      <Layout children={<ProfileComponent />} />
    </Fragment>
  );
};

export default UserProfile;
