import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { PasswordEntry } from "@/data/passwordRooms";

interface PasswordCardProps {
  entry: PasswordEntry;
  index: number;
  totalCards: number;
  showResult: boolean;
}

const PasswordCard = ({
  entry,
  index,
  totalCards,
  showResult,
}: PasswordCardProps) => {
  const [showHint, setShowHint] = useState(false);

  // Calculate position indicator color (red = weak side, green = strong side)
  const positionRatio = index / (totalCards - 1);
  const isCorrect = entry.strengthLevel === index + 1;
  
  return (
    <div className="relative flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-card cyber-border rounded-lg w-full">
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

      {/* Rank number */}
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold text-sm flex-shrink-0 ml-2">
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
        className="p-2 rounded-md bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        title={showHint ? "Hide hint" : "Show hint"}
      >
        {showHint ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>

      {/* Hint tooltip */}
      {showHint && entry.hint && (
        <div className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-popover cyber-border rounded-md text-xs text-muted-foreground whitespace-nowrap z-10">
          {entry.hint}
        </div>
      )}

      {/* Result indicator */}
      {showResult && (
        <div
          className={`
            absolute -right-2 -top-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-20
            ${isCorrect 
              ? 'bg-accent text-accent-foreground accent-glow' 
              : 'bg-destructive text-destructive-foreground danger-glow'
            }
          `}
        >
          {isCorrect ? '✓' : entry.strengthLevel}
        </div>
      )}
    </div>
  );
};

export default PasswordCard;
