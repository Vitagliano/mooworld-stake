import "../css/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ToastContainer />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
