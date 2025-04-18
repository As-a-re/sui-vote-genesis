
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, AlertTriangle, CheckCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock user data
const mockUsers = [
  {
    address: "0x7ae45cf61dcb5a2d77a2f3d25ca32411417202f3d2",
    votesCast: 12,
    lastActive: "2025-04-15T14:30:00Z",
    status: "active",
    isBlacklisted: false,
    nftCount: 3
  },
  {
    address: "0x8bc91e3adf68b245ac9f73a5923c5e890461a1e5",
    votesCast: 8,
    lastActive: "2025-04-14T09:15:00Z",
    status: "active",
    isBlacklisted: false,
    nftCount: 7
  },
  {
    address: "0x9dc48e6b2a7601fb34c5f8d112b4f3b4f3",
    votesCast: 5,
    lastActive: "2025-04-10T11:45:00Z",
    status: "inactive",
    isBlacklisted: false,
    nftCount: 2
  },
  {
    address: "0x3fa9e17cb54dc1b765a91c89ad85bfc8d9",
    votesCast: 0,
    lastActive: "2025-04-01T16:20:00Z",
    status: "inactive",
    isBlacklisted: true,
    nftCount: 0
  },
  {
    address: "0x5eb2dc9876543a1b2c3d4e5f6a7b8c9d0a7c2",
    votesCast: 20,
    lastActive: "2025-04-17T08:45:00Z",
    status: "active",
    isBlacklisted: false,
    nftCount: 12
  }
];

// Mock voting history
const mockVotingHistory = [
  {
    address: "0x7ae45cf61dcb5a2d77a2f3d25ca32411417202f3d2",
    votes: [
      { proposal: "Increase Gas Fee Allocation", vote: "for", time: "2025-04-15T14:30:00Z", nft: "SuiNFT #1234" },
      { proposal: "Protocol Upgrade v2.5", vote: "against", time: "2025-04-10T11:45:00Z", nft: "SuiNFT #1234" },
      { proposal: "Treasury Fund Allocation", vote: "for", time: "2025-04-05T16:20:00Z", nft: "SuiNFT #5678" }
    ]
  },
  {
    address: "0x8bc91e3adf68b245ac9f73a5923c5e890461a1e5",
    votes: [
      { proposal: "Protocol Upgrade v2.5", vote: "for", time: "2025-04-08T09:15:00Z", nft: "SuiNFT #4321" },
      { proposal: "Increase Gas Fee Allocation", vote: "against", time: "2025-04-14T09:15:00Z", nft: "SuiNFT #8765" }
    ]
  },
  {
    address: "0x5eb2dc9876543a1b2c3d4e5f6a7b8c9d0a7c2",
    votes: [
      { proposal: "Protocol Upgrade v2.5", vote: "for", time: "2025-04-09T08:45:00Z", nft: "SuiNFT #9012" },
      { proposal: "Treasury Fund Allocation", vote: "for", time: "2025-04-06T08:45:00Z", nft: "SuiNFT #3456" },
      { proposal: "Add New Validator Node Requirements", vote: "against", time: "2025-04-16T08:45:00Z", nft: "SuiNFT #7890" }
    ]
  }
];

// Format date to readable string
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Truncate wallet address
const truncateAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

// Status badge component
const StatusBadge = ({ status, isBlacklisted }: { status: string; isBlacklisted: boolean }) => {
  if (isBlacklisted) {
    return (
      <div className="flex items-center">
        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
        <span className="text-red-600 dark:text-red-400 text-sm font-medium">Blacklisted</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center">
      <div className={`h-2 w-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-500'} mr-2`}></div>
      <span className="text-sm">{status === 'active' ? 'Active' : 'Inactive'}</span>
    </div>
  );
};

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  
  // Filter users based on selected tab and search query
  const filteredUsers = mockUsers.filter(user => {
    const matchesTab = selectedTab === "all" || 
                       (selectedTab === "active" && user.status === "active") ||
                       (selectedTab === "blacklisted" && user.isBlacklisted);
                       
    const matchesSearch = user.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Get voting history for a specific user
  const getUserVotingHistory = (address: string) => {
    return mockVotingHistory.find(history => history.address === address)?.votes || [];
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">User Management</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wallet address"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active Users</TabsTrigger>
            <TabsTrigger value="blacklisted">Blacklisted</TabsTrigger>
          </TabsList>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Votes Cast</TableHead>
                  <TableHead>NFTs Owned</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.address}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group"
                    >
                      <TableCell className="font-medium">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <span className="cursor-help underline decoration-dotted underline-offset-2">
                              {truncateAddress(user.address)}
                            </span>
                          </HoverCardTrigger>
                          <HoverCardContent align="start" className="w-80">
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold">Full Address</h4>
                              <p className="text-xs font-mono bg-muted p-2 rounded">
                                {user.address}
                              </p>
                              
                              <h4 className="text-sm font-semibold mt-2">Recent Activity</h4>
                              <div className="space-y-1">
                                {getUserVotingHistory(user.address).slice(0, 2).map((vote, i) => (
                                  <div key={i} className="text-xs">
                                    <span className={vote.vote === 'for' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                      {vote.vote === 'for' ? 'Voted For' : 'Voted Against'}
                                    </span>
                                    <span className="text-muted-foreground"> "{vote.proposal}" using {vote.nft}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={user.status} isBlacklisted={user.isBlacklisted} />
                      </TableCell>
                      <TableCell>{user.votesCast}</TableCell>
                      <TableCell>{user.nftCount}</TableCell>
                      <TableCell>{formatDate(user.lastActive)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              <span>View Voting History</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className={user.isBlacklisted ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              <span>{user.isBlacklisted ? "Remove from Blacklist" : "Blacklist User"}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
