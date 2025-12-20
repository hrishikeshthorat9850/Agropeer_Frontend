"use client";
import { motion } from "framer-motion";
import { FaCloudSun, FaChartLine, FaAward } from "react-icons/fa";
import { useRouter } from "next/navigation";
const QuickActionCards = () => {
  const actions = [
    {
      title: "View Weather",
      description: "Get 7-day weather forecast for your farm",
      icon: FaCloudSun,
      gradient: "from-sky-400 to-sky-600",
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600",
      pulseColor: "bg-sky-400",
    },
    {
      title: "View Prices",
      description: "Check latest market prices for crops",
      icon: FaChartLine,
      gradient: "from-sunset-400 to-sunset-600",
      bgColor: "bg-sunset-100",
      iconColor: "text-sunset-600",
      pulseColor: "bg-sunset-400",
    },
    {
      title: "Get Tips",
      description: "Expert farming advice and techniques",
      icon: FaAward,
      gradient: "from-emerald-400 to-teal-600",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      pulseColor: "bg-emerald-400",
    },
  ];

  const router = useRouter();
  const handleQuickActionButton = (title) => {
    switch(title) {
      case "View Weather":
        console.log("Weather button clicked");
        router.push("/weather");
        break;
      case "View Prices":
        router.push("/market-prices");
        console.log("Prices button clicked");
        break;
      case "Get Tips":
        router.push("/explore")
        console.log("Tips button clicked");
        break;
      default:
        console.log("Unknown action");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      {actions.map((action, index) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
          className="relative group"
        >
          <div className="farm-card p-6 h-full flex flex-col">
            <div className="text-center mb-4">
              <div className={`w-16 h-16 ${action.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className={`w-8 h-8 ${action.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-farm-900 mb-2">
                {action.title}
              </h3>
              <p className="text-farm-800 text-sm font-medium flex-grow">
                {action.description}
              </p>
            </div>
            
            <div className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>{handleQuickActionButton(action.title)}}
                className={`w-full bg-gradient-to-r ${action.gradient} text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
              >
                <span className="relative z-10">{action.title}</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                {/* Pulsing indicator */}
                <div className="absolute top-2 right-2">
                  <div className={`w-2 h-2 ${action.pulseColor} rounded-full animate-pulse`}></div>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuickActionCards;
