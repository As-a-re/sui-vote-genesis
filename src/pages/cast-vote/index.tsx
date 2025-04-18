
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const CastVotePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Cast Your Vote</h1>
        
        <Card className="p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Current Poll: Community Garden Location</h2>
          <p className="text-muted-foreground mb-6">
            Select your preferred location for the new community garden project.
          </p>
          
          <form className="space-y-6">
            <RadioGroup defaultValue="option-1">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-1" id="option-1" />
                  <Label htmlFor="option-1">Central Park Area</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-2" id="option-2" />
                  <Label htmlFor="option-2">Riverside Location</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-3" id="option-3" />
                  <Label htmlFor="option-3">Downtown District</Label>
                </div>
              </div>
            </RadioGroup>
            
            <Button type="submit" className="w-full">Submit Vote</Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default CastVotePage;
