import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, FastForward, RotateCcw } from 'lucide-react';

export function GearSystem() {
  const [speedRatio, setSpeedRatio] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      if (!isPaused) {
        angle += 0.015 * speedRatio;
      }

      // Draw Background Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Helper to draw a gear wheel with teeth
      const drawGear = (x, y, radius, teeth, rotAngle, color, label) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotAngle);

        ctx.strokeStyle = color;
        ctx.fillStyle = color + '15';
        ctx.lineWidth = 2;

        // Outer Gear Circle with Teeth
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
          const toothAngle = (i * 2 * Math.PI) / teeth;
          const rInner = radius - 8;
          const rOuter = radius + 6;

          const a1 = toothAngle - 0.05;
          const a2 = toothAngle + 0.05;

          if (i === 0) {
            ctx.moveTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);
          } else {
            ctx.lineTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);
          }
          ctx.lineTo(Math.cos(a1) * rOuter, Math.sin(a1) * rOuter);
          ctx.lineTo(Math.cos(a2) * rOuter, Math.sin(a2) * rOuter);
          ctx.lineTo(Math.cos(a2) * rInner, Math.sin(a2) * rInner);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner Spokes
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const sa = (i * Math.PI) / 2;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(sa) * (radius - 8), Math.sin(sa) * (radius - 8));
        }
        ctx.stroke();

        // Central Ruby Pivot
        ctx.fillStyle = '#DC2626';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Label
        if (label) {
          ctx.fillStyle = '#A1A1AA';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(label, x, y + radius + 22);
        }
      };

      // 1. Mainspring Barrel Gear (3:1 ratio)
      drawGear(cx - 160, cy - 40, 70, 32, angle * 0.33, '#D4AF37', 'MAINSPRING BARREL (1/3 SPEED)');

      // 2. Center Wheel (1:1 ratio)
      drawGear(cx - 40, cy - 40, 50, 24, -angle, '#E2E8F0', 'CENTER WHEEL (1X)');

      // 3. Third Wheel (2:1 ratio)
      drawGear(cx + 45, cy - 40, 36, 18, angle * 2, '#D4AF37', 'THIRD WHEEL (2X)');

      // 4. Escape Wheel (4:1 ratio)
      drawGear(cx + 115, cy - 40, 26, 12, -angle * 4, '#38BDF8', 'ESCAPE WHEEL (4X)');

      // 5. Balance Wheel Oscillation
      ctx.save();
      ctx.translate(cx + 180, cy - 40);
      const balAngle = Math.sin(angle * 8) * 0.6;
      ctx.rotate(balAngle);
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#A1A1AA';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BALANCE WHEEL (4Hz OSCILLATION)', 0, 60);
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [speedRatio, isPaused]);

  return (
    <div className="w-full my-12 p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs tracking-[0.3em] text-amber-400 uppercase font-semibold">
            KINETIC KINEMATICS
          </span>
          <h3 className="font-serif text-2xl text-slate-100 uppercase tracking-widest font-light">
            INTERCONNECTED GEAR TRANSMISSION
          </h3>
        </div>

        {/* Gear Controls */}
        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-800 cursor-pointer"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setSpeedRatio(speedRatio === 1 ? 2.5 : 1)}
            className={`px-3 py-2 rounded-lg border transition-all cursor-pointer flex items-center space-x-2 ${
              speedRatio > 1
                ? 'bg-amber-400/20 text-amber-300 border-amber-500/40'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <FastForward className="w-4 h-4" />
            <span>{speedRatio > 1 ? 'FAST-FORWARD (2.5X)' : 'NORMAL SPEED'}</span>
          </button>
        </div>
      </div>

      <div className="w-full h-80 rounded-2xl bg-[#090A0D] border border-zinc-900 overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={320}
          className="w-full h-full max-w-4xl"
        />
      </div>

      <div className="flex justify-between items-center font-mono text-[11px] text-zinc-500">
        <span>TRANSMISSION RATIO: 1 : 3 : 12</span>
        <span>SYNCHRONIZED ANCHOR ESCAPEMENT</span>
      </div>
    </div>
  );
}
