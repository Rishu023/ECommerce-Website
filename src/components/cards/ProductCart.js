import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/cards/ProductCart.module.css";
import { MdCurrencyRupee } from "react-icons/md";
import { BiCartAdd } from "react-icons/bi";
import { addToCart } from "@/utils/cartItems";
import { toast } from "react-hot-toast";

function ProductCart({ product }) {
  return (
    <div className={`${styles.productcard} card`}>
      <Link href={`/products/${product?.id}`}>
        <div className="object-fit-cover">
          <Image
            src={product?.thumbnail}
            width={200}
            height={200}
            alt={product?.title}
            className="card-img-top"
          />
        </div>
      </Link>

      <div className="card-body">
        <Link
          href={`/products/${product?.id}`}
          className="text-decoration-none"
        >
          <h6 className="card-title text-black">{product?.title}</h6>
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="card-title d-flex align-items-center">
            <MdCurrencyRupee size={20} />
            {product?.price}
          </h6>
          <div className="d-flex">
            <button
              className="btn btn-warning btn-sm mx-2"
              onClick={(e) => {
                addToCart(product, 1), toast.success("ADDED TO CART!");
              }}
            >
              <BiCartAdd size={20} />
            </button>
            <button className="btn btn-warning btn-sm">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
