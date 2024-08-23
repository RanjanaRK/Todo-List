import { useRouter } from "next/router";
import Nav from "./Nav";

const Header = () => {
  const path = useRouter().pathname;
  if (path === "/todo" || path === "/todo/profile") {
    return <Nav />;
  } else {
    return <></>;
  }
};

export default Header;
