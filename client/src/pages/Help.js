import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.tsx"
import { Badge } from "../components/ui/badge.tsx"

export default function Help() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Help & Tutorials</h1>
        <p className="text-xl text-muted-foreground">Everything you need to know to master Chordly</p>
      </div>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
          <TabsTrigger value="chords">Chords</TabsTrigger>
        </TabsList>

        <TabsContent value="basics">
          <Card>
            <CardHeader>
              <CardTitle>Game Basics</CardTitle>
              <CardDescription>Learn the fundamental rules of Chordly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Objective</h3>
                <p className="text-sm text-muted-foreground mb-4">Guess the chord in 5 attempts or fewer.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How to Play</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Click "Play Chord" to hear the target chord</li>
                  <li>Click on piano keys to select your guess</li>
                  <li>Click "Submit Guess" to see your feedback</li>
                  <li>Use the feedback to refine your next guess</li>
                  <li>Repeat until you guess correctly or run out of attempts</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Feedback</CardTitle>
              <CardDescription>Learn what the colors mean in your guess history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center text-white font-bold">
                  C
                </div>
                <div>
                  <h3 className="font-semibold">Green - Correct Note</h3>
                  <p className="text-sm text-muted-foreground">
                    This note is in the chord and in the correct position.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-md flex items-center justify-center text-white font-bold">
                  E
                </div>
                <div>
                  <h3 className="font-semibold">Yellow - Wrong Position</h3>
                  <p className="text-sm text-muted-foreground">
                    This note is in the chord but in a different position.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-md flex items-center justify-center text-gray-700 font-bold">
                  F
                </div>
                <div>
                  <h3 className="font-semibold">Gray - Not in Chord</h3>
                  <p className="text-sm text-muted-foreground">This note is not part of the target chord.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle>Pro Tips</CardTitle>
              <CardDescription>Strategies to improve your chord guessing skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">🎵 Listen Carefully</h3>
                <p className="text-sm text-muted-foreground">
                  Play the chord multiple times. Try to identify the bass note (lowest note) first.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎹 Start with Common Chords</h3>
                <p className="text-sm text-muted-foreground">
                  Begin with major and minor triads like C Major (C-E-G) or A Minor (A-C-E).
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🧠 Use Process of Elimination</h3>
                <p className="text-sm text-muted-foreground">
                  Gray feedback tells you which notes to avoid in future guesses.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📚 Learn Chord Patterns</h3>
                <p className="text-sm text-muted-foreground">
                  Major chords have a happy sound, minor chords sound sad, and diminished chords sound tense.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chords">
          <Card>
            <CardHeader>
              <CardTitle>Common Chords</CardTitle>
              <CardDescription>Reference guide for frequently used chords</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-3">Major Chords</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">C Major</Badge>
                      <span className="text-sm">C - E - G</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">D Major</Badge>
                      <span className="text-sm">D - F# - A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">E Major</Badge>
                      <span className="text-sm">E - G# - B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">F Major</Badge>
                      <span className="text-sm">F - A - C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">G Major</Badge>
                      <span className="text-sm">G - B - D</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Minor Chords</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">A Minor</Badge>
                      <span className="text-sm">A - C - E</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">D Minor</Badge>
                      <span className="text-sm">D - F - A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">E Minor</Badge>
                      <span className="text-sm">E - G - B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">F Minor</Badge>
                      <span className="text-sm">F - Ab - C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">G Minor</Badge>
                      <span className="text-sm">G - Bb - D</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
