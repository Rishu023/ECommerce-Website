import Breadcrumb from "@/components/layout/Breadcrumb";
import { removeFromCart, updateCartItem } from "@/utils/cartItems";
import { getCartItems } from "@/utils/cartItems";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";

function Cart() {
  const [cart, setCart] = useState(getCartItems());
  const [yourCart, setYourCart] = useState({
    subTotal: 0,
    gstAmount: 0,
    grandTotal: 0,
  });
  const decrementQty = (product) => {
    const newQty = product?.qty - 1;
    if (newQty > 0) {
      const productId = product?.id;
      updateCartItem(productId, newQty);
      setCart(getCartItems());
    }
  };

  const increamentQty = (product) => {
    const newQty = product?.qty + 1;
    if (newQty <= 100) {
      const productId = product?.id;
      updateCartItem(productId, newQty);
      setCart(getCartItems());
    }
  };

  const removeHandler = (productId) => {
    removeFromCart(productId);
    setCart(getCartItems());
  };

  useEffect(() => {
    let total = 0;
    let gstAmount = 0;
    cart.map((item) => {
      total += item.price * item.qty;
    });
    gstAmount = (total * 18) / 100;
    setYourCart({
      ...yourCart,
      subTotal: total,
      gstAmount: gstAmount,
      grandTotal: total + gstAmount,
    });
  }, [cart]);

  const checkoutHandler = () => {
    Cookies.set("yourCart", JSON.stringify(yourCart));
    Router.push("/checkout");
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <Breadcrumb title={"Cart"} />
      <div className="table-responsive mt-4">
        <table className="table table-boderless">
          <thead>
            <tr className="border-bottom">
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th className="float-end" scope="col">
                Quantity
              </th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart?.map((item) => {
                return (
                  <tr className="border-bottom" key={item.id}>
                    <td>
                      <div className="d-flex gap-3">
                        <Image
                          src={item?.image}
                          className="rounded-circle"
                          width={40}
                          height={40}
                          alt={item?.title}
                        />
                        {item?.title}
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="d-flex align-items-center">
                        <MdCurrencyRupee size={20} />
                        {item?.price}
                      </span>
                    </td>
                    <td className="text-center">
                      <div class="input-group input-group-sm w-50 mb-3 border float-end">
                        <button
                          class="input-group-text btn btn-sm btn-outline-dark"
                          onClick={() => decrementQty(item)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          class="form-control"
                          value={item?.qty}
                        />
                        <button
                          class="input-group-text btn btn-sm btn-outline-dark"
                          onClick={() => increamentQty(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center d-flex justify-content-between">
                      <div className="d-flex align-items-center text-center">
                        <MdCurrencyRupee size={20} />
                        {(item?.price * item?.qty).toFixed(2)}
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeHandler(item.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center text-danger" colSpan={12}>
                  Empty Cart
                </td>
              </tr>
            )}

            {cart.length > 0 && (
              <>
                <tr>
                  <td></td>
                  <th className="border-bottom" colSpan={2}>
                    Subtotal :-
                  </th>
                  <th className="border-bottom">
                    <div className="d-flex align-items-center text-center">
                      <MdCurrencyRupee size={20} />{" "}
                      {yourCart?.subTotal?.toFixed(2)}
                    </div>
                  </th>
                </tr>

                <tr>
                  <td></td>
                  <th className="border-bottom" colSpan={2}>
                    18% GST :-
                  </th>
                  <th className="border-bottom">
                    <div className="d-flex align-items-center text-center">
                      <MdCurrencyRupee size={20} />{" "}
                      {yourCart?.gstAmount?.toFixed(2)}
                    </div>
                  </th>
                </tr>

                <tr>
                  <td></td>
                  <th className="border-bottom" colSpan={2}>
                    Shipping Charges :-
                  </th>
                  <th className="border-bottom">Free</th>
                </tr>

                <tr>
                  <td></td>
                  <th className="border-bottom" colSpan={2}>
                    Grand Total :-
                  </th>
                  <th className="border-bottom">
                    <div className="d-flex align-items-center text-center">
                      <MdCurrencyRupee size={20} />{" "}
                      {yourCart?.grandTotal?.toFixed(2)}
                    </div>
                  </th>
                </tr>
                <tr>
                  <td></td>
                  <th className="border-bottom" colSpan={3}>
                    <button
                      className="btn btn-sm btn-primary float-end"
                      onClick={() => checkoutHandler()}
                    >
                      Checkout
                    </button>
                  </th>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Cart;
