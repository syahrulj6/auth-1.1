import React from 'react';
import { Navbar, NavbarBrand, NavbarItem, NavbarContent, Button } from '@nextui-org/react';
import { SignInButton } from '../auth/sign-in-button';
import Link from 'next/link';

export const AppBar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit hover:text-primary-500 transition-colors">
          HOME
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center"></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SignInButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
