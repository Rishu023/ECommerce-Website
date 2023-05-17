import { useRouter } from "next/router";
import React from "react";

function thankyou() {
  const router = useRouter();
  console.log("router", router.query);
  return (
    <div>
      <h1>Thank you for shopping with us</h1>
    </div>
  );
}

export default thankyou;
