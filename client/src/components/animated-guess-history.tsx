"use client"

import { motion, AnimatePresence } from "framer-motion"

interface AnimatedGuessHistoryProps {
  guessHistory: Array<{ notes: string[]; feedback: string[] }>
  currentGuess: string[]
  chordType: string
  gameOver?: boolean
  onRemoveNote?: (index: number) => void
}

export default function AnimatedGuessHistory({
  guessHistory,
  currentGuess,
  chordType,
  gameOver = false,
  onRemoveNote,
}: AnimatedGuessHistoryProps) {
  const getFeedbackColor = (feedback: string) => {
    switch (feedback) {
      case "green":
        return "bg-green-600 text-white"
      case "yellow":
        return "bg-yellow-500 text-white"
      case "gray":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  const noteCount = parseInt(chordType)

  return (
    <div className="space-y-2">
      {/* Past guesses */}
      <AnimatePresence>
        {guessHistory.map((guess, guessIndex) => (
          <motion.div
            key={guessIndex}
            className="flex gap-2 justify-center"
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 200,
            }}
          >
            {guess.notes.map((note, noteIndex) => (
              <motion.div
                key={`${guessIndex}-${noteIndex}`}
                className={`w-12 h-12 flex items-center justify-center rounded-md font-bold ${getFeedbackColor(guess.feedback[noteIndex])}`}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.3,
                  delay: noteIndex * 0.05,
                  type: "spring",
                  stiffness: 250,
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + noteIndex * 0.05 }}
                >
                  {note.replace(/[0-9]/g, "")}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Current guess row (hide when game is over) */}
      {!gameOver && (
        <div className="flex gap-2 justify-center">
          {Array.from({ length: noteCount }).map((_, i) => {
            const note = currentGuess[i] || ""
            return (
              <motion.div
                key={`current-${i}-${note}`}
                onClick={() => note && onRemoveNote?.(i)}
                className={`w-12 h-12 flex items-center justify-center rounded-md text-lg font-medium cursor-pointer ${
                  note ? "bg-gray-300 text-gray-800" : "bg-gray-200 text-gray-700"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{
                  duration: 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: note ? 1.1 : 1 }}
                whileTap={{ scale: 0.95 }}
              >
                {note.replace(/[0-9]/g, "")}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Empty rows (hide when game is over) */}
      {!gameOver &&
        Array.from({ length: Math.max(0, 5 - guessHistory.length - 1) }).map((_, index) => (
          <motion.div
            key={`empty-${index}`}
            className="flex gap-2 justify-center"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {Array.from({ length: noteCount }).map((_, cell) => (
              <motion.div
                key={`empty-${index}-${cell}`}
                className="w-12 h-12 border-2 border-gray-200 dark:border-gray-700 rounded-md"
                whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </motion.div>
        ))}
    </div>
  )
}
