import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link as UILink,
  User,
} from "@nextui-org/react";
import { Layers3 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const menuItems = [
  { name: "Home", path: "/", side: "left" },
  { name: "Browser", path: "/browser", side: "left" },
  { name: "Inventory", path: "/inventory", side: "left" },
  { name: "Login", path: "/login", side: "right" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuth();

  const renderDesktopMenuItems = () => {
    if (!isLoggedIn) {
      return null;
    }

    return menuItems
      .filter((item) => item.name !== "Home" && item.side === "left")
      .map((item) => (
        <NavbarItem key={item.name}>
          <UILink as={Link} to={item.path} color="foreground" underline="hover">
            {item.name}
          </UILink>
        </NavbarItem>
      ));
  };

  const renderMobileMenuItems = () => {
    if (!isLoggedIn) {
      return null;
    }

    return menuItems?.map((item, idx) => {
      if (item?.side === "left") {
        return (
          <NavbarMenuItem key={item?.name || idx}>
            <UILink
              as={Link}
              to={item.path}
              className="text-lg font-semibold tracking-tight"
              color="foreground"
            >
              {item.name}
            </UILink>
          </NavbarMenuItem>
        );
      }
    });
  };

  const renderProfileDropdown = () => {
    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user?.avatarurl,
              fallback: user?.username[0],
            }}
            className="mt-1.5 transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.username}</p>
          </DropdownItem>
          {/* <DropdownItem key="settings">Settings</DropdownItem> */}
          <DropdownItem
            key="help_and_feedback"
            as={Link}
            to="https://github.com/sebastian-nunez/stock-pulse"
            target="_blank"
          >
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

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
        {renderDesktopMenuItems()}
      </NavbarContent>

      <div className="w-full" />

      {/* Desktop Menu (RIGHT) */}
      <NavbarContent className="gap-4 sm:flex" justify="end">
        <NavbarItem>
          {isLoggedIn ? (
            renderProfileDropdown()
          ) : (
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
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>{renderMobileMenuItems()}</NavbarMenu>
    </Navbar>
  );
}
