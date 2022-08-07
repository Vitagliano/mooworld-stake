import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../styles/style.scss";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        style={{ fontSize: 14, padding: "5px !important", lineHeight: "15px" }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
