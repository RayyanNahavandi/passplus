"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * Velaris — a full-bleed WebGL simplex-noise gradient backdrop.
 *
 * Renders a slowly-flowing field of colour using a single fragment shader
 * (no three.js dependency, just raw WebGL). Designed to sit behind content as
 * a living background. Respects `prefers-reduced-motion`: when motion is
 * reduced it paints a single static frame instead of running the RAF loop.
 */

const vertexShaderGLSL = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const fragmentShaderGLSL = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3 u_bg;
uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;

// Ashima simplex noise (snoise)
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  // Few octaves + gentle lacunarity keep this a soft bloom rather than
  // turbulent "smoke" — the eye reads it as calm ambient light.
  for (int i = 0; i < 3; i++) {
    v += a * snoise(p);
    p *= 1.7;
    a *= 0.5;
  }
  return v;
}

float rand(vec2 co){
  return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time;
  float n1 = fbm(p * 0.9 + vec2(t * 0.06, t * 0.04));
  float n2 = fbm(p * 1.3 - vec2(t * 0.05, t * 0.08) + n1);
  float n = 0.5 + 0.5 * (n1 * 0.6 + n2 * 0.4);

  // Blend palette across the noise field.
  vec3 col = mix(u_bg, u_c2, smoothstep(0.0, 0.5, n));
  col = mix(col, u_c1, smoothstep(0.35, 0.75, n));
  col = mix(col, u_c0, smoothstep(0.7, 1.0, n));
  col = mix(col, u_c3, smoothstep(0.0, 0.25, 1.0 - n) * 0.5);

  // Fade toward the background near the bottom so it dissolves into the page.
  col = mix(col, u_bg, smoothstep(0.55, 1.0, uv.y) * 0.85);

  // Subtle film grain.
  float g = (rand(gl_FragCoord.xy + t) - 0.5) * u_grain;
  col += g;

  gl_FragColor = vec4(col, 1.0);
}
`

export interface VelarisProps {
  /** Base/background colour (hex). */
  bg?: string
  /** Four palette colours (hex) blended across the noise field. */
  colors?: [string, string, string, string]
  /** Animation speed multiplier. */
  speed?: number
  /** Film-grain intensity (0–1). */
  grain?: number
  /** CSS height of the backdrop. */
  height?: string
  className?: string
  children?: React.ReactNode
}

const DEFAULT_COLORS: [string, string, string, string] = [
  "#86efac",
  "#4ade80",
  "#059669",
  "#000000",
]

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h
  const int = parseInt(full, 16)
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255,
  ]
}

export function Velaris({
  bg = "#000000",
  colors = DEFAULT_COLORS,
  speed = 2.0,
  grain = 0.3,
  height = "100vh",
  className,
  children,
}: VelarisProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) return
    const glc = gl as WebGLRenderingContext

    const compile = (type: number, src: string) => {
      const shader = glc.createShader(type)!
      glc.shaderSource(shader, src)
      glc.compileShader(shader)
      if (!glc.getShaderParameter(shader, glc.COMPILE_STATUS)) {
        glc.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compile(glc.VERTEX_SHADER, vertexShaderGLSL)
    const fs = compile(glc.FRAGMENT_SHADER, fragmentShaderGLSL)
    if (!vs || !fs) return

    const program = glc.createProgram()!
    glc.attachShader(program, vs)
    glc.attachShader(program, fs)
    glc.linkProgram(program)
    if (!glc.getProgramParameter(program, glc.LINK_STATUS)) return
    glc.useProgram(program)

    const buffer = glc.createBuffer()
    glc.bindBuffer(glc.ARRAY_BUFFER, buffer)
    glc.bufferData(
      glc.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      glc.STATIC_DRAW
    )
    const posLoc = glc.getAttribLocation(program, "a_position")
    glc.enableVertexAttribArray(posLoc)
    glc.vertexAttribPointer(posLoc, 2, glc.FLOAT, false, 0, 0)

    const u_resolution = glc.getUniformLocation(program, "u_resolution")
    const u_time = glc.getUniformLocation(program, "u_time")
    const u_grain = glc.getUniformLocation(program, "u_grain")
    const u_bg = glc.getUniformLocation(program, "u_bg")
    const u_c0 = glc.getUniformLocation(program, "u_c0")
    const u_c1 = glc.getUniformLocation(program, "u_c1")
    const u_c2 = glc.getUniformLocation(program, "u_c2")
    const u_c3 = glc.getUniformLocation(program, "u_c3")

    glc.uniform3fv(u_bg, hexToRgb(bg))
    glc.uniform3fv(u_c0, hexToRgb(colors[0]))
    glc.uniform3fv(u_c1, hexToRgb(colors[1]))
    glc.uniform3fv(u_c2, hexToRgb(colors[2]))
    glc.uniform3fv(u_c3, hexToRgb(colors[3]))
    glc.uniform1f(u_grain, grain)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      glc.viewport(0, 0, canvas.width, canvas.height)
      glc.uniform2f(u_resolution, canvas.width, canvas.height)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let raf = 0
    const start = performance.now()

    const draw = (time: number) => {
      glc.uniform1f(u_time, time)
      glc.drawArrays(glc.TRIANGLES, 0, 6)
    }

    if (prefersReduced) {
      // Single static frame.
      draw(12.0)
    } else {
      const loop = (now: number) => {
        const elapsed = ((now - start) / 1000) * speed
        draw(elapsed)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      ro.disconnect()
      glc.deleteProgram(program)
      glc.deleteShader(vs)
      glc.deleteShader(fs)
      glc.deleteBuffer(buffer)
    }
  }, [bg, colors, speed, grain])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ height }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {children}
    </div>
  )
}

export default Velaris
