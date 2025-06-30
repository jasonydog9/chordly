"use client"

import { motion } from "framer-motion"
import { cn } from "../lib/utils.ts"

interface AnimatedPianoProps {
  onKeyPress: (note: string) => void
}

export default function AnimatedPiano({ onKeyPress }: AnimatedPianoProps) {
  const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"]
  const blackKeys = ["C#", "D#", "F#", "G#", "A#"]

  const blackKeyPositions = {
    "C#": 1,
    "D#": 2,
    "F#": 4,
    "G#": 5,
    "A#": 6,
  }

  const handleKeyPress = (note: string) => {
    onKeyPress(note)
  }

  return (
    <motion.div
      className="relative w-full h-48 mb-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* White keys */}
      <div className="flex h-full">
        {whiteKeys.map((note, index) => (
          <motion.div
            key={note}
            onClick={() => handleKeyPress(note)}
            className="flex-1 border border-gray-300 bg-white hover:bg-gray-100 active:bg-gray-200 
                      rounded-b-md cursor-pointer flex items-end justify-center pb-2 
                      transition-colors duration-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 2 }}
          >
            <span className="text-sm font-medium text-gray-700">{note}</span>
          </motion.div>
        ))}
      </div>

      {/* Black keys */}
      <div className="absolute top-0 left-0 w-full flex">
        {blackKeys.map((note, index) => {
          const position = blackKeyPositions[note as keyof typeof blackKeyPositions]
          return (
            <motion.div
              key={note}
              onClick={() => handleKeyPress(note)}
              className={cn(
                "absolute h-28 w-[10%] bg-gray-800 hover:bg-gray-700 active:bg-gray-600 rounded-b-md cursor-pointer",
                "flex items-end justify-center pb-2 transition-colors duration-100",
              )}
              style={{
                left: `${position * (100 / 7) - 5}%`,
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95, y: 3 }}
            >
              <span className="text-xs font-medium text-white">{note}</span>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
