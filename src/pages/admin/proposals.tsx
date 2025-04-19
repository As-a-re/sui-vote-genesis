
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Filter, 
  Trash, 
  Calendar, 
  MoreHorizontal, 
  Download,
  FileText
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminNavbar from "@/components/AdminNavbar";

// Proposal list component with filtering
const ProposalsList = ({ proposals, onView, onDelete, onDelist, onExtend }) => {
  const [filter, setFilter] = useState('all');
  const [selectedProposals, setSelectedProposals] = useState([]);
  
  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    return proposal.status === filter;
  });

  const toggleProposalSelection = (proposalId) => {
    if (selectedProposals.includes(proposalId)) {
      setSelectedProposals(selectedProposals.filter(id => id !== proposalId));
    } else {
      setSelectedProposals([...selectedProposals, proposalId]);
    }
  };

  const selectAll = () => {
    if (selectedProposals.length === filteredProposals.length) {
      setSelectedProposals([]);
    } else {
      setSelectedProposals(filteredProposals.map(p => p.id));
    }
  };
  
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
        <div className="flex gap-2">
          {selectedProposals.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedProposals([])}>
                Deselect All
              </Button>
              <Button variant="outline" size="sm">
                Bulk Actions
              </Button>
            </div>
          )}
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
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                  checked={selectedProposals.length === filteredProposals.length && filteredProposals.length > 0}
                  onChange={selectAll}
                />
              </TableHead>
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
                <TableCell>
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300"
                    checked={selectedProposals.includes(proposal.id)}
                    onChange={() => toggleProposalSelection(proposal.id)}
                  />
                </TableCell>
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

const AdminProposals = () => {
  // Mock proposal data
  const [proposals] = useState([
    { id: 1, title: "Community Treasury Fund Allocation", status: "active", votes: 356, deadline: "2025-05-15" },
    { id: 2, title: "Governance Framework Update", status: "active", votes: 203, deadline: "2025-05-10" },
    { id: 3, title: "Partner Integration Proposal", status: "expired", votes: 512, deadline: "2025-04-05" },
    { id: 4, title: "Development Fund for Q3", status: "delisted", votes: 89, deadline: "2025-05-12" },
    { id: 5, title: "Ecosystem Growth Initiative", status: "active", votes: 178, deadline: "2025-05-18" },
    { id: 6, title: "Protocol Security Enhancement", status: "active", votes: 421, deadline: "2025-05-20" },
    { id: 7, title: "Community Rewards Program", status: "expired", votes: 302, deadline: "2025-03-30" },
  ]);
  
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
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl shadow-sm">
            <div>
              <h1 className="text-3xl font-bold">Proposal Management</h1>
              <p className="text-muted-foreground mt-1">Create, monitor, and manage all voting proposals</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>

          {/* Proposal Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Proposals</p>
                    <p className="text-3xl font-bold mt-1">4</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Votes Cast</p>
                    <p className="text-3xl font-bold mt-1">2,061</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Participation</p>
                    <p className="text-3xl font-bold mt-1">28.5%</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Proposals List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">All Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <ProposalsList 
                proposals={proposals}
                onView={handleViewProposal}
                onDelete={handleDeleteProposal}
                onDelist={handleDelistProposal}
                onExtend={handleExtendDeadline}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProposals;
