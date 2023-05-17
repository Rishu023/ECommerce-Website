import React, { useState } from "react";
import { MdCategory } from "react-icons/md";
import Link from "next/link";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import useSwr from "swr";
import { fetcher } from "@/utils/swrFetcher";
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { data, error, isloading } = useSwr(
    "https://dummyjson.com/products/categories",
    fetcher
  );
  if (error) return <div>FAILED TO LOAD</div>;
  if (isloading) return <div>LOADING....</div>;

  return (
    <div className="sidebar_cat w-100">
      <ul className="list-group">
        <li className="list-group-item d-flex align-items-center navbar-top-bg">
          <h5 className="text-white mt-2 text-uppercase">
            <MdCategory /> Category
          </h5>
        </li>
        {data?.map((category, i) => {
          return (
            <Link
              key={i}
              href={`/category/${category}`}
              className="text-decoration-none"
            >
              <li className="list-group-item list-group-item-action d-flex align-items-center text-uppercase">
                <FaCaretRight size={20} className="m-2" />
                {category}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
