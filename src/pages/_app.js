import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideLayout = router.pathname.startsWith("/auth/");
  if (hideLayout)
    return (
      <>
        <Header />
        <Component {...pageProps} />
        <Toaster position="top-center" />
      </>
    );
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </Layout>
  );
}
