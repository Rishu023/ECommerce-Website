import Breadcrumb from "@/components/layout/Breadcrumb";
import { getCartItems } from "@/utils/cartItems";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCurrencyRupee } from "react-icons/md";

function checkout() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [cart, setCart] = useState(getCartItems());
  const [cartItems, setCartItems] = useState(0);
  const [yourCart, setYourCart] = useState({});
  const router = useRouter();

  useEffect(() => {
    const tempYourCart = Cookies.get("yourCart");
    if (!tempYourCart) {
      router.push("/");
    }
    setYourCart(tempYourCart && JSON.parse(Cookies.get("yourCart")));
    setCartItems(cart?.length);
  }, [cart]);

  const checkoutHandler = (data) => {
    console.log(data);
    router.push({
      pathname: "/thankyou",
      query: {
        cart: JSON.stringify(cart),
        yourCart: JSON.stringify(yourCart),
        shipping: JSON.stringify(data),
      },
    });
    Cookies.remove("yourCart");
    Cookies.remove("cartItems");
  };

  const [data, setData] = useState([]);
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelected] = useState();
  const [cities, setCities] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  const handleCountry = (e) => {
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
  };

  const handleState = (e) => {
    let cities = data.filter((city) => city.subcountry === e.target.value);

    console.log(cities);
    setCities(cities);
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Breadcrumb title={"Checkout"} />
      <form onSubmit={handleSubmit(checkoutHandler)}>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge text-bg-primary badge rounded-pill">
                {cartItems}
              </span>
            </h4>
            <ul className="list-group mb-3">
              <b>
                <li className="list-group-item d-flex justify-content-between">
                  <div className="my-0">Sub-Total : </div>
                  <small>
                    <MdCurrencyRupee size={20} />{" "}
                    {yourCart?.subTotal?.toFixed(2)}
                  </small>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <div className="my-0">GST 18% : </div>
                  <small>
                    <MdCurrencyRupee size={20} />{" "}
                    {yourCart?.gstAmount?.toFixed(2)}
                  </small>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <div className="my-0">Grand-Total : </div>
                  <small>
                    <MdCurrencyRupee size={20} />{" "}
                    {yourCart?.grandTotal?.toFixed(2)}
                  </small>
                </li>
              </b>
            </ul>

            <div className="card p-2">
              <div className="input-group">
                <button className="w=100 btn btn-primary btn-lg">
                  Place Order
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <div className="row g-3 ">
              <div className="col-sm-6">
                <label for="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  {...register("firstName", { required: true })}
                  required
                />
                {errors.firstName && (
                  <div className="text-danger">
                    Valid first name is required.
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                <label for="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  {...register("lastName", { required: true })}
                  required
                />
                {errors.lastName && (
                  <div className="text-danger">
                    Valid last name is required.
                  </div>
                )}
              </div>

              <div className="col-12">
                <label for="Contact">Contact Number</label>

                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  placeholder="+91"
                  {...register("contact", { required: true })}
                  required
                />
                {errors.contact && (
                  <div className="text-danger">
                    Valid 10 digit mobile number.
                  </div>
                )}
              </div>
              <div className="col-12">
                <label for="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <div className="text-danger">
                    Please enter a valid email address for shipping updates.
                  </div>
                )}
              </div>

              <div className="col-12">
                <label for="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  {...register("address", { required: true })}
                  required
                />
                {errors.address && (
                  <div className="text-danger">
                    Please enter your shipping address.
                  </div>
                )}
              </div>
              <div className="col-12">
                <label for="landmark">Landmark</label>
                <input
                  type="text"
                  className="form-control"
                  id="landmark"
                  placeholder="Apartment or suite"
                  {...register("landmark", { required: true })}
                />
                {errors.landmark && (
                  <div className="text-danger">Please enter any landmark.</div>
                )}
              </div>

              <div className="col-sm-6">
                <label for="country">Country</label>
                <select
                  className="form-select"
                  id="country"
                  name="country"
                  {...register("country", { required: true })}
                  required
                  onChange={(e) => handleCountry(e)}
                >
                  <option selected>--Select Country--</option>
                  {country.map((items) => (
                    <option key={items} value={getCountry}>
                      {items}
                    </option>
                  ))}
                </select>

                {errors.country && (
                  <div className="text-danger">
                    Please select a valid country.
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                <label for="state">State</label>
                <select
                  className="form-select"
                  id="state"
                  name="state"
                  {...register("state", { required: true })}
                  required
                  onChange={(e) => handleState(e)}
                >
                  <option value="">--Select State--</option>
                  {getState.map((items) => (
                    <option key={items} value={selectedState}>
                      {items}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <div className="text-danger">
                    Please provide a valid state.
                  </div>
                )}
              </div>

              <div className="col-sm-6">
                <label for="city">City</label>
                <select
                  className="form-select"
                  id="city"
                  name="city"
                  {...register("city", { required: true })}
                  required
                >
                  <option value="">--Select City--</option>
                  {cities.map((items) => (
                    <option key={items.name}>{items.name}</option>
                  ))}
                </select>
                {errors.city && (
                  <div className="text-danger">
                    Please provide a valid city.
                  </div>
                )}
              </div>

              <div className="col-sm-6">
                <label for="zip">Pin code</label>
                <input
                  type="number"
                  className="form-control"
                  id="pin"
                  placeholder=""
                  {...register("pin", { required: true })}
                  required
                />
                {errors.pin && (
                  <div className="invalid-feedback">Pin code required.</div>
                )}
              </div>
            </div>

            <hr className="mb-4" />
            <h4 className="mb-3">Payment</h4>
            <div className="my-3">
              <div className="form-check">
                <input
                  id="cod"
                  name="paymentMethod"
                  type="radio"
                  {...register("paymentMethod", { required: true })}
                  className="form-check-input"
                  checked
                  required
                />
                <label className="form-check-label" for="cod">
                  Cash on Delivery
                </label>
              </div>
            </div>
            <hr className="my-4" />
          </div>
        </div>
      </form>

      {/* <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">&copy; 2017-2019 Company Name</p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Privacy</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Support</a>
            </li>
          </ul>
        </footer> */}
    </>
  );
}

export default checkout;
