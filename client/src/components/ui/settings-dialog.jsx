"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from "./dialog.tsx";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "./tabs.tsx";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "./card.tsx";
import { Button } from "./button.tsx";
import { Input } from "./input.tsx";
import { Label } from "./label.tsx";
import { Switch } from "./switch.tsx";
import { Slider } from "./slider.tsx";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "./select.tsx";
import { Badge } from "./badge.tsx";
import {
  Settings, Volume2, User, Gamepad2, Palette, Save
} from "lucide-react";

const MotionCard = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
  >
    {children}
  </motion.div>
);

export default function SettingsDialog({ firebaseUser, children, onSettingsChange }) {
  const [open, setOpen] = useState(false);

  const [settings, setSettings] = useState({
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    volume: [75],
    difficulty: "easy",
    theme: "system",
  });

  const [editedSettings, setEditedSettings] = useState({ ...settings });

  const [stats, setStats] = useState({
    games: 0,
    attempts: 0,
    wins: 0,
    winStreak: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!firebaseUser?.uid) return;
      try {
        const res = await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/stats`);
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          console.error("Failed to load stats:", data.error);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, [firebaseUser]);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!firebaseUser?.uid) return;
      try {
        const res = await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/settings`);
        const data = await res.json();
        if (res.ok) {
          setSettings({
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            volume: [data.volume],
            difficulty: data.difficulty,
            theme: data.theme,
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, [firebaseUser]);

  useEffect(() => {
    if (open) setEditedSettings(settings);
  }, [open, settings]);

  const handleSave = async () => {
    setOpen(false);
    if (!firebaseUser) return;

    try {
      const updatePromises = Object.entries(editedSettings).map(([key, value]) => {
        const sendValue = Array.isArray(value) && value.length === 1 ? value[0] : value;
        return fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/change-${key}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: sendValue }),
        });
      });

      await Promise.all(updatePromises);
      setSettings(editedSettings);
      onSettingsChange?.(editedSettings);
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>Customize your Chord Guesser experience</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile"><User className="h-4 w-4" /> Profile</TabsTrigger>
            <TabsTrigger value="audio"><Volume2 className="h-4 w-4" /> Audio</TabsTrigger>
            <TabsTrigger value="game"><Gamepad2 className="h-4 w-4" /> Game</TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="h-4 w-4" /> Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <MotionCard>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" value={editedSettings.displayName} onChange={(e) => setEditedSettings(prev => ({ ...prev, displayName: e.target.value }))} />
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={editedSettings.email} onChange={(e) => setEditedSettings(prev => ({ ...prev, email: e.target.value }))} />
                </CardContent>
              </Card>
            </MotionCard>

            <MotionCard>
              <Card>
                <CardHeader>
                  <CardTitle>Game Statistics</CardTitle>
                  <CardDescription>Your performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[["Games Played", stats.games],
                      ["Win Rate", stats.games ? (stats.wins / stats.games * 100).toFixed(2) + "%" : "0%"],
                      ["Avg Attempts", stats.games ? (stats.attempts / stats.games).toFixed(2) : "0"],
                      ["Win Streak", stats.winStreak]].map(([label, value]) => (
                      <div key={label} className="text-center">
                        <div className="text-2xl font-bold">{value}</div>
                        <div className="text-sm text-muted-foreground">{label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </MotionCard>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <MotionCard>
              <Card>
                <CardHeader>
                  <CardTitle>Volume Controls</CardTitle>
                  <CardDescription>Adjust audio levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Volume</Label>
                    <Badge variant="outline">{editedSettings.volume[0]}%</Badge>
                    <Slider
                      value={editedSettings.volume}
                      onValueChange={(value) => setEditedSettings(prev => ({ ...prev, volume: value }))}
                      max={100}
                      step={1}
                    />
                  </div>
                </CardContent>
              </Card>
            </MotionCard>
          </TabsContent>

          <TabsContent value="game" className="space-y-4">
            <MotionCard>
              <Card>
                <CardHeader>
                  <CardTitle>Gameplay Settings</CardTitle>
                  <CardDescription>Difficulty and rules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label>Difficulty Level</Label>
                  <Select value={editedSettings.difficulty} onValueChange={(value) => setEditedSettings(prev => ({ ...prev, difficulty: value }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy - 3 notes</SelectItem>
                      <SelectItem value="medium">Medium - 4 notes</SelectItem>
                      <SelectItem value="hard">Hard - 5 notes</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </MotionCard>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <MotionCard>
              <Card>
                <CardHeader>
                  <CardTitle>Theme Settings</CardTitle>
                  <CardDescription>Choose your style</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label>Color Theme</Label>
                  <Select value={editedSettings.theme} onValueChange={(value) => setEditedSettings(prev => ({ ...prev, theme: value }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </MotionCard>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" /> Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
