
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart, BarChartHorizontal, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResultsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Voting Results</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-2" />
              Bar
            </Button>
            <Button variant="outline" size="sm">
              <PieChart className="h-4 w-4 mr-2" />
              Pie
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Community Garden Location</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-32">Central Park</div>
                <div className="flex-1 h-4 bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                </div>
                <div className="w-16 text-right">45%</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-32">Riverside</div>
                <div className="flex-1 h-4 bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '35%' }}></div>
                </div>
                <div className="w-16 text-right">35%</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-32">Downtown</div>
                <div className="flex-1 h-4 bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '20%' }}></div>
                </div>
                <div className="w-16 text-right">20%</div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;
