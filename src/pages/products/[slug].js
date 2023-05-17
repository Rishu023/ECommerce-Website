import Breadcrumb from "@/components/layout/Breadcrumb";
import { addToCart } from "@/utils/cartItems";
import Head from "next/head";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { MdCurrencyRupee } from "react-icons/md";

function SingleProduct({ product }) {
  const [qty, setqty] = useState(1);
  const images = product?.images;

  const [sliderData, setSliderData] = useState(images[0]);
  const handleClick = (index) => {
    const slider = images[index];
    setSliderData(slider);
  };

  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <main>
        <Breadcrumb title={"Product"} />
        <div className="container">
          <div className="row g-5">
            <div className="detail col-lg-5 col-md-5 order-md-last">
              <h2>{product?.title}</h2>
              <h4 className="card-title d-flex align-items-center">
                <MdCurrencyRupee size={20} />
                {product?.price}
              </h4>
              <h5 className="mt-2">Description of the product</h5>
              <p>{product?.description}</p>
              <p className="mt-2">
                <b>Rating :</b> {product?.rating}
              </p>

              <div className="d-flex gap-3">
                <b>Quantity : </b>
                <div class="input-group input-group-sm w-25 mb-3 border ">
                  <button
                    class="input-group-text btn btn-sm btn-outline-dark"
                    onClick={() => setqty(qty > 1 ? qty - 1 : 1)}
                  >
                    -
                  </button>
                  <input type="text" class="form-control" value={qty} />
                  <button
                    class="input-group-text btn btn-sm btn-outline-dark"
                    onClick={() => setqty(qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="d-flex gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-sm btn-warning"
                  onClick={(e) => {
                    addToCart(product, qty), toast.success("ADDED TO CART!");
                  }}
                >
                  Add To Cart
                </button>
                <button type="button" className="btn btn-sm btn-success">
                  Buy Now
                </button>
              </div>
            </div>

            {/* IMAGES DIV */}

            <div className="col-lg-6 order-md-1">
              <div className="sidebar row-lg-1 col-1">
                {images.map((images, index) => (
                  <img
                    key={index}
                    src={images}
                    width={70}
                    height={70}
                    style={{ margin: "2px" }}
                    onClick={() => handleClick(index)}
                  />
                ))}
              </div>
              <div className="image-box col-xs-2">
                <img id="thumbnail" src={sliderData} width={300} height={300} />
              </div>
            </div>
          </div>
        </div>
        <hr className="mb-4" />
        <div></div>
      </main>
    </>
  );
}

export default SingleProduct;

export async function getServerSideProps(context) {
  const productID = context.params.slug;
  let product = [];
  try {
    const response = await fetch(
      `https://dummyjson.com/products//${productID}`
    );
    product = await response.json();
  } catch (error) {
    return { notFound: true };
  }
  return { props: { product } };
}
