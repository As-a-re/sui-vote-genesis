import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Users, 
  Settings, 
  Shield, 
  BarChart2, 
  AlertTriangle, 
  CheckCircle, 
  Database, 
  Clock,
  Activity,
  Key,
  Lock
} from "lucide-react";
import { useState } from "react";

// Admin stat card component
const AdminStatCard = ({ title, value, description, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${color} rounded-xl p-5 shadow-md`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-lg font-medium text-white/80">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          <p className="text-sm text-white/70 mt-1">{description}</p>
        </div>
        <div className="bg-white/10 p-2 rounded-lg">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

// Admin feature card component
const FeatureCard = ({ icon: Icon, title, description, buttonText, gradient }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl shadow-lg overflow-hidden`}
    >
      <div className={`h-2 ${gradient}`}></div>
      <div className="p-6">
        <div className={`bg-gray-100 dark:bg-gray-800 p-3 rounded-lg inline-block mb-4`}>
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 h-12">{description}</p>
        <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/30">
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

// Alert component for system status
const SystemAlert = ({ type, message, time }) => {
  const alertStyles = {
    warning: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800",
    success: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
    error: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
  };
  
  const iconMap = {
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    success: <CheckCircle className="h-4 w-4 text-green-500" />,
    error: <AlertTriangle className="h-4 w-4 text-red-500" />
  };
  
  return (
    <div className={`flex items-center justify-between rounded-lg border p-3 ${alertStyles[type]}`}>
      <div className="flex items-center gap-3">
        {iconMap[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
};

const AdminDashboard = () => {
  // System alerts state
  const [systemAlerts] = useState([
    { type: "success", message: "Blockchain sync complete", time: "Just now" },
    { type: "warning", message: "High network activity detected", time: "10 min ago" },
    { type: "warning", message: "New protocol update available", time: "1 hour ago" }
  ]);
  
  // Network status state
  const [networkStatus] = useState({
    status: "Active",
    validators: 24,
    latestBlock: "8,142,567",
    lastUpdated: "30 seconds ago"
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header with network status */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your Web3 voting system on the Sui blockchain</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Sui Network: {networkStatus.status}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Database className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Block: {networkStatus.latestBlock}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Validators: {networkStatus.validators}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-xs text-muted-foreground">Updated {networkStatus.lastUpdated}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Poll
            </Button>
            <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900">
              System Settings
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatCard
            icon={Activity}
            title="Active Polls"
            value="16"
            description="Currently running"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <AdminStatCard
            icon={Users}
            title="Registered Users"
            value="2,456"
            description="Total participants"
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
          />
          <AdminStatCard
            icon={BarChart2}
            title="Total Votes"
            value="12,856"
            description="Across all polls"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <AdminStatCard
            icon={Shield}
            title="System Health"
            value="98.7%"
            description="Uptime last 30 days"
            color="bg-gradient-to-br from-violet-500 to-violet-600"
          />
        </div>

        {/* System Alerts */}
        <Card className="p-6 shadow-md rounded-xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              System Alerts
            </h2>
            <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">View All</Button>
          </div>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <SystemAlert key={index} type={alert.type} message={alert.message} time={alert.time} />
            ))}
          </div>
        </Card>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Users}
            title="User Management"
            description="Manage user accounts, roles, and permissions"
            buttonText="Manage Users"
            gradient="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          
          <FeatureCard
            icon={Settings}
            title="Poll Settings"
            description="Configure voting rules and poll parameters"
            buttonText="Configure Settings"
            gradient="bg-gradient-to-r from-indigo-500 to-indigo-600"
          />
          
          <FeatureCard
            icon={Shield}
            title="Security"
            description="Monitor system security and access logs"
            buttonText="View Security Logs"
            gradient="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          
          <FeatureCard
            icon={Database}
            title="Blockchain Explorer"
            description="View and analyze on-chain voting data"
            buttonText="Open Explorer"
            gradient="bg-gradient-to-r from-violet-500 to-violet-600"
          />
          
          <FeatureCard
            icon={Key}
            title="Key Management"
            description="Handle encryption keys and admin access"
            buttonText="Manage Keys"
            gradient="bg-gradient-to-r from-pink-500 to-pink-600"
          />
          
          <FeatureCard
            icon={Lock}
            title="Compliance"
            description="Review and enforce governance policies"
            buttonText="Compliance Panel"
            gradient="bg-gradient-to-r from-blue-600 to-indigo-600"
          />
        </div>

        {/* Bottom CTA */}
        <Card className="p-6 shadow-md rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">System Documentation</h3>
                <p className="text-sm text-muted-foreground">Access technical specifications and admin guides</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Documentation</Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
