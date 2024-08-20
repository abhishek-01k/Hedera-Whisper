import type { AppProps } from "next/app";
import { darkTheme, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HederaTestnet } from "@thirdweb-dev/chains";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={HederaTestnet}
      supportedChains={[HederaTestnet]}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_KEY}
      theme="dark"
    >
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
