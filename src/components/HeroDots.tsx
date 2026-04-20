'use client'
import { useEffect, useRef } from 'react'

export function HeroDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const SPACING     = 10   // grid spacing between dots
    const MOUSE_R     = 65   // mouse influence radius (subtle)
    const PUSH        = 18   // push force (gentle)
    const SPRING      = 0.07
    const DAMPING     = 0.74

    let mouse = { x: -9999, y: -9999 }
    let animId: number

    interface Dot {
      hx: number; hy: number
      x:  number; y:  number
      vx: number; vy: number
      r:  number
      opacity: number
    }

    let dots: Dot[] = []

    const build = () => {
      canvas.width  = canvas.offsetWidth  || canvas.clientWidth
      canvas.height = canvas.offsetHeight || canvas.clientHeight
      if (!canvas.width || !canvas.height) return

      // ── Render BEP text on offscreen canvas to get pixel map ──
      const off = document.createElement('canvas')
      off.width  = canvas.width
      off.height = canvas.height
      const offCtx = off.getContext('2d')!
      const fontSize = Math.min(canvas.height * 0.55, canvas.width * 0.20)
      offCtx.font          = `900 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
      offCtx.textAlign     = 'center'
      offCtx.textBaseline  = 'middle'
      offCtx.fillStyle     = '#fff'
      offCtx.fillText('BEP', canvas.width * 0.29, canvas.height * 0.24)

      const imgData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data

      const inLogo = (px: number, py: number) => {
        const ix = Math.round(px)
        const iy = Math.round(py)
        if (ix < 0 || iy < 0 || ix >= canvas.width || iy >= canvas.height) return false
        return imgData[(iy * canvas.width + ix) * 4 + 3] > 100
      }

      dots = []
      const cols = Math.ceil(canvas.width  / SPACING) + 1
      const rows = Math.ceil(canvas.height / SPACING) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = c * SPACING
          const hy = r * SPACING
          const logo = inLogo(hx, hy)
          dots.push({
            hx, hy, x: hx, y: hy,
            vx: 0, vy: 0,
            r:       logo ? 1.8 : 1.0,
            opacity: logo ? 0.65 : 0.07,
          })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const d of dots) {
        // Mouse repulsion
        const dx   = d.x - mouse.x
        const dy   = d.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_R && dist > 0) {
          const f = (1 - dist / MOUSE_R) * PUSH
          d.vx += (dx / dist) * f * 0.12
          d.vy += (dy / dist) * f * 0.12
        }

        // Spring back
        d.vx += (d.hx - d.x) * SPRING
        d.vy += (d.hy - d.y) * SPRING
        d.vx *= DAMPING
        d.vy *= DAMPING
        d.x  += d.vx
        d.y  += d.vy

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,134,29,${d.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse = { x: -9999, y: -9999 } }

    // Build after next paint so offsetWidth is populated
    requestAnimationFrame(() => {
      build()
      draw()
    })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize',    build)
    canvas.closest('section')?.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize',    build)
      canvas.closest('section')?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
