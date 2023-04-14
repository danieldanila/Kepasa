import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Component {...pageProps} />
    </>
  );
}
