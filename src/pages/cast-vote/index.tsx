
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Info, HelpCircle } from "lucide-react";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const CastVotePage = () => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Cast Your Vote</h1>
            <p className="text-muted-foreground mt-1">Make your voice heard in the community.</p>
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">How Voting Works</h4>
                <p className="text-sm text-muted-foreground">
                  Select your preferred option and submit your vote. Your choice will be securely recorded and counted.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-semibold">Community Garden Location</h2>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Choose the best location for our new community garden project.</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <form className="space-y-6">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {[
                {
                  id: "central-park",
                  label: "Central Park Area",
                  description: "Near the existing playground, excellent sunlight"
                },
                {
                  id: "riverside",
                  label: "Riverside Location",
                  description: "Beautiful waterfront views, natural irrigation"
                },
                {
                  id: "downtown",
                  label: "Downtown District",
                  description: "High visibility, easy access for residents"
                }
              ].map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent transition-colors">
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <div>
                    <Label htmlFor={option.id} className="text-base font-medium">{option.label}</Label>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={!selectedOption}>
                Submit Vote
              </Button>
              <p className="text-sm text-center text-muted-foreground mt-2">
                Your vote is anonymous and cannot be changed once submitted
              </p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default CastVotePage;
