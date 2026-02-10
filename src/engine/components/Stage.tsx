import { useRef, useEffect } from 'react'
import { useTime } from '../hooks/useTime'
import { useEngine } from '../store'

export function Stage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { manifest, isPlaying, setDuration } = useEngine()
  
  // Bind the time loop to this video element
  useTime(videoRef)

  useEffect(() => {
    if (videoRef.current) {
        setDuration(videoRef.current.duration)
    }
  }, [manifest])

  if (!manifest) return <div className="bg-black w-full h-full" />

  return (
    <div className="fixed inset-0 z-0 bg-black">
      <video
        ref={videoRef}
        src={manifest.assets.video}
        className="w-full h-full object-cover"
        playsInline
        muted // Auto-mute for autoplay policy, manage audio separately if needed
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  )
}
