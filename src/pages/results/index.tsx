
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart, PieChart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Central Park", votes: 450 },
  { name: "Riverside", votes: 350 },
  { name: "Downtown", votes: 200 }
];

const ResultsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Voting Results</h1>
            <p className="text-muted-foreground mt-1">View the outcomes of recent community polls.</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Results
          </Button>
        </div>
        
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Community Garden Location</h2>
              <p className="text-muted-foreground">Total Votes: 1,000</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Bar
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Pie
              </Button>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="hsl(var(--primary))" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {data.map((item) => (
              <div key={item.name} className="p-4 rounded-lg bg-accent">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-2xl font-bold mt-1">{item.votes}</p>
                <p className="text-sm text-muted-foreground">votes</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
