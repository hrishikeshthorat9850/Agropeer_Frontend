"use client";
import { 
  FaThLarge, 
  FaSeedling, 
  FaChartLine, 
  FaWarehouse, 
  FaTractor, 
  FaTint, 
  FaChartBar 
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const menuItems = [
  { id: "Dashboard", icon: FaThLarge, label: "Dashboard", path: "/smart-farm" },
  { id: "Crop-Growth", icon: FaSeedling, label: "Crop-Growth", path: "/smart-farm/crop-growth" },
  { id: "Production", icon: FaChartLine, label: "Production", path: "/smart-farm/production" },
  { id: "Storage", icon: FaWarehouse, label: "Storage", path: "/smart-farm/storage" },
  { id: "Machinery", icon: FaTractor, label: "Machinery", path: "/smart-farm/machinery" },
  { id: "Irrigation", icon: FaTint, label: "Irrigation", path: "/smart-farm/irrigation" },
  { id: "Analytics", icon: FaChartBar, label: "Analytics", path: "/smart-farm/analytics" },
];

export default function SmartFarmSidebar({ activeView, setActiveView }) {
  const router = useRouter();

  const handleNavigation = (item) => {
    setActiveView(item.id);
    // In a real app, you would navigate to different pages
    // router.push(item.path);
    console.log(`Navigating to ${item.label}`);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white min-h-screen shadow-2xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">
          SMART FARM
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg transform scale-105"
                    : "text-green-100 hover:bg-green-700 hover:translate-x-1"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-green-200"}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

