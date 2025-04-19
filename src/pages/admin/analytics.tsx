
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart2, 
  Calendar, 
  Download, 
  Filter, 
  PieChart as PieChartIcon, 
  Share2,
  Activity
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from "recharts";
import AdminNavbar from "@/components/AdminNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminAnalytics = () => {
  // Mock voting data for charts
  const [votingDistribution] = useState([
    { name: "For", value: 65 },
    { name: "Against", value: 35 },
  ]);
  
  const [votingActivity] = useState([
    { date: "Apr 13", votes: 120 },
    { date: "Apr 14", votes: 98 },
    { date: "Apr 15", votes: 135 },
    { date: "Apr 16", votes: 78 },
    { date: "Apr 17", votes: 156 },
    { date: "Apr 18", votes: 201 },
    { date: "Apr 19", votes: 187 }
  ]);
  
  const [engagementData] = useState([
    { name: "Jan", uniqueVoters: 523, avgVotes: 2.1, newUsers: 120 },
    { name: "Feb", uniqueVoters: 652, avgVotes: 2.3, newUsers: 145 },
    { name: "Mar", uniqueVoters: 758, avgVotes: 2.7, newUsers: 165 },
    { name: "Apr", uniqueVoters: 1245, avgVotes: 4.8, newUsers: 187 }
  ]);
  
  const [proposalEngagement] = useState([
    { proposal: "Community Treasury Fund Allocation", votes: 356, uniqueVoters: 312, engagement: 24.3 },
    { proposal: "Governance Framework Update", votes: 203, uniqueVoters: 187, engagement: 15.8 },
    { proposal: "Partner Integration Proposal", votes: 512, uniqueVoters: 498, engagement: 38.2 },
    { proposal: "Development Fund for Q3", votes: 89, uniqueVoters: 85, engagement: 6.7 },
    { proposal: "Ecosystem Growth Initiative", votes: 178, uniqueVoters: 167, engagement: 12.1 }
  ]);
  
  const [timeOfDayData] = useState([
    { hour: "00:00", votes: 12 },
    { hour: "02:00", votes: 8 },
    { hour: "04:00", votes: 5 },
    { hour: "06:00", votes: 7 },
    { hour: "08:00", votes: 18 },
    { hour: "10:00", votes: 29 },
    { hour: "12:00", votes: 35 },
    { hour: "14:00", votes: 42 },
    { hour: "16:00", votes: 38 },
    { hour: "18:00", votes: 27 },
    { hour: "20:00", votes: 22 },
    { hour: "22:00", votes: 15 }
  ]);
  
  const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];
  
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
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-1">Comprehensive analytics for your voting platform</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Votes</p>
                    <p className="text-3xl font-bold mt-1">2,061</p>
                    <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                    <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Unique Voters</p>
                    <p className="text-3xl font-bold mt-1">1,245</p>
                    <p className="text-xs text-green-600 mt-1">+5.3% from last month</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                    <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Votes Per User</p>
                    <p className="text-3xl font-bold mt-1">4.8</p>
                    <p className="text-xs text-green-600 mt-1">+0.2 from last month</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                    <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New Users</p>
                    <p className="text-3xl font-bold mt-1">187</p>
                    <p className="text-xs text-red-600 mt-1">-2.1% from last month</p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full">
                    <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Tabs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Voting Analytics</CardTitle>
              <CardDescription>Comprehensive voting data visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  <TabsTrigger value="distribution">Distribution</TabsTrigger>
                  <TabsTrigger value="heatmap">Activity Heatmap</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Voting Activity (Last 7 Days)</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={votingActivity}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="votes" fill="#8884d8" stroke="#8884d8" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Voting Distribution</h3>
                      <div className="h-64 flex items-center justify-center">
                        <PieChart width={250} height={250}>
                          <Pie
                            data={votingDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {votingDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="engagement">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Monthly Engagement Metrics</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={engagementData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Line yAxisId="left" type="monotone" dataKey="uniqueVoters" stroke="#8884d8" />
                            <Line yAxisId="left" type="monotone" dataKey="newUsers" stroke="#82ca9d" />
                            <Line yAxisId="right" type="monotone" dataKey="avgVotes" stroke="#ff7300" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Proposal Engagement</h3>
                      <div className="rounded-md border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b text-left">
                              <th className="p-3">Proposal</th>
                              <th className="p-3">Votes</th>
                              <th className="p-3">Unique Voters</th>
                              <th className="p-3">Engagement Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {proposalEngagement.map((item, index) => (
                              <tr key={index} className="border-b last:border-0">
                                <td className="p-3">{item.proposal}</td>
                                <td className="p-3">{item.votes}</td>
                                <td className="p-3">{item.uniqueVoters}</td>
                                <td className="p-3">{item.engagement}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="distribution">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Votes by Proposal Type</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { type: "Treasury", votes: 520 },
                            { type: "Governance", votes: 350 },
                            { type: "Development", votes: 300 },
                            { type: "Community", votes: 250 },
                            { type: "Partnership", votes: 180 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="votes" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Voter Demographics</h3>
                      <div className="h-64 flex items-center justify-center">
                        <PieChart width={250} height={250}>
                          <Pie
                            data={[
                              { name: "3+ NFTs", value: 45 },
                              { name: "2 NFTs", value: 30 },
                              { name: "1 NFT", value: 25 }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {votingDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="heatmap">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Voting Activity by Time of Day</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={timeOfDayData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="hour" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="votes" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Voting Activity by Day of Week</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { day: "Monday", votes: 245 },
                            { day: "Tuesday", votes: 350 },
                            { day: "Wednesday", votes: 320 },
                            { day: "Thursday", votes: 290 },
                            { day: "Friday", votes: 270 },
                            { day: "Saturday", votes: 220 },
                            { day: "Sunday", votes: 175 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="votes" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Export Reports</CardTitle>
              <CardDescription>Generate and download detailed reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center gap-2 justify-center">
                  <Download className="h-6 w-6" />
                  <div className="text-center">
                    <p className="font-medium">Activity Report</p>
                    <p className="text-xs text-muted-foreground">Detailed voting activity</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center gap-2 justify-center">
                  <BarChart2 className="h-6 w-6" />
                  <div className="text-center">
                    <p className="font-medium">Engagement Metrics</p>
                    <p className="text-xs text-muted-foreground">User participation data</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-4 flex flex-col items-center gap-2 justify-center">
                  <PieChartIcon className="h-6 w-6" />
                  <div className="text-center">
                    <p className="font-medium">Proposal Results</p>
                    <p className="text-xs text-muted-foreground">Outcomes and distribution</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
