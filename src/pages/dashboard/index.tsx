import { motion } from "framer-motion";
import { BarChart2, Vote, CheckSquare, History, ArrowUpRight, TrendingUp, Calendar, Clock, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

// Enhanced stats card component with animations
const StatsCard = ({ icon: Icon, title, value, description, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`rounded-xl p-6 ${color} shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-medium text-white/80">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          <p className="text-sm text-white/70 mt-1">{description}</p>
        </div>
        <div className="bg-white/10 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

// Activity card component for recent activities
const ActivityItem = ({ title, subtitle, time, icon }) => {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0"
    >
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <span className="text-sm text-muted-foreground">{time}</span>
    </motion.div>
  );
};

// Poll item component for upcoming polls
const PollItem = ({ title, timeInfo, category }) => {
  return (
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0"
    >
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
          <Calendar className="h-4 w-4 text-blue-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{title}</p>
            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">{category}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{timeInfo}</p>
          </div>
        </div>
      </div>
      <Button variant="outline" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900">Remind Me</Button>
    </motion.div>
  );
};

const VotingDashboard = () => {
  // Track transaction status with fake data
  const [latestTx] = useState({
    hash: "0x8e4d...6f29",
    status: "Confirmed",
    time: "2 mins ago"
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Hero section with network status */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold">Welcome to SuiVote</h1>
            <p className="text-muted-foreground mt-1">Secure, transparent, and decentralized voting system powered by Sui Blockchain</p>
            
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Connected to Sui Network</span>
              </div>
              <span className="text-sm px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full">Mainnet</span>
            </div>
            
            {latestTx && (
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <span>Latest tx: {latestTx.hash}</span>
                <span className="text-green-500">{latestTx.status}</span>
                <span>• {latestTx.time}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link to="/cast-vote">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                Cast New Vote
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/create-proposal">
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900">
                Create Proposal
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={Vote}
            title="Active Polls"
            value={12}
            description="Available for voting"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            icon={CheckSquare}
            title="Votes Cast"
            value={48}
            description="Your total votes"
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
          />
          <StatsCard
            icon={BarChart2}
            title="Results Available"
            value={8}
            description="View outcomes"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            icon={History}
            title="Past Votes"
            value={156}
            description="Historical votes"
            color="bg-gradient-to-br from-violet-500 to-violet-600"
          />
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="p-6 shadow-md rounded-xl lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">View All</Button>
            </div>
            <div className="space-y-4">
              <ActivityItem 
                title="Community Garden Location"
                subtitle="You voted: Central Park Area"
                time="2 days ago"
                icon={<CheckSquare className="h-4 w-4 text-green-500" />}
              />
              <ActivityItem 
                title="Budget Allocation"
                subtitle="You voted: Option B"
                time="4 days ago"
                icon={<CheckSquare className="h-4 w-4 text-green-500" />}
              />
              <ActivityItem 
                title="New Proposal Created"
                subtitle="Street Lighting Improvement"
                time="1 week ago"
                icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
              />
            </div>
          </Card>

          {/* Upcoming polls */}
          <Card className="p-6 shadow-md rounded-xl lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Upcoming Polls</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">View Calendar</Button>
            </div>
            <div className="space-y-5">
              <PollItem 
                title="City Park Renovation"
                timeInfo="Opens in 3 days"
                category="Infrastructure"
              />
              <PollItem 
                title="Community Event Budget"
                timeInfo="Opens in 5 days"
                category="Finance"
              />
              <PollItem 
                title="New Governance Rules"
                timeInfo="Opens in 1 week"
                category="Governance"
              />
            </div>
          </Card>
        </div>

        {/* Bottom section */}
        <Card className="p-6 shadow-md rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure Blockchain Voting</h3>
                <p className="text-sm text-muted-foreground">Your votes are securely recorded on the Sui blockchain</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Learn About Our Security</Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default VotingDashboard;
