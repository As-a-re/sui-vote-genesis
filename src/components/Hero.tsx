import { motion } from "framer-motion";
import { ArrowDown, Wallet, Info } from "lucide-react";

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
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-16 hero-gradient">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 pt-20 pb-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-audiowide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gradient">Decentralized Voting</span>
            <br />
            <span>Powered by <span className="text-gradient-reverse">Sui Blockchain</span></span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-foreground/70 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Secure, transparent, and immutable voting system. 
            Every vote counts and every transaction is verifiable.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="primary-button flex items-center justify-center space-x-2">
              <Wallet size={18} />
              <span>Connect Wallet</span>
            </button>
            
            <button className="secondary-button flex items-center justify-center space-x-2">
              <Info size={18} />
              <span>Learn More</span>
            </button>
          </motion.div>
        </div>
        
        {/* Animated blockchain visualization */}
        <motion.div 
          className="relative h-[300px] md:h-[400px] w-full max-w-2xl mx-auto mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Nodes */}
          {nodes.map((node, index) => (
            <Node 
              key={`node-${index}`} 
              x={node.x} 
              y={node.y} 
              size={node.size} 
              delay={node.delay}
            />
          ))}
          
          {/* Connections */}
          {connections.map((conn, index) => (
            <ConnectionLine 
              key={`connection-${index}`} 
              startNode={nodes[conn.start]} 
              endNode={nodes[conn.end]}
              delay={conn.delay}
            />
          ))}
          
          {/* Central Node */}
          <motion.div 
            className="absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 bg-gradient-sui rounded-full flex items-center justify-center shadow-lg glow"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 10px 2px rgba(101, 85, 255, 0.3)",
                "0 0 20px 6px rgba(101, 85, 255, 0.6)",
                "0 0 10px 2px rgba(101, 85, 255, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary font-bold text-xs">
              SUI
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <a 
            href="#features" 
            className="text-foreground/50 hover:text-foreground flex flex-col items-center"
          >
            <span className="text-sm mb-2">Discover More</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </a>
        </motion.div>
      </div>
      
      {/* 3D Floating Image similar to foreverbots.io */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 hidden lg:block"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://unsplash.com/photos/a-sign-that-says-every-vote-counts-on-it-bO3hmqp2C78"
          alt="Blockchain Voting"
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
