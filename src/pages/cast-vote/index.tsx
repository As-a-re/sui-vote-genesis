import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Info, 
  HelpCircle, 
  ChevronLeft, 
  Lock, 
  Shield, 
  CheckCircle, 
  Clock,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const CastVotePage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft] = useState("2 days 5 hours");
  
  // Poll metadata
  const pollMeta = {
    id: "poll-123456",
    participants: 246,
    createdBy: "Community Council",
    threshold: "70%"
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate transaction time
    setTimeout(() => {
      // Would handle actual submission here
      setSubmitting(false);
      // Handle redirect or success state
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Back navigation */}
        <Link to="/dashboard" className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        
        {/* Header with poll status */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Cast Your Vote</h1>
              <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active Poll
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Your choice will be securely recorded on the Sui blockchain</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-2 px-4 rounded-full">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Ends in {timeLeft}</span>
          </div>
        </div>
        
        {/* Main voting card */}
        <Card className="shadow-lg rounded-xl overflow-hidden">
          {/* Poll Info Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 border-b border-blue-100 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold">Community Garden Location</h2>
                  <HoverCard>
                    <HoverCardTrigger>
                      <Info className="h-4 w-4 text-blue-500 cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">About This Poll</h4>
                        <p className="text-sm text-muted-foreground">
                          Choose the best location for our new community garden project. The winning location
                          will receive funding in the next budget allocation.
                        </p>
                        <div className="pt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Poll ID:</span>
                            <span className="font-mono">{pollMeta.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Created by:</span>
                            <span>{pollMeta.createdBy}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pass threshold:</span>
                            <span>{pollMeta.threshold}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select one option for the location of our upcoming community project
                </p>
              </div>
              
              <HoverCard>
                <HoverCardTrigger>
                  <Button variant="ghost" size="icon">
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">How Blockchain Voting Works</h4>
                    <p className="text-sm text-muted-foreground">
                      Your vote is securely recorded on the Sui blockchain, ensuring transparency and 
                      preventing tampering. Once submitted, it cannot be altered.
                    </p>
                    <div className="pt-2 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Cryptographically secured</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4 text-blue-500" />
                        <span>Anonymous voting</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-purple-500" />
                        <span>Immutable record</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Participation</span>
                <span className="font-medium">{pollMeta.participants} voters</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </div>
          
          {/* Voting form */}
          <div className="p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {[
                  {
                    id: "central-park",
                    label: "Central Park Area",
                    description: "Near the existing playground, excellent sunlight",
                    pros: "High visibility, existing infrastructure",
                    cons: "Limited expansion space"
                  },
                  {
                    id: "riverside",
                    label: "Riverside Location",
                    description: "Beautiful waterfront views, natural irrigation",
                    pros: "Natural beauty, abundant water",
                    cons: "Potential flood concerns"
                  },
                  {
                    id: "downtown",
                    label: "Downtown District",
                    description: "High visibility, easy access for residents",
                    pros: "Centrally located, accessible by public transit",
                    cons: "Higher maintenance costs"
                  }
                ].map((option) => (
                  <motion.div 
                    key={option.id} 
                    whileHover={{ scale: 1.01 }}
                    className={`flex items-start space-x-4 p-5 rounded-lg border-2 transition-all cursor-pointer
                      ${selectedOption === option.id ? 
                        'border-blue-400 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-900/20' : 
                        'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={option.id} className="text-base font-medium">{option.label}</Label>
                      <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                      
                      {selectedOption === option.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 grid grid-cols-2 gap-3 pt-3 border-t border-dashed border-gray-200 dark:border-gray-700"
                        >
                          <div>
                            <div className="text-xs text-green-600 font-medium mb-1">PROS</div>
                            <p className="text-sm">{option.pros}</p>
                          </div>
                          <div>
                            <div className="text-xs text-red-600 font-medium mb-1">CONS</div>
                            <p className="text-sm">{option.cons}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
              
              <div className="pt-4 space-y-4">
                {/* Warning */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Your vote is final and cannot be changed once submitted to the blockchain
                  </p>
                </div>
                
                {/* Submit button */}
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={!selectedOption || submitting}
                >
                  {submitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                          <circle 
                            cx="12" cy="12" r="10" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            fill="none" 
                            strokeOpacity="0.2" 
                          />
                          <path 
                            d="M12 2C6.48 2 2 6.48 2 12" 
                            stroke="currentColor" 
                            strokeWidth="4" 
                            fill="none" 
                            strokeLinecap="round" 
                          />
                        </svg>
                      </motion.div>
                      Submitting to Blockchain...
                    </>
                  ) : (
                    <>Submit Vote</>
                  )}
                </Button>
                
                {/* Legal/Info */}
                <div className="flex items-center justify-center gap-1 text-xs text-center text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <p>Your vote is anonymous and securely recorded on the Sui blockchain</p>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default CastVotePage;
