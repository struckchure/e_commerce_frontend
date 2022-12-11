import { Toaster } from "react-hot-toast";
import StoreProvider from "../lib/store";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Toaster />
      <Component {...pageProps} />
    </StoreProvider>
  );
}
