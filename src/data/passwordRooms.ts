// Password data configuration - Edit this file to change passwords for each room
// Passwords are ordered by ACTUAL strength (for reference), but will be shuffled in the game

export interface PasswordEntry {
  id: string;
  password: string;
  strengthLevel: number; // 1 = weakest, higher = stronger
  hint?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  passwords: PasswordEntry[];
}

export const passwordRooms: Room[] = [
  {
    id: "room-1",
    name: "Beginner",
    description: "Common weak vs strong patterns",
    passwords: [
      { id: "1-1", password: "123456", strengthLevel: 1, hint: "Most common password" },
      { id: "1-2", password: "password", strengthLevel: 2, hint: "Dictionary word" },
      { id: "1-3", password: "qwerty123", strengthLevel: 3, hint: "Keyboard pattern + numbers" },
      { id: "1-4", password: "MyDog2019!", strengthLevel: 4, hint: "Personal info + year" },
      { id: "1-5", password: "Tr0ub4dor&3", strengthLevel: 5, hint: "Leetspeak substitution" },
      { id: "1-6", password: "correct-horse-battery-staple", strengthLevel: 6, hint: "Passphrase" },
    ],
  },
  {
    id: "room-2",
    name: "Numbers Game",
    description: "Numeric patterns and dates",
    passwords: [
      { id: "2-1", password: "000000", strengthLevel: 1, hint: "Repeated zeros" },
      { id: "2-2", password: "123123", strengthLevel: 2, hint: "Repeated sequence" },
      { id: "2-3", password: "19851985", strengthLevel: 3, hint: "Birth year repeated" },
      { id: "2-4", password: "07041776", strengthLevel: 4, hint: "Famous date" },
      { id: "2-5", password: "8675309!", strengthLevel: 5, hint: "Pop culture number" },
      { id: "2-6", password: "73@Kx9#2mN", strengthLevel: 6, hint: "Random with symbols" },
    ],
  },
  {
    id: "room-3",
    name: "Personal Info",
    description: "Names and personal data risks",
    passwords: [
      { id: "3-1", password: "john", strengthLevel: 1, hint: "Just a first name" },
      { id: "3-2", password: "john1990", strengthLevel: 2, hint: "Name + birth year" },
      { id: "3-3", password: "JohnSmith!", strengthLevel: 3, hint: "Full name + symbol" },
      { id: "3-4", password: "J0hn$m1th#", strengthLevel: 4, hint: "Leetspeak name" },
      { id: "3-5", password: "xK9#mLp2$vR", strengthLevel: 5, hint: "Random characters" },
      { id: "3-6", password: "purple-elephant-dancing-moon", strengthLevel: 6, hint: "Random word phrase" },
    ],
  },
  {
    id: "room-4",
    name: "Keyboard Walks",
    description: "Keyboard pattern vulnerabilities",
    passwords: [
      { id: "4-1", password: "qwerty", strengthLevel: 1, hint: "Top row walk" },
      { id: "4-2", password: "asdfgh", strengthLevel: 2, hint: "Home row walk" },
      { id: "4-3", password: "zxcvbn", strengthLevel: 3, hint: "Bottom row walk" },
      { id: "4-4", password: "1qaz2wsx", strengthLevel: 4, hint: "Diagonal pattern" },
      { id: "4-5", password: "Qwerty!@#$", strengthLevel: 5, hint: "Pattern + shift symbols" },
      { id: "4-6", password: "m7$Kp2@xNq4", strengthLevel: 6, hint: "No pattern - random" },
    ],
  },
  {
    id: "room-5",
    name: "Symbol Tricks",
    description: "Are symbols always better?",
    passwords: [
      { id: "5-1", password: "pass!", strengthLevel: 1, hint: "Short + one symbol" },
      { id: "5-2", password: "p@ssword", strengthLevel: 2, hint: "Common substitution" },
      { id: "5-3", password: "P@$$w0rd!", strengthLevel: 3, hint: "Multiple substitutions" },
      { id: "5-4", password: "!@#$%^&*()", strengthLevel: 4, hint: "Only shift-numbers" },
      { id: "5-5", password: "Kx7@mN2#pL", strengthLevel: 5, hint: "Mixed random" },
      { id: "5-6", password: "quantum-pizza-nebula-42!", strengthLevel: 6, hint: "Phrase + random ending" },
    ],
  },
  {
    id: "room-6",
    name: "Length Matters",
    description: "Short vs long passwords",
    passwords: [
      { id: "6-1", password: "aB3!", strengthLevel: 1, hint: "4 chars - complex but short" },
      { id: "6-2", password: "Secret1!", strengthLevel: 2, hint: "8 chars - mixed" },
      { id: "6-3", password: "MySecretPass1!", strengthLevel: 3, hint: "14 chars - readable" },
      { id: "6-4", password: "aaaaaaaaaaaaaaaa", strengthLevel: 4, hint: "16 chars - but repeated" },
      { id: "6-5", password: "Kx7mN2pL9qR4wE1y", strengthLevel: 5, hint: "16 random alphanumeric" },
      { id: "6-6", password: "the-quick-brown-fox-jumps-over", strengthLevel: 6, hint: "30 char phrase" },
    ],
  },
  {
    id: "room-7",
    name: "Pop Culture",
    description: "Movies, shows, and trends",
    passwords: [
      { id: "7-1", password: "starwars", strengthLevel: 1, hint: "Popular franchise" },
      { id: "7-2", password: "batman123", strengthLevel: 2, hint: "Superhero + numbers" },
      { id: "7-3", password: "GameOfThrones!", strengthLevel: 3, hint: "TV show + symbol" },
      { id: "7-4", password: "M@yTh3F0rc3", strengthLevel: 4, hint: "Leetspeak movie quote" },
      { id: "7-5", password: "Kx9#dragon-Lm2", strengthLevel: 5, hint: "Random + word + random" },
      { id: "7-6", password: "obscure-velvet-paradox-17#", strengthLevel: 6, hint: "Unrelated word mix" },
    ],
  },
  {
    id: "room-8",
    name: "Company Policies",
    description: "Meeting minimum requirements",
    passwords: [
      { id: "8-1", password: "Aa1!", strengthLevel: 1, hint: "Minimum chars - meets policy" },
      { id: "8-2", password: "Password1!", strengthLevel: 2, hint: "Classic policy bypass" },
      { id: "8-3", password: "January2024!", strengthLevel: 3, hint: "Month + year - expires" },
      { id: "8-4", password: "Company@2024", strengthLevel: 4, hint: "Predictable format" },
      { id: "8-5", password: "Tr0ub4dor&3x2!", strengthLevel: 5, hint: "Complex but memorable" },
      { id: "8-6", password: "7kX#mPq2$nRw9@Lv", strengthLevel: 6, hint: "True random 16 chars" },
    ],
  },
  {
    id: "room-9",
    name: "Multilingual",
    description: "Languages and character sets",
    passwords: [
      { id: "9-1", password: "bonjour", strengthLevel: 1, hint: "French word" },
      { id: "9-2", password: "hola123", strengthLevel: 2, hint: "Spanish + numbers" },
      { id: "9-3", password: "Guten@Tag!", strengthLevel: 3, hint: "German with symbols" },
      { id: "9-4", password: "こんにちは123", strengthLevel: 4, hint: "Japanese hiragana" },
      { id: "9-5", password: "Здравствуйте!", strengthLevel: 5, hint: "Russian cyrillic" },
      { id: "9-6", password: "混合-Kx7-मिश्र-42!", strengthLevel: 6, hint: "Multi-script chaos" },
    ],
  },
  {
    id: "room-10",
    name: "Expert Mode",
    description: "Subtle strength differences",
    passwords: [
      { id: "10-1", password: "admin", strengthLevel: 1, hint: "Default credential" },
      { id: "10-2", password: "letmein!!", strengthLevel: 2, hint: "Phrase + repeated symbol" },
      { id: "10-3", password: "Sunshine@Summer2023", strengthLevel: 3, hint: "Long but predictable" },
      { id: "10-4", password: "dQw4w9WgXcQ", strengthLevel: 4, hint: "Looks random but famous" },
      { id: "10-5", password: "xK9#mLp2$vR7@nQ", strengthLevel: 5, hint: "15 char true random" },
      { id: "10-6", password: "correct-horse-battery-staple-42!", strengthLevel: 6, hint: "Long passphrase + extras" },
    ],
  },
];

export const getShuffledPasswords = (passwords: PasswordEntry[]): PasswordEntry[] => {
  const shuffled = [...passwords];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
