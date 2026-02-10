import { useRef, useEffect } from 'react'
import { useEngine } from '../store'

export function useTime(videoRef: React.RefObject<HTMLVideoElement>) {
  const { isPlaying, seek, setDuration, setPlaying } = useEngine()
  const rafRef = useRef<number>()

  // Sync loop
  useEffect(() => {
    const loop = () => {
      if (videoRef.current) {
        if (!videoRef.current.paused && !videoRef.current.ended) {
             seek(videoRef.current.currentTime)
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [seek])

  // Control loop
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying && video.paused) {
      video.play().catch(e => console.error("Autoplay prevented", e))
    } else if (!isPlaying && !video.paused) {
      video.pause()
    }
  }, [isPlaying])

  // Event Listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onDurationChange = () => setDuration(video.duration)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)

    video.addEventListener('durationchange', onDurationChange)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)

    return () => {
      video.removeEventListener('durationchange', onDurationChange)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
    }
  }, [setDuration, setPlaying])
}
