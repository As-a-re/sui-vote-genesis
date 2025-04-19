
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Pause, 
  Play, 
  Shield, 
  Clock,
  Lock,
  Download,
  History,
  Search,
  XCircle,
  CheckCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminNavbar from "@/components/AdminNavbar";

// Emergency Controls component
const EmergencyControls = ({ systemPaused, onPauseSystem, onResumeSystem }) => {
  return (
    <Card className="border-red-300 dark:border-red-900">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center text-red-600 dark:text-red-400">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Emergency Controls
        </CardTitle>
        <CardDescription className="text-red-600/80 dark:text-red-400/80">
          Use these controls only in emergency situations
        </CardDescription>
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
                    <div className="py-4">
                      <div className="grid gap-2">
                        <label htmlFor="reason" className="text-sm font-medium">Reason for emergency pause</label>
                        <textarea
                          id="reason"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Please provide a detailed reason for this emergency action..."
                        />
                      </div>
                      <div className="rounded-md border p-3 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/20 mt-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
                              This action requires AdminCap verification and will be logged in the system.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive" onClick={onPauseSystem}>Confirm Pause</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
          
          <div className={`rounded-md border p-4 ${systemPaused ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/20' : 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/20'}`}>
            <div className="flex items-start gap-2">
              {systemPaused ? (
                <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              )}
              <div>
                <h4 className={`text-sm font-medium ${systemPaused ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                  {systemPaused ? 'System is paused' : 'System is operational'}
                </h4>
                <p className={`text-xs ${systemPaused ? 'text-red-700/80 dark:text-red-400/80' : 'text-green-700/80 dark:text-green-400/80'}`}>
                  {systemPaused 
                    ? 'All voting operations are currently suspended. Only admins can access the system.' 
                    : 'All voting operations are active and running normally.'}
                </p>
              </div>
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

// Additional Emergency Actions component
const AdditionalEmergencyActions = () => {
  return (
    <Card className="border-amber-300 dark:border-amber-900">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Additional Emergency Actions</CardTitle>
        <CardDescription>
          These actions allow targeted interventions for specific issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Freeze Specific Proposal</h4>
              <p className="text-xs text-muted-foreground">Temporarily suspend a specific proposal</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Lock className="h-4 w-4 mr-2" />
                  Freeze Proposal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Freeze Specific Proposal</DialogTitle>
                  <DialogDescription>
                    Select a proposal to temporarily suspend from voting
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="grid gap-2">
                    <label htmlFor="proposal-id" className="text-sm font-medium">Proposal ID</label>
                    <select id="proposal-id" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select a proposal</option>
                      <option value="1">Community Treasury Fund Allocation</option>
                      <option value="2">Governance Framework Update</option>
                      <option value="5">Ecosystem Growth Initiative</option>
                      <option value="6">Protocol Security Enhancement</option>
                    </select>
                  </div>
                  <div className="grid gap-2 mt-4">
                    <label htmlFor="freeze-reason" className="text-sm font-medium">Reason for freezing</label>
                    <textarea
                      id="freeze-reason"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Please provide a detailed reason..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default">Freeze Proposal</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Emergency Proposal Extension</h4>
              <p className="text-xs text-muted-foreground">Extend a proposal's deadline in case of emergencies</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Extend Deadline
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Emergency Proposal Extension</DialogTitle>
                  <DialogDescription>
                    Extend the deadline for an active proposal
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="grid gap-2">
                    <label htmlFor="proposal-ext-id" className="text-sm font-medium">Proposal ID</label>
                    <select id="proposal-ext-id" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="">Select a proposal</option>
                      <option value="1">Community Treasury Fund Allocation</option>
                      <option value="2">Governance Framework Update</option>
                      <option value="5">Ecosystem Growth Initiative</option>
                      <option value="6">Protocol Security Enhancement</option>
                    </select>
                  </div>
                  <div className="grid gap-2 mt-4">
                    <label htmlFor="extension-time" className="text-sm font-medium">Extension Period</label>
                    <select id="extension-time" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                      <option value="72">72 hours</option>
                      <option value="168">1 week</option>
                    </select>
                  </div>
                  <div className="grid gap-2 mt-4">
                    <label htmlFor="extension-reason" className="text-sm font-medium">Reason for extension</label>
                    <textarea
                      id="extension-reason"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Please provide a detailed reason..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default">Extend Deadline</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Emergency Announcement</h4>
              <p className="text-xs text-muted-foreground">Send critical notification to all users</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Send Alert
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Emergency Announcement</DialogTitle>
                  <DialogDescription>
                    Send a critical alert to all platform users
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="grid gap-2">
                    <label htmlFor="alert-title" className="text-sm font-medium">Alert Title</label>
                    <input
                      id="alert-title"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Enter alert title"
                    />
                  </div>
                  <div className="grid gap-2 mt-4">
                    <label htmlFor="alert-message" className="text-sm font-medium">Alert Message</label>
                    <textarea
                      id="alert-message"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Enter alert message..."
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <input id="critical" type="checkbox" className="rounded border-gray-300" />
                    <label htmlFor="critical" className="text-sm">Mark as critical (will show prominently to all users)</label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default">Send Alert</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AdminEmergency = () => {
  // System pause state
  const [systemPaused, setSystemPaused] = useState(false);
  
  // Mock emergency actions log
  const [actionsLog] = useState([
    { time: "2025-04-18 08:12:34", action: "System Pause", admin: "0x7a16ff8270...", reason: "Suspicious voting pattern detected" },
    { time: "2025-04-18 09:45:21", action: "System Resume", admin: "0x7a16ff8270...", reason: "Investigation complete, no issues found" },
    { time: "2025-04-15 14:30:56", action: "Proposal Freeze", admin: "0x7a16ff8270...", reason: "Content review needed for proposal #6" },
    { time: "2025-04-15 16:22:08", action: "Proposal Unfreeze", admin: "0x7a16ff8270...", reason: "Content review completed for proposal #6" },
    { time: "2025-04-10 11:05:43", action: "Emergency Alert", admin: "0x7a16ff8270...", reason: "System maintenance notification" },
  ]);
  
  const handlePauseSystem = () => {
    setSystemPaused(true);
    // In a real implementation, this would call the smart contract
  };
  
  const handleResumeSystem = () => {
    setSystemPaused(false);
    // In a real implementation, this would call the smart contract
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
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-gradient-to-br from-red-50 to-amber-50 dark:from-red-950 dark:to-amber-950 p-6 rounded-2xl shadow-sm">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <AlertTriangle className="h-8 w-8 mr-2 text-red-500" />
                Emergency Controls
              </h1>
              <p className="text-muted-foreground mt-1">Critical system management for emergency situations</p>
            </div>
            
            <div className="flex items-center gap-3 py-2 px-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
                AdminCap verification required for all actions
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* System Status */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${systemPaused ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <div>
                    <h2 className="text-xl font-bold">{systemPaused ? 'System is PAUSED' : 'System is ACTIVE'}</h2>
                    <p className="text-sm text-muted-foreground">
                      {systemPaused 
                        ? 'The voting system is currently in emergency pause mode.' 
                        : 'The voting system is operating normally.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Emergency Controls */}
            <EmergencyControls 
              systemPaused={systemPaused}
              onPauseSystem={handlePauseSystem}
              onResumeSystem={handleResumeSystem}
            />
            
            {/* Additional Emergency Actions */}
            <AdditionalEmergencyActions />
            
            {/* Emergency Actions Log */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Emergency Actions Log</CardTitle>
                <CardDescription>Record of all emergency actions taken by administrators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search actions..."
                      className="pl-9 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Log
                  </Button>
                </div>
                
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
                      {actionsLog.map((log, index) => (
                        <TableRow key={index}>
                          <TableCell>{log.time}</TableCell>
                          <TableCell>
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${log.action.includes('Pause') ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : ''}
                              ${log.action.includes('Resume') ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : ''}
                              ${log.action.includes('Freeze') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' : ''}
                              ${log.action.includes('Unfreeze') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' : ''}
                              ${log.action.includes('Alert') ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' : ''}
                            `}>
                              {log.action}
                            </span>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{log.admin}</TableCell>
                          <TableCell>{log.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminEmergency;
