
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Shield, 
  Key, 
  Save, 
  User,
  AlertTriangle,
  HelpCircle,
  Lock,
  Moon,
  Sun,
  Database,
  Code,
  RotateCw,
  Globe,
  Bell
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminNavbar from "@/components/AdminNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSettings = () => {
  // System config state
  const [minVotes, setMinVotes] = useState(100);
  const [votePeriod, setVotePeriod] = useState(7);
  const [network, setNetwork] = useState("testnet");
  const [theme, setTheme] = useState("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl shadow-sm">
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground mt-1">Configure system parameters and preferences</p>
            </div>
          </div>

          {/* Settings Tabs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">System Configuration</CardTitle>
              <CardDescription>Manage all system settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="network">Network</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general">
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="min-votes" className="text-sm font-medium">Minimum Votes Required</label>
                        <input
                          id="min-votes"
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={minVotes}
                          onChange={(e) => setMinVotes(Number(e.target.value))}
                        />
                        <p className="text-xs text-muted-foreground">Minimum number of votes required for a proposal to be valid</p>
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="vote-period" className="text-sm font-medium">Default Voting Period (days)</label>
                        <input
                          id="vote-period"
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={votePeriod}
                          onChange={(e) => setVotePeriod(Number(e.target.value))}
                        />
                        <p className="text-xs text-muted-foreground">Default number of days a vote will remain active</p>
                      </div>
                      
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Theme</label>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={theme === "light" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setTheme("light")}
                            className="flex-1"
                          >
                            <Sun className="h-4 w-4 mr-2" />
                            Light
                          </Button>
                          <Button 
                            variant={theme === "dark" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setTheme("dark")}
                            className="flex-1"
                          >
                            <Moon className="h-4 w-4 mr-2" />
                            Dark
                          </Button>
                          <Button 
                            variant={theme === "system" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setTheme("system")}
                            className="flex-1"
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            System
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                        <p className="text-xs text-muted-foreground">Add an additional layer of security to your account</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Key className="h-4 w-4 mr-2" />
                            Enable 2FA
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
                            <DialogDescription>
                              Scan the QR code with your authentication app to set up 2FA.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4 flex justify-center">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center h-48 w-48">
                              <div className="grid grid-cols-4 grid-rows-4 gap-1">
                                {Array.from({ length: 16 }).map((_, i) => (
                                  <div key={i} className="bg-black w-8 h-8"></div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="grid gap-2">
                              <label htmlFor="verification-code" className="text-sm font-medium">Verification Code</label>
                              <input
                                id="verification-code"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Enter 6-digit code"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Verify and Enable</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">AdminCap Verification</h4>
                        <p className="text-xs text-muted-foreground">Verify your AdminCap to perform administrative actions</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-2" />
                        Verify AdminCap
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Session Timeout</h4>
                        <p className="text-xs text-muted-foreground">Set the inactive time before automatic logout</p>
                      </div>
                      <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>
                    
                    <div className="rounded-md border p-3 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/20">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-amber-700 dark:text-amber-400">Security Reminder</h4>
                          <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
                            Always verify your AdminCap before performing critical actions. Never share your private keys with anyone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="network">
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Network Selection</label>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={network === "testnet" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setNetwork("testnet")}
                            className="flex-1"
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            Testnet
                          </Button>
                          <Button 
                            variant={network === "mainnet" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setNetwork("mainnet")}
                            className="flex-1"
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            Mainnet
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Select which Sui network to use</p>
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="rpc-endpoint" className="text-sm font-medium">RPC Endpoint</label>
                        <input
                          id="rpc-endpoint"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={network === "testnet" ? "https://sui-testnet.com" : "https://sui-mainnet.com"}
                          readOnly
                        />
                        <p className="text-xs text-muted-foreground">The RPC endpoint is automatically selected based on the chosen network</p>
                      </div>
                      
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Network Status</label>
                          <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            Online
                          </span>
                        </div>
                        <div className="rounded-md border p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Latest Block:</span>
                            <span className="font-mono">8,142,567</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-1">
                            <span>Validators:</span>
                            <span>24</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mt-1">
                            <span>Last Updated:</span>
                            <span>30 seconds ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Email Notifications</h4>
                        <p className="text-xs text-muted-foreground">Receive important system alerts via email</p>
                      </div>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Push Notifications</h4>
                        <p className="text-xs text-muted-foreground">Receive real-time notifications in your browser</p>
                      </div>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={pushNotifications}
                            onChange={() => setPushNotifications(!pushNotifications)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h4 className="text-sm font-medium mb-2">Notification Events</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm">New proposal created</label>
                          <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Proposal voting ended</label>
                          <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Critical system alerts</label>
                          <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">User reports</label>
                          <input type="checkbox" className="rounded border-gray-300" />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm">Weekly summary</label>
                          <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="notification-email" className="text-sm font-medium">Notification Email</label>
                      <input
                        id="notification-email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="admin@example.com"
                      />
                      <p className="text-xs text-muted-foreground">Email address for receiving notifications</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">System Cache</h4>
                        <p className="text-xs text-muted-foreground">Clear system cache to refresh data</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <RotateCw className="h-4 w-4 mr-2" />
                        Clear Cache
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Debug Mode</h4>
                        <p className="text-xs text-muted-foreground">Enable detailed logging for troubleshooting</p>
                      </div>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="custom-parameters" className="text-sm font-medium">Custom Contract Parameters</label>
                      <textarea
                        id="custom-parameters"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                        placeholder='{"gasLimit": 10000, "timeout": 30}'
                      ></textarea>
                      <p className="text-xs text-muted-foreground">Advanced JSON configuration for contract parameters (use with caution)</p>
                    </div>
                    
                    <div className="rounded-md border p-3 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/20">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-red-700 dark:text-red-400">Advanced Settings Warning</h4>
                          <p className="text-xs text-red-700/80 dark:text-red-400/80">
                            Modifying advanced settings may impact system stability. Use with caution and only if you understand the implications.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          {/* Admin Profile */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Admin Information</CardTitle>
              <CardDescription>Current administrator details and access management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Current Admin</h4>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Admin</p>
                      <p className="font-mono text-xs bg-gray-50 dark:bg-gray-800/60 p-1.5 rounded mt-1">0x7a16ff8270133f063aab39c125436c7608b1946c</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">AdminCap Verification</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Verified</span>
                  </div>
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
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;
