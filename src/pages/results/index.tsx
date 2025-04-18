import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart, PieChart, Download, Clock, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const data = [
  { name: "Central Park", votes: 450, color: "#3b82f6" },
  { name: "Riverside", votes: 350, color: "#8b5cf6" },
  { name: "Downtown", votes: 200, color: "#ec4899" }
];

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899"];

const ResultsPage = () => {
  const [chartType, setChartType] = useState("bar");
  const totalVotes = data.reduce((acc, curr) => acc + curr.votes, 0);
  
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Voting Results
              </h1>
              <p className="text-muted-foreground mt-2">
                View the outcomes of recent community polls on the Sui blockchain
              </p>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 mt-4 md:mt-0 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <Download className="h-4 w-4" />
              Export Results
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="text-2xl font-bold">{totalVotes}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Time Remaining</p>
                  <p className="text-2xl font-bold">2 Days</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
                  <Award className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Leading Option</p>
                  <p className="text-2xl font-bold">{data[0].name}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Last Vote</p>
                  <p className="text-2xl font-bold">12 min ago</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-xl font-semibold">Community Garden Location</h2>
                  <div className="flex items-center mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <p className="text-sm text-muted-foreground">Vote active • <span className="font-medium">{totalVotes} votes</span></p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button 
                    variant={chartType === "bar" ? "default" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setChartType("bar")}
                  >
                    <BarChart className="h-4 w-4" />
                    Bar
                  </Button>
                  <Button 
                    variant={chartType === "pie" ? "default" : "outline"} 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => setChartType("pie")}
                  >
                    <PieChart className="h-4 w-4" />
                    Pie
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="h-64 md:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "bar" ? (
                    <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "none"
                        }} 
                      />
                      <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  ) : (
                    <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          border: "none"
                        }} 
                      />
                      <Legend />
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="votes"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  )}
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {data.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="relative p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 overflow-hidden group hover:shadow-md transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                    <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: item.color }}></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                          {Math.round((item.votes / totalVotes) * 100)}%
                        </div>
                      </div>
                      <p className="text-2xl font-bold mt-2">{item.votes}</p>
                      <p className="text-sm text-muted-foreground">total votes</p>
                      
                      <div className="mt-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${(item.votes / totalVotes) * 100}%`, backgroundColor: item.color }}></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all">
                  View All Results on Sui Explorer
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;
