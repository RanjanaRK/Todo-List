import { ReactNode, useEffect } from "react";
import Header from "./nav/Header";
import { useAtom } from "jotai/react";
import { darkAtom } from "@/utils/atoms/darkAtom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [darkMode, setDarkMode] = useAtom(darkAtom);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-lg p-5">{children}</main>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default Layout;
