"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"

// Import dimension assets for the showcase
import agentImg from '@/assets/dimensions/agent.png'
import uiImg from '@/assets/dimensions/ui.png'
import infraImg from '@/assets/dimensions/infra.png'
import dataImg from '@/assets/dimensions/data.png'
import backendImg from '@/assets/dimensions/backend.png'
import labsImg from '@/assets/dimensions/labs.png'
import osImg from '@/assets/dimensions/os.png'

const images = [
  {
    id: 1,
    src: agentImg,
    alt: "AGENT Intelligence",
    label: "Neural Architecture",
    category: "DIMENSION 01",
    description: "Core intelligence, prompt engineering, and autonomous agent orchestration patterns.",
  },
  {
    id: 2,
    src: uiImg,
    alt: "UI Sovereignty",
    label: "High-Fidelity Interface",
    category: "DIMENSION 02",
    description: "Modern frontend development, design systems, and premium visual aesthetics.",
  },
  {
    id: 3,
    src: infraImg,
    alt: "INFRA Control",
    label: "Distributed Systems",
    category: "DIMENSION 03",
    description: "Cloud-native orchestration, edge computing, and sovereign mesh networking.",
  },
  {
    id: 4,
    src: dataImg,
    alt: "DATA Intelligence",
    label: "Quantum Analytics",
    category: "DIMENSION 04",
    description: "Massive-scale data engineering, ETL pipelines, and prescriptive analytics.",
  },
  {
    id: 5,
    src: backendImg,
    alt: "BACKEND High-Perf",
    label: "Kernel Engineering",
    category: "DIMENSION 05",
    description: "High-performance systems, API integrity, and server-side engineering.",
  },
  {
    id: 6,
    src: labsImg,
    alt: "LABS Frontier",
    label: "Research & Development",
    category: "DIMENSION 06",
    description: "Advanced R&D in agentic autonomy and experimental UI/UX patterns.",
  },
  {
    id: 7,
    src: osImg,
    alt: "OS Kernel",
    label: "Kernel Integrity",
    category: "DIMENSION 07",
    description: "Low-level system utilities, lifecycle management, and hardware orchestration.",
  },
]

export function VerticalImageStack() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400 // ms between navigations

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    },
    [navigate],
  )

  useEffect(() => {
    const element = document.getElementById('vertical-stack-container');
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: true });
      return () => element.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel])

  const getCardStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 }
    } else if (diff === -2) {
      return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 }
    } else if (diff === 1) {
      return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 }
    } else if (diff === 2) {
      return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 }
    } else {
      return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
    }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div id="vertical-stack-container" className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#050505]">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Card Stack */}
      <div className="relative flex h-[500px] w-[320px] items-center justify-center" style={{ perspective: "1200px" }}>
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className="relative h-[420px] w-[280px] overflow-hidden rounded-3xl bg-zinc-900 border border-white/10"
                style={{
                  boxShadow: isCurrent
                    ? "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)"
                    : "0 10px 30px -10px rgba(0,0,0,0.3)",
                }}
              >
                {/* Card inner glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 via-transparent to-transparent" />

                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                  draggable={false}
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 min-h-40 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[#CCFF00] text-[10px] font-mono tracking-[0.3em] mb-2">
                    {images[index].category}
                  </span>
                  <span className="text-white font-black text-xl mb-2 uppercase italic tracking-tighter leading-tight">
                    {images[index].label}
                  </span>
                  <p className="text-white/60 text-[10px] uppercase leading-relaxed tracking-wider">
                    {images[index].description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
              }
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "h-6 bg-blue-500" : "bg-white/20 hover:bg-white/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Instruction hint */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7-7 7 7" />
            </svg>
          </motion.div>
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase">Scroll or drag to navigate</span>
        </div>
      </motion.div>

      {/* Counter */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-light text-white tabular-nums">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="my-2 h-px w-8 bg-white/20" />
          <span className="text-sm text-white/40 tabular-nums">{String(images.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  )
}
