
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Wallet, 
  MenuIcon, 
  X, 
  Home, 
  Vote, 
  BarChart3, 
  User, 
  HelpCircle, 
  Shield 
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  
  const navigationItems = [
    { label: "HOME", path: "/", icon: Home },
    { label: "DASHBOARD", path: "/dashboard", icon: Vote },
    { label: "CAST_VOTE", path: "/cast-vote", icon: Vote },
    { label: "RESULTS", path: "/results", icon: BarChart3 },
    { label: "ACCOUNT", path: "/profile", icon: User },
    { label: "HELP", path: "/help", icon: HelpCircle },
    { label: "ADMIN", path: "/admin", icon: Shield }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-8 h-8 rounded-full bg-gradient-sui flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-3 h-3 bg-white rounded-full" />
          </motion.div>
          <Link to="/" className="text-tech text-xl font-bold text-white">SuiVote</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6 text-sm">
          {navigationItems.slice(0, 5).map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="text-tech text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Link 
            to="/admin" 
            className="hidden md:flex text-tech text-white/80 hover:text-white transition-colors items-center mr-2"
          >
            <Shield className="h-4 w-4 mr-1" />
            ADMIN
          </Link>
          
          <button className="text-command px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300">
            <Wallet className="h-4 w-4 mr-2 inline-block" />
            <span>CONNECT</span>
          </button>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-white p-2 md:hidden">
                <MenuIcon className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black text-white border-l border-white/20">
              <SheetHeader className="text-left">
                <SheetTitle className="text-tech text-white text-xl">SuiVote Menu</SheetTitle>
                <SheetDescription className="text-white/70">
                  Navigate through your blockchain voting platform
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className="text-tech flex items-center py-2 px-4 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
