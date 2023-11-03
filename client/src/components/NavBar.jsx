import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { Layers3 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const menuItems = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Inventory", path: "/inventory" },
];

export default function App() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="border-b-1"
    >
      {/* Hamburger toggle */}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />

      {/* Desktop Menu (LEFT) */}
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        {/* Branding */}
        <NavbarBrand>
          <Link
            to="/"
            className="inline-flex gap-2 text-2xl font-extrabold tracking-tight"
          >
            {/* Logo */}
            <Layers3 size={25} className="my-auto" />
            StockPulse
          </Link>
        </NavbarBrand>

        <Divider orientation="vertical" className="h-1/2" />

        {/* Menu Items */}
        {menuItems
          .filter((item) => item.name !== "Home")
          .map((item) => (
            <NavbarItem
              key={item.name}
              isActive={item.path === pathname} // highlight active item from URL
            >
              <Link to={item.path}>{item.name}</Link>
            </NavbarItem>
          ))}
      </NavbarContent>

      <div className="w-full" />

      {/* Desktop Menu (RIGHT) */}
      <NavbarContent
        className="hidden gap-4 sm:flex"
        justify="end"
      ></NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item) => (
          <Link
            className="w-full rounded border bg-white p-4 text-center text-xl font-semibold drop-shadow-sm"
            to={item.path}
            size="lg"
            key={item.name}
          >
            {item.name}
          </Link>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
