export interface TimeState {
  currentTime: number // Video Time
  duration: number
  velocity: number // 0 = Paused, 1 = Playing
  isPlaying: boolean
}

export interface EngineState extends TimeState {
  // Actions
  play: () => void
  pause: () => void
  seek: (time: number) => void
  setDuration: (duration: number) => void
  setPlaying: (isPlaying: boolean) => void
  
  // Manifest
  manifest: ShowcaseManifest | null
  loadManifest: (manifest: ShowcaseManifest) => void
}

export type ActionType = 'play_video' | 'pause_video' | 'show_overlay' | 'hide_overlay' | 'custom'

export interface TimelineEvent {
  at: number // Time in seconds
  action: ActionType
  payload?: any
  id?: string
  label?: string
}

export interface ShowcaseManifest {
  id: string
  title: string
  assets: {
    video: string
    audio?: string
  }
  timeline: TimelineEvent[]
}
