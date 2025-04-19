
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Activity, 
  BarChart2, 
  Bell, 
  ChevronDown, 
  FileText, 
  HelpCircle, 
  LogOut, 
  Settings, 
  Shield, 
  User, 
  Users,
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="font-bold text-xl">SuiVote Admin</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/admin" 
            className={`text-sm font-medium hover:text-blue-600 transition-colors ${isActive('/admin') ? 'text-blue-600' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/proposals" 
            className={`text-sm font-medium hover:text-blue-600 transition-colors ${isActive('/admin/proposals') ? 'text-blue-600' : ''}`}
          >
            Proposals
          </Link>
          <Link 
            to="/admin/users" 
            className={`text-sm font-medium hover:text-blue-600 transition-colors ${isActive('/admin/users') ? 'text-blue-600' : ''}`}
          >
            Users
          </Link>
          <Link 
            to="/admin/analytics" 
            className={`text-sm font-medium hover:text-blue-600 transition-colors ${isActive('/admin/analytics') ? 'text-blue-600' : ''}`}
          >
            Analytics
          </Link>
          <Link 
            to="/admin/emergency" 
            className={`text-sm font-medium hover:text-red-600 transition-colors ${isActive('/admin/emergency') ? 'text-red-600' : ''}`}
          >
            Emergency
          </Link>
          <Link 
            to="/admin/settings" 
            className={`text-sm font-medium hover:text-blue-600 transition-colors ${isActive('/admin/settings') ? 'text-blue-600' : ''}`}
          >
            Settings
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0 overflow-hidden">
                <div className="bg-blue-100 dark:bg-blue-900 w-full h-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-8 w-8 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground truncate">0x7a16ff8270...</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                <Link to="/admin" className="flex items-center gap-3 text-sm font-medium hover:text-blue-600 transition-colors">
                  <Activity className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link to="/admin/proposals" className="flex items-center gap-3 text-sm font-medium hover:text-blue-600 transition-colors">
                  <FileText className="h-4 w-4" />
                  Proposals
                </Link>
                <Link to="/admin/users" className="flex items-center gap-3 text-sm font-medium hover:text-blue-600 transition-colors">
                  <Users className="h-4 w-4" />
                  Users
                </Link>
                <Link to="/admin/analytics" className="flex items-center gap-3 text-sm font-medium hover:text-blue-600 transition-colors">
                  <BarChart2 className="h-4 w-4" />
                  Analytics
                </Link>
                <Link to="/admin/emergency" className="flex items-center gap-3 text-sm font-medium hover:text-red-600 transition-colors">
                  <AlertTriangle className="h-4 w-4" />
                  Emergency
                </Link>
                <Link to="/admin/settings" className="flex items-center gap-3 text-sm font-medium hover:text-blue-600 transition-colors">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
