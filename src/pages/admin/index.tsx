
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Lock,
  FileText,
  Bell,
  Filter,
  MoreHorizontal,
  Trash,
  Pause,
  Play,
  Calendar,
  Download,
  HelpCircle,
  UserX
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import AdminNavbar from "@/components/AdminNavbar";

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

// Timeline component for activity history
const ActivityTimeline = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-2.5 h-2.5 rounded-full ${activity.color}`}></div>
            {index < activities.length - 1 && <div className="w-px h-full bg-gray-200 dark:bg-gray-700"></div>}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Proposal list component with filtering
const ProposalsList = ({ proposals, onView, onDelete, onDelist, onExtend }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    return proposal.status === filter;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'active' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button 
            variant={filter === 'expired' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('expired')}
          >
            Expired
          </Button>
          <Button 
            variant={filter === 'delisted' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('delisted')}
          >
            Delisted
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Proposal</DialogTitle>
              <DialogDescription>
                Create a new voting proposal. All fields are required.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <input
                  id="title"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Enter proposal title"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Enter proposal description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="start-date" className="text-sm font-medium">Start Date</label>
                  <input
                    id="start-date"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="end-date" className="text-sm font-medium">End Date</label>
                  <input
                    id="end-date"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Proposal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell className="font-medium">{proposal.id}</TableCell>
                <TableCell>{proposal.title}</TableCell>
                <TableCell>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${proposal.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : ''}
                    ${proposal.status === 'expired' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' : ''}
                    ${proposal.status === 'delisted' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : ''}
                  `}>
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{proposal.votes}</TableCell>
                <TableCell>{proposal.deadline}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => onView(proposal)}>
                      View
                    </Button>
                    {proposal.status === 'active' && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => onDelist(proposal)}>
                          Delist
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onExtend(proposal)}>
                          Extend
                        </Button>
                      </>
                    )}
                    {proposal.status === 'delisted' && (
                      <Button variant="outline" size="sm" onClick={() => onDelist(proposal)}>
                        Relist
                      </Button>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this proposal? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button variant="destructive" onClick={() => onDelete(proposal)}>Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// User management component
const UserManagement = ({ users }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">User Management</h3>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Votes Cast</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.address}>
                <TableCell className="font-mono text-xs">{user.address}</TableCell>
                <TableCell>{user.votesCast}</TableCell>
                <TableCell>{user.lastActivity}</TableCell>
                <TableCell>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : ''}
                    ${user.status === 'blacklisted' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : ''}
                  `}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View History
                    </Button>
                    {user.status === 'active' ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <UserX className="h-3.5 w-3.5 mr-1" />
                            Blacklist
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Blacklist</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to blacklist this user? They will no longer be able to vote on proposals.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive">Blacklist</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="outline" size="sm">
                        Unblacklist
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Emergency Controls component
const EmergencyControls = ({ systemPaused, onPauseSystem, onResumeSystem }) => {
  return (
    <Card className="border-red-300 dark:border-red-900">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center text-red-600 dark:text-red-400">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Emergency Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h4 className="text-sm font-medium mb-1">System Status</h4>
              <p className="text-xs text-muted-foreground">
                {systemPaused ? "The voting system is currently PAUSED" : "The voting system is currently ACTIVE"}
              </p>
            </div>
            <div>
              {systemPaused ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-green-200 text-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      Resume System
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Resume Voting System</DialogTitle>
                      <DialogDescription>
                        This will resume all voting operations. Users will be able to vote again.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button onClick={onResumeSystem} className="bg-green-600 hover:bg-green-700">Resume System</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause System
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Emergency System Pause</DialogTitle>
                      <DialogDescription>
                        This will immediately pause all voting operations. No users will be able to vote until the system is resumed.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive" onClick={onPauseSystem}>Pause System</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
          
          <div className="rounded-md border p-3 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/20">
            <h4 className="text-sm font-medium mb-1 text-red-700 dark:text-red-400">⚠️ Warning</h4>
            <p className="text-xs text-red-700/80 dark:text-red-400/80">
              These controls should only be used in emergency situations. All actions are logged and require AdminCap validation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// System Health component
const SystemHealth = ({ contracts, gasUsage }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">System Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Smart Contract Status</h4>
            <div className="space-y-2">
              {contracts.map((contract) => (
                <div key={contract.name} className="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800/60">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${contract.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium">{contract.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {contract.status === 'healthy' ? 'Operational' : 'Issue Detected'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Gas Usage Trends</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gasUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="gas" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
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
  
  // Mock proposal data
  const [proposals] = useState([
    { id: 1, title: "Community Treasury Fund Allocation", status: "active", votes: 356, deadline: "2025-05-15" },
    { id: 2, title: "Governance Framework Update", status: "active", votes: 203, deadline: "2025-05-10" },
    { id: 3, title: "Partner Integration Proposal", status: "expired", votes: 512, deadline: "2025-04-05" },
    { id: 4, title: "Development Fund for Q3", status: "delisted", votes: 89, deadline: "2025-05-12" },
  ]);
  
  // Mock user data
  const [users] = useState([
    { address: "0x7a16ff8270133f063aab39c125436c7608b1946c", votesCast: 12, lastActivity: "2025-04-18", status: "active" },
    { address: "0x3d2935f68a2b689d7c6e2661f575bcfa7ae5a48a", votesCast: 8, lastActivity: "2025-04-17", status: "active" },
    { address: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359", votesCast: 3, lastActivity: "2025-04-12", status: "blacklisted" },
  ]);
  
  // Mock activity timeline
  const [activities] = useState([
    { title: "New proposal created", description: "Community Treasury Fund Allocation", time: "10 minutes ago", color: "bg-blue-500" },
    { title: "Proposal vote ended", description: "Governance Framework Update", time: "2 hours ago", color: "bg-green-500" },
    { title: "Admin action", description: "Emergency pause triggered by 0x7a16ff8...", time: "1 day ago", color: "bg-red-500" },
    { title: "System update", description: "Protocol version 1.2.3 deployed", time: "3 days ago", color: "bg-purple-500" },
  ]);
  
  // Mock contract status
  const [contracts] = useState([
    { name: "VotingSystem", status: "healthy" },
    { name: "ProposalRegistry", status: "healthy" },
    { name: "UserRegistry", status: "healthy" },
  ]);
  
  // Mock gas usage data
  const [gasUsage] = useState([
    { day: "Mon", gas: 1500 },
    { day: "Tue", gas: 1200 },
    { day: "Wed", gas: 1800 },
    { day: "Thu", gas: 2100 },
    { day: "Fri", gas: 1700 },
    { day: "Sat", gas: 1300 },
    { day: "Sun", gas: 1100 },
  ]);
  
  // Mock voting data for charts
  const [votingData] = useState([
    { name: "For", value: 65 },
    { name: "Against", value: 35 },
  ]);
  
  const COLORS = ["#0088FE", "#FF8042"];
  
  // System pause state
  const [systemPaused, setSystemPaused] = useState(false);
  
  const handlePauseSystem = () => {
    setSystemPaused(true);
    // In a real implementation, this would call the smart contract
  };
  
  const handleResumeSystem = () => {
    setSystemPaused(false);
    // In a real implementation, this would call the smart contract
  };
  
  const handleViewProposal = (proposal) => {
    console.log("View proposal:", proposal);
    // This would open a dialog or navigate to a proposal detail view
  };
  
  const handleDeleteProposal = (proposal) => {
    console.log("Delete proposal:", proposal);
    // This would call the smart contract to delete the proposal
  };
  
  const handleDelistProposal = (proposal) => {
    console.log("Delist/relist proposal:", proposal);
    // This would call the smart contract to delist or relist the proposal
  };
  
  const handleExtendDeadline = (proposal) => {
    console.log("Extend deadline for proposal:", proposal);
    // This would call the smart contract to extend the proposal deadline
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl mt-16">
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Poll
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Create New Poll</DialogTitle>
                    <DialogDescription>
                      Create a new voting poll. All proposals must be approved by an admin.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="title" className="text-sm font-medium">Title</label>
                      <input
                        id="title"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Enter poll title"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="description" className="text-sm font-medium">Description</label>
                      <textarea
                        id="description"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Enter poll description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="start-date" className="text-sm font-medium">Start Date</label>
                        <input
                          id="start-date"
                          type="date"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="end-date" className="text-sm font-medium">End Date</label>
                        <input
                          id="end-date"
                          type="date"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create Poll</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-auto p-1 mb-6">
              <TabsTrigger value="overview" className="py-2">Overview</TabsTrigger>
              <TabsTrigger value="proposals" className="py-2">Proposals</TabsTrigger>
              <TabsTrigger value="users" className="py-2">Users</TabsTrigger>
              <TabsTrigger value="emergency" className="py-2">Emergency</TabsTrigger>
              <TabsTrigger value="analytics" className="py-2">Analytics</TabsTrigger>
              <TabsTrigger value="settings" className="py-2">Settings</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Timeline */}
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ActivityTimeline activities={activities} />
                  </CardContent>
                </Card>

                {/* System Alerts */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {systemAlerts.map((alert, index) => (
                        <SystemAlert key={index} type={alert.type} message={alert.message} time={alert.time} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* System Health Card */}
                <div className="lg:col-span-3">
                  <SystemHealth contracts={contracts} gasUsage={gasUsage} />
                </div>
              </div>
            </TabsContent>
            
            {/* Proposals Tab */}
            <TabsContent value="proposals" className="space-y-6">
              <ProposalsList 
                proposals={proposals}
                onView={handleViewProposal}
                onDelete={handleDeleteProposal}
                onDelist={handleDelistProposal}
                onExtend={handleExtendDeadline}
              />
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <UserManagement users={users} />
            </TabsContent>
            
            {/* Emergency Tab */}
            <TabsContent value="emergency" className="space-y-6">
              <EmergencyControls 
                systemPaused={systemPaused}
                onPauseSystem={handlePauseSystem}
                onResumeSystem={handleResumeSystem}
              />
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Emergency Actions Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Admin</TableHead>
                          <TableHead>Reason</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2025-04-18 08:12:34</TableCell>
                          <TableCell>System Pause</TableCell>
                          <TableCell className="font-mono text-xs">0x7a16ff8270...</TableCell>
                          <TableCell>Suspicious voting pattern detected</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2025-04-18 09:45:21</TableCell>
                          <TableCell>System Resume</TableCell>
                          <TableCell className="font-mono text-xs">0x7a16ff8270...</TableCell>
                          <TableCell>Investigation complete, no issues found</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Voting Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <PieChart width={250} height={250}>
                        <Pie
                          data={votingData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {votingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Voting Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { date: "Apr 13", votes: 120 },
                          { date: "Apr 14", votes: 98 },
                          { date: "Apr 15", votes: 135 },
                          { date: "Apr 16", votes: 78 },
                          { date: "Apr 17", votes: 156 },
                          { date: "Apr 18", votes: 201 },
                          { date: "Apr 19", votes: 187 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="votes" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium">Engagement Metrics</CardTitle>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Unique Voters</h4>
                        <p className="text-2xl font-bold">1,245</p>
                        <p className="text-xs text-green-600 mt-1">+5.3% from last week</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Avg. Votes Per User</h4>
                        <p className="text-2xl font-bold">4.8</p>
                        <p className="text-xs text-green-600 mt-1">+0.2 from last week</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">New Users</h4>
                        <p className="text-2xl font-bold">187</p>
                        <p className="text-xs text-red-600 mt-1">-2.1% from last week</p>
                      </div>
                    </div>
                    
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Proposal</TableHead>
                            <TableHead>Votes</TableHead>
                            <TableHead>Unique Voters</TableHead>
                            <TableHead>Engagement Rate</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Community Treasury Fund Allocation</TableCell>
                            <TableCell>356</TableCell>
                            <TableCell>312</TableCell>
                            <TableCell>24.3%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Governance Framework Update</TableCell>
                            <TableCell>203</TableCell>
                            <TableCell>187</TableCell>
                            <TableCell>15.8%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Partner Integration Proposal</TableCell>
                            <TableCell>512</TableCell>
                            <TableCell>498</TableCell>
                            <TableCell>38.2%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">System Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <label htmlFor="min-votes" className="text-sm font-medium">Minimum Votes Required</label>
                        <input
                          id="min-votes"
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          defaultValue="100"
                        />
                        <p className="text-xs text-muted-foreground">Minimum number of votes required for a proposal to be valid</p>
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="vote-period" className="text-sm font-medium">Default Voting Period (days)</label>
                        <input
                          id="vote-period"
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          defaultValue="7"
                        />
                        <p className="text-xs text-muted-foreground">Default number of days a vote will remain active</p>
                      </div>
                      
                      <div className="flex items-center justify-between rounded-md border p-4">
                        <div>
                          <h4 className="text-sm font-medium">Network Selection</h4>
                          <p className="text-xs text-muted-foreground">Select which Sui network to use</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/30">
                            Testnet
                          </Button>
                          <Button variant="outline" size="sm">
                            Mainnet
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Configuration</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Admin Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Current Admin</h4>
                        <p className="font-mono text-xs bg-gray-50 dark:bg-gray-800/60 p-2 rounded">0x7a16ff8270133f063aab39c125436c7608b1946c</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">AdminCap Verification</h4>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Verified</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Two-Factor Authentication</h4>
                        <Button variant="outline" size="sm" className="w-full">
                          <Key className="h-4 w-4 mr-2" />
                          Enable 2FA
                        </Button>
                      </div>
                      
                      <div className="rounded-md border p-3 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/20">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-400">Need Help?</h4>
                            <p className="text-xs text-blue-700/80 dark:text-blue-400/80">
                              View the admin documentation for detailed instructions on all administrative functions.
                            </p>
                            <Button variant="link" className="h-auto p-0 text-xs text-blue-700 dark:text-blue-400 mt-1">View Documentation</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

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
    </div>
  );
};

export default AdminDashboard;
