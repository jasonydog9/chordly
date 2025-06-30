"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog.tsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card.tsx"
import { Button } from "./button.tsx"
import { Badge } from "./badge.tsx"
import { Separator } from "./separator.tsx"
import { HelpCircle, Play, Piano, Target, RotateCcw, Volume2 } from "lucide-react"

interface HowToPlayDialogProps {
  children: React.ReactNode
}

export default function HowToPlayDialog({ children }: HowToPlayDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            How to Play Chord Guesser
          </DialogTitle>
          <DialogDescription>Learn the rules and master the game in minutes!</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Game Objective */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Game Objective
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Guess the mystery chord in 6 attempts or fewer. Each guess gives you clues to help identify the
                correct chord!
              </p>
            </CardContent>
          </Card>

          {/* How to Play Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Listen to the Chord
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Click the "Play Chord" button to hear the mystery chord. You can listen as many times as you need!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Piano className="h-4 w-4" />
                    Select Your Guess
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Click on the piano keys to select notes that you think make up the chord. Your selected notes will
                    appear as badges above the piano.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Submit Your Guess
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Once you've selected notes, click "Submit Guess" to see how close you are to the correct answer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Use the Feedback
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze the color-coded feedback and make your next guess. Repeat until you solve the chord!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback System */}
          <Card>
            <CardHeader>
              <CardTitle>Understanding Feedback</CardTitle>
              <CardDescription>Learn what the colors mean after each guess</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div>
                  <h4 className="font-semibold text-green-600">Green - Perfect Match! ✓</h4>
                  <p className="text-sm text-muted-foreground">
                    This note is in the chord and in the correct position. Keep it for your next guess!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-md flex items-center justify-center text-white font-bold">
                  E
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-600">Yellow - Right Note, Wrong Spot ⚠️</h4>
                  <p className="text-sm text-muted-foreground">
                    This note is part of the chord but in a different position. Try moving it around!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold">
                  F
                </div>
                <div>
                  <h4 className="font-semibold text-gray-600">Gray - Not in Chord ✗</h4>
                  <p className="text-sm text-muted-foreground">
                    This note is not part of the target chord. Avoid using it in future guesses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pro Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Pro Tips for Success</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  💡
                </Badge>
                <p className="text-sm">
                  <strong>Listen carefully:</strong> Play the chord multiple times to identify the bass note (lowest
                  note) first.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  🎵
                </Badge>
                <p className="text-sm">
                  <strong>Start simple:</strong> Begin with common chords like C Major (C-E-G) or A Minor (A-C-E).
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  🧠
                </Badge>
                <p className="text-sm">
                  <strong>Use elimination:</strong> Gray feedback tells you which notes to avoid in future guesses.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">
                  🎹
                </Badge>
                <p className="text-sm">
                  <strong>Learn patterns:</strong> Major chords sound happy, minor chords sound sad, diminished chords
                  sound tense.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Common Chords Reference */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
              <CardDescription>Some common chords to get you started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2 text-green-600">Major Chords (Happy Sound)</h4>
                  <div className="space-y-1 text-sm">
                    <div>C Major: C - E - G</div>
                    <div>F Major: F - A - C</div>
                    <div>G Major: G - B - D</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-blue-600">Minor Chords (Sad Sound)</h4>
                  <div className="space-y-1 text-sm">
                    <div>A Minor: A - C - E</div>
                    <div>D Minor: D - F - A</div>
                    <div>E Minor: E - G - B</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="flex justify-center">
            <Button onClick={() => setOpen(false)} className="w-full md:w-auto bg-black text-white">
              Got it! Let's Play 🎵
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
