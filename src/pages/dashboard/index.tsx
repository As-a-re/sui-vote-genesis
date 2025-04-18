
import { motion } from "framer-motion";
import { BarChart2, Vote, CheckSquare, History } from "lucide-react";
import { Card } from "@/components/ui/card";

const VotingDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Voting Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Vote className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Polls</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/10 rounded-full">
                <CheckSquare className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Votes Cast</p>
                <h3 className="text-2xl font-bold">48</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/10 rounded-full">
                <BarChart2 className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Results Available</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <History className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Past Votes</p>
                <h3 className="text-2xl font-bold">156</h3>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default VotingDashboard;
