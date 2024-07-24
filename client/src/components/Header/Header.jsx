import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, CircleUserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/auth");
    if (isMobile) setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Pet List", path: "/petlist" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const NavItems = ({ mobile = false }) => (
    <>
      {navItems.map((item) => (
        <NavigationMenuItem key={item.path}>
          <NavigationMenuLink
            asChild
            className={cn(
              "px-3 m-2 py-2 text-sm font-bold font-sans rounded-md transition-colors duration-200",
              isActive(item.path) ? " text-[#8e8b8b]" : "text-foreground hover:bg-accent hover:text-accent-foreground",
              mobile && "w-full text-left mb-2"
            )}
          >
            <Link to={item.path} onClick={() => mobile && setIsOpen(false)}>
              {item.name}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </>
  );

  return (
    <header className="fixed flex items-center justify-between w-full h-16 px-5 z-30 bg-white border-b-2 border-black/20">
      <img src={Logo} className="h-10" alt="Logo" />

      {isMobile ? (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleLoginClick} className="text-primary">
            <CircleUserRound className="h-5 w-5" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-primary mb-4">Menu</SheetTitle>
              </SheetHeader>
              <NavigationMenu className="mt-6">
                <NavigationMenuList className="flex flex-col items-start space-y-3">
                  <NavItems mobile />
                </NavigationMenuList>
              </NavigationMenu>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <NavigationMenu className="flex-grow flex justify-center">
          <NavigationMenuList>
            <NavItems />
          </NavigationMenuList>
        </NavigationMenu>
      )}

      {!isMobile && (
        <Button variant="outline" className="h-10 border-2 border-black bg-transparent hover:bg-black hover:text-white" onClick={handleLoginClick}>
          Login
        </Button>
      )}
    </header>
  );
}
