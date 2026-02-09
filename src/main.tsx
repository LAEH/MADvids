import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Stage } from './engine/components/Stage'
import { Overlay } from './engine/components/Overlay'
import { useEngine } from './engine/store'
import { ShowcaseManifest } from './engine/types'
import './index.css'

// Demo Data
const DEMO_MANIFEST: ShowcaseManifest = {
  id: "demo-01",
  title: "Cinematic Demo",
  assets: {
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  timeline: [
    { at: 0, action: 'play_video', label: "Start" },
    { at: 2, action: 'show_overlay', label: "Welcome to MADengine" },
    { at: 5, action: 'show_overlay', label: "Precise Video Sync" },
    { at: 8, action: 'hide_overlay', label: "Fade Out" }
  ]
}

function EngineRoot() {
  const { loadManifest, play, isPlaying } = useEngine()

  useEffect(() => {
    loadManifest(DEMO_MANIFEST)
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      <Stage />
      <Overlay />
      
      {/* Debug Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        <button 
            onClick={play}
            className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition"
        >
            {isPlaying ? "Playing..." : "Start Engine"}
        </button>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EngineRoot />
  </StrictMode>,
)
