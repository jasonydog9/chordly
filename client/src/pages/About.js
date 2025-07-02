"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.tsx"
import { Badge } from "../components/ui/badge.tsx"
import { Button } from "../components/ui/button.tsx"
import { Separator } from "../components/ui/separator.tsx"
import {
  Music,
  Code,
  Heart,
  Coffee,
  Github,
  Twitter,
  Mail,
  ExternalLink,
  Lightbulb,
  Users,
  Target,
  Zap,
  Linkedin,
} from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Slot } from "@radix-ui/react-slot";

export default function About() {
  const technologies = [
    "React",
    "MongoDB",
    "Express",
    "Node",
    "AWS",
    "Serverless",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "shadcn/ui",
    "Web Audio API",
    "Vercel",
  ]

  const features = [
    {
      icon: Target,
      title: "Ear Training Focus",
      description: "Designed specifically to improve chord recognition and musical ear development",
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Real-time color-coded feedback helps you learn from each guess",
    },
    {
      icon: Users,
      title: "Progressive Difficulty",
      description: "Multiple difficulty levels from basic triads to complex jazz chords",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Crafted by a musician for musicians, with attention to every detail",
    },
  ]

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
  className="w-24 h-24 rounded-full overflow-hidden mx-auto"
>
  <img
    src="img/logo.png"
    alt="Logo"
    className="w-full h-full object-cover"
  />
</motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold"
          >
            About Chordly
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A passion project combining music education with modern web technology to help musicians develop their ear
            training skills.
          </motion.p>
        </div>

        {/* Creator Bio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Meet the Creator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-6">
            <motion.div
              className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/img/linkedme.jpeg" // Replace this with your actual image path
                className="w-full h-full object-cover"
              />
            </motion.div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">Jason Yap</h3>
                  <p className="text-muted-foreground">Full-Stack Developer & Musician</p>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Hi, I'm Jason. I'm a graduated senior from Waubonsie Valley High School and an incoming freshman at the University of Illinois Urbana-Champaign. I enjoy engineering and love building meaningful, creative projects.

I've been playing the trombone for 7 years, and I have some basic piano experience from when I was younger. 
                </p>
                <p className="text-muted-foreground leading-relaxed">
                At the start of summer, I became fascinated by the chord progressions in my favorite songs. I kept wondering why the songs I love sound the way they do — which led me down a rabbit hole into music theory, especially chords and how they work. That curiosity eventually inspired this project.
                I chose to build it as a website because, let’s be honest, websites are super accessible and easy to share. It also gave me a chance to explore backend development — learning how databases work and how HTTP servers power the web.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I’m not programming or playing trombone, you’ll probably find me at the gym (yes, I hit legs), shooting hoops with friends, or diving into music theory videos — breaking down everything from video game soundtracks to Radiohead.
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Musical Background
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 7+ years of trombone experience</li>
                  <li>• First Chair Honors Band All-State Bass Trombonist</li>
                  <li>• 2 x ILMEA district orchestra trombonist</li>
                  <li>• 2+ years Jazz Ensemble</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Technical Expertise
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 2 years in Python</li>
                  <li>• New to React & TypeScript</li>
                  <li>• Audio programming enthusiast</li>
                  <li>• ML/DL passion</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Trombone</Badge>
              <Badge variant="outline">Jazz</Badge>
              <Badge variant="outline">Music Theory</Badge>
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">ML</Badge>
              <Badge variant="outline">Listening to Music!</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Project Story */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              The Story Behind Chordly
            </CardTitle>
            <CardDescription>How this project came to life</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-600">The Problem 🤔</h4>
                <p className="text-muted-foreground">
                  As a curious musician trying to get into music theory and chord progression, one way I thought I could get better
                  was by recognizing chords. Traditional ear training methods were often boring and didn't provide immediate feedback. I wanted to create something that made learning fun and addictive.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600">The Inspiration 💡</h4>
                <p className="text-muted-foreground">
                  The viral success of Wordle showed how simple, daily challenges could captivate millions. I thought:
                  "What if we applied this same addictive gameplay to music education?" That's when Chordly was
                  born.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600">The Solution 🎯</h4>
                <p className="text-muted-foreground">
                  Chordly combines the satisfying feedback loop of puzzle games with serious music education. Each
                  game is quick, challenging, and provides immediate learning opportunities through color-coded
                  feedback.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Why Chordly?</CardTitle>
            <CardDescription>What makes this ear training tool special</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Built With Modern Technology
            </CardTitle>
            <CardDescription>The technologies powering this application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Badge variant="secondary">{tech}</Badge>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              This project showcases modern web development practices with a focus on performance, accessibility, and
              user experience. The audio engine uses the Web Audio API for precise sound generation, while the UI is
              built with React and enhanced with smooth animations.
            </p>
          </CardContent>
        </Card>

        {/* Contact & Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Connect & Support
            </CardTitle>
            <CardDescription>Get in touch or support the project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              I'd love to hear your feedback, suggestions, or just chat about music and technology! Feel free to reach
              out through any of these channels:
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/jasonydog9" target="_blank" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.linkedin.com/in/jason-yap-71b20a253/" target="_blank" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8"
        >
          <p className="text-muted-foreground">
            Made with <Heart className="h-4 w-4 inline text-red-500" /> for the music community
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Keep practicing, keep learning, and most importantly—keep making music! 🎵
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
