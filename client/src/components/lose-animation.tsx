"use client"

import { motion } from "framer-motion"
import { XCircle, RotateCcw, Music } from "lucide-react"
import { Button } from "./ui/button.tsx"

interface LoseAnimationProps {
  onPlayAgain: () => void
  correctChord?: string
}

export default function LoseAnimation({ onPlayAgain, correctChord = "C Major (C-E-G)" }: LoseAnimationProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg p-8 text-center max-w-md mx-4 shadow-2xl"
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          delay: 0.1,
        }}
      >
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: "easeInOut",
            }}
          >
            <XCircle className="h-16 w-16 text-red-500" />
          </motion.div>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-red-600 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Game Over! 😔
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          Better luck next time!
        </motion.p>

        <motion.div
          className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Music className="h-5 w-5 text-blue-500" />
            <span className="font-semibold text-blue-700 dark:text-blue-300">The correct chord was:</span>
          </div>
          <motion.div
            className="text-xl font-bold text-blue-800 dark:text-blue-200"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
          >
            {correctChord}
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Button onClick={onPlayAgain} className="w-full" size="lg">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again 🎵
          </Button>
          <p className="text-xs text-muted-foreground">Practice makes perfect! Keep training your ear.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
