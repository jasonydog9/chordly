"use client"

import { motion } from "framer-motion"
import { Card } from "./ui/card.tsx"
import type React from "react"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <Card className={className}>{children}</Card>
    </motion.div>
  )
}
