import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import "../styles/responsive.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
