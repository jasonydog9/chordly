"use client"

import type React from "react"

import { useEffect } from "react"

export class AudioManager {
  private audioContext: AudioContext | null = null
  private masterGain: GainNode | null = null
  private settings = {
    masterVolume: 0.7,
    soundEffects: true,
  }

  constructor(initialVolume?: number) {
    if (initialVolume !== undefined) {
      this.settings.masterVolume = initialVolume
    }

    if (typeof window !== "undefined") {
      this.initializeAudio()
    }
  }

  private async initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.masterGain = this.audioContext.createGain()
      this.masterGain.connect(this.audioContext.destination)
      this.masterGain.gain.value = this.settings.masterVolume
    } catch (error) {
      console.warn("Audio context initialization failed:", error)
    }
  }

  private async ensureAudioContext() {
    if (!this.audioContext) {
      await this.initializeAudio()
    }
    if (this.audioContext?.state === "suspended") {
      await this.audioContext.resume()
    }
  }

  async playSuccessSound() {
    if (!this.settings.soundEffects) return

    await this.ensureAudioContext()
    if (!this.audioContext || !this.masterGain) return

    // Play a happy ascending arpeggio
    const frequencies = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6

    for (let i = 0; i < frequencies.length; i++) {
      setTimeout(() => {
        this.playSuccessNote(frequencies[i], 0.3)
      }, i * 100)
    }
  }

  private async playSuccessNote(frequency: number, duration: number) {
    if (!this.audioContext || !this.masterGain) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)

    const now = this.audioContext.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration)

    oscillator.connect(gainNode)
    gainNode.connect(this.masterGain)

    oscillator.start(now)
    oscillator.stop(now + duration)
  }

  async playFailureSound() {
    if (!this.settings.soundEffects) return

    await this.ensureAudioContext()
    if (!this.audioContext || !this.masterGain) return

    // Play a descending sad sound
    const frequencies = [329.63, 293.66, 261.63] // E4, D4, C4

    for (let i = 0; i < frequencies.length; i++) {
      setTimeout(() => {
        this.playFailureNote(frequencies[i], 0.4)
      }, i * 150)
    }
  }

  private async playFailureNote(frequency: number, duration: number) {
    if (!this.audioContext || !this.masterGain) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.type = "sawtooth"
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)

    const now = this.audioContext.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration)

    oscillator.connect(gainNode)
    gainNode.connect(this.masterGain)

    oscillator.start(now)
    oscillator.stop(now + duration)
  }

  async playClickSound() {
    if (!this.settings.soundEffects) return

    await this.ensureAudioContext()
    if (!this.audioContext || !this.masterGain) return

    // Create a warmer, less bright click sound
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    const filterNode = this.audioContext.createBiquadFilter()

    // Use a warmer sine wave instead of harsh square wave
    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime) // Lower frequency (was 800)
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.05) // Gentle pitch drop

    // Add a low-pass filter to soften the sound
    filterNode.type = "lowpass"
    filterNode.frequency.setValueAtTime(800, this.audioContext.currentTime)
    filterNode.Q.setValueAtTime(1, this.audioContext.currentTime)

    // Softer, more natural envelope
    const now = this.audioContext.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.06, now + 0.005) // Softer attack, lower volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08) // Slightly longer decay

    // Connect: oscillator -> filter -> gain -> master
    oscillator.connect(filterNode)
    filterNode.connect(gainNode)
    gainNode.connect(this.masterGain)

    oscillator.start(now)
    oscillator.stop(now + 0.08)
  }

  async playSubmitSound() {
    if (!this.settings.soundEffects) return

    await this.ensureAudioContext()
    if (!this.audioContext || !this.masterGain) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime)
    oscillator.frequency.linearRampToValueAtTime(800, this.audioContext.currentTime + 0.1)

    const now = this.audioContext.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

    oscillator.connect(gainNode)
    gainNode.connect(this.masterGain)

    oscillator.start(now)
    oscillator.stop(now + 0.2)
  }

  async playHoverSound() {
    if (!this.settings.soundEffects) return

    await this.ensureAudioContext()
    if (!this.audioContext || !this.masterGain) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime)

    const now = this.audioContext.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

    oscillator.connect(gainNode)
    gainNode.connect(this.masterGain)

    oscillator.start(now)
    oscillator.stop(now + 0.08)
  }

  updateSettings(newSettings: Partial<typeof this.settings>) {
    this.settings = { ...this.settings, ...newSettings }
    if (this.masterGain) {
      this.masterGain.gain.value = this.settings.masterVolume
    }
  }

  // Getter for current volume
  getMasterVolume(): number {
    return this.settings.masterVolume
  }

  // Setter for master volume
  setMasterVolume(volume: number) {
    this.settings.masterVolume = Math.max(0, Math.min(1, volume)) // Clamp between 0 and 1
    if (this.masterGain) {
      this.masterGain.gain.value = this.settings.masterVolume
    }
  }
}

// Global audio manager instance
let audioManager: AudioManager | null = null

export const getAudioManager = (initialVolume?: number) => {
  if (!audioManager) {
    audioManager = new AudioManager(initialVolume)
  }
  return audioManager
}

// Function to initialize with custom volume
export const initializeAudioManager = (initialVolume: number) => {
  audioManager = new AudioManager(initialVolume)
  return audioManager
}

export default function AudioManagerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize audio manager on mount (only if not already initialized)
    if (!audioManager) {
      getAudioManager()
    }
  }, [])

  return <>{children}</>
}
