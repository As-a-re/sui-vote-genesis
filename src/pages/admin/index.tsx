
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  Users, 
  Settings, 
  Shield, 
  BarChart2, 
  Database, 
  Clock,
  Activity,
  Bell
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ProposalList from "@/components/admin/ProposalList";
import ActivityTimeline from "@/components/admin/ActivityTimeline";
import SystemHealth from "@/components/admin/SystemHealth";
import UserManagement from "@/components/admin/UserManagement";
import EmergencyControls from "@/components/admin/EmergencyControls";
import CreateProposalForm from "@/components/admin/CreateProposalForm";

const AdminDashboard = () => {
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
                <span className="text-sm font-medium">Sui Network: Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Database className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Block: 8,142,567</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Validators: 24</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-xs text-muted-foreground">Updated 30 seconds ago</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <CreateProposalForm />
            <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={Activity}
            title="Active Polls"
            value="16"
            description="+3 from last week"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          />
          <StatsCard
            icon={Users}
            title="Registered Users"
            value="2,456"
            description="+124 new users"
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
          />
          <StatsCard
            icon={BarChart2}
            title="Total Votes"
            value="12,856"
            description="+1,234 in last 7 days"
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
          />
          <StatsCard
            icon={Shield}
            title="System Health"
            value="98.7%"
            description="Uptime last 30 days"
            className="bg-gradient-to-br from-violet-500 to-violet-600 text-white"
          />
        </div>

        {/* Main content area with tabs */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <SystemHealth />
              </div>
              <div>
                <ActivityTimeline />
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <ProposalList />
              </div>
              <div>
                <EmergencyControls />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="proposals" className="space-y-4">
            <ProposalList />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
