import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import UserNav from "./UserNav";
import Darkmode from "./Darkmode";

const Nav = () => {
  return (
    <>
      <Navbar
        isBlurred
        isBordered
        maxWidth="md">
        <NavbarBrand className="text-2xl font-semibold">
          <Link href={"/todo"}>Note</Link>
        </NavbarBrand>

        <NavbarContent
          justify="end"
          className="sm:hidden">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent
          justify="end"
          className="hidden sm:flex">
          <NavbarItem>
            <Link href={"/todo"}>Notes</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={"/todo/profile"}>Profile</Link>
          </NavbarItem>
          <NavbarItem>
            <UserNav />
          </NavbarItem>
          <NavbarItem>
            <Darkmode />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="items-center">
          <NavbarMenuItem>
            <Link href={"/todo"}>Notes</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href={"/todo/profile"}>profile</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <UserNav />
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Darkmode />
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default Nav;
