
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Settings, Shield } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Poll
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <Users className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">User Management</h3>
            <p className="text-muted-foreground mb-4">Manage user accounts, roles, and permissions.</p>
            <Button variant="outline" className="w-full">Manage Users</Button>
          </Card>
          
          <Card className="p-6">
            <Settings className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Poll Settings</h3>
            <p className="text-muted-foreground mb-4">Configure voting rules and poll parameters.</p>
            <Button variant="outline" className="w-full">Configure</Button>
          </Card>
          
          <Card className="p-6">
            <Shield className="h-8 w-8 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Security</h3>
            <p className="text-muted-foreground mb-4">Monitor system security and access logs.</p>
            <Button variant="outline" className="w-full">View Logs</Button>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
