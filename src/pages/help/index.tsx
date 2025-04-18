import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, Check, AlertCircle, Key, Vote, ChevronRight, FileText, MessageCircle, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const categories = [
    { name: "Getting Started", icon: <Key className="h-5 w-5" /> },
    { name: "Voting Process", icon: <Vote className="h-5 w-5" /> },
    { name: "Results & Analytics", icon: <FileText className="h-5 w-5" /> },
    { name: "Wallet Connection", icon: <Wallet className="h-5 w-5" /> },
    { name: "Support", icon: <MessageCircle className="h-5 w-5" /> }
  ];

  const faqItems = [
    {
      id: "item-1",
      question: "How do I cast my vote?",
      answer: "To cast your vote, navigate to the \"Cast Vote\" page from the dashboard. Select your preferred option and click \"Submit Vote\". You'll receive a confirmation once your vote has been recorded on the Sui blockchain. The transaction will be visible in your wallet history immediately after casting your vote.",
      category: "Voting Process",
      popular: true
    },
    {
      id: "item-2",
      question: "How is my vote kept secure?",
      answer: "Your vote is encrypted and stored securely on the Sui blockchain. The system ensures that each eligible voter can only vote once per poll, and all votes are immutable once recorded. Our smart contracts have been audited by third-party security firms to ensure the integrity of the voting process.",
      category: "Getting Started",
      popular: true
    },
    {
      id: "item-3",
      question: "Can I change my vote after submitting?",
      answer: "Once a vote is submitted and recorded on the blockchain, it cannot be changed. Please review your selection carefully before submitting. This immutability is a core feature of blockchain technology that ensures the integrity of the voting process.",
      category: "Voting Process",
      popular: false
    },
    {
      id: "item-4",
      question: "How can I view voting results?",
      answer: "Results are available on the \"Results\" page once a poll has ended. You can view both current and historical results, with various visualization options available. All results are calculated directly from blockchain data, ensuring complete transparency and verifiability.",
      category: "Results & Analytics",
      popular: true
    },
    {
      id: "item-5",
      question: "What wallet types are supported?",
      answer: "Our platform supports multiple Sui-compatible wallets including Sui Wallet, Ethos Wallet, and other standard Web3 wallets that support the Sui blockchain. To connect, click the 'Connect Wallet' button in the top right corner of any page.",
      category: "Wallet Connection",
      popular: false
    },
    {
      id: "item-6",
      question: "How do I verify my identity for voting?",
      answer: "Identity verification depends on the specific requirements of each vote. Some votes may require KYC verification, while others may only require a connected wallet. Check the information section of each voting event for specific verification requirements.",
      category: "Getting Started",
      popular: false
    },
    {
      id: "item-7",
      question: "What happens if there's a network issue during voting?",
      answer: "If you experience network issues during voting, your vote will not be submitted until the transaction is successfully recorded on the blockchain. You can check your wallet's transaction history to verify if your vote was recorded. If not, you can attempt to vote again when the connection is restored.",
      category: "Support",
      popular: false
    }
  ];

  const filteredFaqs = searchQuery
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqItems;

  const popularFaqs = faqItems.filter(item => item.popular);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div variants={fadeIn}>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                  Help Center & FAQ
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Find answers to common questions about our Web3 voting system
                  built on the Sui blockchain.
                </p>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                transition={{ delay: 0.2 }}
                className="mt-8 relative max-w-xl mx-auto"
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for questions..."
                  className="pl-10 py-6 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>
            </div>
            
            {!searchQuery && (
              <motion.div 
                variants={fadeIn} 
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-lg font-medium mb-4">Popular Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                    >
                      <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-3">
                            {category.icon}
                          </div>
                          <h3 className="font-medium text-sm">{category.name}</h3>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {!searchQuery && (
              <motion.div 
                variants={fadeIn} 
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-lg font-medium mb-4">Popular Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularFaqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                    >
                      <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1">
                            <HelpCircle className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {faq.question}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {faq.answer}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            <motion.div 
              variants={fadeIn} 
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                  <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? `Search results for "${searchQuery}"` : "Find answers to common questions about our platform"}
                  </p>
                </div>
                
                <div className="p-6">
                  {filteredFaqs.length > 0 ? (
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem 
                          key={faq.id} 
                          value={faq.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 font-medium text-left data-[state=open]:bg-blue-50 data-[state=open]:dark:bg-blue-900/20 hover:no-underline">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <HelpCircle className="h-4 w-4" />
                              </div>
                              {faq.question}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex-shrink-0 mt-1">
                                <Check className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-muted-foreground">{faq.answer}</p>
                                <div className="flex items-center mt-4">
                                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                    {faq.category}
                                  </span>
                                  <div className="ml-auto">
                                    <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400 p-0 h-auto text-xs">
                                      Was this helpful?
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mx-auto w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-3">
                        <AlertCircle className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-medium">No results found</h3>
                      <p className="text-muted-foreground mt-2">Try adjusting your search query</p>
                    </div>
                  )}
                </div>
              </Card>
              
              <motion.div 
                variants={fadeIn} 
                transition={{ delay: 0.6 }}
                className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-8 text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-semibold">Still have questions?</h3>
                      <p className="mt-2 text-blue-100">Our support team is here to help with any additional questions</p>
                    </div>
                    <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
