
import { motion } from "framer-motion";
import { ArrowDown, Info } from "lucide-react";

// Animation floating node component
const Node = ({ delay = 0, x = 0, y = 0, size = 20 }) => (
  <motion.div
    className="absolute bg-gradient-sui rounded-full glow"
    style={{ 
      width: size, 
      height: size, 
      left: `calc(50% + ${x}px)`, 
      top: `calc(50% + ${y}px)` 
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.1, 1],
      y: [0, -15, 0]
    }}
    transition={{ 
      duration: 3, 
      delay: delay, 
      repeat: Infinity,
      repeatType: "reverse"
    }}
  />
);

// Connection line component
const ConnectionLine = ({ startNode, endNode, delay = 0 }) => (
  <motion.div
    className="absolute bg-gradient-to-r from-[#0096FF]/30 to-[#7B61FF]/30 h-[1px]"
    style={{
      left: `calc(50% + ${startNode.x}px)`,
      top: `calc(50% + ${startNode.y}px)`,
      width: `${Math.sqrt(Math.pow(endNode.x - startNode.x, 2) + Math.pow(endNode.y - startNode.y, 2))}px`,
      transformOrigin: "left center",
      transform: `rotate(${Math.atan2(endNode.y - startNode.y, endNode.x - startNode.x) * (180 / Math.PI)}deg)`
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.8, 0] }}
    transition={{ duration: 3, delay: delay, repeat: Infinity }}
  />
);

const nodes = [
  { x: -100, y: -80, size: 16, delay: 0 },
  { x: 120, y: -120, size: 24, delay: 0.5 },
  { x: 80, y: 100, size: 20, delay: 1 },
  { x: -150, y: 50, size: 18, delay: 1.5 },
  { x: 0, y: 150, size: 22, delay: 2 },
  { x: -80, y: -180, size: 16, delay: 2.5 }
];

const connections = [
  { start: 0, end: 1, delay: 0.2 },
  { start: 1, end: 2, delay: 0.7 },
  { start: 2, end: 3, delay: 1.2 },
  { start: 3, end: 0, delay: 1.7 },
  { start: 4, end: 2, delay: 2.2 },
  { start: 0, end: 5, delay: 2.7 },
];

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-16 bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 pt-20 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <motion.h1 
              className="text-title-large mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-white">YOUR VOICE,</span>
              <br />
              <span className="text-gradient">ON-CHAIN.</span>
            </motion.h1>
            
            <motion.p 
              className="font-mono text-lg md:text-xl text-white/70 mb-4 uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Secure · Transparent · Decentralized
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="text-command hover:bg-white hover:text-black transition-colors duration-300 px-6 py-3">
                <span>CONNECT_WALLET</span>
              </button>
              
              <button className="text-command bg-transparent border border-white hover:bg-white hover:text-black transition-colors duration-300 px-6 py-3">
                <span>LEARN_MORE</span>
              </button>
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img 
              src="/lovable-uploads/24b6c8dc-d145-4ddd-aeba-b74109a68d2d.png" 
              alt="Voting robot mascot" 
              className="w-full h-auto"
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <a 
            href="#features" 
            className="text-white/50 hover:text-white flex flex-col items-center font-mono uppercase tracking-wider"
          >
            <span className="text-sm mb-2">Discover_More</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </a>
        </motion.div>
      </div>
      
      {/* Repeated text marquee */}
      <div className="absolute bottom-0 w-full overflow-hidden py-4 bg-black">
        <div className="text-repeated-marquee animate-flow">
          SECURE VOTING X BLOCKCHAIN VERIFIED X SUI POWERED X SECURE VOTING X BLOCKCHAIN VERIFIED X SUI POWERED X
          SECURE VOTING X BLOCKCHAIN VERIFIED X SUI POWERED X SECURE VOTING X BLOCKCHAIN VERIFIED X SUI POWERED X
        </div>
      </div>
    </section>
  );
};

export default Hero;

