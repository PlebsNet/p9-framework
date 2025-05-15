"use client";

import { useEffect, useRef } from "react";

export function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const { width, height } = canvas;
      const imageData = ctx!.createImageData(width, height);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        const value = (Math.random() * 255) | 0;
        buffer[i] = (255 << 24) | (value << 16) | (value << 8) | value;
      }
      ctx!.putImageData(imageData, 0, 0);
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-10 mix-blend-soft-light pointer-events-none"
    />
  );
}