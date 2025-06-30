"use client"

import { motion } from "framer-motion"
import { Trophy, Star, Music } from "lucide-react"
import { Button } from "./ui/button.tsx"

interface WinAnimationProps {
  onPlayAgain: () => void
}

export default function WinAnimation({ onPlayAgain }: WinAnimationProps) {
  const confettiVariants = {
    initial: { opacity: 0, y: -100, rotate: 0 },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [0, 100, 200, 300],
      rotate: [0, 180, 360, 540],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0.5,
      },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Confetti */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 20}%`,
          }}
          variants={confettiVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: Math.random() * 2 }}
        />
      ))}

      <motion.div
        className="bg-white dark:bg-gray-900 rounded-lg p-8 text-center max-w-md mx-4 shadow-2xl"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
      >
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            <Trophy className="h-16 w-16 text-yellow-500" />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Star className="h-6 w-6 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-green-600 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Congratulations! 🎉
        </motion.h2>

        <motion.p
          className="text-lg text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          You've successfully guessed the chord!
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
        >
          <Music className="h-5 w-5 text-blue-500" />
          <span className="text-sm text-muted-foreground">Musical genius at work!</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
          <Button onClick={onPlayAgain} className="w-full" size="lg">
            Play Again 🎵
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
