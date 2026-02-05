import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu,
  HardDrive,
  Zap,
  Eye,
  Brain,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Database,
  Server,
  Gauge,
  Activity,
  Clock,
  Radio,
  Layers,
  GitBranch,
  Box,
  X,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize
} from 'lucide-react'

// ═══════════════════════════════════════════════════════════
// CONSTANTS & TYPES
// ═══════════════════════════════════════════════════════════

const VIDEO_URL = "https://storage.googleapis.com/myproject-public-assets/ddn/videos/test/Video_Generation_With_Specific_Colors%20copy.mp4"

interface Slide {
  id: number
  title: string
  highlight: string
  subtitle: string
  quote: string
  quoteHighlight: string
  tags: string[]
  modules: Module[]
  pipeline: PipelineStep[]
  metrics: Metric[]
}

interface Module {
  id: string
  icon: React.ReactNode
  label: string
  sublabel: string
  color: 'yellow' | 'cyan' | 'green' | 'red'
  active?: boolean
}

interface PipelineStep {
  id: string
  icon: React.ReactNode
  label: string
  sublabel: string
  active?: boolean
}

interface Metric {
  label: string
  value: string
  color: 'yellow' | 'cyan' | 'green'
}

// Slide data
const SLIDES: Slide[] = [
  {
    id: 1,
    title: "ENTERPRISE AI",
    highlight: "HYPERPOD",
    subtitle: "DDN INFINIA DATA INTELLIGENCE PLATFORM",
    quote: "What enterprises demand, HyperPod delivers —",
    quoteHighlight: "instantly.",
    tags: ["2 PB/RU", "SUB-MS LATENCY", "100K+ AI CALLS/SEC"],
    modules: [
      { id: 'infinia', icon: <Eye className="w-4 h-4" />, label: 'INFINIA ENGINE', sublabel: 'Data Intelligence', color: 'cyan', active: true },
      { id: 'gpu', icon: <Cpu className="w-4 h-4" />, label: 'GPU CLUSTER', sublabel: '256x H100', color: 'yellow' },
      { id: 'storage', icon: <HardDrive className="w-4 h-4" />, label: 'NVME ARRAY', sublabel: '12 PB Capacity', color: 'red' },
    ],
    pipeline: [
      { id: 'ingest', icon: <Database className="w-4 h-4" />, label: 'INGEST', sublabel: '22x Faster', active: true },
      { id: 'process', icon: <Cpu className="w-4 h-4" />, label: 'PROCESS', sublabel: 'GPU Accelerated' },
      { id: 'inference', icon: <Brain className="w-4 h-4" />, label: 'INFERENCE', sublabel: '18x KV Cache' },
      { id: 'output', icon: <Zap className="w-4 h-4" />, label: 'OUTPUT', sublabel: '1 TB/s' },
    ],
    metrics: [
      { label: 'Throughput', value: '1 TB/s', color: 'yellow' },
      { label: 'Latency', value: '<1ms', color: 'green' },
      { label: 'GPU Util', value: '95%', color: 'cyan' },
    ],
  },
  {
    id: 2,
    title: "AUTONOMOUS",
    highlight: "VEHICLES",
    subtitle: "REAL-TIME AI FOR AUTOMOTIVE OEMs",
    quote: "6 of the top 10 automotive OEMs trust DDN —",
    quoteHighlight: "you should too.",
    tags: ["10 PB+ FLEETS", "REAL-TIME SYNC", "NVIDIA PREFERRED"],
    modules: [
      { id: 'perception', icon: <Eye className="w-4 h-4" />, label: 'PERCEPTION', sublabel: 'LiDAR + Camera', color: 'cyan', active: true },
      { id: 'compute', icon: <Cpu className="w-4 h-4" />, label: 'EDGE COMPUTE', sublabel: 'NVIDIA DGX', color: 'yellow' },
      { id: 'twin', icon: <Layers className="w-4 h-4" />, label: 'DIGITAL TWIN', sublabel: 'Omniverse', color: 'green' },
    ],
    pipeline: [
      { id: 'sensors', icon: <Radio className="w-4 h-4" />, label: 'SENSORS', sublabel: '8x 4K Cameras', active: true },
      { id: 'fusion', icon: <GitBranch className="w-4 h-4" />, label: 'FUSION', sublabel: 'Multi-modal' },
      { id: 'decision', icon: <Brain className="w-4 h-4" />, label: 'DECISION', sublabel: 'Real-time AI' },
      { id: 'action', icon: <Zap className="w-4 h-4" />, label: 'ACTION', sublabel: '<10ms' },
    ],
    metrics: [
      { label: 'Perception', value: '<100ms', color: 'yellow' },
      { label: 'E2E Sync', value: '~50ms', color: 'cyan' },
      { label: 'Confidence', value: '97%', color: 'green' },
    ],
  },
  {
    id: 3,
    title: "SOVEREIGN",
    highlight: "AI FACTORY",
    subtitle: "EXASCALE INFRASTRUCTURE FOR GLOBAL LEADERS",
    quote: "From edge to exascale —",
    quoteHighlight: "one platform.",
    tags: ["256 GPUS", "100 PB SCALE", "MULTI-TENANT QOS"],
    modules: [
      { id: 'dynamo', icon: <Zap className="w-4 h-4" />, label: 'DYNAMO ENGINE', sublabel: 'Metadata Accel', color: 'yellow', active: true },
      { id: 'spectrum', icon: <Activity className="w-4 h-4" />, label: 'SPECTRUM-X', sublabel: '400 GB/s Network', color: 'cyan' },
      { id: 'bluefield', icon: <Server className="w-4 h-4" />, label: 'BLUEFIELD-3', sublabel: 'DPU Offload', color: 'green' },
    ],
    pipeline: [
      { id: 'data', icon: <Database className="w-4 h-4" />, label: 'DATA LAKE', sublabel: '100 PB', active: true },
      { id: 'train', icon: <Cpu className="w-4 h-4" />, label: 'TRAINING', sublabel: '640 H100s' },
      { id: 'tune', icon: <Gauge className="w-4 h-4" />, label: 'FINE-TUNE', sublabel: 'LoRA + QLoRA' },
      { id: 'deploy', icon: <Layers className="w-4 h-4" />, label: 'DEPLOY', sublabel: 'NIM Ready' },
    ],
    metrics: [
      { label: 'Scale', value: '100 PB', color: 'yellow' },
      { label: 'Queries', value: '100x S3', color: 'cyan' },
      { label: 'Power', value: '10x Savings', color: 'green' },
    ],
  },
]

