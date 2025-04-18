
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Help & FAQ</h1>
        
        <Card className="p-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I cast my vote?</AccordionTrigger>
              <AccordionContent>
                To cast your vote, navigate to the "Cast Vote" page from the dashboard. 
                Select your preferred option and click "Submit Vote". You'll receive a 
                confirmation once your vote has been recorded.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How is my vote kept secure?</AccordionTrigger>
              <AccordionContent>
                Your vote is encrypted and stored securely on the Sui blockchain. 
                The system ensures that each eligible voter can only vote once per poll, 
                and all votes are immutable once recorded.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I change my vote after submitting?</AccordionTrigger>
              <AccordionContent>
                Once a vote is submitted and recorded on the blockchain, it cannot be 
                changed. Please review your selection carefully before submitting.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How can I view voting results?</AccordionTrigger>
              <AccordionContent>
                Results are available on the "Results" page once a poll has ended. 
                You can view both current and historical results, with various 
                visualization options available.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </motion.div>
    </div>
  );
};

export default FAQPage;
