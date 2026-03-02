import { createOrder } from "./FetchApi";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const pay = async (
  data,
  dispatch,
  state,
  setState,
  totalCost,
  history
) => {
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
  } else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
  } else {
    try {
      dispatch({ type: "loading", payload: true });

      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const transactionId = "order_" + Date.now();
      const amount = totalCost();

      let orderData = {
        allProduct: cartItems,
        user: JSON.parse(localStorage.getItem("jwt")).user._id,
        amount: amount,
        transactionId: transactionId,
        address: state.address,
        phone: state.phone,
      };

      let responseData = await createOrder(orderData);
      if (responseData && responseData.success) {
        // Build product info for confirmation page
        const productInfo = cartItems.map((item) => ({
          name: item.name || "Product",
          quantitiy: item.quantitiy || 1,
          price: item.price || 0,
        }));

        // Clear cart
        localStorage.setItem("cart", JSON.stringify([]));
        dispatch({ type: "cartProduct", payload: null });
        dispatch({ type: "cartTotalCost", payload: null });
        dispatch({ type: "orderSuccess", payload: true });
        dispatch({ type: "loading", payload: false });
        dispatch({ type: "inCart", payload: null });

        // Redirect to order confirmation page with order details
        return history.push({
          pathname: "/order-confirmation",
          state: {
            transactionId: transactionId,
            amount: amount,
            address: state.address,
            phone: state.phone,
            products: productInfo,
          },
        });
      } else {
        dispatch({ type: "loading", payload: false });
        setState({
          ...state,
          error: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "loading", payload: false });
      setState({ ...state, error: "Order failed. Please try again." });
    }
  }
};
