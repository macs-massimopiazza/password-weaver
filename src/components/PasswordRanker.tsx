import { useState, useEffect, useCallback } from "react";
import { motion, Reorder } from "framer-motion";
import { Shield, ShieldAlert, ShieldCheck, RotateCcw, CheckCircle2, GripVertical } from "lucide-react";
import RoomSelector from "./RoomSelector";
import PasswordCard from "./PasswordCard";
import { passwordRooms, getShuffledPasswords, type PasswordEntry } from "@/data/passwordRooms";

const STORAGE_KEY = "password-ranker-state";

interface RoomState {
  passwords: PasswordEntry[];
  isChecked: boolean;
}

type StoredState = Record<string, RoomState>;

const PasswordRanker = () => {
  const [activeRoomId, setActiveRoomId] = useState(passwordRooms[0].id);
  const [roomStates, setRoomStates] = useState<StoredState>({});
  const [showResults, setShowResults] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StoredState;
        setRoomStates(parsed);
      } catch {
        console.error("Failed to parse saved state");
      }
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (Object.keys(roomStates).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(roomStates));
    }
  }, [roomStates]);

  // Get current room data
  const activeRoom = passwordRooms.find(r => r.id === activeRoomId) || passwordRooms[0];
  
  // Get or initialize current room state
  const currentState = roomStates[activeRoomId] || {
    passwords: getShuffledPasswords(activeRoom.passwords),
    isChecked: false,
  };

  // Initialize room state if not exists
  useEffect(() => {
    if (!roomStates[activeRoomId]) {
      setRoomStates(prev => ({
        ...prev,
        [activeRoomId]: {
          passwords: getShuffledPasswords(activeRoom.passwords),
          isChecked: false,
        },
      }));
    }
  }, [activeRoomId, roomStates, activeRoom.passwords]);

  const handleReorder = useCallback((newOrder: PasswordEntry[]) => {
    setRoomStates(prev => ({
      ...prev,
      [activeRoomId]: {
        ...prev[activeRoomId],
        passwords: newOrder,
        isChecked: false,
      },
    }));
    setShowResults(false);
  }, [activeRoomId]);

  const handleRoomChange = useCallback((roomId: string) => {
    setActiveRoomId(roomId);
    setShowResults(false);
  }, []);

  const handleReset = useCallback(() => {
    setRoomStates(prev => ({
      ...prev,
      [activeRoomId]: {
        passwords: getShuffledPasswords(activeRoom.passwords),
        isChecked: false,
      },
    }));
    setShowResults(false);
  }, [activeRoomId, activeRoom.passwords]);

  const handleCheck = useCallback(() => {
    setShowResults(true);
    setRoomStates(prev => ({
      ...prev,
      [activeRoomId]: {
        ...prev[activeRoomId],
        isChecked: true,
      },
    }));
  }, [activeRoomId]);

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    const passwords = currentState.passwords;
    
    passwords.forEach((pwd, index) => {
      const expectedLevel = index + 1;
      if (pwd.strengthLevel === expectedLevel) {
        correct++;
      }
    });
    
    return { correct, total: passwords.length };
  };

  const score = showResults ? calculateScore() : null;
  const isPerfect = score?.correct === score?.total;

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary text-glow" />
          <h1 className="text-2xl md:text-4xl font-bold text-foreground text-glow tracking-tight">
            Password Ranker
          </h1>
        </div>
        <p className="text-sm md:text-base text-muted-foreground font-mono">
          Drag passwords to order them from{" "}
          <span className="text-destructive">WEAKEST</span> to{" "}
          <span className="text-accent">STRONGEST</span>
        </p>
      </motion.header>

      {/* Room Selector */}
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4 md:mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs md:text-sm text-muted-foreground font-mono uppercase tracking-wider">
            Select Room:
          </span>
        </div>
        <RoomSelector
          rooms={passwordRooms}
          activeRoomId={activeRoomId}
          onRoomChange={handleRoomChange}
        />
      </motion.section>

      {/* Room Info */}
      <motion.div
        key={activeRoomId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 p-3 bg-card cyber-border rounded-lg"
      >
        <h2 className="text-lg md:text-xl font-bold text-foreground mb-1">
          {activeRoom.name}
        </h2>
        <p className="text-sm text-muted-foreground font-mono">
          {activeRoom.description}
        </p>
      </motion.div>

      {/* Scale Labels */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex items-center gap-2 text-destructive">
          <ShieldAlert className="w-4 h-4" />
          <span className="text-xs font-mono uppercase">Weak</span>
        </div>
        <div className="flex items-center gap-2 text-accent">
          <span className="text-xs font-mono uppercase">Strong</span>
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>

      {/* Password Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 mb-6"
      >
        <Reorder.Group
          axis="y"
          values={currentState.passwords}
          onReorder={handleReorder}
          className="space-y-3"
        >
          {currentState.passwords.map((entry, index) => (
            <Reorder.Item
              key={entry.id}
              value={entry}
              className="list-none cursor-grab active:cursor-grabbing"
              whileDrag={{ 
                scale: 1.02, 
                boxShadow: "0 0 30px hsl(180 100% 50% / 0.5)",
                zIndex: 50 
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center gap-2">
                <div className="text-muted-foreground hover:text-primary transition-colors cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-5 h-5" />
                </div>
                <PasswordCard
                  entry={entry}
                  index={index}
                  totalCards={currentState.passwords.length}
                  showResult={showResults}
                />
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </motion.div>

      {/* Score Display */}
      {showResults && score && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            mb-4 p-4 rounded-lg text-center cyber-border
            ${isPerfect ? 'bg-accent/20 accent-glow' : 'bg-secondary'}
          `}
        >
          {isPerfect ? (
            <div className="flex items-center justify-center gap-2 text-accent">
              <CheckCircle2 className="w-6 h-6" />
              <span className="text-lg font-bold">Perfect! All passwords ranked correctly!</span>
            </div>
          ) : (
            <p className="text-foreground">
              Score: <span className="font-bold text-primary">{score.correct}</span> / {score.total} correct
              <span className="block text-sm text-muted-foreground mt-1">
                Numbers on wrong cards show their correct position
              </span>
            </p>
          )}
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-3 justify-center"
      >
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-muted text-secondary-foreground rounded-lg font-mono text-sm transition-all cyber-border hover:cyber-glow"
        >
          <RotateCcw className="w-4 h-4" />
          Shuffle
        </button>
        
        <button
          onClick={handleCheck}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-mono text-sm font-bold transition-all cyber-glow-strong hover:scale-105"
        >
          <ShieldCheck className="w-4 h-4" />
          Check Order
        </button>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center text-xs text-muted-foreground font-mono"
      >
        <p>Drag cards to reorder • Click eye icon for hints • Progress saved automatically</p>
      </motion.footer>
    </div>
  );
};

export default PasswordRanker;
