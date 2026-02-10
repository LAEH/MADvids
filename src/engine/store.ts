import { create } from 'zustand'
import { EngineState, ShowcaseManifest } from './types'

export const useEngine = create<EngineState>((set) => ({
  currentTime: 0,
  duration: 0,
  velocity: 0,
  isPlaying: false,
  manifest: null,

  play: () => set({ isPlaying: true, velocity: 1 }),
  pause: () => set({ isPlaying: false, velocity: 0 }),
  seek: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
  setPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying, velocity: isPlaying ? 1 : 0 }),
  
  loadManifest: (manifest: ShowcaseManifest) => set({ manifest, currentTime: 0, isPlaying: false })
}))
