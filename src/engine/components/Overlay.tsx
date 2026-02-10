import { useEngine } from '../store'
import { AnimatePresence, motion } from 'framer-motion'

export function Overlay() {
  const { currentTime, manifest } = useEngine()

  if (!manifest) return null

  // Find active events at current time
  // This is a naive O(N) lookup. Ideally, we pre-compute active ranges.
  // For now, we assume events are instant triggers or checking if time > at
  
  // A better approach for the overlay is to have "Scenes" with start/end times.
  // Let's implement a simple "Current Action" finder for demonstration.
  // In a real engine, we'd have a 'SceneManager' that tracks active scenes.
  
  const currentAction = manifest.timeline.find(event => 
    currentTime >= event.at && currentTime < (event.at + 5) // Mock 5s duration for events
  )

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
      <AnimatePresence>
        {currentAction && (
          <motion.div
            key={currentAction.at}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/80 backdrop-blur-md p-8 rounded-2xl border border-white/20"
          >
            <h1 className="text-4xl font-bold text-white mb-2">{currentAction.label || "Action"}</h1>
            <div className="text-gray-400 font-mono text-sm">
                Time: {currentTime.toFixed(2)}s
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
