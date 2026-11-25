import React, {
  Component,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Box,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Command,
  Download,
  Eye,
  Filter,
  Globe,
  LayoutDashboard,
  ListChecks,
  Moon,
  MoreHorizontal,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sun,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

/**
 * H ONE Glass Dashboard
 * Workspace analitik bergaya glassmorphism untuk operasional SaaS Indonesia.
 * Mendukung mode terang/gelap, pergantian bahasa ID/EN, format mata uang IDR,
 * grafik interaktif, papan operasional, pencarian cepat, dan ekspor CSV lokal.
 */

const PERIOD_KEYS = ["7d", "30d", "90d"];
const WORK_STATUS_KEYS = ["review", "scheduled", "running", "exceptions"];

const VIEW_DEFS = [
  { id: "command", icon: LayoutDashboard },
  { id: "trends", icon: TrendingUp },
  { id: "metrics", icon: BarChart3 },
  { id: "operations", icon: Briefcase },
];

const dashboardStyles = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

.gd-app {
  --gd-ink: #25201e;
  --gd-muted: #423731;
  --gd-line: rgb(74 49 33 / 15%);
  --gd-grid: rgb(74 49 33 / 19%);
  --gd-rim: rgb(255 253 246 / 51%);
  --gd-edge-light: rgb(255 254 247 / 84%);
  --gd-edge-shade: rgb(57 40 28 / 19%);
  --gd-gloss: rgb(255 251 242 / 45%);
  --gd-frame: rgb(247 234 219 / 23%);
  --gd-rail: rgb(241 222 206 / 48%);
  --gd-card: rgb(250 242 232 / 46%);
  --gd-card-light: rgb(255 251 245 / 34%);
  --gd-raised: rgb(255 249 243 / 81%);
  --gd-inner: rgb(255 250 245 / 37%);
  --gd-surface: #f6ece2;
  --gd-track: rgb(81 49 32 / 14%);
  --gd-primary: #261e1b;
  --gd-primary-ink: #fffaf5;
  --gd-pick: #fff9f3;
  --gd-pick-ink: #241b17;
  --gd-coral: #a43c27;
  --gd-teal: #09644f;
  --gd-ochre: #996300;
  --gd-graph-ink: #40332d;
  --gd-focus: #194b48;
  --gd-dark-shadow: 35 21 14;
  inline-size: 100%;
  min-inline-size: 0;
  flex: 1 1 100%;
  position: relative;
  isolation: isolate;
  min-block-size: 100svh;
  background:
    radial-gradient(circle at 14% 18%, #e8c7a8 0%, transparent 46%),
    radial-gradient(circle at 86% 22%, #c99d79 0%, transparent 48%),
    radial-gradient(circle at 52% 88%, #8e6c56 0%, transparent 55%),
    linear-gradient(135deg, #c7ab92 0%, #9f7e65 52%, #7d5f4c 100%);
  color: var(--gd-ink);
  color-scheme: light;
  font-family: "Manrope", system-ui, -apple-system, sans-serif;
  font-size: 13px;
  font-weight: 550;
  font-variant-numeric: tabular-nums;
  transition: background 0.35s ease, color 0.25s ease;
}

.gd-app[data-theme="dark"] {
  --gd-ink: #fff6e9;
  --gd-muted: #e5d5c7;
  --gd-line: rgb(243 221 198 / 19%);
  --gd-grid: rgb(243 221 198 / 19%);
  --gd-rim: rgb(255 236 212 / 31%);
  --gd-edge-light: rgb(255 242 225 / 49%);
  --gd-edge-shade: rgb(11 6 5 / 30%);
  --gd-gloss: rgb(255 237 213 / 13%);
  --gd-frame: rgb(42 31 29 / 52%);
  --gd-rail: rgb(45 32 30 / 59%);
  --gd-card: rgb(47 36 34 / 53%);
  --gd-card-light: rgb(106 88 81 / 30%);
  --gd-raised: rgb(80 67 61 / 82%);
  --gd-inner: rgb(78 61 56 / 49%);
  --gd-surface: #3b302c;
  --gd-track: rgb(245 226 212 / 16%);
  --gd-primary: #f3ddca;
  --gd-primary-ink: #231a16;
  --gd-pick: #f9eee0;
  --gd-pick-ink: #241b17;
  --gd-coral: #ff9177;
  --gd-teal: #75dac0;
  --gd-ochre: #f1be58;
  --gd-graph-ink: #e7d9cd;
  --gd-focus: #f9bf9b;
  --gd-dark-shadow: 10 4 3;
  background:
    radial-gradient(circle at 18% 16%, #6a4c3b 0%, transparent 45%),
    radial-gradient(circle at 84% 24%, #284b44 0%, transparent 46%),
    radial-gradient(circle at 50% 90%, #4e3326 0%, transparent 52%),
    linear-gradient(135deg, #2b211d 0%, #3a2b24 52%, #1f1714 100%);
  color-scheme: dark;
}

.gd-app *, .gd-app *::before, .gd-app *::after { box-sizing: border-box; }
.gd-app :where(button, input, select) { color: inherit; font: inherit; }
.gd-app :where(button, a, input, select):focus-visible { outline: 2px solid var(--gd-focus); outline-offset: 3px; }
.gd-app a { color: inherit; text-decoration: none; }
.gd-app button { cursor: pointer; }
.gd-app :where(h1, h2, h3, p, figure) { margin: 0; }
.gd-app svg { flex: none; }
.gd-sr { position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.gd-background, .gd-app::before {
  position: fixed;
  z-index: -2;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  pointer-events: none;
}
.gd-background {
  object-fit: cover;
  object-position: center 60%;
  filter: sepia(.22) saturate(.78) brightness(.86);
}
.gd-app::before {
  content: "";
  z-index: -1;
  background:
    linear-gradient(116deg, rgb(73 48 37 / 35%), transparent 43%, rgb(162 101 63 / 24%) 76%, transparent 100%),
    linear-gradient(0deg, rgb(53 33 25 / 34%), transparent 58%);
}
.gd-app[data-theme="dark"] .gd-background { filter: sepia(.15) saturate(.75) brightness(.61); }

.gd-surround {
  inline-size: min(calc(100% - 100px), 1380px);
  margin-inline: auto;
  padding-block: 24px 42px;
}

.gd-top, .gd-dock {
  border: 1px solid var(--gd-rim);
  background: linear-gradient(165deg, var(--gd-gloss), transparent 32% 73%, var(--gd-gloss)), var(--gd-rail);
  box-shadow:
    inset 1px 1px 1px var(--gd-edge-light),
    inset -1px -1px 1px var(--gd-edge-shade),
    inset 0 -2px 5px var(--gd-gloss),
    0 7px 20px rgb(var(--gd-dark-shadow) / 17%);
  backdrop-filter: blur(15px) saturate(1.35);
  -webkit-backdrop-filter: blur(15px) saturate(1.35);
}

.gd-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 400px) minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  min-block-size: 60px;
  border-radius: 999px;
  padding: 6px 9px 6px 13px;
}

.gd-brand { display: flex; align-items: center; gap: 10px; min-inline-size: 0; padding-inline-start: 3px; }
.gd-logo {
  inline-size: 35px; block-size: 35px; display: grid; place-items: center;
  border-radius: 50%; background: var(--gd-pick); color: var(--gd-pick-ink);
  box-shadow: inset 0 0 0 1px var(--gd-gloss), 0 2px 7px rgb(var(--gd-dark-shadow) / 12%);
}
.gd-logo svg { width: 22px; height: 22px; }
.gd-brand strong { display: block; font-size: 12px; letter-spacing: .17em; line-height: 1.1; font-weight: 800; }
.gd-brand small { display: block; margin-block-start: 3px; font-size: 10px; color: var(--gd-muted); }

.gd-ask {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-block-size: 43px;
  max-inline-size: 100%;
  border: 1px solid var(--gd-line);
  border-radius: 999px;
  background: var(--gd-inner);
  box-shadow: inset 0 1px 0 var(--gd-gloss);
  padding: 4px 13px 4px 9px;
  text-align: start;
  transition: background 0.18s ease, transform 0.18s ease;
}
.gd-ask:hover, .gd-icon-button:hover, .gd-lang-button:hover { background: var(--gd-raised); }

.gd-orb {
  flex: none;
  inline-size: 25px;
  block-size: 25px;
  border-radius: 50%;
  background:
    radial-gradient(ellipse at 32% 24%, #faf7fe 5%, #72ecf1 25%, transparent 58%),
    radial-gradient(ellipse at 67% 54%, #e1b7f9, #815add 55%, #353467 79%);
  box-shadow:
    inset 0 0 0 .75px rgb(246 245 255 / 75%),
    inset 0 -2px 5px #604db4,
    0 0 0 3px rgb(91 70 115 / 13%),
    0 2px 8px rgb(71 46 113 / 35%);
}

.gd-prompt {
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
  font-size: 12px; font-weight: 700;
  animation: gd-prompt-in .74s steps(28, end) both;
}
@keyframes gd-prompt-in { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
.gd-ask-search { margin-inline-start: auto; width: 15px; height: 15px; color: var(--gd-muted); }

.gd-top-actions { display: flex; justify-content: flex-end; align-items: center; gap: 6px; }
.gd-icon-button {
  position: relative; min-inline-size: 44px; min-block-size: 44px; display: inline-grid; place-items: center;
  border-radius: 999px; border: 1px solid var(--gd-line); padding: 0; background: var(--gd-inner);
  transition: background 0.18s ease;
}
.gd-icon-button svg { width: 17px; height: 17px; stroke-width: 1.75; }
.gd-lang-button {
  min-block-size: 44px; display: inline-flex; align-items: center; gap: 5px;
  border-radius: 999px; border: 1px solid var(--gd-line); padding: 0 12px;
  background: var(--gd-inner); font-size: 11px; font-weight: 800; letter-spacing: .04em;
  transition: background 0.18s ease;
}
.gd-lang-button svg { width: 14px; height: 14px; stroke-width: 1.9; color: var(--gd-muted); }
.gd-notices { background: var(--gd-raised); }
.gd-notices i {
  position: absolute; block-size: 6px; inline-size: 6px; inset: 9px 9px auto auto; border-radius: 50%;
  background: var(--gd-coral); box-shadow: 0 0 0 2px var(--gd-surface);
}

.gd-stage-wrap { position: relative; margin-block: 11px 0; }
.gd-stage {
  color: var(--gd-ink);
  border: 1px solid var(--gd-rim);
  border-radius: 34px;
  background:
    linear-gradient(148deg, var(--gd-gloss), transparent 19% 77%, color-mix(in srgb, var(--gd-gloss) 48%, transparent)),
    var(--gd-frame);
  box-shadow:
    inset 1px 1px 1px var(--gd-edge-light),
    inset -1px -1px 1px var(--gd-edge-shade),
    inset 0 0 7px var(--gd-gloss),
    0 1px 3px rgb(var(--gd-dark-shadow) / 17%),
    0 22px 72px rgb(var(--gd-dark-shadow) / 22%);
  backdrop-filter: blur(var(--gd-panel-frost, 12px)) saturate(1.24);
  -webkit-backdrop-filter: blur(var(--gd-panel-frost, 12px)) saturate(1.24);
}
.gd-stage-scroll {
  block-size: max(605px, min(865px, calc(100svh - 165px)));
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--gd-line) transparent;
  border-radius: inherit;
  padding: clamp(19px, 2.15vw, 35px) clamp(25px, 3.2vw, 49px) 41px;
}

.gd-view-head {
  display: flex; align-items: flex-end; justify-content: space-between; gap: 12px 22px;
  margin-block-end: 19px;
}
.gd-view-head h1 {
  font-size: clamp(29px, 3.35vw, 49px);
  font-weight: 760;
  line-height: 1.03;
  letter-spacing: -.055em;
}
.gd-view-head p { color: var(--gd-muted); font-size: 13px; margin-block-start: 8px; }
.gd-view-actions { display: flex; align-items: center; flex-wrap: wrap; justify-content: flex-end; gap: 7px; }

.gd-period {
  display: inline-flex; align-items: center; padding: 3px; border-radius: 999px;
  border: 1px solid var(--gd-rim); background: var(--gd-inner);
  box-shadow: inset 0 1px 0 var(--gd-gloss);
}
.gd-period button {
  min-block-size: 35px; min-inline-size: 56px; border: 0; border-radius: 999px; background: transparent;
  padding: 0 11px; font-size: 11px; font-weight: 700; white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;
}
.gd-period button[aria-pressed="true"] { background: var(--gd-primary); color: var(--gd-primary-ink); }
.gd-period button[aria-pressed="false"]:hover { background: var(--gd-inner); }

.gd-primary, .gd-secondary {
  display: inline-flex; justify-content: center; align-items: center; gap: 7px;
  min-block-size: 40px; padding: 7px 12px;
  font-size: 11.5px; font-weight: 750; line-height: 1.2; border-radius: 999px;
  border: 1px solid transparent;
  transition: filter 0.18s ease, background 0.18s ease, transform 0.15s ease;
}
.gd-primary { background: var(--gd-primary); color: var(--gd-primary-ink); }
.gd-secondary { background: var(--gd-raised); border-color: var(--gd-rim); color: var(--gd-ink); }
.gd-primary:hover { filter: brightness(1.14); }
.gd-secondary:hover { background: var(--gd-surface); }
.gd-primary svg, .gd-secondary svg { width: 14px; height: 14px; }
.gd-export { white-space: nowrap; }

/* View & card entrance animations */
.gd-content {
  min-inline-size: 0;
  animation: gd-view-in 0.34s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes gd-view-in {
  from { opacity: 0.45; filter: blur(6px); }
  to { opacity: 1; filter: blur(0px); }
}

[data-gd-enter] {
  animation: gd-card-in 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--gd-delay, 0ms);
}
@keyframes gd-card-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.gd-analytics, .gd-command-grid, .gd-command-side, .gd-summary, .gd-metric-grid, .gd-analytics-grid { display: grid; gap: 12px; }
.gd-command-grid { grid-template-columns: minmax(0, 1.12fr) minmax(0, 1fr) minmax(0, 1.05fr); align-items: stretch; }
.gd-command-side { grid-column: 1; align-content: start; }
.gd-command-grid > .gd-activity { grid-column: 2 / -1; }
.gd-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; padding: 6px; }
.gd-analytics-grid { grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr); }
.gd-metric-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }

.gd-panel, .gd-metric, .gd-summary {
  min-inline-size: 0;
  border: 1px solid var(--gd-rim);
  border-radius: 20px;
  background: linear-gradient(144deg, var(--gd-card-light), transparent 66%), var(--gd-card);
  box-shadow: inset 0 1px 1px var(--gd-edge-light), inset 0 -1px 1px var(--gd-edge-shade), 0 6px 18px rgb(var(--gd-dark-shadow) / 9%);
}
.gd-summary { border-radius: 20px; background: var(--gd-inner); }
.gd-summary .gd-metric { border-radius: 15px; }
.gd-panel { padding: 15px 16px; }
.gd-panel-head {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start;
  gap: 7px 12px; margin-block-end: 12px;
}
.gd-panel-head h2 { font-size: 14px; font-weight: 800; letter-spacing: -.024em; }
.gd-panel-head p { font-size: 11px; color: var(--gd-muted); margin-block-start: 3px; }

.gd-metric { display: flex; flex-direction: column; justify-content: space-between; min-block-size: 112px; padding: 11px 12px; }
.gd-metric[data-tone="teal"] {
  --gd-coral: #ffc8b8;
  --gd-teal: #b8f1dd;
  --gd-muted: #e4f5ef;
  color: #fff;
  border-color: rgb(196 248 231 / 55%);
  background: radial-gradient(ellipse at 5% -20%, #3a9381, transparent 68%), linear-gradient(145deg, #1e7461, #08443a);
  box-shadow: inset 0 1px 2px rgb(214 252 240 / 45%), 0 6px 14px rgb(19 78 64 / 17%);
}
.gd-metric-head { display: flex; justify-content: space-between; align-items: center; gap: 4px; min-inline-size: 0; font-size: 11px; font-weight: 700; }
.gd-metric-icon, .gd-list-icon {
  display: grid; place-items: center; flex: none; color: inherit;
  inline-size: 28px; block-size: 28px; border-radius: 10px;
  background: var(--gd-inner); box-shadow: inset 0 1px 0 var(--gd-gloss);
}
.gd-metric-icon svg, .gd-list-icon svg { width: 14px; height: 14px; }
.gd-metric[data-tone="teal"] .gd-metric-icon { background: rgb(235 255 247 / 16%); }
.gd-metric-value { display: block; font-size: clamp(20px, 2.1vw, 31px); line-height: 1.08; margin-block: 3px 7px; letter-spacing: -.048em; font-weight: 800; }
.gd-summary .gd-metric-value { font-size: clamp(19px, 1.9vw, 29px); }
.gd-metric-caption, .gd-balance-change { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; color: var(--gd-muted); font-size: 10px; font-weight: 650; }

.gd-delta {
  display: inline-flex; align-items: center; gap: 2px; color: var(--gd-teal); font-weight: 800;
  border-radius: 6px; padding: 2px 4px;
  background: color-mix(in srgb, var(--gd-teal) 12%, transparent);
}
.gd-delta[data-attention="true"] { color: var(--gd-coral); background: color-mix(in srgb, var(--gd-coral) 11%, transparent); }
.gd-delta svg { width: 11px; height: 11px; stroke-width: 2.4; }

.gd-balance .gd-panel-head { align-items: center; margin-block-end: 9px; }
.gd-unit { border-radius: 6px; padding: 4px 6px; background: var(--gd-raised); font-size: 10px; font-weight: 800; }
.gd-balance-number { font-size: clamp(24px, 2.5vw, 36px); font-weight: 800; letter-spacing: -.05em; line-height: 1.06; white-space: nowrap; }
.gd-balance-change { margin-block-start: 7px; }
.gd-balance-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-block: 13px 12px; }
.gd-streams { display: flex; border-radius: 12px; background: var(--gd-inner); padding: 8px 2px; }
.gd-streams div { flex: 1; min-inline-size: 0; padding: 0 7px; }
.gd-streams div + div { border-inline-start: 1px solid var(--gd-line); }
.gd-streams span, .gd-streams strong { display: block; }
.gd-streams span { font-size: 9px; color: var(--gd-muted); }
.gd-streams strong { font-size: 10.5px; font-weight: 800; margin-block-start: 4px; white-space: nowrap; }

.gd-capacity .gd-panel-head, .gd-approvals .gd-panel-head { margin-block-end: 10px; }
.gd-capacity-track, .gd-mix-track { display: block; height: 7px; border-radius: 999px; overflow: hidden; background: var(--gd-track); }
.gd-capacity-track .gd-fill {
  display: block; block-size: 100%; border-radius: inherit; background: var(--gd-teal);
  transform-origin: left center;
  animation: gd-grow-x 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both;
}
@keyframes gd-grow-x { from { transform: scaleX(0); } to { transform: scaleX(1); } }

.gd-capacity-label { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px; color: var(--gd-muted); font-size: 10px; margin-top: 8px; }
.gd-capacity-label strong { color: var(--gd-ink); }
.gd-approval-content { display: flex; align-items: center; gap: 9px; min-inline-size: 0; }
.gd-approval-content .gd-list-icon { inline-size: 37px; block-size: 37px; color: var(--gd-teal); background: color-mix(in srgb, var(--gd-teal) 12%, var(--gd-inner)); }
.gd-approval-content div { flex: 1; min-inline-size: 0; }
.gd-approval-content strong, .gd-approval-content small { display: block; }
.gd-approval-content strong { font-size: 12px; font-weight: 800; }
.gd-approval-content small { margin-top: 4px; font-size: 10px; color: var(--gd-muted); }
.gd-statement .gd-panel-head { margin-block-end: 8px; }

.gd-table-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; max-inline-size: 100%; }
.gd-search, .gd-filter {
  display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--gd-line); border-radius: 10px;
  background: var(--gd-inner); min-block-size: 35px; padding: 0 8px;
}
.gd-search svg, .gd-filter svg { width: 13px; height: 13px; color: var(--gd-muted); }
.gd-search input { width: 112px; flex: 1; min-inline-size: 0; border: 0; background: transparent; min-block-size: 33px; }
.gd-search input::placeholder { color: var(--gd-muted); opacity: 1; }
.gd-search input, .gd-filter select { font-size: 11px; }
.gd-filter select { border: 0; background: transparent; padding: 5px 0; min-inline-size: 0; cursor: pointer; }
.gd-filter select option { color: var(--gd-ink); background: var(--gd-surface); }
.gd-search:focus-within, .gd-filter:focus-within { outline: 2px solid var(--gd-focus); }
.gd-app .gd-search input:focus-visible, .gd-app .gd-filter select:focus-visible { outline: none; }

.gd-table-scroll { max-inline-size: 100%; overflow: auto; scrollbar-width: thin; }
.gd-table-scroll table { inline-size: 100%; border-spacing: 0; text-align: start; }
.gd-table-scroll th, .gd-table-scroll td { padding: 9px 10px; text-align: start; }
.gd-table-scroll th { background: var(--gd-inner); font-size: 10px; color: var(--gd-muted); font-weight: 800; }
.gd-table-scroll th:first-child { border-radius: 8px 0 0 8px; }
.gd-table-scroll th:last-child { border-radius: 0 8px 8px 0; }
.gd-table-scroll td { white-space: nowrap; font-size: 11px; }
.gd-table-scroll td:first-child { font-weight: 700; }
.gd-table-scroll tr + tr td { border-top: 1px solid var(--gd-line); }

.gd-status {
  --gd-status-color: var(--gd-graph-ink);
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 7px; border-radius: 999px; font-size: 10px; font-weight: 750;
  background: color-mix(in srgb, var(--gd-status-color) 11%, var(--gd-inner));
  color: var(--gd-status-color); white-space: nowrap;
}
.gd-status[data-state="teal"] { --gd-status-color: var(--gd-teal); }
.gd-status[data-state="coral"] { --gd-status-color: var(--gd-coral); }
.gd-status i { inline-size: 5px; block-size: 5px; border-radius: 50%; background: currentColor; }
.gd-empty { padding: 12px 3px; color: var(--gd-muted); font-size: 12px; }

.gd-app [data-tone="ink"] { --gd-series: var(--gd-graph-ink); }
.gd-app [data-tone="coral"] { --gd-series: var(--gd-coral); }
.gd-app [data-tone="teal"] { --gd-series: var(--gd-teal); }
.gd-app [data-tone="ochre"] { --gd-series: var(--gd-ochre); }

.gd-legend { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 6px 12px; color: var(--gd-muted); }
.gd-legend span, .gd-device-list button span:first-child { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700; }
.gd-legend i, .gd-device-list button span:first-child i { inline-size: 7px; block-size: 7px; border-radius: 50%; background: var(--gd-series); }

.gd-stack-meta { display: flex; justify-content: space-between; align-items: center; min-height: 20px; gap: 4px; }
.gd-chart-readout { font-size: 10px; font-weight: 800; white-space: nowrap; }
.gd-stack-plot { display: grid; grid-template-columns: repeat(var(--gd-series-count), minmax(0, 1fr)); gap: 4px; block-size: 194px; margin-top: 5px; }
.gd-command-chart .gd-stack-plot { block-size: 141px; }
.gd-stack-column { display: flex; flex-direction: column; align-items: center; min-inline-size: 0; border: 0; border-radius: 8px; background: transparent; padding: 3px 0 0; transition: background 0.16s ease; }
.gd-stack-column:is(:focus-visible, :hover, [aria-pressed="true"]) { background: var(--gd-inner); }
.gd-stack-track { display: flex; justify-content: center; align-items: end; flex: 1; inline-size: 100%; border-bottom: 1px solid var(--gd-line); }
.gd-stack-bar {
  display: flex; flex-direction: column; transform-origin: center bottom;
  inline-size: min(65%, 40px); min-inline-size: 6px; border-radius: 6px 6px 3px 3px; overflow: hidden;
  animation: gd-grow-y 0.52s cubic-bezier(0.22, 1, 0.36, 1) var(--gd-bar-delay, 0.12s) both;
}
@keyframes gd-grow-y { from { transform: scaleY(0); } to { transform: scaleY(1); } }

.gd-stack-bar i { display: block; flex-basis: 0; background: var(--gd-series); min-block-size: 2px; }
.gd-stack-bar i:first-child { background: repeating-linear-gradient(138deg, var(--gd-series) 0 4px, color-mix(in srgb, var(--gd-series) 76%, white) 4px 6px); }
.gd-stack-label { font-size: 9px; color: var(--gd-muted); margin-top: 7px; white-space: nowrap; }

.gd-revenue-main { display: grid; grid-template-columns: 58px minmax(0, 1fr); }
.gd-chart-y { display: flex; flex-direction: column; justify-content: space-between; padding-block: 0; font-size: 9.5px; color: var(--gd-muted); }
.gd-line-plot { position: relative; min-inline-size: 0; block-size: 208px; }
.gd-line-plot svg { display: block; width: 100%; height: 100%; overflow: visible; }
.gd-grid-line { stroke: var(--gd-grid); stroke-dasharray: 3 4; vector-effect: non-scaling-stroke; }
.gd-chart-path { fill: none; stroke: var(--gd-series); stroke-width: 2.5; stroke-linecap: round; vector-effect: non-scaling-stroke; }
.gd-line-reveal { animation: gd-clip-in 0.78s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both; }
@keyframes gd-clip-in { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0% 0 0); } }
.gd-line-cursor { stroke: var(--gd-muted); stroke-dasharray: 2 4; vector-effect: non-scaling-stroke; }
.gd-chart-zones { position: absolute; inset: 0; display: flex; align-items: stretch; }
.gd-chart-zones button { flex: 1; min-inline-size: 0; border: 0; background: transparent; padding: 0; border-radius: 2px; }

.gd-line-tooltip {
  pointer-events: none; position: absolute; top: 6px; left: clamp(82px, var(--gd-tooltip-x), calc(100% - 82px)); translate: -50% 0;
  display: grid; gap: 2px; min-inline-size: 162px; padding: 7px 9px; background: var(--gd-surface);
  border: 1px solid var(--gd-line); border-radius: 9px; font-size: 10px; box-shadow: 0 4px 10px rgb(var(--gd-dark-shadow) / 15%);
}
.gd-line-tooltip span { display: flex; justify-content: space-between; gap: 10px; }
.gd-chart-axis { display: flex; justify-content: space-between; margin: 9px 0 0 58px; font-size: 9px; color: var(--gd-muted); }

.gd-device { display: grid; gap: 8px; justify-items: stretch; }
.gd-device-ring { position: relative; inline-size: min(100%, 150px); aspect-ratio: 1; justify-self: center; }
.gd-device-ring svg { display: block; inline-size: 100%; block-size: 100%; }
.gd-donut-draw {
  stroke-dasharray: 100 0;
  animation: gd-donut-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.14s both;
}
@keyframes gd-donut-in { from { stroke-dasharray: 0 100; } to { stroke-dasharray: 100 0; } }
.gd-device-segment { stroke: var(--gd-series); transition: opacity .2s ease; }
.gd-device-segment[data-muted="true"] { opacity: .29; }
.gd-device-total { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; pointer-events: none; }
.gd-device-total strong { font-size: 23px; line-height: 1.05; letter-spacing: -.05em; font-weight: 800; }
.gd-device-total > span { font-size: 10px; margin-top: 5px; color: var(--gd-muted); }
.gd-device-list { display: grid; gap: 2px; }
.gd-device-list button {
  display: grid; grid-template-columns: 66px minmax(0, 1fr) 34px; gap: 7px; align-items: center;
  min-block-size: 32px; text-align: start; background: transparent; border: 0; border-radius: 8px; padding: 3px 6px;
  transition: background 0.16s ease;
}
.gd-device-list button:is(:hover, [aria-pressed="true"]) { background: var(--gd-inner); }
.gd-device-list button strong { text-align: end; font-weight: 800; font-size: 11px; }
.gd-mix-track { height: 4px; }
.gd-mix-track .gd-fill {
  display: block; block-size: 100%; border-radius: inherit; background: var(--gd-series);
  transform-origin: left center;
  animation: gd-grow-x 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
}

.gd-lanes { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px; }
.gd-lanes[data-filtered="true"] { grid-template-columns: minmax(0, 1fr); }
.gd-lane { min-inline-size: 0; border: 1px solid var(--gd-line); background: var(--gd-inner); padding: 7px; border-radius: 14px; }
.gd-lane header { display: flex; align-items: center; gap: 5px; padding: 3px 4px 8px; }
.gd-lane header i { display: inline-grid; place-items: center; border-radius: 7px; width: 23px; height: 23px; color: var(--gd-series); background: color-mix(in srgb, var(--gd-series) 13%, transparent); }
.gd-lane header svg { width: 13px; height: 13px; }
.gd-lane header h3 { min-inline-size: 0; font-size: 11px; font-weight: 800; }
.gd-lane header span { margin-inline-start: auto; color: var(--gd-muted); font-size: 10px; }
.gd-work-item {
  display: grid; gap: 5px; width: 100%; text-align: start; border-radius: 11px; padding: 9px;
  border: 1px solid var(--gd-rim); background: var(--gd-card);
  box-shadow: inset 0 1px 0 var(--gd-gloss);
  transition: background 0.18s ease, transform 0.16s ease;
}
.gd-work-item + .gd-work-item { margin-top: 6px; }
.gd-work-item:hover { background: var(--gd-raised); transform: translateY(-1px); }
.gd-work-titlerow, .gd-work-meta { display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; }
.gd-work-titlerow strong { font-size: 11.5px; font-weight: 800; }
.gd-work-titlerow svg { width: 14px; height: 14px; }
.gd-work-detail { font-size: 10.5px; line-height: 1.42; color: var(--gd-muted); }
.gd-work-meta { font-size: 9.5px; font-weight: 700; margin-top: 2px; color: var(--gd-muted); }

.gd-dock {
  position: absolute; z-index: 3;
  display: flex; align-items: center; gap: 3px; padding: 4px; border-radius: 999px;
}
.gd-dock-side { flex-direction: column; left: -24px; top: clamp(66px, 16vh, 153px); }
.gd-dock-bottom { left: 50%; bottom: -24px; translate: -50% 0; }
.gd-dock button.gd-dock-btn {
  z-index: 1; position: relative; display: flex; gap: 6px; justify-content: center; align-items: center;
  min-inline-size: 44px; min-block-size: 44px; padding: 0 13px; border-radius: 999px;
  border: 0; background: transparent;
  font-size: 11px; font-weight: 800; white-space: nowrap;
  transition: color 0.2s ease, background 0.2s ease;
}
.gd-dock-side button.gd-dock-btn { padding: 0; }
.gd-dock button.gd-dock-btn svg { width: 16px; height: 16px; stroke-width: 1.9; }
.gd-dock button.gd-dock-btn[aria-current="page"] { color: var(--gd-pick-ink); }
.gd-dock button.gd-dock-btn:not([aria-current="page"]):hover { background: var(--gd-inner); }

.gd-dock-indicator {
  position: absolute; inset: 0 auto auto 0; pointer-events: none; visibility: hidden;
  border-radius: 999px; background: var(--gd-pick); box-shadow: inset 0 1px 0 white, 0 2px 7px rgb(var(--gd-dark-shadow) / 16%);
}
.gd-dock-indicator[data-ready="true"] { visibility: visible; transition: transform .36s cubic-bezier(.24, .89, .26, 1), width .36s cubic-bezier(.24, .89, .26, 1), height .36s cubic-bezier(.24, .89, .26, 1); }
.gd-dock-side .gd-dock-text, .gd-dock-short { display: none; }
.gd-dock-tip {
  display: none; position: absolute; left: calc(100% + 7px); z-index: 1; pointer-events: none;
  color: var(--gd-ink); background: var(--gd-surface); padding: 6px 9px; border: 1px solid var(--gd-rim);
  border-radius: 7px; box-shadow: 0 3px 8px rgb(var(--gd-dark-shadow) / 17%);
}
.gd-dock-side button.gd-dock-btn:is(:hover, :focus-visible) .gd-dock-tip { display: inline; }

.gd-footer { padding: 33px 3px 1px; display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
.gd-footer > * {
  border-radius: 999px; padding: 5px 10px; color: var(--gd-ink); font-size: 10px; font-weight: 700;
  background: var(--gd-raised); min-block-size: 24px; display: flex; align-items: center; gap: 4px;
}
.gd-footer a:hover { text-decoration: underline; }
.gd-footer a svg { width: 10px; height: 10px; }

/* Custom Accessible Modal Overlay */
.gd-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgb(30 21 17 / 46%);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: gd-fade-in 0.18s ease-out both;
}
@keyframes gd-fade-in { from { opacity: 0; } to { opacity: 1; } }

.gd-dialog {
  max-inline-size: min(calc(100% - 8px), 485px);
  inline-size: 100%;
  border-radius: 23px;
  border: 1px solid var(--gd-rim);
  color: var(--gd-ink);
  padding: 0;
  background: var(--gd-surface);
  box-shadow: 0 20px 80px rgb(var(--gd-dark-shadow) / 42%);
  animation: gd-dialog-pop 0.22s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes gd-dialog-pop {
  from { opacity: 0; transform: translateY(10px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.gd-dialog-inner { padding: 18px; }
.gd-dialog-inner > header { display: flex; gap: 10px; align-items: center; justify-content: space-between; margin-bottom: 13px; }
.gd-dialog-inner h2 { font-size: 22px; font-weight: 800; letter-spacing: -.04em; }
.gd-command-input { inline-size: 100%; padding-inline: 10px; margin-bottom: 8px; min-block-size: 44px; }
.gd-command-input input { min-block-size: 42px; font-size: 14px; }
.gd-quick-list { display: grid; gap: 5px; }
.gd-quick-list button {
  display: flex; align-items: center; gap: 9px; width: 100%; padding: 9px;
  text-align: start; border: 1px solid var(--gd-line); border-radius: 10px; background: var(--gd-inner);
  transition: background 0.16s ease;
}
.gd-quick-list button:hover { background: var(--gd-raised); }
.gd-quick-list button svg { width: 16px; height: 16px; color: var(--gd-muted); }
.gd-quick-list button div { flex: 1; }
.gd-quick-list strong, .gd-quick-list small { display: block; }
.gd-quick-list small { color: var(--gd-muted); margin-top: 2px; font-size: 11px; }
.gd-work-dialog-description { margin: 12px 0; line-height: 1.5; color: var(--gd-muted); }
.gd-work-facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-bottom: 14px; }
.gd-work-facts div { border: 1px solid var(--gd-line); border-radius: 9px; padding: 8px; background: var(--gd-inner); }
.gd-work-facts dt { font-size: 10px; color: var(--gd-muted); }
.gd-work-facts dd { margin: 4px 0 0; font-weight: 800; font-size: 12px; }

/* Toast Notification */
.gd-toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 60;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid var(--gd-rim);
  background: var(--gd-primary);
  color: var(--gd-primary-ink);
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 12px 30px rgb(var(--gd-dark-shadow) / 28%);
  animation: gd-dialog-pop 0.24s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.gd-toast svg { width: 15px; height: 15px; }

@media (max-width: 1060px) {
  .gd-surround { inline-size: calc(100% - 74px); }
  .gd-stage-scroll { padding-inline: 29px; }
  .gd-command-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .gd-command-grid > .gd-command-chart { grid-column: 1; }
  .gd-command-side { grid-column: 2; }
  .gd-command-grid > .gd-activity { grid-column: 1 / -1; }
}
@media (max-width: 760px) {
  .gd-surround { padding-top: 11px; padding-bottom: calc(80px + env(safe-area-inset-bottom)); inline-size: calc(100% - 24px); }
  .gd-top { grid-template-columns: minmax(0, 1fr) auto; padding: 7px 9px; gap: 6px 12px; border-radius: 21px; }
  .gd-brand { padding-inline-start: 3px; }
  .gd-ask { grid-area: 2 / 1 / 3 / -1; min-block-size: 41px; }
  .gd-top-actions { grid-area: 1 / 2; }
  .gd-top-actions .gd-icon-button { width: 41px; min-inline-size: 41px; min-block-size: 41px; }
  .gd-top-actions .gd-lang-button { min-block-size: 41px; padding: 0 10px; }
  .gd-stage { border-radius: 23px; }
  .gd-stage-scroll { block-size: auto; padding: 15px 13px 17px; overflow: visible; }
  .gd-view-head { align-items: flex-start; flex-direction: column; gap: 10px; margin-bottom: 14px; }
  .gd-view-head p { font-size: 12px; margin-top: 6px; }
  .gd-view-actions { justify-content: flex-start; }
  .gd-command-grid, .gd-analytics-grid { grid-template-columns: minmax(0, 1fr); }
  .gd-command-side, .gd-command-grid > .gd-activity { grid-column: 1; }
  .gd-metric-grid, .gd-lanes { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gd-dock-side { display: none; }
  .gd-dock-bottom { position: fixed; inset: auto 11px calc(9px + env(safe-area-inset-bottom)); translate: none; justify-content: space-between; }
  .gd-dock-bottom button.gd-dock-btn { flex: 1; flex-direction: column; gap: 2px; padding: 3px 5px; min-block-size: 47px; line-height: 1.2; font-size: 9.5px; }
  .gd-dock-bottom button.gd-dock-btn svg { width: 15px; height: 15px; }
  .gd-dock-bottom .gd-dock-text { display: none; }
  .gd-dock-bottom .gd-dock-short { display: inline; }
  .gd-footer { padding-top: 12px; }
  .gd-period button { min-block-size: 41px; }
  .gd-primary, .gd-secondary { min-block-size: 44px; }
  .gd-toast { bottom: 78px; right: 12px; left: 12px; justify-content: center; }
}
@media (max-width: 420px) {
  .gd-panel { padding: 12px; }
  .gd-metric { padding: 9px; }
  .gd-summary { gap: 5px; padding: 5px; }
  .gd-chart-axis span:nth-child(even) { visibility: hidden; }
  .gd-chart-y { font-size: 8.5px; }
  .gd-stack-label { font-size: 8px; }
  .gd-lanes { grid-template-columns: 1fr; }
  .gd-table-scroll table { min-inline-size: 278px; }
  .gd-table-scroll th, .gd-table-scroll td { padding-inline: 6px; }
  .gd-table-scroll td { font-size: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  .gd-app *, .gd-app *::before, .gd-app *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active) {
  .gd-top, .gd-stage, .gd-dock, .gd-panel, .gd-metric, .gd-summary { background: var(--gd-surface); backdrop-filter: none; -webkit-backdrop-filter: none; }
  .gd-metric[data-tone="teal"] { background: var(--gd-surface); color: var(--gd-ink); --gd-muted: var(--gd-ink); --gd-teal: var(--gd-ink); }
}
`;

// Kamus teks dwibahasa (EN / ID)
const copy = {
  en: {
    workspaceSubtitle: "SaaS Workspace",
    footerLabel: "Indonesia SaaS Workspace · WIB (UTC+7)",
    switchToDark: "Switch to dark theme",
    switchToLight: "Switch to light theme",
    switchLang: "Switch language to Indonesian",
    notifications: "Notifications",
    exportCsv: "Export CSV",
    csvExported: "CSV report downloaded",
    itemApproved: "Marked as reviewed & moved to Scheduled",
    allCaughtUp: "You’re all caught up.",
    searchPrefix: "Search",
    searchPlaceholder: "Find a view or report",
    noViews: "No matching views.",
    closeDialog: "Close dialog",
    periods: { "7d": "7 days", "30d": "30 days", "90d": "90 days" },
    views: {
      command: {
        label: "Command Center",
        short: "Command",
        description: "IDR revenue, QRIS/VA settlements, automations, and pending approvals.",
        prompt: "Show me what needs attention.",
      },
      trends: {
        label: "Trends",
        short: "Trends",
        description: "Compare operating costs and recurring revenue across billing periods.",
        prompt: "How is IDR revenue trending this month?",
      },
      metrics: {
        label: "Metrics",
        short: "Metrics",
        description: "Track subscriptions, mobile-first traffic, and payment conversions.",
        prompt: "Show me traffic by device.",
      },
      operations: {
        label: "Operations Hub",
        short: "Operations",
        description: "Manage payment approvals, e-Faktur schedules, and webhook exceptions.",
        prompt: "Which actions are waiting for review?",
      },
    },
    status: {
      complete: "Complete",
      review: "Needs review",
      scheduled: "Scheduled",
      running: "Running",
      exceptions: "Exceptions",
    },
    command: {
      totalRevenue: "Total revenue",
      vsPrior: "vs prior period",
      viewTrends: "View trends",
      viewMetrics: "View metrics",
      streams: ["Subscriptions", "Usage & API", "Enterprise"],
      automationsRun: "Automations run",
      subscribers: "Active tenants",
      thisMonth: "this month",
      churnRate: "Churn rate",
      openTickets: "Open tickets",
      resolvedToday: "9 resolved today",
      automationActivity: "Automation activity",
      automationSubtitle: "Completed and sent to review · last 7 days",
      completeLabel: "Complete",
      reviewLabel: "Review",
      capacity: "Monthly workflow quota",
      used: "used",
      monthlyRuns: "2,500 monthly runs",
      approvals: "Approvals",
      approvalsSubtitle: "Decisions waiting for an owner",
      ownerReview: "Owner review",
      ownerReviewSub: "QRIS refunds & WhatsApp renewal blasts",
    },
    analytics: {
      revenue: "Revenue",
      operatingCosts: "Operating costs",
      inPeriod: "in this period",
      netRevenue: "Net revenue",
      afterCosts: "after operating costs",
      operatingMargin: "Operating margin",
      ofRevenue: "of revenue",
      orders: "Paid invoices",
      visitors: "Visitors",
      refunds: "Refunds",
      revVsCosts: "Revenue vs operating costs",
      revVsCostsSub: "Compare IDR revenue and operating expenses across the period",
      revByDevice: "Revenue by device",
      revByDeviceSub: "Mobile and desktop checkout share across the period",
      trafficByDevice: "Traffic by device",
      costs: "Costs",
      reportingSnapshot: "Reporting snapshot",
      revAndCosts: "Revenue and operating costs (IDR)",
      to: "to",
      downloadAria: "Download IDR revenue and expense CSV",
    },
    activity: {
      title: "Recent activity",
      searchPlaceholder: "Search activity",
      allStatuses: "All statuses",
      colActivity: "Activity",
      colSource: "System",
      colStatus: "Status",
      colTime: "Time (WIB)",
      empty: "No matching activity.",
    },
    operations: {
      revAtWork: "90-day gross volume",
      last90: "last 90 days",
      activeItems: "Active work items",
      inQueue: "in operations queue",
      needsApproval: "Needs approval",
      waitingOwner: "waiting for an owner",
      connectedSystems: "Connected systems",
      inSystems: "Midtrans, Xendit, Jurnal & WABA",
      boardTitle: "Active operations board",
      boardSubtitle: "Track payment reconciliations, e-Faktur syncs, and API exceptions.",
      allLanes: "All lanes",
      queueClear: "Queue clear.",
      system: "System",
      owner: "Owner",
      reference: "Reference",
      markReviewed: "Mark reviewed",
    },
    devices: ["Desktop", "Mobile", "Tablet"],
  },
  id: {
    workspaceSubtitle: "Workspace SaaS",
    footerLabel: "Workspace SaaS Indonesia · WIB (UTC+7)",
    switchToDark: "Ubah ke mode gelap",
    switchToLight: "Ubah ke mode terang",
    switchLang: "Ubah bahasa ke Inggris",
    notifications: "Notifikasi",
    exportCsv: "Ekspor CSV",
    csvExported: "Laporan CSV berhasil diunduh",
    itemApproved: "Ditandai disetujui & dipindahkan ke Terjadwal",
    allCaughtUp: "Semua notifikasi sudah ditangani.",
    searchPrefix: "Cari di",
    searchPlaceholder: "Cari tampilan atau laporan",
    noViews: "Tampilan tidak ditemukan.",
    closeDialog: "Tutup dialog",
    periods: { "7d": "7 hari", "30d": "30 hari", "90d": "90 hari" },
    views: {
      command: {
        label: "Pusat Kendali",
        short: "Beranda",
        description: "Pendapatan IDR, settlement QRIS/VA, otomasi, dan persetujuan tertunda.",
        prompt: "Tampilkan hal yang butuh perhatian.",
      },
      trends: {
        label: "Tren Keuangan",
        short: "Tren",
        description: "Bandingkan biaya operasional dan pendapatan berulang per periode.",
        prompt: "Bagaimana tren pendapatan bulan ini?",
      },
      metrics: {
        label: "Metrik Produk",
        short: "Metrik",
        description: "Pantau transaksi berbayar, trafik mobile-first, dan performa perangkat.",
        prompt: "Tampilkan trafik berdasarkan perangkat.",
      },
      operations: {
        label: "Operasional",
        short: "Operasi",
        description: "Kelola persetujuan refund, jadwal e-Faktur, dan gangguan webhook.",
        prompt: "Aksi mana yang menunggu persetujuan?",
      },
    },
    status: {
      complete: "Selesai",
      review: "Perlu tinjauan",
      scheduled: "Terjadwal",
      running: "Berjalan",
      exceptions: "Kendala",
    },
    command: {
      totalRevenue: "Total pendapatan",
      vsPrior: "vs periode lalu",
      viewTrends: "Lihat tren",
      viewMetrics: "Lihat metrik",
      streams: ["Langganan", "Usage & API", "Enterprise"],
      automationsRun: "Otomasi berjalan",
      subscribers: "Tenant aktif",
      thisMonth: "bulan ini",
      churnRate: "Tingkat churn",
      openTickets: "Tiket terbuka",
      resolvedToday: "9 selesai hari ini",
      automationActivity: "Aktivitas otomasi",
      automationSubtitle: "Selesai dan perlu tinjauan · 7 hari terakhir",
      completeLabel: "Selesai",
      reviewLabel: "Tinjauan",
      capacity: "Kuota workflow bulanan",
      used: "terpakai",
      monthlyRuns: "2.500 eksekusi/bulan",
      approvals: "Persetujuan",
      approvalsSubtitle: "Keputusan yang menunggu PIC",
      ownerReview: "Tinjauan PIC",
      ownerReviewSub: "Refund QRIS & broadcast perpanjangan WA",
    },
    analytics: {
      revenue: "Pendapatan",
      operatingCosts: "Biaya operasional",
      inPeriod: "pada periode ini",
      netRevenue: "Pendapatan bersih",
      afterCosts: "setelah biaya operasional",
      operatingMargin: "Margin operasional",
      ofRevenue: "dari pendapatan",
      orders: "Faktur terbayar",
      visitors: "Pengunjung",
      refunds: "Refund",
      revVsCosts: "Pendapatan vs biaya operasional",
      revVsCostsSub: "Perbandingan pendapatan IDR dan pengeluaran operasional",
      revByDevice: "Pendapatan per perangkat",
      revByDeviceSub: "Kontribusi transaksi mobile dan desktop pada periode ini",
      trafficByDevice: "Trafik per perangkat",
      costs: "Biaya",
      reportingSnapshot: "Ringkasan laporan",
      revAndCosts: "Pendapatan dan biaya operasional (IDR)",
      to: "s.d.",
      downloadAria: "Unduh CSV pendapatan dan biaya IDR",
    },
    activity: {
      title: "Aktivitas terbaru",
      searchPlaceholder: "Cari aktivitas",
      allStatuses: "Semua status",
      colActivity: "Aktivitas",
      colSource: "Sistem",
      colStatus: "Status",
      colTime: "Waktu (WIB)",
      empty: "Tidak ada aktivitas yang cocok.",
    },
    operations: {
      revAtWork: "Volume bruto 90 hari",
      last90: "90 hari terakhir",
      activeItems: "Antrean aktif",
      inQueue: "di papan operasional",
      needsApproval: "Perlu persetujuan",
      waitingOwner: "menunggu tinjauan PIC",
      connectedSystems: "Sistem terhubung",
      inSystems: "Midtrans, Xendit, Jurnal & WABA",
      boardTitle: "Papan operasional aktif",
      boardSubtitle: "Pantau rekonsiliasi pembayaran, sinkronisasi e-Faktur, dan kendala API.",
      allLanes: "Semua jalur",
      queueClear: "Antrean kosong.",
      system: "Sistem",
      owner: "PIC",
      reference: "Referensi",
      markReviewed: "Tandai disetujui",
    },
    devices: ["Desktop", "Mobile", "Tablet"],
  },
};

// Data analitik per periode (collected & costs dalam juta IDR)
const analyticsData = {
  "7d": {
    revenue: 185_600_000,
    orders: 319,
    visitors: 2_840,
    refunds: 11,
    automation: 342,
    subscribers: 1_847,
    revenueChange: "+5.4%",
    orderChange: "+8.1%",
    visitorChange: "+6.3%",
    refundChange: "−9.2%",
    axis: ["Sel", "Rab", "Kam", "Jum", "Sab", "Min", "Sen"],
    axisEn: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"],
    collected: [19.2, 24.0, 21.6, 30.4, 25.4, 27.5, 37.5],
    costs: [12.8, 14.7, 11.5, 13.6, 16.6, 16.2, 13.4],
    mobileShare: [62, 65, 63, 66, 68, 67, 64],
    devices: [31, 64, 5],
  },
  "30d": {
    revenue: 755_200_000,
    orders: 1_328,
    visitors: 11_420,
    refunds: 42,
    automation: 1_460,
    subscribers: 1_847,
    revenueChange: "+9.1%",
    orderChange: "+12.8%",
    visitorChange: "+10.4%",
    refundChange: "−4.1%",
    axis: ["24 Okt", "29 Okt", "3 Nov", "8 Nov", "13 Nov", "18 Nov", "23 Nov"],
    axisEn: ["Oct 24", "Oct 29", "Nov 3", "Nov 8", "Nov 13", "Nov 18", "Nov 23"],
    collected: [88.0, 102.4, 83.2, 121.6, 108.8, 113.6, 137.6],
    costs: [54.0, 61.5, 57.2, 53.0, 74.0, 65.3, 69.0],
    mobileShare: [60, 63, 61, 65, 64, 62, 63],
    devices: [33, 62, 5],
  },
  "90d": {
    revenue: 2_017_600_000,
    orders: 3_728,
    visitors: 32_680,
    refunds: 128,
    automation: 4_120,
    subscribers: 1_847,
    revenueChange: "+14.6%",
    orderChange: "+18.2%",
    visitorChange: "+12.9%",
    refundChange: "−6.0%",
    axis: ["26 Agu", "10 Sep", "25 Sep", "10 Okt", "25 Okt", "9 Nov", "23 Nov"],
    axisEn: ["Aug 26", "Sep 10", "Sep 25", "Oct 10", "Oct 25", "Nov 9", "Nov 23"],
    collected: [219.2, 259.2, 246.4, 268.8, 297.6, 326.4, 400.0],
    costs: [142.0, 156.0, 168.5, 155.5, 186.0, 182.0, 207.0],
    mobileShare: [59, 61, 62, 64, 63, 60, 62],
    devices: [34, 61, 5],
  },
};

const automationActivity = [
  { labelId: "Sel", labelEn: "Tue", complete: 118, review: 9 },
  { labelId: "Rab", labelEn: "Wed", complete: 184, review: 12 },
  { labelId: "Kam", labelEn: "Thu", complete: 146, review: 14 },
  { labelId: "Jum", labelEn: "Fri", complete: 226, review: 17 },
  { labelId: "Sab", labelEn: "Sat", complete: 162, review: 11 },
  { labelId: "Min", labelEn: "Sun", complete: 158, review: 13 },
  { labelId: "Sen", labelEn: "Mon", complete: 249, review: 15 },
];

const initialWork = [
  {
    id: "OP-241",
    name: { en: "QRIS & VA refund approval", id: "Persetujuan refund QRIS & VA" },
    description: {
      en: "A Virtual Account duplicate payment exception is ready for finance review.",
      id: "Kendala pembayaran ganda Virtual Account siap ditinjau tim keuangan.",
    },
    tool: "Midtrans",
    owner: "Finance",
    status: "review",
    timestamp: "10:42 WIB",
  },
  {
    id: "OP-238",
    name: { en: "WhatsApp renewal blast cap", id: "Batas kirim broadcast WA" },
    description: {
      en: "Review the first batch quota for the monthly subscription renewal reminder.",
      id: "Tinjau kuota kloter pertama untuk pengingat perpanjangan langganan bulanan.",
    },
    tool: "WhatsApp API",
    owner: "Growth",
    status: "review",
    timestamp: "10:16 WIB",
  },
  {
    id: "OP-235",
    name: { en: "e-Faktur PPN batch sync", id: "Sinkronisasi e-Faktur PPN" },
    description: {
      en: "Validate 23 corporate tax invoices (Faktur Pajak) for monthly reconciliation.",
      id: "Validasi 23 Faktur Pajak korporat untuk pelaporan bulanan.",
    },
    tool: "Mekari Jurnal",
    owner: "Tax & Finance",
    status: "scheduled",
    timestamp: "15:00 WIB",
  },
  {
    id: "OP-234",
    name: { en: "Weekly MRR & retention digest", id: "Ringkasan MRR & retensi mingguan" },
    description: {
      en: "Compile recurring revenue, paid channels, and support SLA metrics.",
      id: "Rangkum pendapatan berulang, kanal akuisisi, dan metrik SLA dukungan.",
    },
    tool: "Analytics",
    owner: "Management",
    status: "scheduled",
    timestamp: "Fri 09:00 WIB",
  },
  {
    id: "OP-232",
    name: { en: "Reconcile 142 QRIS settlements", id: "Rekonsiliasi 142 settlement QRIS" },
    description: {
      en: "Matching settled QRIS, GoPay, and BCA VA payouts to tenant invoices.",
      id: "Mencocokkan pencairan QRIS, GoPay, dan VA BCA ke faktur tenant.",
    },
    tool: "Xendit",
    owner: "Operations",
    status: "running",
    timestamp: "09:52 WIB",
  },
  {
    id: "OP-229",
    name: { en: "B2B lead qualification", id: "Kualifikasi prospek B2B" },
    description: {
      en: "Routing inbound WhatsApp enterprise inquiries to the regional sales pipeline.",
      id: "Menyalurkan pertanyaan enterprise dari WhatsApp ke pipeline sales.",
    },
    tool: "WhatsApp API",
    owner: "Sales",
    status: "running",
    timestamp: "09:23 WIB",
  },
  {
    id: "OP-227",
    name: { en: "Duplicate NPWP billing profile", id: "Duplikasi NPWP profil tagihan" },
    description: {
      en: "Two tenant accounts share an NPWP tax ID. Automated e-Faktur is paused.",
      id: "Dua akun tenant memiliki NPWP sama. Penerbitan e-Faktur otomatis dijeda.",
    },
    tool: "Mekari Jurnal",
    owner: "Operations",
    status: "exceptions",
    timestamp: "09:06 WIB",
  },
  {
    id: "OP-223",
    name: { en: "Webhook signature mismatch", id: "Signature webhook tidak cocok" },
    description: {
      en: "The payment callback connector needs an updated server key to resume sync.",
      id: "Konektor callback pembayaran butuh pembaruan server key untuk lanjut sinkron.",
    },
    tool: "Midtrans",
    owner: "Engineering",
    status: "exceptions",
    timestamp: "08:41 WIB",
  },
];

const recentActivity = [
  {
    id: "ACT-108",
    event: { en: "QRIS & VA settlements reconciled", id: "Settlement QRIS & VA direkonsiliasi" },
    source: "Xendit",
    status: "complete",
    time: "10:38 WIB",
  },
  {
    id: "ACT-107",
    event: { en: "Refund exception sent to review", id: "Kendala refund dikirim ke tinjauan" },
    source: "Midtrans",
    status: "review",
    time: "10:24 WIB",
  },
  {
    id: "ACT-106",
    event: { en: "WhatsApp renewal reminders queued", id: "Pengingat perpanjangan WA dijadwalkan" },
    source: "WhatsApp API",
    status: "scheduled",
    time: "10:07 WIB",
  },
  {
    id: "ACT-105",
    event: { en: "PPN e-Faktur ledger exported", id: "Buku besar e-Faktur PPN diekspor" },
    source: "Mekari Jurnal",
    status: "complete",
    time: "09:51 WIB",
  },
  {
    id: "ACT-104",
    event: { en: "NPWP billing sync paused", id: "Sinkronisasi NPWP dijeda" },
    source: "Mekari Jurnal",
    status: "exceptions",
    time: "09:06 WIB",
  },
];

// Utility format angka dan mata uang IDR
function formatNumber(value, lang) {
  return new Intl.NumberFormat(lang === "id" ? "id-ID" : "en-US").format(Math.round(value));
}

function formatIdr(value, lang) {
  return `Rp ${formatNumber(value, lang)}`;
}

function formatIdrCompact(value, lang) {
  const abs = Math.abs(value);
  const sign = value < 0 ? "−" : "";
  const fmt = (n, digits = 1) =>
    n.toLocaleString(lang === "id" ? "id-ID" : "en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    });
  if (abs >= 1_000_000_000) {
    return `${sign}Rp ${fmt(abs / 1_000_000_000, 2)}${lang === "id" ? " M" : "B"}`;
  }
  if (abs >= 1_000_000) {
    return `${sign}Rp ${fmt(abs / 1_000_000, 1)}${lang === "id" ? " jt" : "M"}`;
  }
  if (abs >= 1_000) {
    return `${sign}Rp ${fmt(abs / 1_000, 0)}${lang === "id" ? " rb" : "K"}`;
  }
  return `${sign}Rp ${fmt(abs, 0)}`;
}

function formatMillionsTick(millions, lang) {
  if (millions === 0) return "0";
  return formatIdrCompact(millions * 1_000_000, lang);
}

function formatCountValue(value, format, lang) {
  switch (format) {
    case "idr":
      return formatIdr(value, lang);
    case "compact":
      return formatIdrCompact(value, lang);
    case "percent":
      return `${value.toFixed(1)}%`;
    default:
      return formatNumber(value, lang);
  }
}

/**
 * Ekspor data ke file CSV secara lokal dengan penanganan error.
 */
function saveCsv(filename, rows) {
  try {
    const csv = rows
      .map(row => row.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
    return true;
  } catch (error) {
    console.error("Gagal mengunduh CSV:", error);
    return false;
  }
}

/**
 * Hook preferensi reduced-motion
 */
function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * Komponen Counter dengan animasi angka halus (requestAnimationFrame)
 */
function Counter({ value, format = "number", lang }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frameId;
    const duration = 680;
    const start = performance.now();

    const step = now => {
      const progress = Math.min(1, (now - start) / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value, reduced]);

  const fullText = formatCountValue(value, format, lang);
  const animatedText = formatCountValue(display, format, lang);

  return (
    <>
      <span aria-hidden="true">{animatedText}</span>
      <span className="gd-sr">{fullText}</span>
    </>
  );
}

function Legend({ entries }) {
  return (
    <div className="gd-legend">
      {entries.map(({ label, tone }) => (
        <span key={label}>
          <i data-tone={tone} aria-hidden="true" />
          {label}
        </span>
      ))}
    </div>
  );
}

/**
 * Grafik Batang Bertumpuk Interaktif (StackChart)
 */
function StackChart({ items, labels, tones, format, title }) {
  const [active, setActive] = useState(null);
  const max = Math.max(1, ...items.map(item => item.lower + item.upper)) * 1.11;
  const selected = active === null ? undefined : items[active];

  return (
    <figure className="gd-stack" aria-label={title}>
      <div className="gd-stack-meta">
        <Legend entries={labels.map((label, index) => ({ label, tone: tones[index] }))} />
        {selected && (
          <span className="gd-chart-readout">
            {selected.label} · {format(selected.lower + selected.upper)}
          </span>
        )}
      </div>
      <div
        className="gd-stack-plot"
        style={{ "--gd-series-count": items.length }}
        onMouseLeave={() => setActive(null)}
      >
        {items.map((item, index) => (
          <button
            type="button"
            className="gd-stack-column"
            key={item.label}
            aria-label={`${item.label}: ${format(item.lower)} ${labels[0]}, ${format(item.upper)} ${labels[1]}`}
            aria-pressed={active === index}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(active === index ? null : index)}
          >
            <span className="gd-stack-track" aria-hidden="true">
              <span
                className="gd-stack-bar"
                style={{
                  height: `${((item.lower + item.upper) / max) * 100}%`,
                  "--gd-bar-delay": `${100 + index * 38}ms`,
                }}
              >
                <i data-tone={tones[1]} style={{ flexGrow: item.upper }} />
                <i data-tone={tones[0]} style={{ flexGrow: item.lower }} />
              </span>
            </span>
            <span className="gd-stack-label" aria-hidden="true">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </figure>
  );
}

/**
 * Helper kurva Bezier halus untuk grafik garis
 */
function curve(points) {
  return points.reduce((path, [x, y], index) => {
    if (index === 0) return `M ${x} ${y}`;
    const [previousX, previousY] = points[index - 1];
    const midpoint = (x + previousX) / 2;
    return `${path} C ${midpoint} ${previousY}, ${midpoint} ${y}, ${x} ${y}`;
  }, "");
}

/**
 * Grafik Garis & Area Pendapatan vs Biaya Operasional
 */
function RevenueChart({ labels, revenue, costs, lang }) {
  const fillId = `revenue-fill-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [active, setActive] = useState(null);
  const t = copy[lang].analytics;
  const plotHeight = 204;
  const width = 600;
  const max = Math.ceil((Math.max(...revenue, ...costs) * 1.14) / 20) * 20;

  const toPoints = values =>
    values.map((value, index) => [
      (index * width) / Math.max(1, values.length - 1),
      plotHeight - (value / max) * plotHeight,
    ]);

  const revenuePoints = toPoints(revenue);
  const costPoints = toPoints(costs);
  const revenueLine = curve(revenuePoints);
  const last = ((revenuePoints.length - 1) * width) / Math.max(1, revenuePoints.length - 1);
  const point = active === null ? undefined : revenuePoints[active];
  const costPoint = active === null ? undefined : costPoints[active];
  const ticks = [max, max * 0.75, max * 0.5, max * 0.25, 0];

  return (
    <figure className="gd-revenue-chart" aria-label={t.revVsCosts}>
      <div className="gd-revenue-main">
        <div className="gd-chart-y" aria-hidden="true">
          {ticks.map(value => (
            <span key={value}>{formatMillionsTick(value, lang)}</span>
          ))}
        </div>
        <div className="gd-line-plot" onMouseLeave={() => setActive(null)}>
          <svg viewBox={`0 0 ${width} ${plotHeight}`} preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="var(--gd-coral)" stopOpacity=".30" />
                <stop offset="1" stopColor="var(--gd-coral)" stopOpacity=".025" />
              </linearGradient>
            </defs>
            {ticks.map((tick, index) => (
              <line
                className="gd-grid-line"
                key={tick}
                x1="0"
                x2={width}
                y1={(plotHeight * index) / 4}
                y2={(plotHeight * index) / 4}
              />
            ))}
            <g className="gd-line-reveal">
              <path d={`${revenueLine} L ${last} ${plotHeight} H 0 Z`} fill={`url(#${fillId})`} />
              <path className="gd-chart-path" data-tone="coral" d={revenueLine} />
              <path className="gd-chart-path" data-tone="ink" d={curve(costPoints)} />
            </g>
            {point && costPoint && (
              <g>
                <line className="gd-line-cursor" x1={point[0]} x2={point[0]} y1="0" y2={plotHeight} />
                <circle cx={point[0]} cy={point[1]} r="4" fill="var(--gd-coral)" />
                <circle cx={costPoint[0]} cy={costPoint[1]} r="4" fill="var(--gd-graph-ink)" />
              </g>
            )}
          </svg>
          <div className="gd-chart-zones">
            {labels.map((label, index) => (
              <button
                type="button"
                key={label}
                aria-label={`${label}, ${t.revenue} ${formatIdrCompact(revenue[index] * 1_000_000, lang)}, ${t.costs} ${formatIdrCompact(costs[index] * 1_000_000, lang)}`}
                aria-pressed={active === index}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(active === index ? null : index)}
              />
            ))}
          </div>
          {active !== null && (
            <div
              className="gd-line-tooltip"
              style={{ "--gd-tooltip-x": `${(active / (labels.length - 1)) * 100}%` }}
            >
              <strong>{labels[active]}</strong>
              <span>
                {t.revenue} <b>{formatIdrCompact(revenue[active] * 1_000_000, lang)}</b>
              </span>
              <span>
                {t.costs} <b>{formatIdrCompact(costs[active] * 1_000_000, lang)}</b>
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="gd-chart-axis" aria-hidden="true">
        {labels.map(label => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </figure>
  );
}

const deviceTones = ["ink", "coral", "teal"];

/**
 * Grafik Donut Interaktif untuk Trafik per Perangkat
 */
function DeviceChart({ mix, visitors, lang }) {
  const maskId = `gd-ring-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [active, setActive] = useState(null);
  const deviceLabels = copy[lang].devices;
  const visitorsLabel = copy[lang].analytics.visitors;

  return (
    <div className="gd-device" aria-label={copy[lang].analytics.trafficByDevice}>
      <div className="gd-device-ring">
        <svg viewBox="0 0 124 124" aria-hidden="true">
          <defs>
            <mask id={maskId}>
              <circle
                className="gd-donut-draw"
                cx="62"
                cy="62"
                r="47"
                fill="none"
                stroke="white"
                strokeWidth="15"
                pathLength="100"
                transform="rotate(-90 62 62)"
              />
            </mask>
          </defs>
          <circle cx="62" cy="62" r="47" fill="none" stroke="var(--gd-track)" strokeWidth="14" />
          <g mask={`url(#${maskId})`} transform="rotate(-90 62 62)">
            {mix.map((ratio, index) => (
              <circle
                key={deviceLabels[index]}
                cx="62"
                cy="62"
                r="47"
                pathLength="100"
                fill="none"
                strokeWidth="14"
                data-tone={deviceTones[index]}
                className="gd-device-segment"
                data-muted={active !== null && index !== active}
                strokeDasharray={`${Math.max(0, ratio - 1.1)} 100`}
                strokeDashoffset={-mix.slice(0, index).reduce((sum, value) => sum + value, 0)}
              />
            ))}
          </g>
        </svg>
        <div className="gd-device-total">
          <strong>
            {active === null ? (
              <Counter value={visitors} lang={lang} />
            ) : (
              formatNumber(Math.round((visitors * mix[active]) / 100), lang)
            )}
          </strong>
          <span>{active === null ? visitorsLabel : deviceLabels[active]}</span>
        </div>
      </div>
      <div className="gd-device-list">
        {mix.map((ratio, index) => (
          <button
            type="button"
            key={deviceLabels[index]}
            aria-pressed={active === index}
            aria-label={`${deviceLabels[index]}, ${ratio}%`}
            onClick={() => setActive(active === index ? null : index)}
          >
            <span>
              <i data-tone={deviceTones[index]} aria-hidden="true" />
              {deviceLabels[index]}
            </span>
            <span className="gd-mix-track" aria-hidden="true">
              <i className="gd-fill" data-tone={deviceTones[index]} style={{ width: `${ratio}%` }} />
            </span>
            <strong>{ratio}%</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

function Panel({ title, subtitle, action, className = "", delay = 0, children }) {
  return (
    <section
      className={`gd-panel ${className}`}
      data-gd-enter
      style={{ "--gd-delay": `${delay}ms` }}
    >
      <header className="gd-panel-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

function Metric({ title, icon, value, format, change, detail, tone, lang, delay = 0 }) {
  return (
    <article
      className="gd-metric"
      data-tone={tone}
      data-gd-enter
      style={{ "--gd-delay": `${delay}ms` }}
    >
      <div className="gd-metric-head">
        <span>{title}</span>
        <span className="gd-metric-icon" aria-hidden="true">
          {icon}
        </span>
      </div>
      <strong className="gd-metric-value">
        <Counter value={value} format={format} lang={lang} />
      </strong>
      <div className="gd-metric-caption">
        {change && (
          <span className="gd-delta" data-attention={tone === "coral"}>
            {change.startsWith("−") ? (
              <ArrowDownRight aria-hidden="true" />
            ) : (
              <ArrowUpRight aria-hidden="true" />
            )}
            {change}
          </span>
        )}
        <span>{detail ?? copy[lang].command.vsPrior}</span>
      </div>
    </article>
  );
}

function Badge({ status, lang }) {
  const color =
    status === "complete" || status === "running"
      ? "teal"
      : status === "review" || status === "exceptions"
        ? "coral"
        : "ink";
  return (
    <span className="gd-status" data-state={color}>
      <i aria-hidden="true" />
      {copy[lang].status[status]}
    </span>
  );
}

/**
 * Tabel Aktivitas Terbaru dengan Pencarian & Filter Status
 */
function Activity({ lang, delay = 180 }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const t = copy[lang].activity;

  const show = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recentActivity.filter(item => {
      const haystack = [item.event[lang], item.source, copy[lang].status[item.status]]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q) && (status === "all" || item.status === status);
    });
  }, [query, status, lang]);

  return (
    <Panel
      title={t.title}
      className="gd-activity"
      delay={delay}
      action={
        <div className="gd-table-tools">
          <label className="gd-search">
            <Search aria-hidden="true" />
            <input
              type="search"
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </label>
          <label className="gd-filter">
            <Filter aria-hidden="true" />
            <select
              aria-label={t.allStatuses}
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              <option value="all">{t.allStatuses}</option>
              {["complete", "review", "scheduled", "exceptions"].map(key => (
                <option key={key} value={key}>
                  {copy[lang].status[key]}
                </option>
              ))}
            </select>
          </label>
        </div>
      }
    >
      <div className="gd-table-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">{t.colActivity}</th>
              <th scope="col">{t.colSource}</th>
              <th scope="col">{t.colStatus}</th>
              <th scope="col">{t.colTime}</th>
            </tr>
          </thead>
          <tbody>
            {show.map(item => (
              <tr key={item.id}>
                <td>{item.event[lang]}</td>
                <td>{item.source}</td>
                <td>
                  <Badge status={item.status} lang={lang} />
                </td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {show.length === 0 && (
        <p className="gd-empty" role="status">
          {t.empty}
        </p>
      )}
    </Panel>
  );
}

/**
 * Tampilan 1: Pusat Kendali (Command Center)
 */
function CommandView({ period, open, lang }) {
  const stats = analyticsData[period];
  const t = copy[lang].command;
  const streams = [
    { label: t.streams[0], ratio: 0.72 },
    { label: t.streams[1], ratio: 0.18 },
    { label: t.streams[2], ratio: 0.1 },
  ];
  const sources = streams.map(({ label, ratio }) => ({
    label,
    value: Math.round(stats.revenue * ratio),
  }));
  const monthlyUsed = analyticsData["30d"].automation;
  const monthlyQuota = 2_500;

  return (
    <div className="gd-command-grid">
      <Panel
        title={t.totalRevenue}
        className="gd-balance"
        delay={0}
        action={<span className="gd-unit">IDR</span>}
      >
        <div className="gd-balance-number">
          <Counter value={stats.revenue} format="idr" lang={lang} />
        </div>
        <div className="gd-balance-change">
          <span className="gd-delta">
            <ArrowUpRight aria-hidden="true" />
            {stats.revenueChange}
          </span>
          <span>{t.vsPrior}</span>
        </div>
        <div className="gd-balance-actions">
          <button type="button" className="gd-primary" onClick={() => open("trends")}>
            {t.viewTrends} <ArrowUpRight aria-hidden="true" />
          </button>
          <button type="button" className="gd-secondary" onClick={() => open("metrics")}>
            {t.viewMetrics} <ArrowRight aria-hidden="true" />
          </button>
        </div>
        <div className="gd-streams" aria-label="Revenue sources">
          {sources.map(item => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{formatIdrCompact(item.value, lang)}</strong>
            </div>
          ))}
        </div>
      </Panel>

      <div className="gd-summary">
        <Metric
          title={t.automationsRun}
          icon={<Zap />}
          value={stats.automation}
          change="+11.2%"
          tone="teal"
          lang={lang}
          delay={30}
        />
        <Metric
          title={t.subscribers}
          icon={<Users />}
          value={stats.subscribers}
          change="+124"
          detail={t.thisMonth}
          lang={lang}
          delay={60}
        />
        <Metric
          title={t.churnRate}
          icon={<ArrowDownRight />}
          value={3.4}
          format="percent"
          change="−0.4%"
          tone="coral"
          lang={lang}
          delay={90}
        />
        <Metric
          title={t.openTickets}
          icon={<ListChecks />}
          value={12}
          detail={t.resolvedToday}
          lang={lang}
          delay={120}
        />
      </div>

      <Panel
        title={t.automationActivity}
        subtitle={t.automationSubtitle}
        className="gd-command-chart"
        delay={110}
      >
        <StackChart
          items={automationActivity.map(item => ({
            label: lang === "id" ? item.labelId : item.labelEn,
            lower: item.complete,
            upper: item.review,
          }))}
          labels={[t.completeLabel, t.reviewLabel]}
          tones={["ink", "teal"]}
          format={val => formatNumber(val, lang)}
          title={t.automationActivity}
        />
      </Panel>

      <div className="gd-command-side">
        <Panel title={t.capacity} className="gd-capacity" delay={140}>
          <div
            className="gd-capacity-track"
            role="meter"
            aria-label={t.capacity}
            aria-valuenow={monthlyUsed}
            aria-valuemin={0}
            aria-valuemax={monthlyQuota}
          >
            <span className="gd-fill" style={{ width: `${(monthlyUsed / monthlyQuota) * 100}%` }} />
          </div>
          <div className="gd-capacity-label">
            <span>
              <strong>{formatNumber(monthlyUsed, lang)}</strong> {t.used}
            </span>
            <span>{t.monthlyRuns}</span>
          </div>
        </Panel>
        <Panel title={t.approvals} subtitle={t.approvalsSubtitle} className="gd-approvals" delay={170}>
          <div className="gd-approval-content">
            <span className="gd-list-icon">
              <ShieldCheck aria-hidden="true" />
            </span>
            <div>
              <strong>{t.ownerReview}</strong>
              <small>{t.ownerReviewSub}</small>
            </div>
            <button
              type="button"
              className="gd-icon-button"
              aria-label={copy[lang].views.operations.label}
              onClick={() => open("operations")}
            >
              <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </Panel>
      </div>

      <Activity lang={lang} delay={190} />
    </div>
  );
}

function AnalyticsMetrics({ period, trend, lang }) {
  const stats = analyticsData[period];
  const t = copy[lang].analytics;
  const costTotal = Math.round(stats.costs.reduce((total, cost) => total + cost, 0) * 1_000_000);
  const margin = ((stats.revenue - costTotal) / stats.revenue) * 100;

  return (
    <div className="gd-metric-grid">
      <Metric
        title={t.revenue}
        icon={<CircleDollarSign />}
        value={stats.revenue}
        format="compact"
        change={stats.revenueChange}
        tone="teal"
        lang={lang}
        delay={0}
      />
      {trend ? (
        <>
          <Metric
            title={t.operatingCosts}
            icon={<ArrowDownRight />}
            value={costTotal}
            format="compact"
            detail={t.inPeriod}
            lang={lang}
            delay={40}
          />
          <Metric
            title={t.netRevenue}
            icon={<Box />}
            value={stats.revenue - costTotal}
            format="compact"
            detail={t.afterCosts}
            lang={lang}
            delay={80}
          />
          <Metric
            title={t.operatingMargin}
            icon={<CircleDollarSign />}
            value={margin}
            format="percent"
            detail={t.ofRevenue}
            lang={lang}
            delay={120}
          />
        </>
      ) : (
        <>
          <Metric
            title={t.orders}
            icon={<ShoppingBag />}
            value={stats.orders}
            change={stats.orderChange}
            lang={lang}
            delay={40}
          />
          <Metric
            title={t.visitors}
            icon={<Eye />}
            value={stats.visitors}
            change={stats.visitorChange}
            lang={lang}
            delay={80}
          />
          <Metric
            title={t.refunds}
            icon={<ArrowDownRight />}
            value={stats.refunds}
            change={stats.refundChange}
            lang={lang}
            delay={120}
          />
        </>
      )}
    </div>
  );
}

/**
 * Tampilan 2 & 3: Tren Keuangan (Trends) & Metrik Produk (Metrics)
 */
function AnalyticsView({ period, type, download, lang }) {
  const stats = analyticsData[period];
  const axisLabels = lang === "id" ? stats.axis : stats.axisEn;
  const trend = type === "trends";
  const t = copy[lang].analytics;

  return (
    <div className="gd-analytics">
      <AnalyticsMetrics period={period} trend={trend} lang={lang} />
      <div className="gd-analytics-grid">
        <Panel
          title={trend ? t.revVsCosts : t.revByDevice}
          subtitle={trend ? t.revVsCostsSub : t.revByDeviceSub}
          delay={140}
          action={
            trend && (
              <Legend
                entries={[
                  { label: t.revenue, tone: "coral" },
                  { label: t.costs, tone: "ink" },
                ]}
              />
            )
          }
        >
          {trend ? (
            <RevenueChart
              labels={axisLabels}
              revenue={stats.collected}
              costs={stats.costs}
              lang={lang}
            />
          ) : (
            <StackChart
              title={t.revByDevice}
              labels={[copy[lang].devices[1], copy[lang].devices[0]]}
              tones={["coral", "ink"]}
              format={val => formatIdrCompact(val, lang)}
              items={axisLabels.map((label, index) => {
                const sum = stats.collected[index] * 1_000_000;
                const mobileVal = Math.round((sum * stats.mobileShare[index]) / 100);
                return { label, lower: mobileVal, upper: sum - mobileVal };
              })}
            />
          )}
        </Panel>
        <Panel title={t.trafficByDevice} className="gd-device-panel" delay={180}>
          <DeviceChart mix={stats.devices} visitors={stats.visitors} lang={lang} />
        </Panel>
      </div>
      {trend ? (
        <Panel title={t.reportingSnapshot} className="gd-statement" delay={210}>
          <div className="gd-approval-content">
            <span className="gd-list-icon">
              <Clock3 aria-hidden="true" />
            </span>
            <div>
              <strong>{t.revAndCosts}</strong>
              <small>
                {copy[lang].periods[period]} · {axisLabels[0]} {t.to} {axisLabels[axisLabels.length - 1]}
              </small>
            </div>
            <button
              type="button"
              className="gd-icon-button"
              aria-label={t.downloadAria}
              onClick={download}
            >
              <Download aria-hidden="true" />
            </button>
          </div>
        </Panel>
      ) : (
        <Activity lang={lang} delay={210} />
      )}
    </div>
  );
}

const statusStyle = {
  review: { icon: <ListChecks />, tone: "coral" },
  scheduled: { icon: <Clock3 />, tone: "ochre" },
  running: { icon: <Zap />, tone: "teal" },
  exceptions: { icon: <AlertTriangle />, tone: "ink" },
};

/**
 * Tampilan 4: Operasional (Operations Hub)
 */
function OperationsView({ work, inspect, lang }) {
  const [filter, setFilter] = useState("all");
  const t = copy[lang].operations;
  const review = work.filter(item => item.status === "review").length;
  const tools = new Set(work.map(item => item.tool)).size;
  const lanes = filter === "all" ? WORK_STATUS_KEYS : [filter];

  return (
    <div className="gd-analytics">
      <div className="gd-metric-grid">
        <Metric
          title={t.revAtWork}
          icon={<CircleDollarSign />}
          value={analyticsData["90d"].revenue}
          format="compact"
          detail={t.last90}
          tone="teal"
          lang={lang}
          delay={0}
        />
        <Metric
          title={t.activeItems}
          icon={<Zap />}
          value={work.length}
          detail={t.inQueue}
          lang={lang}
          delay={40}
        />
        <Metric
          title={t.needsApproval}
          icon={<ListChecks />}
          value={review}
          detail={t.waitingOwner}
          lang={lang}
          delay={80}
        />
        <Metric
          title={t.connectedSystems}
          icon={<ShieldCheck />}
          value={tools}
          detail={t.inSystems}
          lang={lang}
          delay={120}
        />
      </div>
      <Panel
        title={t.boardTitle}
        subtitle={t.boardSubtitle}
        className="gd-board"
        delay={150}
        action={
          <label className="gd-filter">
            <Filter aria-hidden="true" />
            <select
              aria-label={t.allLanes}
              value={filter}
              onChange={event => setFilter(event.target.value)}
            >
              <option value="all">{t.allLanes}</option>
              {WORK_STATUS_KEYS.map(status => (
                <option key={status} value={status}>
                  {copy[lang].status[status]}
                </option>
              ))}
            </select>
          </label>
        }
      >
        <div className="gd-lanes" data-filtered={filter !== "all"}>
          {lanes.map(lane => {
            const items = work.filter(item => item.status === lane);
            const laneLabel = copy[lang].status[lane];
            return (
              <section className="gd-lane" key={lane} aria-label={laneLabel}>
                <header>
                  <i data-tone={statusStyle[lane].tone} aria-hidden="true">
                    {statusStyle[lane].icon}
                  </i>
                  <h3>{laneLabel}</h3>
                  <span>{items.length}</span>
                </header>
                {items.map(item => (
                  <button
                    className="gd-work-item"
                    type="button"
                    onClick={() => inspect(item)}
                    key={item.id}
                  >
                    <span className="gd-work-titlerow">
                      <strong>{item.name[lang]}</strong>
                      <MoreHorizontal aria-hidden="true" />
                    </span>
                    <span className="gd-work-detail">{item.description[lang]}</span>
                    <span className="gd-work-meta">
                      <span>{item.tool}</span>
                      <span>{item.timestamp}</span>
                    </span>
                  </button>
                ))}
                {items.length === 0 && <p className="gd-empty">{t.queueClear}</p>}
              </section>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

/**
 * Navigasi Dock Mengambang (Samping & Bawah) dengan indikator pil dinamis
 */
function Dock({ active, side = false, select, lang }) {
  const nav = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    const container = nav.current;
    const indicator = marker.current;
    if (!container || !indicator) return;

    const adjust = () => {
      const current = container.querySelector('[aria-current="page"]');
      if (!current) return;
      indicator.style.width = `${current.offsetWidth}px`;
      indicator.style.height = `${current.offsetHeight}px`;
      indicator.style.transform = `translate(${current.offsetLeft}px, ${current.offsetTop}px)`;
      indicator.dataset.ready = "true";
    };

    const observer = new ResizeObserver(adjust);
    observer.observe(container);
    container.querySelectorAll("button").forEach(btn => observer.observe(btn));
    adjust();
    return () => observer.disconnect();
  }, [active, lang]);

  return (
    <nav
      ref={nav}
      className={side ? "gd-dock gd-dock-side" : "gd-dock gd-dock-bottom"}
      aria-label={side ? "Workspace shortcuts" : "Workspace views"}
    >
      <span ref={marker} className="gd-dock-indicator" aria-hidden="true" />
      {VIEW_DEFS.map(({ id, icon: Icon }) => {
        const meta = copy[lang].views[id];
        return (
          <button
            type="button"
            className="gd-dock-btn"
            key={id}
            aria-label={meta.label}
            aria-current={active === id ? "page" : undefined}
            onClick={() => select(id)}
          >
            <Icon aria-hidden="true" />
            <span className="gd-dock-text" aria-hidden="true">
              {meta.label}
            </span>
            <span className="gd-dock-short" aria-hidden="true">
              {meta.short}
            </span>
            {side && (
              <span className="gd-dock-tip" aria-hidden="true">
                {meta.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

/**
 * Modal Dialog yang Aksesibel (mendukung Escape & klik luar)
 */
function ModalDialog({ title, closeLabel, children, close }) {
  const labelId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    dialogRef.current?.querySelector("input")?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <div
      className="gd-modal-backdrop"
      role="presentation"
      onClick={event => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="gd-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
      >
        <section className="gd-dialog-inner">
          <header>
            <h2 id={labelId}>{title}</h2>
            <button
              type="button"
              className="gd-icon-button"
              aria-label={closeLabel}
              onClick={close}
            >
              <X aria-hidden="true" />
            </button>
          </header>
          {children}
        </section>
      </div>
    </div>
  );
}

/**
 * Dialog Pencarian Cepat / Command Palette
 */
function QuickActions({ workspaceName, select, close, lang }) {
  const [query, setQuery] = useState("");
  const t = copy[lang];
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = VIEW_DEFS.filter(({ id }) => {
    const meta = t.views[id];
    return terms.every(term =>
      `${meta.label} ${meta.description} ${meta.prompt}`.toLowerCase().includes(term)
    );
  });

  return (
    <ModalDialog title={`${t.searchPrefix} ${workspaceName}`} closeLabel={t.closeDialog} close={close}>
      <label className="gd-search gd-command-input">
        <Search aria-hidden="true" />
        <input
          type="search"
          aria-label={t.searchPlaceholder}
          placeholder={t.searchPlaceholder}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </label>
      <div className="gd-quick-list">
        {results.map(({ id, icon: Icon }) => {
          const meta = t.views[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                close();
                select(id);
              }}
            >
              <Icon aria-hidden="true" />
              <div>
                <strong>{meta.label}</strong>
                <small>{meta.description}</small>
              </div>
              <ChevronRight aria-hidden="true" />
            </button>
          );
        })}
        {results.length === 0 && (
          <p className="gd-empty" role="status">
            {t.noViews}
          </p>
        )}
      </div>
    </ModalDialog>
  );
}

/**
 * Komponen Utama GlassyDashboard
 */
export function GlassyDashboard({
  backgroundImage,
  backgroundCredit,
  workspaceName = "H ONE",
  panelFrost = 12,
  initialTheme = "light",
  initialLanguage = "en",
}) {
  const [view, setView] = useState("command");
  const [period, setPeriod] = useState("30d");
  const [theme, setTheme] = useState(initialTheme);
  const [lang, setLang] = useState(initialLanguage);
  const [modal, setModal] = useState(null);
  const [work, setWork] = useState(initialWork);
  const [readNotices, setReadNotices] = useState(false);
  const [toast, setToast] = useState(null);

  const rootRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const toastTimerRef = useRef(null);

  const showToast = useCallback(message => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Pintasan keyboard Cmd+K / Ctrl+K untuk pencarian cepat
  useEffect(() => {
    const onKeyDown = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setModal(prev => (prev === "search" ? null : "search"));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectView = useCallback(next => {
    setView(next);
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const t = copy[lang];
  const current = t.views[view];
  const workItem =
    typeof modal === "object" && modal ? work.find(item => item.id === modal.itemId) : undefined;
  const reviewCount = work.filter(item => item.status === "review").length;
  const close = useCallback(() => setModal(null), []);
  const inspect = useCallback(item => setModal({ itemId: item.id }), []);

  const slug = workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const downloadReport = () => {
    const stats = analyticsData[period];
    const axisLabels = lang === "id" ? stats.axis : stats.axisEn;
    const ok = saveCsv(`${slug}-trends-${period}.csv`, [
      ["Period", "Revenue (IDR)", "Operating Costs (IDR)"],
      ...axisLabels.map((label, index) => [
        label,
        Math.round(stats.collected[index] * 1_000_000),
        Math.round(stats.costs[index] * 1_000_000),
      ]),
    ]);
    if (ok) showToast(t.csvExported);
  };

  const downloadWork = () => {
    const ok = saveCsv(`${slug}-operations.csv`, [
      ["ID", "Workflow", "System", "Owner", "Status", "Time (WIB)"],
      ...work.map(item => [
        item.id,
        item.name[lang],
        item.tool,
        item.owner,
        copy[lang].status[item.status],
        item.timestamp,
      ]),
    ]);
    if (ok) showToast(t.csvExported);
  };

  // Render tampilan aktif dengan switch-case
  const renderView = () => {
    switch (view) {
      case "trends":
        return <AnalyticsView period={period} type="trends" download={downloadReport} lang={lang} />;
      case "metrics":
        return <AnalyticsView period={period} type="metrics" download={downloadReport} lang={lang} />;
      case "operations":
        return <OperationsView work={work} inspect={inspect} lang={lang} />;
      case "command":
      default:
        return <CommandView period={period} open={selectView} lang={lang} />;
    }
  };

  return (
    <div
      className="gd-app"
      data-theme={theme}
      ref={rootRef}
      style={{ "--gd-panel-frost": `${Math.max(0, Math.min(36, panelFrost))}px` }}
    >
      <style>{dashboardStyles}</style>
      {backgroundImage && (
        <img
          className="gd-background"
          src={backgroundImage}
          alt=""
          aria-hidden="true"
        />
      )}

      <div className="gd-surround">
        <header className="gd-top">
          <div className="gd-brand">
            <span className="gd-logo" aria-hidden="true">
              <svg viewBox="0 0 28 28" fill="none">
                <path d="m5 22 7.4-16h3.2L23 22h-4l-5-11.4L9 22H5Z" fill="currentColor" />
                <path d="M10 18h8l1.4 3h-10.8l1.4-3Z" fill="currentColor" />
              </svg>
            </span>
            <div>
              <strong>{workspaceName}</strong>
              <small>{t.workspaceSubtitle}</small>
            </div>
          </div>

          <button
            type="button"
            className="gd-ask"
            aria-label={`${t.searchPrefix} ${workspaceName}`}
            onClick={() => setModal("search")}
          >
            <span className="gd-orb" aria-hidden="true" />
            <span className="gd-prompt" key={`${view}-${lang}`}>
              {current.prompt}
            </span>
            <Search aria-hidden="true" className="gd-ask-search" />
          </button>

          <div className="gd-top-actions">
            <button
              type="button"
              className="gd-lang-button"
              title={t.switchLang}
              aria-label={t.switchLang}
              onClick={() => setLang(lang === "en" ? "id" : "en")}
            >
              <Globe aria-hidden="true" />
              {lang.toUpperCase()}
            </button>
            <button
              title={theme === "light" ? t.switchToDark : t.switchToLight}
              type="button"
              className="gd-icon-button"
              aria-label={theme === "light" ? t.switchToDark : t.switchToLight}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
            </button>
            <button
              type="button"
              className="gd-icon-button gd-notices"
              aria-label={t.notifications}
              onClick={() => {
                setReadNotices(true);
                setModal("notifications");
              }}
            >
              <Bell aria-hidden="true" />
              {!readNotices && reviewCount > 0 && <i aria-hidden="true" />}
            </button>
          </div>
        </header>

        <div className="gd-stage-wrap">
          <Dock active={view} side select={selectView} lang={lang} />
          <main className="gd-stage">
            <div className="gd-stage-scroll" ref={scrollAreaRef}>
              <header className="gd-view-head">
                <div>
                  <h1>{current.label}</h1>
                  <p>{current.description}</p>
                </div>
                <div className="gd-view-actions">
                  {view !== "operations" && (
                    <div className="gd-period" role="group" aria-label="Reporting period">
                      {PERIOD_KEYS.map(item => (
                        <button
                          type="button"
                          key={item}
                          aria-pressed={item === period}
                          onClick={() => setPeriod(item)}
                        >
                          {t.periods[item]}
                        </button>
                      ))}
                    </div>
                  )}
                  {(view === "operations" || view === "trends") && (
                    <button
                      type="button"
                      className="gd-primary gd-export"
                      onClick={view === "operations" ? downloadWork : downloadReport}
                    >
                      <ArrowDownToLine aria-hidden="true" />
                      {t.exportCsv}
                    </button>
                  )}
                </div>
              </header>

              <div className="gd-content" key={`${view}-${period}`} data-view={view}>
                {renderView()}
              </div>
            </div>
          </main>
          <Dock active={view} select={selectView} lang={lang} />
        </div>

        {backgroundCredit && (
          <footer className="gd-footer">
            <a href={backgroundCredit.href} target="_blank" rel="noreferrer">
              {backgroundCredit.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </footer>
        )}
      </div>

      {modal === "search" && (
        <QuickActions
          workspaceName={workspaceName}
          select={selectView}
          close={close}
          lang={lang}
        />
      )}

      {modal === "notifications" && (
        <ModalDialog title={t.notifications} closeLabel={t.closeDialog} close={close}>
          <div className="gd-quick-list">
            {work
              .filter(item => item.status === "review")
              .map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    selectView("operations");
                    inspect(item);
                  }}
                >
                  <Bell aria-hidden="true" />
                  <div>
                    <strong>{item.name[lang]}</strong>
                    <small>{item.description[lang]}</small>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </button>
              ))}
            {reviewCount === 0 && <p className="gd-empty">{t.allCaughtUp}</p>}
          </div>
        </ModalDialog>
      )}

      {workItem && (
        <ModalDialog
          key={workItem.id}
          title={workItem.name[lang]}
          closeLabel={t.closeDialog}
          close={close}
        >
          <Badge status={workItem.status} lang={lang} />
          <p className="gd-work-dialog-description">{workItem.description[lang]}</p>
          <dl className="gd-work-facts">
            <div>
              <dt>{t.operations.system}</dt>
              <dd>{workItem.tool}</dd>
            </div>
            <div>
              <dt>{t.operations.owner}</dt>
              <dd>{workItem.owner}</dd>
            </div>
            <div>
              <dt>{t.operations.reference}</dt>
              <dd>{workItem.id}</dd>
            </div>
          </dl>
          {workItem.status === "review" && (
            <button
              type="button"
              className="gd-primary"
              onClick={() => {
                setWork(items =>
                  items.map(item =>
                    item.id === workItem.id ? { ...item, status: "scheduled" } : item
                  )
                );
                close();
                showToast(t.itemApproved);
              }}
            >
              {t.operations.markReviewed} <Command aria-hidden="true" />
            </button>
          )}
        </ModalDialog>
      )}

      {toast && (
        <div className="gd-toast" role="status" aria-live="polite">
          <CheckCircle2 aria-hidden="true" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Error Boundary untuk menangani potensi kesalahan render dengan aman
 */
class DashboardErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, fontFamily: "system-ui, sans-serif", textAlign: "center" }}>
          <h2>Something went wrong while loading the dashboard.</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: 12,
              padding: "10px 18px",
              borderRadius: 999,
              border: "none",
              background: "#261e1b",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Reload view
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <DashboardErrorBoundary>
      <GlassyDashboard
        workspaceName="H ONE"
        panelFrost={12}
        initialTheme="light"
        initialLanguage="en"
      />
    </DashboardErrorBoundary>
  );
}