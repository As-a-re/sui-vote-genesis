
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  XCircle,
  PlusCircle,
  AlertTriangle,
  ShieldAlert,
  Clock,
  User,
  Edit,
  UserPlus,
  RefreshCw,
  Lock,
  Eye
} from "lucide-react";

type Activity = {
  id: string;
  type: string;
  actor: string;
  target?: string;
  time: string;
  status?: "success" | "failed" | "warning";
};

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: "act-001",
    type: "proposal_created",
    actor: "0x7ae...f3d2",
    target: "Treasury Fund Allocation",
    time: "10 minutes ago",
    status: "success"
  },
  {
    id: "act-002",
    type: "system_pause",
    actor: "0x8bc...a1e5",
    time: "1 hour ago",
    status: "warning"
  },
  {
    id: "act-003",
    type: "vote_cast",
    actor: "0x9dc...b4f3",
    target: "Protocol Upgrade v2.5",
    time: "2 hours ago",
    status: "success"
  },
  {
    id: "act-004",
    type: "proposal_delisted",
    actor: "0x3fa...c8d9",
    target: "Reduce Validator Requirements",
    time: "3 hours ago",
    status: "success"
  },
  {
    id: "act-005",
    type: "deadline_extended",
    actor: "0x5eb...a7c2",
    target: "Increase Gas Fee Allocation",
    time: "4 hours ago",
    status: "success"
  },
  {
    id: "act-006",
    type: "admin_added",
    actor: "0x7ae...f3d2",
    target: "0xabc...d4e5",
    time: "1 day ago",
    status: "success"
  },
  {
    id: "act-007",
    type: "system_resume",
    actor: "0x8bc...a1e5",
    time: "1 day ago",
    status: "success"
  }
];

// Activity icon component
const ActivityIcon = ({ type, status }: { type: string; status?: string }) => {
  const iconMap = {
    proposal_created: PlusCircle,
    proposal_delisted: XCircle,
    vote_cast: Eye,
    system_pause: AlertTriangle,
    system_resume: RefreshCw,
    deadline_extended: Clock,
    admin_added: UserPlus,
    config_updated: Edit,
    security_alert: ShieldAlert,
    user_blacklisted: User,
    admin_login: Lock,
    default: CheckCircle
  };
  
  const Icon = iconMap[type] || iconMap.default;
  
  const bgColorMap = {
    success: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    failed: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    default: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
  };
  
  const bgColor = status ? bgColorMap[status] : bgColorMap.default;
  
  return (
    <div className={`p-2 rounded-full ${bgColor}`}>
      <Icon className="h-4 w-4" />
    </div>
  );
};

// Format activity message
const formatActivityMessage = (activity: Activity) => {
  const messages = {
    proposal_created: () => `created proposal "${activity.target}"`,
    proposal_delisted: () => `delisted proposal "${activity.target}"`,
    vote_cast: () => `cast a vote on "${activity.target}"`,
    system_pause: () => `initiated emergency system pause`,
    system_resume: () => `resumed system from emergency pause`,
    deadline_extended: () => `extended deadline for "${activity.target}"`,
    admin_added: () => `added ${activity.target} as admin`,
    config_updated: () => `updated system configuration`,
    security_alert: () => `triggered a security alert`,
    user_blacklisted: () => `blacklisted user ${activity.target}`,
    admin_login: () => `logged in as admin`,
    default: () => "performed an action"
  };
  
  const getMessage = messages[activity.type] || messages.default;
  return getMessage();
};

const ActivityTimeline = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {mockActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex gap-3"
            >
              <ActivityIcon type={activity.type} status={activity.status} />
              <div className="space-y-0.5 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-sm">{activity.actor}</span>
                    <span className="text-muted-foreground text-sm"> {formatActivityMessage(activity)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
