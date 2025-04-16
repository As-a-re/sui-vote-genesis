import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, UserCheck, BarChart3 } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      className="glass-card p-6 feature-card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="mb-4 relative">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-sui glow transition-all duration-300 ${hovered ? 'scale-110' : ''}`}>
          <Icon size={24} className="text-white" />
        </div>
        <motion.div 
          className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#0096FF]/40 to-[#7B61FF]/40 blur-sm"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
      
      {hovered && (
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-sui"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Uncompromising Security",
      description: "Built on Sui blockchain with advanced cryptographic protection",
      delay: 0.1,
    },
    {
      icon: Eye,
      title: "Complete Transparency",
      description: "Every vote is recorded on the blockchain, publicly verifiable",
      delay: 0.2,
    },
    {
      icon: UserCheck,
      title: "Easy to Use",
      description: "Simple interface for voters, powerful tools for administrators",
      delay: 0.3,
    },
    {
      icon: BarChart3,
      title: "Instant Results",
      description: "View voting results in real-time as they're recorded on the blockchain",
      delay: 0.4,
    },
  ];

  return (
    <section id="features" className="py-20 relative features-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-audiowide">
            <span className="text-gradient">Why Choose</span> Our Voting Platform
          </h2>
          <p className="text-foreground/70">
            Our platform leverages Sui blockchain technology to provide a secure and transparent 
            voting experience that ensures every vote is counted accurately.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute left-0 bottom-0 w-1/4 hidden lg:block"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwdGVjaHxlbnwwfHx8fDE3MTgwNjc0MjV8MA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Team Collaboration"
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </motion.div>
    </section>
  );
};

export default Features;
