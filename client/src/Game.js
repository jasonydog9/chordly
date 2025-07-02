import './Piano.css';
import { useState, useEffect } from 'react';
import { RefreshCw as Refresh, Volume2, HelpCircle } from "lucide-react";
import { Button } from "./components/ui/button.tsx"; // adjust the path to where Button lives in your project
import { Card, CardContent } from "./components/ui/card.tsx";
import { Badge } from "./components/ui/badge.tsx";
import HowToPlayDialog from "./components/ui/how-to-play-dialog.tsx"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedPiano from "./components/animated-piano.tsx"
import AnimatedGuessHistory from "./components/animated-guess-history.tsx"
import AnimatedCard from "./components/animated-card.tsx"
import WinAnimation from "./components/win-animation.tsx"
import LoseAnimation from "./components/lose-animation.tsx"
import { getAudioManager, initializeAudioManager} from "./components/audio-manager.tsx"


const NOTES = [
  'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'
];


function Game({ firebaseUser, settings }) {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [chordType, setChordType] = useState('5-note');
  const [hasReset, setHasReset] = useState(false);
  const [volume, setVolume] = useState(1);

   useEffect(() => {
    // Initialize audio manager with custom volume when component mounts
    const audioManager = initializeAudioManager(volume)
  }, [])

  useEffect(() => {
    const fetchChordType = async () => {
      if (!firebaseUser?.uid) return;


      try {
        const res = await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/settings`);
        const data = await res.json();


        const difficultyToChordLength = {
          easy: '3-note',
          medium: '4-note',
          hard: '5-note',
        };


        const newChordType = difficultyToChordLength[data.difficulty] || '5-note';
        setChordType(newChordType);
        setVolume(data.volume * 0.01);
      } catch (err) {
      }
    };


    fetchChordType();
  }, [firebaseUser]);





  const stripOctave = (note) => note.replace(/\d/, '');


const generateFeedback = (guess, answer) => {
  const strippedGuess = guess.map(stripOctave);
  const strippedAnswer = answer.map(stripOctave);
  const feedback = Array(guess.length).fill('gray');
  const answerUsed = Array(answer.length).fill(false);

  // First pass: check for exact matches (green)
  for (let i = 0; i < guess.length; i++) {
    if (strippedGuess[i] === strippedAnswer[i]) {
      feedback[i] = 'green';
      answerUsed[i] = true;
    }
  }

  // Second pass: check for yellow (correct note, wrong position)
  for (let i = 0; i < guess.length; i++) {
    if (feedback[i] === 'green') continue;

    for (let j = 0; j < answer.length; j++) {
      if (!answerUsed[j] && strippedGuess[i] === strippedAnswer[j]) {
        feedback[i] = 'yellow';
        answerUsed[j] = true;
        break;
      }
    }
  }

  return feedback;
};


 useEffect(() => {
  if (settings?.volume && firebaseUser) {
    const newVolume = settings.volume * 0.01 || 1;
    setVolume(newVolume);
    const audioManager = getAudioManager();
    audioManager.setMasterVolume(volume);
  }
}, [settings?.volume, firebaseUser]);

  useEffect(() => {
  if (!settings?.difficulty || !firebaseUser) return;

  const difficultyToChordLength = {
    easy: '3-note',
    medium: '4-note',
    hard: '5-note',
  };

  const newChordType = difficultyToChordLength[settings.difficulty] || '5-note';

  if (newChordType !== chordType) {
    setChordType(newChordType);
    resetGame(newChordType); // <-- pass in newChordType directly
  }
}, [settings?.difficulty, firebaseUser]);


useEffect(() => {
  if (!firebaseUser?.uid || !chordType || hasReset) return;


  const fetchOrGenerateChord = async () => {
    try {
      const res = await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/current-chord`);
      const data = await res.json();


      if (data?.currentChord && data.currentChord.length > 0) {
        setAnswer(data.currentChord);
      } else {
        const randomRes = await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/chords/random?type=${chordType}`);
        const randomData = await randomRes.json();


        if (randomData?.notes) {
          setAnswer(randomData.notes);


          // Optional: store new chord as currentChord in DB
          await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/current-chord`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentChord: randomData.notes }),
          });
        }
      }
    } catch (err) {
    }
  };


  fetchOrGenerateChord();
}, [firebaseUser, chordType]);


  useEffect(() => {
  if (!firebaseUser || !answer) return;

  const loadHistory = async () => {
    try {
      const res = await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/history`);
      const history = await res.json();

      const reconstructed = history.map(entry => ({
        notes: entry.chord,
        feedback: generateFeedback(entry.chord, answer)
      }));
      setGuesses(reconstructed);

      // Check for game over condition
      const lastGuess = history.at(-1)?.chord || [];
      const isCorrect =
        lastGuess.length === answer.length &&
        lastGuess.every((note, i) => stripOctave(note) === stripOctave(answer[i]));

      if (isCorrect) {
        setGameOver(true);
        setMessage('🎉 Correct! You guessed the chord!');
      } else if (reconstructed.length >= 5) {
        setGameOver(true);
        setMessage('❌ Game Over!');
      }

    } catch (err) {
    }
  };

  loadHistory();
}, [firebaseUser, answer]);


  const handleSubmit = async () => {

  const audioManager = getAudioManager();
  await audioManager.playSubmitSound();
  if (!answer || currentGuess.length !== parseInt(chordType) || gameOver) return;


  const isCorrect =
  currentGuess.length === answer.length &&
  currentGuess.every((note, i) => stripOctave(note) === stripOctave(answer[i]));


  if (firebaseUser) {
    await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chord: currentGuess,
        correct: isCorrect
      })
    });
  }


    const feedback = generateFeedback(currentGuess, answer);
    const guessResult = { notes: [...currentGuess], feedback };
    const newGuesses = [...guesses, guessResult];

    setGuesses(newGuesses);
    setCurrentGuess([]);


    if (isCorrect) {
      const audioManager = getAudioManager();
      await audioManager.playSuccessSound();
      setGameOver(true);
      setMessage('🎉 Correct! You guessed the chord!');


      await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/increment-wins`, {
      method: 'POST',
    });


    } else if (newGuesses.length >= 5) {
      const audioManager = getAudioManager();
      await audioManager.playFailureSound();
      setGameOver(true);
      setMessage(`❌ Game Over`);
    }
  };


  const handleKeyClick = (note) => {
    if (gameOver) return;
    if (currentGuess.length < parseInt(chordType)) {
      setCurrentGuess([...currentGuess, note]);
    }
  };


  const removeNote = async (index) => {
    setCurrentGuess(currentGuess.filter((_, i) => i !== index));
    const audioManager = getAudioManager();
    await audioManager.playClickSound();
  };


  const resetGuess = () => {
    setCurrentGuess([]);
  };


 const resetGame = async (type) => {


  const audioManager = getAudioManager();
  await audioManager.playClickSound();

  const resolvedType = type || chordType || '5-note'; // safe fallback
  setHasReset(true);
  const attempts = guesses.length;

  setGuesses([]);
  setCurrentGuess([]);
  setGameOver(false);
  setMessage('');

  try {
    // Reset history FIRST
    await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/reset-history`, {
      method: 'POST',
    });

    // Fetch a new random chord using the passed-in `type` (not state)
    const chordRes = await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/chords/random?type=${resolvedType}`);
    const chordData = await chordRes.json();
    setAnswer(chordData.notes);

    // Save currentChord to DB
    await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/current-chord`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentChord: chordData.notes }),
    });

    // Increment games played
    await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/increment-games`, {
      method: 'POST',
    });

    // Increment attempts
    await fetch(`https://86a7glme66.execute-api.us-east-2.amazonaws.com/api/users/${firebaseUser.uid}/increment-attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: attempts }),
    });

  } catch (err) {
  }
};






  function playNote(note, vol = volume) {
  const sanitizedNote = note.replace('#', 's');
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioContext.createGain();
  gainNode.gain.value = vol; // 0.0 = silent, 1.0 = full volume

  const audio = new Audio(`/piano-notes/${sanitizedNote}.mp3`);
  const source = audioContext.createMediaElementSource(audio);

  source.connect(gainNode).connect(audioContext.destination);
  audio.play();
}
  function playHint(vol = volume) {
  answer.forEach(note => playNote(note));
}
 


  return (
  <div className="container max-w-md mx-auto px-4 py-8">
   <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-4">


      {/* Your game UI goes here */}
    </div>
    {/* Header */}
    <motion.div
  className="flex justify-between items-center mb-6"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <motion.h1
    className="text-2xl font-bold"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
  >
    Chord Guesser
  </motion.h1>

  <motion.div
    className="flex gap-2"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant="outline" size="icon" onClick={() => resetGame(chordType)}>
        <Refresh className="h-4 w-4" />
      </Button>
    </motion.div>

    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant="outline" size="sm" onClick={playHint} className="flex items-center gap-2">
        <Volume2 className="h-4 w-4" />
        Play Chord
      </Button>
    </motion.div>

    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <HowToPlayDialog>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </HowToPlayDialog>
    </motion.div>
  </motion.div>
</motion.div>


    {/* Game Area */}
    <AnimatedCard className="mb-6">
      <CardContent className="p-4">
        {/* Status & Description */}
        <div className="flex justify-between items-center mb-4">
          <Badge
            variant={
              gameOver
                ? message.includes('Correct')
                  ? 'success'
                  : 'destructive'
                : 'outline'
            }
          >
            {gameOver ? message : `Attempts Left: ${5 - guesses.length}`}
          </Badge>
          <div className="text-sm text-muted-foreground">Guess the {parseInt(chordType)}-note chord</div>
        </div>


        {/* 5x5 Guess Grid */}

    
    <AnimatedGuessHistory
  guessHistory={guesses}
  currentGuess={currentGuess}
  chordType={chordType}
  gameOver={gameOver}
  onRemoveNote={gameOver ? undefined : removeNote}
/>


        {/* Submit */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <Button
    className="w-full mt-4 bg-gray-700 text-white"
    disabled={currentGuess.length !== parseInt(chordType) || gameOver}
    onClick={handleSubmit}
  >
    Submit Guess
  </Button>
</motion.div>
      </CardContent>
    </AnimatedCard>


    {/* Piano Keyboard */}
    {/* Animated Piano */}
<AnimatedPiano
  onKeyPress={(note) => {
    const fullNote = note + "4"; // append octave to match your data (e.g., "C" → "C4")
    playNote(fullNote);
    handleKeyClick(fullNote);
  }}
/>


    {/* Restart Button */}
    <AnimatePresence>
  {gameOver && message.includes('Correct') && (
    <WinAnimation onPlayAgain={() => resetGame(chordType)} />
  )}
  {gameOver && message.includes('Game Over') && (
    <LoseAnimation
      onPlayAgain={() => resetGame(chordType)}
      correctChord={answer?.join(', ') || 'Unknown'}
    />
  )}
</AnimatePresence>
  </div>
);






}


export default Game;