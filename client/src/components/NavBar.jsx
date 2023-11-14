import {
  Button,
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link as UILink,
} from "@nextui-org/react";
import { Layers3 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const menuItems = [
  { name: "Home", path: "/", side: "left" },
  { name: "Browser", path: "/browser", side: "left" },
  { name: "Inventory", path: "/inventory", side: "left" },
  { name: "Login", path: "/login", side: "right" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      className="border-b-1 drop-shadow-sm"
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
          <UILink
            as={Link}
            to="/"
            className="inline-flex gap-2 text-2xl font-extrabold tracking-tight"
            color="foreground"
          >
            {/* Logo */}
            <Layers3 size={25} className="my-auto" />
            StockPulse
          </UILink>
        </NavbarBrand>

        <Divider orientation="vertical" className="h-1/2" />

        {/* Menu Items */}
        {menuItems
          .filter((item) => item.name !== "Home" && item.side === "left")
          .map((item) => (
            <NavbarItem key={item.name}>
              <UILink
                as={Link}
                to={item.path}
                color="foreground"
                underline="hover"
              >
                {item.name}
              </UILink>
            </NavbarItem>
          ))}
      </NavbarContent>

      <div className="w-full" />

      {/* Desktop Menu (RIGHT) */}
      <NavbarContent className="gap-4 sm:flex" justify="end">
        <NavbarItem>
          <Button
            as={Link}
            to="/login"
            variant="flat"
            color="primary"
            radius="full"
            className="font-semibold"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {menuItems?.map((item, idx) => (
          <NavbarMenuItem
            key={item?.name || idx}
            onPress={() => setIsMenuOpen(false)}
          >
            <UILink
              as={Link}
              className="w-full justify-center rounded border bg-white p-4 text-center text-xl font-semibold drop-shadow-sm"
              to={item.path}
              size="lg"
              color="foreground"
            >
              {item.name}
            </UILink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
