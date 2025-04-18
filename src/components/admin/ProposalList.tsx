
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Filter, 
  Plus, 
  MoreHorizontal,
  EyeIcon,
  Edit,
  Trash
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Mock proposal data
const mockProposals = [
  {
    id: "prop-001",
    title: "Increase Gas Fee Allocation",
    description: "Proposal to increase the allocation of gas fees for network validators.",
    status: "active",
    votesFor: 2345,
    votesAgainst: 876,
    expiresAt: "2025-05-15T00:00:00Z",
    createdBy: "0x7ae...f3d2",
    createdAt: "2025-04-01T14:30:00Z"
  },
  {
    id: "prop-002",
    title: "Add New Validator Node Requirements",
    description: "Update validator node requirements to include higher stake minimum.",
    status: "active",
    votesFor: 1202,
    votesAgainst: 345,
    expiresAt: "2025-05-10T00:00:00Z",
    createdBy: "0x8bc...a1e5",
    createdAt: "2025-04-02T09:15:00Z"
  },
  {
    id: "prop-003",
    title: "Protocol Upgrade v2.5",
    description: "Implement protocol upgrade to version 2.5 with security enhancements.",
    status: "expired",
    votesFor: 3678,
    votesAgainst: 2456,
    expiresAt: "2025-04-01T00:00:00Z",
    createdBy: "0x9dc...b4f3",
    createdAt: "2025-03-15T11:45:00Z"
  },
  {
    id: "prop-004",
    title: "Treasury Fund Allocation",
    description: "Allocate 5% of treasury funds to developer grants and ecosystem growth.",
    status: "delisted",
    votesFor: 567,
    votesAgainst: 890,
    expiresAt: "2025-06-01T00:00:00Z",
    createdBy: "0x3fa...c8d9",
    createdAt: "2025-04-05T16:20:00Z"
  },
  {
    id: "prop-005",
    title: "Modify Governance Voting Period",
    description: "Change the standard voting period from 14 days to 10 days.",
    status: "active",
    votesFor: 1876,
    votesAgainst: 1023,
    expiresAt: "2025-05-20T00:00:00Z",
    createdBy: "0x5eb...a7c2",
    createdAt: "2025-04-06T08:45:00Z"
  }
];

// Status badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    expired: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400",
    delisted: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  };
  
  const statusIcons = {
    active: <CheckCircle className="h-3.5 w-3.5 mr-1" />,
    expired: <Clock className="h-3.5 w-3.5 mr-1" />,
    delisted: <AlertTriangle className="h-3.5 w-3.5 mr-1" />
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {statusIcons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const ProposalList = () => {
  const [filter, setFilter] = useState("all");
  const [selectedProposals, setSelectedProposals] = useState<string[]>([]);
  
  // Filter proposals based on selected filter
  const filteredProposals = filter === "all" 
    ? mockProposals 
    : mockProposals.filter(proposal => proposal.status === filter);
  
  // Toggle proposal selection
  const toggleProposalSelection = (proposalId: string) => {
    setSelectedProposals(prev => 
      prev.includes(proposalId) 
        ? prev.filter(id => id !== proposalId)
        : [...prev, proposalId]
    );
  };
  
  // Select all proposals
  const selectAllProposals = () => {
    if (selectedProposals.length === filteredProposals.length) {
      setSelectedProposals([]);
    } else {
      setSelectedProposals(filteredProposals.map(p => p.id));
    }
  };
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 justify-between items-start sm:items-center pb-4">
        <CardTitle className="text-xl font-bold">Proposals</CardTitle>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select onValueChange={setFilter} defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Proposals</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="delisted">Delisted</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">More Filters</span>
          </Button>
          <Button size="sm" className="gap-1" variant="default">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {selectedProposals.length > 0 && (
          <div className="mb-4 p-2 bg-muted/50 rounded-md flex items-center justify-between">
            <span className="text-sm">{selectedProposals.length} proposals selected</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8">
                Extend Deadline
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                Delist
              </Button>
              <Button size="sm" variant="destructive" className="h-8">
                Remove
              </Button>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-3 text-left w-10">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4"
                    checked={selectedProposals.length === filteredProposals.length && filteredProposals.length > 0}
                    onChange={selectAllProposals}
                  />
                </th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left hidden md:table-cell">Created</th>
                <th className="p-3 text-left hidden lg:table-cell">Expires</th>
                <th className="p-3 text-left hidden lg:table-cell">Votes</th>
                <th className="p-3 text-left w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.map((proposal, index) => (
                <motion.tr 
                  key={proposal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b dark:border-gray-700 hover:bg-muted/50"
                >
                  <td className="p-3">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4"
                      checked={selectedProposals.includes(proposal.id)}
                      onChange={() => toggleProposalSelection(proposal.id)}
                    />
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{proposal.title}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-xs">
                      {proposal.description}
                    </div>
                  </td>
                  <td className="p-3">
                    <StatusBadge status={proposal.status} />
                  </td>
                  <td className="p-3 hidden md:table-cell text-sm text-muted-foreground">
                    {formatDate(proposal.createdAt)}
                  </td>
                  <td className="p-3 hidden lg:table-cell text-sm text-muted-foreground">
                    {formatDate(proposal.expiresAt)}
                  </td>
                  <td className="p-3 hidden lg:table-cell">
                    <div className="flex items-center space-x-1">
                      <span className="text-green-600 dark:text-green-400 text-sm">
                        {proposal.votesFor}
                      </span>
                      <span className="text-muted-foreground text-sm">/</span>
                      <span className="text-red-600 dark:text-red-400 text-sm">
                        {proposal.votesAgainst}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalList;
