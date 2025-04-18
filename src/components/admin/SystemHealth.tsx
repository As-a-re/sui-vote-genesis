
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Gauge, RefreshCw, AlertCircle, CheckCircle, Shield, Database, HardDrive, Network } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

// Mock gas usage data
const gasUsageData = [
  { day: "Mon", usage: 45 },
  { day: "Tue", usage: 52 },
  { day: "Wed", usage: 49 },
  { day: "Thu", usage: 63 },
  { day: "Fri", usage: 58 },
  { day: "Sat", usage: 41 },
  { day: "Sun", usage: 39 }
];

// Mock transaction data
const transactionData = [
  { day: "Mon", count: 245 },
  { day: "Tue", count: 287 },
  { day: "Wed", count: 302 },
  { day: "Thu", count: 345 },
  { day: "Fri", count: 367 },
  { day: "Sat", count: 298 },
  { day: "Sun", count: 256 }
];

// System status component
const SystemStatusItem = ({ 
  icon: Icon, 
  label, 
  status, 
  value 
}: { 
  icon: React.ElementType; 
  label: string; 
  status: "healthy" | "warning" | "critical"; 
  value: string;
}) => {
  const statusColors = {
    healthy: "text-green-600 dark:text-green-400",
    warning: "text-amber-600 dark:text-amber-400",
    critical: "text-red-600 dark:text-red-400"
  };
  
  const statusIcons = {
    healthy: <CheckCircle className="h-4 w-4" />,
    warning: <AlertCircle className="h-4 w-4" />,
    critical: <AlertCircle className="h-4 w-4" />
  };
  
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-sm font-medium">{label}</div>
          <div className={`flex items-center gap-1 text-xs ${statusColors[status]}`}>
            {statusIcons[status]}
            <span>{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemHealth = () => {
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulating refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">System Health</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="status">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="gas">Gas Usage</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="status" className="space-y-4">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SystemStatusItem 
                icon={Network} 
                label="Network" 
                status="healthy" 
                value="Online - All systems operational" 
              />
              <SystemStatusItem 
                icon={Database} 
                label="Blockchain" 
                status="healthy" 
                value="8,142,567 blocks - Synced" 
              />
              <SystemStatusItem 
                icon={Shield} 
                label="Security" 
                status="healthy" 
                value="No threats detected" 
              />
              <SystemStatusItem 
                icon={HardDrive} 
                label="Storage" 
                status="warning" 
                value="82% capacity - Consider optimization" 
              />
            </motion.div>
            
            <div className="mt-4 p-3 border rounded-lg flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">System Uptime</div>
                  <div className="text-sm text-muted-foreground">99.8% over the last 30 days</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-lg font-bold">99.8%</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gas" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[240px]"
            >
              <ChartContainer config={{
                gas: { label: "Gas Usage", color: "#4f46e5" }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={gasUsageData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                      <linearGradient id="gasGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="usage" 
                      stroke="#4f46e5" 
                      fillOpacity={1} 
                      fill="url(#gasGradient)" 
                      name="gas"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </motion.div>
            
            <div className="p-3 border rounded-lg bg-card">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="text-sm font-medium">Average Gas Price</div>
                  <div className="text-sm text-muted-foreground">Last 7 days</div>
                </div>
                <div className="text-lg font-bold">51.1 SUI</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[240px]"
            >
              <ChartContainer config={{
                transactions: { label: "Transactions", color: "#0ea5e9" }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transactionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#0ea5e9" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="transactions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 border rounded-lg bg-card">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Total Transactions</div>
                  <div className="text-lg font-bold">2,100</div>
                  <div className="text-xs text-green-600 dark:text-green-400">+15% from last week</div>
                </div>
              </div>
              <div className="p-3 border rounded-lg bg-card">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Success Rate</div>
                  <div className="text-lg font-bold">99.2%</div>
                  <div className="text-xs text-green-600 dark:text-green-400">+0.5% from last week</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SystemHealth;
