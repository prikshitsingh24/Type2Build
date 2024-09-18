import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import darkModeLogo from "../../images/darkMode.png"
import lightModeLogo from "../../images/lightMode.png"

export default function NavBar() {
  const { data, status } = useSession()
  const [theme, setTheme] = useState('light');


  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save the theme to localStorage
  };


  return (
    <Navbar position="static" className="max-h-12">
      <NavbarBrand>
        <p className="font-bold text-inherit">Welcome, {data?.user?.name}</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        <Button
            as="button"
            color="primary"
            variant="flat"
            onClick={toggleTheme}
            className="flex items-center"
          >
            <Image
              src={theme === "dark" ? lightModeLogo : darkModeLogo}
              alt="Toggle Theme"
              width={24} // Adjust the width as needed
              height={24} // Adjust the height as needed
            />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}