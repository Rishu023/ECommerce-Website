import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsCart4 } from "react-icons/Bs";
import { getCartItems } from "@/utils/cartItems";
import { MdAccountCircle } from "react-icons/md";
function Header() {
  const [cart, setCart] = useState(0);
  useEffect(() => {
    setInterval(() => {
      const cardItems = getCartItems();
      setCart(cardItems.length);
    }, 1000);
  }, []);
  return (
    <>
      <nav className="navbar navbar-bg text-white">
        <div className="container-md">
          <Link href="/" className="navbar-brand">
            <Image src="/images/logo.png" width={50} height={50} alt="logo" />
          </Link>
          <div className="d-flex flex-row gap-2">
            <Link href="/auth/login" className="nav-item nav-link">
              <span className="p-1 rounded-circle bg-primary">
                <MdAccountCircle size={20} className="pb-1" />
              </span>
            </Link>

            <Link href="/cart" className="nav-item nav-link ">
              <span className="p-1 rounded-circle bg-primary">
                <BsCart4 size={20} className="pb-1" />
              </span>
              {cart} items
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
