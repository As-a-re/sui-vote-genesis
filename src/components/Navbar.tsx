
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, LayoutDashboard, Vote, PieChart, Settings, User, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
          <Link to="/" className="text-xl font-bold text-gradient font-audiowide">SuiVote</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm">
          <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link to="/cast-vote" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
            <Vote size={18} />
            Cast Vote
          </Link>
          <Link to="/results" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
            <PieChart size={18} />
            Results
          </Link>
          <Link to="/help" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">
            <HelpCircle size={18} />
            Help
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/profile">
            <button className="secondary-button flex items-center space-x-2">
              <User size={18} />
              <span>Profile</span>
            </button>
          </Link>
          <button className="primary-button flex items-center space-x-2">
            <Wallet size={18} />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
