import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Key, Bell, Shield, History, Camera, Check, ToggleLeft, ExternalLink, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const UserProfile = () => {
  const [avatarHover, setAvatarHover] = useState(false);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <motion.div variants={fadeIn}>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                  User Profile
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your account settings and voting preferences
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                transition={{ delay: 0.2 }}
                className="mt-4 md:mt-0"
              >
                <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
                  <ExternalLink className="h-4 w-4" />
                  View on Sui Explorer
                </Button>
              </motion.div>
            </div>
            
            <div className="mb-8">
              <motion.div 
                variants={fadeIn}
                transition={{ delay: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
              >
                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setAvatarHover(true)}
                  onMouseLeave={() => setAvatarHover(false)}
                >
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden relative">
                    <span>LP</span>
                    {avatarHover && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Camera className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">Lion Prado</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-muted-foreground">lion@example.com</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                      <Check className="h-3 w-3" />
                      Verified Voter
                    </div>
                    <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                      5 Votes Cast
                    </div>
                  </div>
                </div>
                
                <div className="ml-auto hidden md:block">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Connected to Wallet</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm">
                <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                  <Shield className="h-4 w-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
                  <History className="h-4 w-4" />
                  Voting History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <p className="text-sm text-muted-foreground">Update your personal details</p>
                    </div>
                    <div className="p-6">
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                            <Input 
                              id="name" 
                              placeholder="Lion Prado" 
                              className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="display-name" className="text-sm font-medium">Display Name</Label>
                            <Input 
                              id="display-name" 
                              placeholder="lionprado" 
                              className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="lion@example.com" 
                            className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                          <textarea 
                            id="bio" 
                            placeholder="Tell us about yourself" 
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 min-h-20 bg-white dark:bg-gray-800"
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all">
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="security">
                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                      <h3 className="text-lg font-semibold">Change Password</h3>
                      <p className="text-sm text-muted-foreground">Ensure your account is using a secure password</p>
                    </div>
                    <div className="p-6">
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="current-password" className="text-sm font-medium">Current Password</Label>
                          <Input 
                            id="current-password" 
                            type="password" 
                            className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="new-password" className="text-sm font-medium">New Password</Label>
                            <Input 
                              id="new-password" 
                              type="password" 
                              className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</Label>
                            <Input 
                              id="confirm-password" 
                              type="password" 
                              className="rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex gap-3">
                            <div className="mt-1">
                              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-400">Password Requirements</h4>
                              <ul className="mt-2 text-xs text-blue-700 dark:text-blue-300 space-y-1">
                                <li className="flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  <span>Minimum 8 characters</span>
                                </li>
                                <li className="flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  <span>At least one uppercase letter</span>
                                </li>
                                <li className="flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  <span>At least one number</span>
                                </li>
                                <li className="flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  <span>At least one special character</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all">
                            Update Password
                          </Button>
                        </div>
                      </form>
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                      <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add additional security to your account</p>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            <Key className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium">Authenticator App</p>
                            <p className="text-sm text-muted-foreground">Use an authentication app to get two-factor authentication codes</p>
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="notifications">
                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                      <h3 className="text-lg font-semibold">Notification Preferences</h3>
                      <p className="text-sm text-muted-foreground">Manage how you receive updates about voting activity</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {[
                          { 
                            title: "New Polls", 
                            description: "Receive notifications when new polls are created", 
                            icon: <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" /> 
                          },
                          { 
                            title: "Results Published", 
                            description: "Get notified when poll results are published", 
                            icon: <Check className="h-5 w-5 text-green-600 dark:text-green-400" /> 
                          },
                          { 
                            title: "Reminders", 
                            description: "Receive reminders for polls you haven't voted on yet", 
                            icon: <History className="h-5 w-5 text-purple-600 dark:text-purple-400" /> 
                          },
                          { 
                            title: "Community Updates", 
                            description: "Get notified about important community announcements", 
                            icon: <User className="h-5 w-5 text-orange-600 dark:text-orange-400" /> 
                          }
                        ].map((item, index) => (
                          <motion.div 
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.4 }}
                            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                {item.icon}
                              </div>
                              <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Switch />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-col xs:flex-row gap-4 justify-end">
                        <Button variant="outline" className="bg-white dark:bg-gray-800">
                          Disable All
                        </Button>
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all">
                          Save Preferences
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="history">
                <motion.div
                  variants={fadeIn}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                      <h3 className="text-lg font-semibold">Your Voting History</h3>
                      <p className="text-sm text-muted-foreground">View all your past votes and interactions on the blockchain</p>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {[
                          { id: 1, title: "Community Garden Location", vote: "Central Park Area", time: "2 days ago", status: "Completed" },
                          { id: 2, title: "Annual Budget Allocation", vote: "Option B: Focus on Infrastructure", time: "1 week ago", status: "Completed" },
                          { id: 3, title: "New Community Center Design", vote: "Modern Glass Design", time: "2 weeks ago", status: "Completed" },
                          { id: 4, title: "Neighborhood Watch Program", vote: "Expanded Coverage Plan", time: "1 month ago", status: "Completed" },
                          { id: 5, title: "Street Lighting Upgrade", vote: "LED Conversion Project", time: "2 months ago", status: "Completed" }
                        ].map((item, index) => (
                          <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.4 }}
                            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                #{item.id}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                  <p className="font-medium">{item.title}</p>
                                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">{item.status}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Voted: {item.vote}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground hidden sm:inline-block">{item.time}</span>
                              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-center">
                        <Button variant="outline" className="bg-white dark:bg-gray-800">
                          View All Transactions
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
