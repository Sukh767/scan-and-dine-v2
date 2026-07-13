import ArrowRight from "@/assets/arrow-right.svg";
import { ScanDineLogo3 } from "@/assets";
import MenuIcon from "@/assets/menu.svg";
import Navbar from "../../features/navigation/components/Navbar/Navbar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { Laptop } from "lucide-react";

const MainHeader = () => {
  const theme = "dark"; // Replace with your theme state
  return (
    <header className="sticky top-0">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm">
        <div className="inline-flex gap-1 items-center">
          <p>
            Get Started with Scan & Dine - Order food and drinks from your phone
            without waiting in line!
          </p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <div className="flex justify-between items-center">
            <img
              src={ScanDineLogo3}
              alt="Scan and Dine Logo"
              className="bg-white h-12 w-12"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === "dark" ? (
                    <Moon className="w-4 h-4" />
                  ) : theme === "light" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Laptop className="w-4 h-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="w-4 h-4 mr-2" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="w-4 h-4 mr-2" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="w-4 h-4 mr-2" /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <MenuIcon className="h-5 w-5 text-black md:hidden" />
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
