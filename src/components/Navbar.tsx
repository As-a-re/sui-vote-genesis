
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
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
          <span className="text-xl font-bold text-gradient font-audiowide">SuiVote</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">How It Works</a>
          <a href="#statistics" className="text-foreground/80 hover:text-foreground transition-colors">Statistics</a>
          <a href="#security" className="text-foreground/80 hover:text-foreground transition-colors">Security</a>
        </div>
        
        <button className="primary-button flex items-center space-x-2">
          <Wallet size={18} />
          <span>Connect Wallet</span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
