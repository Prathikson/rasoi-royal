"use client";
import { useEffect, useRef } from "react";

interface Point { x: number; y: number; age: number }

export function GoldenCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const mouse  = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      points.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (points.current.length > 48) points.current.shift();
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const LIFE = 28; // frames before fade

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Age points
      points.current = points.current.map(p => ({ ...p, age: p.age + 1 }))
        .filter(p => p.age < LIFE);

      if (points.current.length > 1) {
        for (let i = 1; i < points.current.length; i++) {
          const p0 = points.current[i - 1];
          const p1 = points.current[i];
          const t  = 1 - p0.age / LIFE;
          const w  = t * 1.8;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(180,130,40,${t * 0.55})`;
          ctx.lineWidth   = w;
          ctx.lineCap     = "round";
          ctx.stroke();
        }

        // Glow head
        const head = points.current[points.current.length - 1];
        if (head) {
          const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 8);
          grad.addColorStop(0, "rgba(200,154,74,0.45)");
          grad.addColorStop(1, "rgba(200,154,74,0)");
          ctx.beginPath();
          ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail-canvas"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
