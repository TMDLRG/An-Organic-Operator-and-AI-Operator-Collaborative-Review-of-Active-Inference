"use client";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

const STROKE_ACCENT = "rgb(56 189 248)";
const STROKE_FG = "rgb(120 113 108)";
const STROKE_GRID = "rgb(228 228 231 / 0.3)";

export function LinePlot({
  data, xKey, lines, height = 240, refLine,
}: {
  data: any[];
  xKey: string;
  lines: { key: string; label: string; color?: string }[];
  height?: number;
  refLine?: { y: number; label: string };
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid stroke={STROKE_GRID} />
        <XAxis dataKey={xKey} stroke={STROKE_FG} fontSize={11} />
        <YAxis stroke={STROKE_FG} fontSize={11} />
        <Tooltip
          contentStyle={{ background: "rgb(var(--card))", border: "1px solid rgb(var(--border))", fontSize: 12 }}
          labelStyle={{ color: "rgb(var(--fg))" }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.label}
            stroke={l.color ?? STROKE_ACCENT}
            strokeWidth={2}
            dot={false}
          />
        ))}
        {refLine && <ReferenceLine y={refLine.y} stroke={STROKE_FG} strokeDasharray="4 4" label={{ value: refLine.label, fill: STROKE_FG, fontSize: 11 }} />}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarPlot({
  data, xKey, bars, height = 240,
}: {
  data: any[];
  xKey: string;
  bars: { key: string; label: string; color?: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid stroke={STROKE_GRID} />
        <XAxis dataKey={xKey} stroke={STROKE_FG} fontSize={11} />
        <YAxis stroke={STROKE_FG} fontSize={11} />
        <Tooltip
          contentStyle={{ background: "rgb(var(--card))", border: "1px solid rgb(var(--border))", fontSize: 12 }}
          labelStyle={{ color: "rgb(var(--fg))" }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {bars.map((b) => (
          <Bar key={b.key} dataKey={b.key} name={b.label} fill={b.color ?? STROKE_ACCENT} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
