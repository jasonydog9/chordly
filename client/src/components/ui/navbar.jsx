import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button.tsx";// adjust the path to where Button lives in your project
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./navigation-menu.tsx";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "./dropdown.tsx"
import { Sheet, SheetContent, SheetTrigger } from "./sheet.tsx";
import { Menu, Music, HelpCircle, Info, User, LogOut, Settings } from "lucide-react"
import { cn } from "../../lib/utils.ts";
import { auth } from '../../firebase.js';
import { signOut } from 'firebase/auth';
import SettingsDialog from "./settings-dialog.jsx"

export default function Navbar({user, onSettingsChange}) {

    
  const [isOpen, setIsOpen] = useState(false);

const handleLogout = () => {
    signOut(auth).catch((error) => {
    console.error('Logout error:', error);
    });
};
  const navItems = [
    {
      title: "Game",
      href: "/",
      icon: Music,
      description: "Play the chord guessing game",
    },
    {
      title: "About",
      href: "/about",
      icon: Info,
      description: "Learn about the game",
    },
    {
      title: "Help",
      href: "/help",
      icon: HelpCircle,
      description: "Get help and tutorials",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src="img/logo.png" alt="Chordly Logo" className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Chordly</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link to={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 bg-white shadow-lg">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <Music className="h-6 w-6" />
              <span className="font-bold">Chordly</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 text-sm font-medium hover:text-accent-foreground"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                ))}
                <div className="pt-4 border-t space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Welcome, <span className="font-medium text-foreground">{user.displayName || user.email}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="justify-start p-0 h-auto text-sm font-medium hover:text-accent-foreground"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                  <SettingsDialog firebaseUser={user} onSettingsChange={onSettingsChange}>
  <span>
    <Button
      variant="ghost"
      size="sm"
      className="justify-start p-0 h-auto text-sm font-medium hover:text-accent-foreground"
    >
      <Settings className="mr-2 h-4 w-4" />
      Settings
    </Button>
  </span>
</SettingsDialog>

                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end ">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to="/" className="flex items-center space-x-2 md:hidden">
              <Music className="h-6 w-6" />
              <span className="font-bold">Chordly</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.displayName || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom" sideOffset={5} alignOffset={0} className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.displayName || user.email}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <SettingsDialog
                    firebaseUser={user}
                    onSettingsChange={onSettingsChange}>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </SettingsDialog>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )

}
