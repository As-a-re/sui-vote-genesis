
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UserX, 
  UserCheck, 
  Filter, 
  Download, 
  Users,
  History,
  Search,
  MoreHorizontal
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminNavbar from "@/components/AdminNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// User management component
const UserManagement = ({ users }) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = users.filter(user => {
    // Apply status filter
    if (filter !== 'all' && user.status !== filter) return false;
    
    // Apply search query filter
    if (searchQuery && !user.address.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            All Users
          </Button>
          <Button 
            variant={filter === 'active' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button 
            variant={filter === 'blacklisted' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setFilter('blacklisted')}
          >
            Blacklisted
          </Button>
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search wallets..."
              className="pl-9 h-9 w-full sm:w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Votes Cast</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>NFT Proofs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.address}>
                <TableCell className="font-mono text-xs">{user.address}</TableCell>
                <TableCell>{user.votesCast}</TableCell>
                <TableCell>{user.lastActivity}</TableCell>
                <TableCell>{user.nftProofs}</TableCell>
                <TableCell>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : ''}
                    ${user.status === 'blacklisted' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : ''}
                  `}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <History className="h-3.5 w-3.5 mr-1" />
                          History
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>User Voting History</DialogTitle>
                          <DialogDescription>
                            Complete voting history for {user.address.slice(0, 6)}...{user.address.slice(-4)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Proposal</TableHead>
                                  <TableHead>Vote</TableHead>
                                  <TableHead>Time</TableHead>
                                  <TableHead>NFT Proof</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {user.votingHistory ? user.votingHistory.map((vote, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{vote.proposal}</TableCell>
                                    <TableCell>{vote.vote}</TableCell>
                                    <TableCell>{vote.time}</TableCell>
                                    <TableCell className="font-mono text-xs">{vote.nftProof}</TableCell>
                                  </TableRow>
                                )) : (
                                  <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground py-4">
                                      No voting history available
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export History
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {user.status === 'active' ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <UserX className="h-3.5 w-3.5 mr-1" />
                            Blacklist
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Blacklist</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to blacklist this user? They will no longer be able to vote on proposals.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive">Blacklist</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-3.5 w-3.5 mr-1" />
                        Unblacklist
                      </Button>
                    )}
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

const AdminUsers = () => {
  // Mock user data with voting history
  const [users] = useState([
    { 
      address: "0x7a16ff8270133f063aab39c125436c7608b1946c", 
      votesCast: 12, 
      lastActivity: "2025-04-18", 
      nftProofs: 8,
      status: "active",
      votingHistory: [
        { proposal: "Community Treasury Fund", vote: "For", time: "2025-04-18 14:30", nftProof: "0xa1b2c3..." },
        { proposal: "Governance Framework Update", vote: "Against", time: "2025-04-15 09:22", nftProof: "0xd4e5f6..." }
      ]
    },
    { 
      address: "0x3d2935f68a2b689d7c6e2661f575bcfa7ae5a48a", 
      votesCast: 8, 
      lastActivity: "2025-04-17", 
      nftProofs: 4,
      status: "active",
      votingHistory: [
        { proposal: "Partner Integration Proposal", vote: "For", time: "2025-04-17 11:15", nftProof: "0x123456..." }
      ]
    },
    { 
      address: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359", 
      votesCast: 3, 
      lastActivity: "2025-04-12", 
      nftProofs: 2,
      status: "blacklisted" 
    },
    { 
      address: "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2", 
      votesCast: 16, 
      lastActivity: "2025-04-18", 
      nftProofs: 10,
      status: "active" 
    },
    { 
      address: "0x6b175474e89094c44da98b954eedeac495271d0f", 
      votesCast: 5, 
      lastActivity: "2025-04-16", 
      nftProofs: 3,
      status: "active" 
    },
  ]);

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
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground mt-1">Monitor and manage all users interacting with the voting system</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900">
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-3xl font-bold mt-1">{users.length}</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                    <p className="text-3xl font-bold mt-1">{users.filter(u => u.status === 'active').length}</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                    <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Blacklisted</p>
                    <p className="text-3xl font-bold mt-1">{users.filter(u => u.status === 'blacklisted').length}</p>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                    <UserX className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Tabs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">User Management</CardTitle>
              <CardDescription>View and manage all users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all-users">
                <TabsList className="mb-4">
                  <TabsTrigger value="all-users">All Users</TabsTrigger>
                  <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
                  <TabsTrigger value="nft-verification">NFT Verification</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all-users">
                  <UserManagement users={users} />
                </TabsContent>
                
                <TabsContent value="recent-activity">
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Proposal</TableHead>
                            <TableHead>Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-mono text-xs">0x7a16ff8270...</TableCell>
                            <TableCell>Voted For</TableCell>
                            <TableCell>Community Treasury Fund</TableCell>
                            <TableCell>2025-04-18 14:30</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-xs">0x3d2935f68a...</TableCell>
                            <TableCell>Voted For</TableCell>
                            <TableCell>Partner Integration Proposal</TableCell>
                            <TableCell>2025-04-17 11:15</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-xs">0x7a16ff8270...</TableCell>
                            <TableCell>Voted Against</TableCell>
                            <TableCell>Governance Framework Update</TableCell>
                            <TableCell>2025-04-15 09:22</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="nft-verification">
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>NFT Collection</TableHead>
                            <TableHead>Token ID</TableHead>
                            <TableHead>Verification Time</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-mono text-xs">0x7a16ff8270...</TableCell>
                            <TableCell>SuiVote Genesis</TableCell>
                            <TableCell>#1234</TableCell>
                            <TableCell>2025-04-10 09:45</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                Verified
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-xs">0x3d2935f68a...</TableCell>
                            <TableCell>SuiVote Genesis</TableCell>
                            <TableCell>#0987</TableCell>
                            <TableCell>2025-04-08 14:22</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                Verified
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-mono text-xs">0x9c22ff5f21...</TableCell>
                            <TableCell>SuiVote Genesis</TableCell>
                            <TableCell>#0456</TableCell>
                            <TableCell>2025-04-05 11:18</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                Verified
                              </span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsers;
