
import { motion } from "framer-motion";
import { BarChart2, Vote, CheckSquare, History, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VotingDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back, User!</h1>
            <p className="text-muted-foreground mt-1">Track your voting activity and participate in active polls.</p>
          </div>
          <Link to="/cast-vote">
            <Button className="flex items-center gap-2">
              Cast New Vote
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={Vote}
            title="Active Polls"
            value={12}
            description="Available for voting"
          />
          <StatsCard
            icon={CheckSquare}
            title="Votes Cast"
            value={48}
            description="Your total votes"
          />
          <StatsCard
            icon={BarChart2}
            title="Results Available"
            value={8}
            description="View outcomes"
          />
          <StatsCard
            icon={History}
            title="Past Votes"
            value={156}
            description="Historical votes"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">Community Garden Location</p>
                    <p className="text-sm text-muted-foreground">You voted: Central Park Area</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Polls</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">City Park Renovation</p>
                    <p className="text-sm text-muted-foreground">Opens in 3 days</p>
                  </div>
                  <Button variant="outline" size="sm">Remind Me</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default VotingDashboard;
