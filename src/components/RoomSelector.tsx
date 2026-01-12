import { motion } from "framer-motion";
import { Folder, FolderOpen, CheckCircle2 } from "lucide-react";
import type { Room } from "@/data/passwordRooms";

interface RoomSelectorProps {
  rooms: Room[];
  activeRoomId: string;
  onRoomChange: (roomId: string) => void;
  completedRooms: string[];
}

const RoomSelector = ({ rooms, activeRoomId, onRoomChange, completedRooms }: RoomSelectorProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max px-1">
        {rooms.map((room, index) => {
          const isActive = room.id === activeRoomId;
          const isCompleted = completedRooms.includes(room.id);
          
          return (
            <motion.button
              key={room.id}
              onClick={() => onRoomChange(room.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg
                font-mono text-xs md:text-sm transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-primary-foreground cyber-glow-strong' 
                  : isCompleted
                    ? 'bg-accent/20 text-accent border border-accent/50 hover:bg-accent/30'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted cyber-border hover:cyber-glow'
                }
              `}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              ) : isActive ? (
                <FolderOpen className="w-4 h-4" />
              ) : (
                <Folder className="w-4 h-4" />
              )}
              
              <span className="font-bold">{String(index + 1).padStart(2, '0')}</span>
              
              <span className="hidden md:inline text-xs opacity-80">
                {room.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                  style={{ boxShadow: "0 0 10px hsl(180 100% 50%)" }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default RoomSelector;
