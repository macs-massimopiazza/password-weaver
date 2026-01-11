import { motion } from "framer-motion";
import { GripVertical, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { PasswordEntry } from "@/data/passwordRooms";

interface PasswordCardProps {
  entry: PasswordEntry;
  index: number;
  totalCards: number;
  onDragStart: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

const PasswordCard = ({
  entry,
  index,
  totalCards,
  onDragStart,
  onDragEnd,
  isDragging,
}: PasswordCardProps) => {
  const [showHint, setShowHint] = useState(false);

  // Calculate position indicator color (red = weak side, green = strong side)
  const positionRatio = index / (totalCards - 1);
  
  return (
    <motion.div
      layout
      layoutId={entry.id}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileDrag={{ 
        scale: 1.05, 
        zIndex: 50,
        boxShadow: "0 0 30px hsl(180 100% 50% / 0.6)"
      }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative flex items-center gap-3 md:gap-4 p-3 md:p-4 
        bg-card cyber-border rounded-lg cursor-grab active:cursor-grabbing
        transition-colors duration-200
        ${isDragging ? 'cyber-glow-strong' : 'hover:cyber-glow'}
      `}
      style={{
        touchAction: "none",
      }}
    >
      {/* Position indicator bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg transition-colors duration-300"
        style={{
          background: `linear-gradient(
            to bottom,
            hsl(${120 * positionRatio}, 70%, 45%),
            hsl(${120 * positionRatio}, 70%, 35%)
          )`
        }}
      />

      {/* Drag handle */}
      <div className="text-muted-foreground hover:text-primary transition-colors pl-2">
        <GripVertical className="w-5 h-5" />
      </div>

      {/* Rank number */}
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold text-sm">
        {index + 1}
      </div>

      {/* Lock icon */}
      <Lock className="w-4 h-4 text-primary flex-shrink-0 hidden sm:block" />

      {/* Password display */}
      <div className="flex-1 min-w-0">
        <code className="text-sm md:text-base font-mono text-foreground break-all">
          {entry.password}
        </code>
      </div>

      {/* Hint toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowHint(!showHint);
        }}
        className="p-2 rounded-md bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title={showHint ? "Hide hint" : "Show hint"}
      >
        {showHint ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>

      {/* Hint tooltip */}
      {showHint && entry.hint && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-popover cyber-border rounded-md text-xs text-muted-foreground whitespace-nowrap z-10"
        >
          {entry.hint}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PasswordCard;
