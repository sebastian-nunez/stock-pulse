import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Dashboard", "Inventory"];

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
          <Link to="/" className="text-2xl font-extrabold">
            StockPulse
          </Link>
        </NavbarBrand>

        <Divider orientation="vertical" className="h-1/2" />

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
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
        {menuItems.map((item, index) => (
          <Link
            className="w-full rounded border bg-white p-4 text-center text-xl font-semibold drop-shadow-sm"
            to={`/${item.toLowerCase()}`}
            size="lg"
            key={`${item}-${index}`}
          >
            {item}
          </Link>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
