
import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, 
  PlayCircle, 
  StopCircle, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  ShieldOff,
  Clock
} from "lucide-react";

const EmergencyControls = () => {
  const [systemPaused, setSystemPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Toggle system pause status (mockup function)
  const toggleSystemPause = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setSystemPaused(!systemPaused);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <Card className={systemPaused ? "border-red-500 dark:border-red-700" : ""}>
      <CardHeader className={systemPaused ? "bg-red-50 dark:bg-red-900/10" : ""}>
        <div className="flex items-center gap-2">
          {systemPaused ? (
            <ShieldOff className="h-5 w-5 text-red-600 dark:text-red-400" />
          ) : (
            <ShieldAlert className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          )}
          <CardTitle className="text-xl font-bold">Emergency Controls</CardTitle>
        </div>
        <CardDescription>
          Critical system functions for emergency situations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-3">
        <div className={`flex flex-col p-4 rounded-lg border ${
          systemPaused 
            ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800" 
            : "bg-card border-border"
        }`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {systemPaused ? (
                <StopCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              ) : (
                <PlayCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              )}
              System Status
            </h3>
            {systemPaused ? (
              <span className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs font-medium px-2.5 py-0.5 rounded">
                PAUSED
              </span>
            ) : (
              <span className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded">
                ACTIVE
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {systemPaused 
              ? "The voting system is currently PAUSED. All new votes and proposals are disabled." 
              : "The voting system is currently ACTIVE. All features are enabled and operational."
            }
          </p>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant={systemPaused ? "default" : "destructive"}
                className={systemPaused ? "bg-green-600 hover:bg-green-700" : ""}
                disabled={loading}
              >
                {loading ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </motion.div>
                ) : systemPaused ? (
                  <PlayCircle className="h-4 w-4 mr-2" />
                ) : (
                  <StopCircle className="h-4 w-4 mr-2" />
                )}
                {systemPaused ? "Resume System" : "Pause System"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {systemPaused ? "Resume the Voting System?" : "Pause the Voting System?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {systemPaused 
                    ? "This will re-enable all voting functionality. Users will be able to create proposals and cast votes again." 
                    : "This will temporarily disable all voting functionality. Users will not be able to create new proposals or cast votes until the system is resumed."
                  }
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={toggleSystemPause}
                  className={systemPaused ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                >
                  {systemPaused ? "Yes, Resume System" : "Yes, Pause System"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-3 px-4 text-left" disabled={systemPaused}>
                <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium">Extend All Deadlines</div>
                  <div className="text-xs text-muted-foreground">Add 72 hours to all active proposals</div>
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Extend All Active Deadlines</AlertDialogTitle>
                <AlertDialogDescription>
                  This will add 72 hours to the voting period of all currently active proposals. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Confirm Extension</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center justify-start gap-2 h-auto py-3 px-4 text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" disabled={systemPaused}>
                <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                  <Lock className="h-4 w-4 text-red-700 dark:text-red-400" />
                </div>
                <div>
                  <div className="font-medium">Lockdown Mode</div>
                  <div className="text-xs text-muted-foreground">Restrict to whitelisted wallets only</div>
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Activate Lockdown Mode</AlertDialogTitle>
                <AlertDialogDescription>
                  This will restrict the voting system to allow interactions only from whitelisted wallet addresses. All other users will be denied access until lockdown is lifted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  Activate Lockdown
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Lock className="h-4 w-4 mr-2" /> AdminCap required for these actions
        </div>
        <Button variant="ghost" size="sm">
          View Audit Log
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmergencyControls;