// ═══════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════

const MOTION = {
  fast: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  medium: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
}

// ═══════════════════════════════════════════════════════════
// MODULE CARD COMPONENT
// ═══════════════════════════════════════════════════════════

function ModuleCard({ module, onClick }: { module: Module; onClick?: () => void }) {
  const colors = {
    yellow: 'border-yellow-500/30 bg-yellow-500/5',
    cyan: 'border-cyan-400/30 bg-cyan-400/5',
    green: 'border-emerald-400/30 bg-emerald-400/5',
    red: 'border-red-500/30 bg-red-500/5',
  }

  const iconColors = {
    yellow: 'text-yellow-500',
    cyan: 'text-cyan-400',
    green: 'text-emerald-400',
    red: 'text-red-500',
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-2.5 rounded-xl border backdrop-blur-sm
        transition-all duration-200 text-left w-full
        ${colors[module.color]}
        ${module.active ? 'ring-1 ring-white/20' : ''}
      `}
    >
      <div className={`p-1.5 rounded-lg bg-black/30 ${iconColors[module.color]}`}>
        {module.icon}
      </div>
      <div className="min-w-0">
        <div className="text-white text-[11px] font-semibold tracking-wide truncate">
          {module.label}
        </div>
        <div className={`text-[10px] ${iconColors[module.color]}`}>
          {module.sublabel}
        </div>
      </div>
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════
// PIPELINE COMPONENT
// ═══════════════════════════════════════════════════════════

function Pipeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-3"
    >
      <div className="text-[9px] font-semibold tracking-[0.2em] text-gray-500 mb-3">
        PIPELINE
      </div>
      <div className="space-y-1">
        {steps.map((step, index) => (
          <div key={step.id}>
            <div className={`
              flex items-center gap-2 px-2 py-2 rounded-lg
              ${step.active
                ? 'bg-yellow-500/10 border border-yellow-500/30'
                : 'bg-white/5 border border-transparent'
              }
            `}>
              <div className={`p-1 rounded ${step.active ? 'text-yellow-500' : 'text-gray-500'}`}>
                {step.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[10px] font-semibold ${step.active ? 'text-white' : 'text-gray-400'}`}>
                  {step.label}
                </div>
                <div className={`text-[9px] ${step.active ? 'text-yellow-500/80' : 'text-gray-600'}`}>
                  {step.sublabel}
                </div>
              </div>
              {step.active && (
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center py-0.5">
                <ArrowDown className="w-2.5 h-2.5 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[9px] text-emerald-400">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Closed-loop feedback
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════
// METRIC PILL COMPONENT
// ═══════════════════════════════════════════════════════════

function MetricPill({ metric }: { metric: Metric }) {
  const colors = {
    yellow: 'border-yellow-500/40 text-yellow-500',
    cyan: 'border-cyan-400/40 text-cyan-400',
    green: 'border-emerald-400/40 text-emerald-400',
  }

  return (
    <div className={`
      flex items-center gap-1.5 px-3 py-1.5 rounded-full
      bg-black/40 backdrop-blur-sm border
      ${colors[metric.color]}
    `}>
      <Clock className="w-2.5 h-2.5 opacity-60" />
      <span className="text-[10px] text-gray-400">{metric.label}</span>
      <span className="text-xs font-bold">{metric.value}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// VISION OVERLAY MODAL
// ═══════════════════════════════════════════════════════════

function VisionOverlay({ module, onClose }: { module: Module; onClose: () => void }) {
  const colors = {
    yellow: { text: 'text-yellow-500', border: 'border-yellow-500/30', hex: '#EAB308' },
    cyan: { text: 'text-cyan-400', border: 'border-cyan-400/30', hex: '#22D3EE' },
    green: { text: 'text-emerald-400', border: 'border-emerald-400/30', hex: '#34D399' },
    red: { text: 'text-red-500', border: 'border-red-500/30', hex: '#EF4444' },
  }

  const c = colors[module.color]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={MOTION.medium}
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-black/60 backdrop-blur-xl p-6 rounded-2xl border ${c.border} max-w-md w-full`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 mb-1">
              DDN HYPERPOD
            </div>
            <h2 className={`text-xl font-bold ${c.text}`}>
              {module.label}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Visualization */}
        <div className={`relative h-36 rounded-xl overflow-hidden bg-black/50 border ${c.border} mb-4`}>
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 h-0.5"
            style={{ background: `linear-gradient(to bottom, transparent, ${c.hex}50, transparent)` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className={c.text}
              style={{ transformStyle: 'preserve-3d', opacity: 0.3 }}
            >
              <Box className="w-16 h-16" strokeWidth={0.5} />
            </motion.div>
          </div>
          <div className={`absolute top-2 left-2 text-[9px] font-mono ${c.text}`}>
            ACTIVE
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">{module.sublabel}</p>

        <div className="grid grid-cols-2 gap-2">
          {['STATUS', 'VERSION', 'UPTIME', 'LOAD'].map((label, i) => (
            <div key={label} className="p-2 rounded-lg bg-white/5">
              <div className="text-[9px] text-gray-500">{label}</div>
              <div className={`text-sm font-semibold ${c.text}`}>
                {i === 0 ? 'Active' : i === 1 ? 'v2.3' : i === 2 ? '847h' : '94%'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const slide = SLIDES[currentSlide]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 12000)
    return () => clearInterval(interval)
  }, [isPaused])

  // Cycle active pipeline step
  const [activePipelineIndex, setActivePipelineIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePipelineIndex((prev) => (prev + 1) % slide.pipeline.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [slide.pipeline.length])

  const pipelineWithActive = slide.pipeline.map((step, i) => ({
    ...step,
    active: i === activePipelineIndex,
  }))

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">

      {/* ═══════════ VIDEO BACKGROUND ═══════════ */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
        <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-80 bg-gradient-to-l from-black/80 to-transparent" />
      </div>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="absolute inset-0 z-10">

        {/* ═══════════ TOP LEFT LOGO ═══════════ */}
        <div className="absolute top-4 left-4">
          <div className="w-12 h-12 rounded-full border-2 border-yellow-500/50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <img src="/ddn-logo.png" alt="DDN" className="w-7 h-7 object-contain" />
          </div>
        </div>

        {/* ═══════════ TOP CENTER TITLE ═══════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-6 inset-x-0 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              <span className="text-white">{slide.title} </span>
              <span className="text-yellow-500">{slide.highlight}</span>
            </h1>
            <p className="mt-1.5 text-[11px] tracking-[0.25em] text-gray-400 uppercase">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ═══════════ TOP RIGHT STATUS ═══════════ */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-emerald-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-400">&lt;50ms</span>
            <span className="text-[9px] text-gray-500">Latency</span>
          </div>
          <button className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white transition-colors">
            <Maximize className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ═══════════ LEFT MODULES ═══════════ */}
        <motion.div
          key={`modules-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-4 top-24 w-44 space-y-2"
        >
          {slide.modules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ModuleCard module={module} onClick={() => setSelectedModule(module)} />
            </motion.div>
          ))}
        </motion.div>

        {/* ═══════════ RIGHT PIPELINE ═══════════ */}
        <div className="absolute right-4 top-20 w-40">
          <Pipeline steps={pipelineWithActive} />
        </div>

        {/* ═══════════ BOTTOM CENTER ═══════════ */}
        <div className="absolute bottom-16 inset-x-0 flex flex-col items-center gap-2">
          {/* Metrics */}
          <motion.div
            key={`metrics-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            {slide.metrics.map((metric) => (
              <MetricPill key={metric.label} metric={metric} />
            ))}
          </motion.div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`quote-${slide.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-1.5 text-sm">
                <Zap className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-gray-300">{slide.quote}</span>
                <span className="text-yellow-500 font-bold">{slide.quoteHighlight}</span>
                <Zap className="w-3.5 h-3.5 text-yellow-500" />
              </div>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-[8px] tracking-[0.15em] text-gray-500">
                {slide.tags.map((tag, i) => (
                  <span key={tag}>
                    {tag}
                    {i < slide.tags.length - 1 && <span className="mx-1">•</span>}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ═══════════ BOTTOM BAR ═══════════ */}
        <div className="absolute bottom-3 inset-x-0 px-4 flex items-center justify-between">
          {/* Left: Prev + Powered by */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[7px]">PREV</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[9px] text-gray-500">
              <span>POWERED BY</span>
              <span className="text-white/20">|</span>
              <span className="text-red-500 font-bold">DDN</span>
              <span className="text-gray-600">+</span>
              <span className="text-emerald-500 font-bold">NVIDIA</span>
            </div>
          </div>

          {/* Center: Controls + Page */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
            <div className="flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
              <span className="text-white font-bold text-xs">{currentSlide + 1}</span>
              <span className="text-gray-500 text-xs">/</span>
              <span className="text-gray-500 text-xs">{SLIDES.length}</span>
            </div>
          </div>

          {/* Right: Next */}
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
            <span className="text-[7px]">NEXT</span>
          </button>
        </div>
      </div>

      {/* ═══════════ MODAL ═══════════ */}
      <AnimatePresence>
        {selectedModule && (
          <VisionOverlay module={selectedModule} onClose={() => setSelectedModule(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
