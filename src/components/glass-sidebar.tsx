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
  ArrowLeftToLine,
  ArrowRightFromLine,
  BarChart3,
  Bell,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  Folder,
  HelpCircle,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  TrendingUp,
  User,
  X,
} from "lucide-react";

/**
 * H ONE Liquid Glass Expandable Sidebar
 * Expandable glassmorphism navigation rail tailored to the H ONE SaaS Workspace theme.
 * Supports smooth expand/collapse transitions, searchable grouped & nested navigation,
 * animated sliding selection highlight, Chromium SVG backdrop refraction with CSS glass fallback,
 * scroll-edge fade masks, and light/dark theme modes.
 */

const sidebarStyles = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

.hone-shell {
  --gd-ink: #25201e;
  --gd-muted: #4b3f39;
  --gd-line: rgb(74 49 33 / 15%);
  --gd-rim: rgb(255 253 246 / 54%);
  --gd-edge-light: rgb(255 254 247 / 86%);
  --gd-edge-shade: rgb(57 40 28 / 19%);
  --gd-gloss: rgb(255 251 242 / 46%);
  --gd-frame: rgb(247 234 219 / 28%);
  --gd-rail: rgb(241 222 206 / 52%);
  --gd-card: rgb(250 242 232 / 52%);
  --gd-card-light: rgb(255 251 245 / 38%);
  --gd-raised: rgb(255 249 243 / 82%);
  --gd-inner: rgb(255 250 245 / 40%);
  --gd-surface: #f6ece2;
  --gd-primary: #261e1b;
  --gd-primary-ink: #fffaf5;
  --gd-pick: #fff9f3;
  --gd-pick-ink: #241b17;
  --gd-coral: #a43c27;
  --gd-teal: #09644f;
  --gd-ochre: #996300;
  --gd-focus: #194b48;
  --gd-dark-shadow: 35 21 14;

  position: relative;
  isolation: isolate;
  inline-size: 100%;
  min-block-size: 100svh;
  color: var(--gd-ink);
  color-scheme: light;
  font-family: "Manrope", system-ui, -apple-system, sans-serif;
  font-size: 13px;
  font-weight: 550;
  font-variant-numeric: tabular-nums;
  background:
    radial-gradient(circle at 14% 18%, #e8c7a8 0%, transparent 46%),
    radial-gradient(circle at 86% 22%, #c99d79 0%, transparent 48%),
    radial-gradient(circle at 52% 88%, #8e6c56 0%, transparent 55%),
    linear-gradient(135deg, #c7ab92 0%, #9f7e65 52%, #7d5f4c 100%);
  transition: background 0.35s ease, color 0.25s ease;
  overflow-x: clip;
}

.hone-shell[data-theme="dark"] {
  --gd-ink: #fff6e9;
  --gd-muted: #e5d5c7;
  --gd-line: rgb(243 221 198 / 18%);
  --gd-rim: rgb(255 236 212 / 30%);
  --gd-edge-light: rgb(255 242 225 / 48%);
  --gd-edge-shade: rgb(11 6 5 / 32%);
  --gd-gloss: rgb(255 237 213 / 14%);
  --gd-frame: rgb(42 31 29 / 54%);
  --gd-rail: rgb(45 32 30 / 62%);
  --gd-card: rgb(47 36 34 / 56%);
  --gd-card-light: rgb(106 88 81 / 30%);
  --gd-raised: rgb(80 67 61 / 84%);
  --gd-inner: rgb(78 61 56 / 48%);
  --gd-surface: #3b302c;
  --gd-primary: #f3ddca;
  --gd-primary-ink: #231a16;
  --gd-pick: #f9eee0;
  --gd-pick-ink: #241b17;
  --gd-coral: #ff9177;
  --gd-teal: #75dac0;
  --gd-ochre: #f1be58;
  --gd-focus: #f9bf9b;
  --gd-dark-shadow: 10 4 3;
  color-scheme: dark;
  background:
    radial-gradient(circle at 18% 16%, #6a4c3b 0%, transparent 45%),
    radial-gradient(circle at 84% 24%, #284b44 0%, transparent 46%),
    radial-gradient(circle at 50% 90%, #4e3326 0%, transparent 52%),
    linear-gradient(135deg, #2b211d 0%, #3a2b24 52%, #1f1714 100%);
}

.hone-shell *, .hone-shell *::before, .hone-shell *::after { box-sizing: border-box; }
.hone-shell [hidden] { display: none !important; }
.hone-shell a { color: inherit; text-decoration: none; }
.hone-shell button, .hone-shell input { font: inherit; color: inherit; }
.hone-shell button { cursor: pointer; }
.hone-shell :where(button, a, input):focus-visible {
  outline: 2px solid var(--gd-focus);
  outline-offset: 2px;
}
.hone-shell h1, .hone-shell h2, .hone-shell h3, .hone-shell p { margin: 0; }

/* Ambient light orbs behind the glass to showcase refraction & frost */
.hone-ambient {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}
.hone-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(54px);
  opacity: 0.55;
}
.hone-orb-1 {
  width: 340px;
  height: 340px;
  top: 6%;
  left: 4%;
  background: radial-gradient(circle, #f5d8b8 0%, transparent 70%);
}
.hone-orb-2 {
  width: 380px;
  height: 380px;
  bottom: 8%;
  left: 14%;
  background: radial-gradient(circle, #0e7c64 0%, transparent 72%);
  opacity: 0.34;
}
.hone-orb-3 {
  width: 420px;
  height: 420px;
  top: 22%;
  right: 8%;
  background: radial-gradient(circle, #c86d4b 0%, transparent 72%);
  opacity: 0.32;
}
.hone-shell[data-theme="dark"] .hone-orb-1 {
  background: radial-gradient(circle, #8a5e44 0%, transparent 70%);
  opacity: 0.5;
}
.hone-shell[data-theme="dark"] .hone-orb-2 {
  background: radial-gradient(circle, #2a8a74 0%, transparent 70%);
  opacity: 0.42;
}

/* Main Responsive Workspace Layout */
.hone-layout {
  inline-size: min(calc(100% - 36px), 1320px);
  margin-inline: auto;
  padding-block: 24px;
  min-block-size: 100svh;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: start;
  gap: 20px;
}

/* Liquid Glass Scope & Material */
.gn-scope {
  --gn-card: var(--gd-surface);
  --gn-ink: var(--gd-ink);
  --gn-muted: var(--gd-muted);
  --gn-accent: var(--gd-teal);
  --gn-ring: var(--gd-focus);
  --gn-line: var(--gd-line);
  --gn-tint: var(--gd-rail);
  --gn-edge-light: var(--gd-edge-light);
  --gn-edge-shade: var(--gd-edge-shade);
  --gn-selection: var(--gd-pick);
  color: var(--gn-ink);
  min-inline-size: 0;
  max-inline-size: 100%;
}

.gn-filter-defs { position: absolute; pointer-events: none; }
.gn-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.gn-material {
  background:
    linear-gradient(155deg, color-mix(in srgb, var(--gn-edge-light) calc(var(--gn-edge) * 34%), transparent), transparent 36% 74%, color-mix(in srgb, var(--gn-edge-light) calc(var(--gn-edge) * 20%), transparent)),
    color-mix(in srgb, var(--gn-tint) calc(var(--gn-opacity) * 100%), transparent);
  -webkit-backdrop-filter: blur(var(--gn-blur)) saturate(var(--gn-saturation));
  backdrop-filter: blur(var(--gn-blur)) saturate(var(--gn-saturation)) var(--gn-displacement, blur(0px));
  mask-image: var(--gn-lens-mask, none);
  border: 1px solid var(--gd-rim);
  box-shadow:
    inset 1px 1px 1px color-mix(in srgb, var(--gn-edge-light) calc(var(--gn-edge) * 95%), transparent),
    inset -1px -1px 1px var(--gn-edge-shade),
    inset 0 8px 14px -8px color-mix(in srgb, var(--gn-edge-light) calc(var(--gn-bend) * 62%), transparent),
    inset 0 -8px 14px -8px color-mix(in srgb, rgb(var(--gd-dark-shadow)) calc(var(--gn-bend) * 26%), transparent),
    0 18px 44px -14px rgb(var(--gd-dark-shadow) / 26%);
}

/* Sidebar Geometry */
.gn-sidebar {
  --gn-sidebar-limit: max(460px, calc(100svh - 48px));
  position: sticky;
  top: 24px;
  inline-size: 272px;
  max-inline-size: 100%;
  min-block-size: min(560px, var(--gn-sidebar-limit));
  max-block-size: var(--gn-sidebar-limit);
  padding: 13px;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  transition:
    inline-size 0.36s cubic-bezier(0.22, 1, 0.36, 1),
    border-radius 0.36s cubic-bezier(0.22, 1, 0.36, 1),
    padding 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.gn-sidebar-surface {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}

.gn-sidebar > :not(.gn-sidebar-surface) { position: relative; }

.gn-sidebar[data-expanded="false"] {
  inline-size: 72px;
  padding-inline: 10px;
  border-radius: 34px;
}

.gn-sidebar :is(button, input, a) { min-block-size: 42px; }
.gn-sidebar :is(button, a) { min-inline-size: 42px; touch-action: manipulation; }

.gn-sidebar button.gn-icon-btn {
  display: grid;
  place-items: center;
  background: transparent;
  border: 0;
  border-radius: 12px;
  inline-size: 40px;
  block-size: 40px;
  min-inline-size: 40px;
  min-block-size: 40px;
  padding: 0;
  flex: 0 0 40px;
  transition: background 0.16s ease, transform 0.16s ease;
}

.gn-sidebar :is(button.gn-icon-btn, a):hover {
  background: var(--gd-inner);
}

.gn-sidebar svg {
  inline-size: 17px;
  block-size: 17px;
  stroke-width: 1.85;
  flex: none;
}

/* Brand Header */
.gn-sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-block-end: 12px;
}
.gn-sidebar-brand button.gn-icon-btn { margin-inline-start: auto; }
.gn-sidebar[data-expanded="false"] .gn-sidebar-brand {
  flex-direction: column;
  gap: 6px;
}
.gn-sidebar[data-expanded="false"] .gn-sidebar-brand button.gn-icon-btn { margin: 0; }

.gn-sidebar-mark, .gn-sidebar-avatar {
  display: grid;
  place-items: center;
  flex: none;
  inline-size: 36px;
  block-size: 36px;
  border-radius: 50%;
  background: var(--gd-pick);
  color: var(--gd-pick-ink);
  box-shadow: inset 0 0 0 1px var(--gd-gloss), 0 2px 8px rgb(var(--gd-dark-shadow) / 14%);
}
.gn-sidebar-mark svg { inline-size: 20px; block-size: 20px; }

.gn-sidebar-brand-copy, .gn-sidebar-label { min-inline-size: 0; }
.gn-sidebar-brand-copy strong {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12.5px;
  letter-spacing: 0.16em;
  font-weight: 800;
  line-height: 1.15;
}
.gn-sidebar-brand-copy small, .gn-sidebar-account small {
  display: block;
  margin-block-start: 2px;
  color: var(--gd-muted);
  font-size: 10.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* Sidebar Search */
.gn-sidebar-search {
  min-inline-size: 0;
  display: flex;
  align-items: center;
  gap: 7px;
  margin-block-end: 12px;
  padding-inline: 11px 4px;
  border: 1px solid var(--gd-line);
  border-radius: 14px;
  background: var(--gd-inner);
  box-shadow: inset 0 1px 0 var(--gd-gloss);
}
.gn-sidebar-search svg { color: var(--gd-muted); inline-size: 15px; block-size: 15px; }
.gn-sidebar-search input {
  inline-size: 100%;
  min-inline-size: 0;
  padding: 0 4px;
  background: transparent;
  border: 0;
  font-size: 12px;
  font-weight: 600;
}
.gn-sidebar-search input::placeholder { color: var(--gd-muted); opacity: 0.85; }
.gn-sidebar-search input::-webkit-search-cancel-button { display: none; }
.gn-sidebar-search:focus-within { outline: 2px solid var(--gd-focus); }
.gn-sidebar-search input:focus-visible { outline: none; }

/* Scrollable Link Body */
.gn-sidebar-body {
  --gn-list-start-fade: 0px;
  --gn-list-end-fade: 0px;
  position: relative;
  flex: 1 1 auto;
  min-block-size: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--gd-line) transparent;
}
.gn-sidebar-body[data-scrollable="true"] {
  mask-image: linear-gradient(
    transparent,
    black var(--gn-list-start-fade),
    black calc(100% - var(--gn-list-end-fade)),
    transparent
  );
}
.gn-sidebar-body[data-scroll-start="true"] { --gn-list-start-fade: 14px; }
.gn-sidebar-body[data-scroll-end="true"] { --gn-list-end-fade: 16px; }
.gn-sidebar-body:focus-within { mask-image: none; }
.gn-sidebar[data-expanded="false"] .gn-sidebar-body[data-scrollable="false"] { overflow: visible; }
.gn-sidebar-brand, .gn-sidebar-search, .gn-sidebar-account { flex-shrink: 0; }

/* Animated Selection Highlight Pill */
.gn-sidebar-selection {
  position: absolute;
  inset: 0 0 auto;
  height: 42px;
  opacity: 0;
  border-radius: 15px;
  pointer-events: none;
  background: color-mix(in srgb, var(--gd-pick) calc(var(--gn-strength, 1) * 78%), transparent);
  box-shadow:
    inset 0 1px 1px color-mix(in srgb, white calc(var(--gn-strength, 1) * 75%), transparent),
    0 3px 10px rgb(var(--gd-dark-shadow) / 11%);
  transition:
    transform 0.34s cubic-bezier(0.24, 0.89, 0.26, 1),
    height 0.28s cubic-bezier(0.24, 0.89, 0.26, 1),
    opacity 0.22s ease;
}

.gn-sidebar-group + .gn-sidebar-group {
  margin-block-start: 10px;
  padding-block-start: 10px;
  border-block-start: 1px solid var(--gd-line);
}
.gn-sidebar-group p {
  margin: 0 10px 4px;
  color: var(--gd-muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.gn-sidebar-group ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }

.gn-sidebar-row { display: flex; align-items: center; gap: 2px; }
.gn-sidebar-row a, .gn-sidebar-children a, .gn-sidebar-account {
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;
  padding-inline: 11px;
  border-radius: 14px;
  min-inline-size: 0;
  transition: background 0.16s ease, color 0.16s ease;
}
.gn-sidebar-row a { flex: 1; }
.gn-sidebar-icon { display: grid; place-items: center; flex: 0 0 18px; }
.gn-sidebar-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12.5px;
  font-weight: 650;
}
.gn-sidebar a[data-selected="true"] {
  color: var(--gd-pick-ink);
  font-weight: 800;
}
.gn-sidebar a[data-selected="true"]::after {
  content: "";
  margin-inline-start: auto;
  flex: 0 0 5px;
  block-size: 5px;
  border-radius: 50%;
  background: var(--gd-teal);
}

.gn-sidebar-disclosure svg {
  transition: transform 0.22s ease;
  inline-size: 15px;
  block-size: 15px;
}
.gn-sidebar-disclosure[aria-expanded="false"] svg { transform: rotate(-90deg); }

.gn-sidebar-group .gn-sidebar-children {
  margin-inline-start: 18px;
  margin-block-start: 2px;
  border-inline-start: 1px solid var(--gd-line);
  padding-inline-start: 6px;
}
.gn-sidebar-children a { padding-inline-start: 9px; min-block-size: 38px; }
.gn-sidebar-children svg { inline-size: 14px; block-size: 14px; }

.gn-sidebar-badge {
  margin-inline-start: auto;
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 9.5px;
  font-weight: 800;
  background: color-mix(in srgb, var(--gd-coral) 16%, var(--gd-inner));
  color: var(--gd-coral);
  white-space: nowrap;
}
.gn-sidebar-badge-dot {
  position: absolute;
  top: 9px;
  right: 9px;
  inline-size: 6px;
  block-size: 6px;
  border-radius: 50%;
  background: var(--gd-coral);
  box-shadow: 0 0 0 2px var(--gd-surface);
}

.gn-sidebar-empty {
  margin: 0;
  padding: 12px 8px;
  color: var(--gd-muted);
  font-size: 12px;
}

/* Account Footer */
.gn-sidebar-account {
  min-block-size: 56px;
  margin-block-start: 12px;
  padding: 8px 8px 4px;
  border-block-start: 1px solid var(--gd-line);
  border-radius: 14px;
}
.gn-sidebar-account[aria-current="page"] {
  background: var(--gd-pick);
  color: var(--gd-pick-ink);
}
.gn-sidebar-account[aria-current="page"] small {
  color: #5b4d45;
}
.gn-sidebar-avatar {
  font-size: 11px;
  font-weight: 800;
  background: linear-gradient(145deg, #1e7461, #08443a);
  color: #fff;
}
.gn-sidebar-account > svg { margin-inline-start: auto; inline-size: 15px; block-size: 15px; color: var(--gd-muted); }
.gn-sidebar-account .gn-sidebar-label strong { display: block; font-size: 12px; font-weight: 800; }

/* Collapsed Rail Tooltip Behavior */
.gn-sidebar[data-expanded="false"] :is(.gn-sidebar-row a, .gn-sidebar-account) {
  justify-content: center;
  padding-inline: 0;
}
.gn-sidebar[data-expanded="false"] .gn-sidebar-row a[data-selected="true"]::after {
  position: absolute;
  inset-inline-end: 5px;
}
.gn-sidebar[data-expanded="false"] .gn-sidebar-label {
  display: none;
  position: absolute;
  inset-inline-start: calc(100% + 10px);
  z-index: 20;
  inline-size: max-content;
  max-inline-size: 170px;
  padding: 7px 11px;
  background: var(--gd-surface);
  color: var(--gd-ink);
  border: 1px solid var(--gd-rim);
  border-radius: 10px;
  box-shadow: 0 8px 20px rgb(var(--gd-dark-shadow) / 22%);
}
.gn-sidebar[data-expanded="false"] a:is(:hover, :focus-visible) .gn-sidebar-label {
  display: block;
}

/* Right Stage Canvas matching H ONE Glass Dashboard */
.hone-stage {
  border: 1px solid var(--gd-rim);
  border-radius: 32px;
  background:
    linear-gradient(148deg, var(--gd-gloss), transparent 22% 76%, color-mix(in srgb, var(--gd-gloss) 45%, transparent)),
    var(--gd-frame);
  box-shadow:
    inset 1px 1px 1px var(--gd-edge-light),
    inset -1px -1px 1px var(--gd-edge-shade),
    inset 0 0 7px var(--gd-gloss),
    0 20px 64px rgb(var(--gd-dark-shadow) / 20%);
  backdrop-filter: blur(14px) saturate(1.25);
  -webkit-backdrop-filter: blur(14px) saturate(1.25);
  padding: clamp(20px, 2.5vw, 34px);
  display: grid;
  gap: 16px;
}

.hone-stage-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px 18px;
}
.hone-kicker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--gd-inner);
  border: 1px solid var(--gd-line);
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--gd-muted);
  margin-bottom: 10px;
}
.hone-kicker svg { width: 12px; height: 12px; color: var(--gd-teal); }

.hone-stage-head h1 {
  font-size: clamp(26px, 3vw, 40px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.045em;
}
.hone-stage-head p {
  margin-top: 8px;
  font-size: 13px;
  color: var(--gd-muted);
  max-inline-size: 56ch;
  line-height: 1.5;
}

.hone-head-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.hone-pill-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-block-size: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid var(--gd-rim);
  background: var(--gd-raised);
  font-size: 11.5px;
  font-weight: 800;
  transition: background 0.18s ease, transform 0.15s ease;
}
.hone-pill-btn:hover { background: var(--gd-surface); }
.hone-pill-btn svg { width: 15px; height: 15px; }
.hone-pill-btn.primary {
  background: var(--gd-primary);
  color: var(--gd-primary-ink);
  border-color: transparent;
}
.hone-pill-btn.primary:hover { filter: brightness(1.12); background: var(--gd-primary); }

/* Preview Cards inside Stage */
.hone-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.hone-card {
  border: 1px solid var(--gd-rim);
  border-radius: 20px;
  padding: 15px 16px;
  background: linear-gradient(144deg, var(--gd-card-light), transparent 66%), var(--gd-card);
  box-shadow:
    inset 0 1px 1px var(--gd-edge-light),
    inset 0 -1px 1px var(--gd-edge-shade),
    0 6px 18px rgb(var(--gd-dark-shadow) / 9%);
  display: flex;
  flex-direction: column;
  gap: 6px;
  animation: hone-fade-up 0.36s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hone-card[data-tone="teal"] {
  color: #fff;
  border-color: rgb(196 248 231 / 55%);
  background: radial-gradient(ellipse at 5% -20%, #3a9381, transparent 68%), linear-gradient(145deg, #1e7461, #08443a);
  box-shadow: inset 0 1px 2px rgb(214 252 240 / 45%), 0 6px 14px rgb(19 78 64 / 17%);
}
.hone-card[data-tone="teal"] small { color: #d8f2e9; }
.hone-card small { font-size: 11px; color: var(--gd-muted); font-weight: 700; }
.hone-card strong { font-size: clamp(20px, 2vw, 26px); font-weight: 800; letter-spacing: -0.04em; }
.hone-card span { font-size: 11px; color: var(--gd-muted); }
.hone-card[data-tone="teal"] span { color: #b8f1dd; font-weight: 700; }

@keyframes hone-fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Interactive Glass Material Studio Panel */
.hone-studio {
  border: 1px solid var(--gd-rim);
  border-radius: 22px;
  padding: 16px 18px;
  background: linear-gradient(144deg, var(--gd-card-light), transparent 66%), var(--gd-card);
  box-shadow:
    inset 0 1px 1px var(--gd-edge-light),
    inset 0 -1px 1px var(--gd-edge-shade),
    0 6px 18px rgb(var(--gd-dark-shadow) / 9%);
}
.hone-studio-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}
.hone-studio-head h2 {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.hone-studio-head h2 svg { width: 15px; height: 15px; color: var(--gd-teal); }
.hone-studio-head span { font-size: 11px; color: var(--gd-muted); }

.hone-sliders {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 18px;
}
.hone-slider-row {
  display: grid;
  gap: 6px;
}
.hone-slider-label {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  font-weight: 700;
}
.hone-slider-label b { color: var(--gd-teal); font-weight: 800; }
.hone-slider-row input[type="range"] {
  inline-size: 100%;
  accent-color: var(--gd-teal);
  cursor: pointer;
}

/* Quick Status Feed */
.hone-feed {
  display: grid;
  gap: 8px;
}
.hone-feed-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  background: var(--gd-inner);
  border: 1px solid var(--gd-line);
}
.hone-feed-row div strong { display: block; font-size: 12px; font-weight: 800; }
.hone-feed-row div small { display: block; font-size: 11px; color: var(--gd-muted); margin-top: 2px; }
.hone-tag {
  padding: 4px 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  background: color-mix(in srgb, var(--gd-teal) 14%, var(--gd-inner));
  color: var(--gd-teal);
  white-space: nowrap;
}
.hone-tag[data-tone="coral"] {
  background: color-mix(in srgb, var(--gd-coral) 14%, var(--gd-inner));
  color: var(--gd-coral);
}

@media (max-width: 960px) {
  .hone-cards { grid-template-columns: 1fr; }
  .hone-sliders { grid-template-columns: 1fr; }
}

@media (max-width: 720px) {
  .hone-layout {
    grid-template-columns: 1fr;
    inline-size: calc(100% - 24px);
    padding-block: 14px 28px;
  }
  .gn-sidebar {
    position: relative;
    top: 0;
    inline-size: 100%;
    min-block-size: auto;
    max-block-size: none;
  }
  .gn-sidebar[data-expanded="false"] {
    inline-size: 100%;
    border-radius: 24px;
    padding-inline: 12px;
  }
  .gn-sidebar[data-expanded="false"] .gn-sidebar-brand {
    flex-direction: row;
  }
  .gn-sidebar[data-expanded="false"] .gn-sidebar-brand button.gn-icon-btn {
    margin-inline-start: auto;
  }
  .gn-sidebar[data-expanded="false"] .gn-sidebar-body {
    display: none;
  }
  .gn-sidebar[data-expanded="false"] .gn-sidebar-account {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hone-shell *, .hone-shell *::before, .hone-shell *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// Navigation Data aligned with H ONE SaaS Workspace
const HONE_NAV_GROUPS = [
  {
    label: "Workspace",
    items: [
      {
        id: "command",
        href: "#command",
        label: "Command Center",
        icon: <LayoutDashboard />,
      },
      {
        id: "analytics",
        href: "#analytics",
        label: "Analytics",
        icon: <TrendingUp />,
        children: [
          { id: "trends", href: "#trends", label: "Financial Trends", icon: <TrendingUp /> },
          { id: "metrics", href: "#metrics", label: "Product Metrics", icon: <BarChart3 /> },
          { id: "reports", href: "#reports", label: "CSV Reports", icon: <FileText /> },
        ],
      },
      {
        id: "operations",
        href: "#operations",
        label: "Operations Hub",
        icon: <Briefcase />,
        badge: "2 pending",
      },
      {
        id: "projects",
        href: "#projects",
        label: "Projects",
        icon: <Folder />,
        children: [
          { id: "gateway", href: "#gateway", label: "Payment Gateway", icon: <Layers /> },
          { id: "portal", href: "#portal", label: "Client Portal", icon: <LayoutTemplate /> },
        ],
      },
    ],
  },
  {
    label: "System",
    items: [
      { id: "calendar", href: "#calendar", label: "Schedule", icon: <CalendarDays /> },
      { id: "billing", href: "#billing", label: "Billing & e-Faktur", icon: <CreditCard /> },
      { id: "settings", href: "#settings", label: "Settings", icon: <Settings /> },
      { id: "help", href: "#help", label: "Help & Docs", icon: <HelpCircle /> },
    ],
  },
];

// Page Metadata for the Live Workspace Preview Stage
const PAGE_META = {
  command: {
    title: "Command Center",
    subtitle: "IDR revenue overview, QRIS/VA settlements, workflow automations, and pending owner approvals.",
    metrics: [
      { label: "30-Day Revenue", value: "Rp 755.2M", note: "+9.1% vs prior period", tone: "teal" },
      { label: "Active Tenants", value: "1,847", note: "+124 new this month" },
      { label: "Pending Approvals", value: "2 items", note: "Refunds & renewal caps" },
    ],
  },
  analytics: {
    title: "Analytics Overview",
    subtitle: "Unified SaaS telemetry spanning recurring billing, operating costs, and conversion funnels.",
    metrics: [
      { label: "Operating Margin", value: "42.5%", note: "Healthy SaaS benchmark", tone: "teal" },
      { label: "Paid Invoices", value: "1,328", note: "+12.8% over 30 days" },
      { label: "Mobile Share", value: "62%", note: "Primary checkout channel" },
    ],
  },
  trends: {
    title: "Financial Trends",
    subtitle: "Compare IDR recurring revenue against operating infrastructure and payment gateway costs.",
    metrics: [
      { label: "Net Revenue", value: "Rp 321.2M", note: "After operating expenses", tone: "teal" },
      { label: "Operating Costs", value: "Rp 434.0M", note: "Cloud, payroll & APIs" },
      { label: "90-Day Volume", value: "Rp 2.02B", note: "+14.6% growth trend" },
    ],
  },
  metrics: {
    title: "Product Metrics",
    subtitle: "Track paid tenant activations, mobile-first sessions, and refund ratios across devices.",
    metrics: [
      { label: "Total Visitors", value: "11,420", note: "+10.4% this month", tone: "teal" },
      { label: "Churn Rate", value: "3.4%", note: "−0.4% improvement" },
      { label: "Refund Count", value: "42", note: "−4.1% vs last month" },
    ],
  },
  reports: {
    title: "CSV Reports",
    subtitle: "Automated monthly financial statements, PPN tax ledgers, and settlement exports.",
    metrics: [
      { label: "Ready Exports", value: "14 files", note: "Updated 10:38 WIB", tone: "teal" },
      { label: "Scheduled Digests", value: "Weekly", note: "Every Friday 09:00 WIB" },
      { label: "Archive Retention", value: "24 mo", note: "Encrypted cloud vault" },
    ],
  },
  operations: {
    title: "Operations Hub",
    subtitle: "Coordinate QRIS/VA refund approvals, Mekari Jurnal e-Faktur syncs, and webhook monitoring.",
    metrics: [
      { label: "Active Queue", value: "8 items", note: "Across 4 workflow lanes", tone: "teal" },
      { label: "Needs Approval", value: "2 tasks", note: "Waiting for Finance & Growth" },
      { label: "Connected Tools", value: "4 APIs", note: "Midtrans, Xendit, Jurnal, WABA" },
    ],
  },
  projects: {
    title: "H ONE Projects",
    subtitle: "Manage core platform initiatives, customer portals, and payment gateway integrations.",
    metrics: [
      { label: "Active Initiatives", value: "6", note: "2 shipping this sprint", tone: "teal" },
      { label: "Deploy Frequency", value: "18 / wk", note: "99.98% uptime SLA" },
      { label: "Open Reviews", value: "3 PRs", note: "Ready for QA sign-off" },
    ],
  },
  gateway: {
    title: "Payment Gateway",
    subtitle: "Real-time routing across QRIS, GoPay, BCA Virtual Account, and automated settlement reconciliation.",
    metrics: [
      { label: "Success Rate", value: "99.4%", note: "QRIS & VA combined", tone: "teal" },
      { label: "Avg Settlement", value: "T+1", note: "Automated via Xendit" },
      { label: "Webhook Health", value: "99.9%", note: "1 signature alert active" },
    ],
  },
  portal: {
    title: "Client Portal",
    subtitle: "Self-service workspace where H ONE enterprise tenants manage seats, invoices, and API keys.",
    metrics: [
      { label: "Portal MAU", value: "4,920", note: "+16.2% adoption", tone: "teal" },
      { label: "Self-Serve Upgrades", value: "84", note: "Zero support touch" },
      { label: "CSAT Score", value: "4.9 / 5", note: "Based on 312 responses" },
    ],
  },
  calendar: {
    title: "Operations Schedule",
    subtitle: "Upcoming tax compliance deadlines, batch payouts, and automated renewal broadcasts.",
    metrics: [
      { label: "Today's Runs", value: "5 jobs", note: "Next at 15:00 WIB", tone: "teal" },
      { label: "e-Faktur Sync", value: "23 docs", note: "Scheduled for Tax team" },
      { label: "MRR Digest", value: "Fri 09:00", note: "Executive summary" },
    ],
  },
  billing: {
    title: "Billing & e-Faktur",
    subtitle: "Corporate NPWP validation, PPN 11% tax invoice generation, and ledger reconciliation.",
    metrics: [
      { label: "Synced Invoices", value: "1,286", note: "Linked to Mekari Jurnal", tone: "teal" },
      { label: "NPWP Alerts", value: "1 case", note: "Duplicate tax ID paused" },
      { label: "Auto-Reconciled", value: "97.8%", note: "Zero manual entry" },
    ],
  },
  settings: {
    title: "Workspace Settings",
    subtitle: "Configure H ONE organization security, SSO roles, API credentials, and notification webhooks.",
    metrics: [
      { label: "Security Posture", value: "Strong", note: "2FA enforced for admins", tone: "teal" },
      { label: "Active API Keys", value: "7 keys", note: "Rotated 14 days ago" },
      { label: "Team Seats", value: "18 / 25", note: "Enterprise tier" },
    ],
  },
  help: {
    title: "Help & Documentation",
    subtitle: "Developer guides, webhook troubleshooting playbooks, and priority support channels.",
    metrics: [
      { label: "Avg First Reply", value: "12 min", note: "Priority SLA active", tone: "teal" },
      { label: "Open Tickets", value: "12", note: "9 resolved today" },
      { label: "System Status", value: "Operational", note: "All regions green" },
    ],
  },
  profile: {
    title: "H ONE Admin Profile",
    subtitle: "Manage personal preferences, workspace notifications, and active login sessions.",
    metrics: [
      { label: "Role", value: "Owner", note: "Full workspace access", tone: "teal" },
      { label: "Timezone", value: "WIB", note: "UTC+7 (Jakarta)" },
      { label: "Active Sessions", value: "2 devices", note: "Verified hardware" },
    ],
  },
};

const SVG_NS = "http://www.w3.org/2000/svg";

function clampNumber(value, fallback, min, max) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

function roundedDistance(x, y, halfWidth, halfHeight, radius) {
  const dx = Math.abs(x) - halfWidth + radius;
  const dy = Math.abs(y) - halfHeight + radius;
  return Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) + Math.min(Math.max(dx, dy), 0) - radius;
}

/**
 * Generates an edge displacement map for subtle liquid-glass refraction on Chromium browsers.
 * Falls back cleanly to standard CSS backdrop blur & specular borders on other browsers.
 */
function useNavigationRefraction(scopeRef, distortion) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    const root = scopeRef.current;
    if (!root || distortion === 0 || typeof navigator === "undefined") return;

    const isChromium =
      /Chrome|Chromium|Edg/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
    if (!isChromium || !CSS.supports("backdrop-filter", "url(#lens)")) return;

    const preference = window.matchMedia(
      "(prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active)"
    );

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "gn-filter-defs");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute("aria-hidden", "true");
    const defs = document.createElementNS(SVG_NS, "defs");
    svg.append(defs);
    root.append(svg);

    let frame = 0;
    const surfaces = Array.from(root.querySelectorAll("[data-gn-lens]"));
    const signatures = new Map();

    const clearSurface = surface => {
      surface.style.removeProperty("--gn-displacement");
      surface.style.removeProperty("--gn-lens-mask");
      signatures.delete(surface);
    };

    const build = () => {
      frame = 0;
      try {
        for (const [index, surface] of surfaces.entries()) {
          if (preference.matches || !surface.offsetWidth || !surface.offsetHeight) {
            clearSurface(surface);
            continue;
          }
          const width = surface.offsetWidth;
          const height = surface.offsetHeight;
          const radius = Math.min(
            parseFloat(getComputedStyle(surface).borderTopLeftRadius) || 26,
            width / 2,
            height / 2
          );
          const signature = `${width}:${height}:${radius}:${distortion}`;
          if (signatures.get(surface) === signature) continue;

          const canvas = document.createElement("canvas");
          canvas.width = Math.min(192, Math.ceil(width / 2));
          canvas.height = Math.min(240, Math.ceil(height / 2));
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          const image = ctx.createImageData(canvas.width, canvas.height);
          const bevel = Math.min(18, height / 4);
          const distFn = (x, y) =>
            roundedDistance(x - width / 2, y - height / 2, width / 2, height / 2, radius);

          for (let row = 0; row < canvas.height; row++) {
            for (let col = 0; col < canvas.width; col++) {
              const x = ((col + 0.5) * width) / canvas.width;
              const y = ((row + 0.5) * height) / canvas.height;
              const d = distFn(x, y);
              const bend = d < 0 ? Math.sin(Math.min(1, -d / bevel) * Math.PI) : 0;
              const dx = distFn(x + 1, y) - distFn(x - 1, y);
              const dy = distFn(x, y + 1) - distFn(x, y - 1);
              const len = Math.hypot(dx, dy) || 1;
              const px = (row * canvas.width + col) * 4;
              image.data[px] = 128 + (dx / len) * bend * 110;
              image.data[px + 1] = 128 + (dy / len) * bend * 110;
              image.data[px + 2] = 128;
              image.data[px + 3] = 255;
            }
          }

          ctx.putImageData(image, 0, 0);
          const filterId = `gn-optics-${uid}-${index}`;
          const maskId = `${filterId}-boundary`;

          const filter = document.createElementNS(SVG_NS, "filter");
          const feImage = document.createElementNS(SVG_NS, "feImage");
          const feDisp = document.createElementNS(SVG_NS, "feDisplacementMap");

          const setAttrs = (el, map) => {
            Object.entries(map).forEach(([k, v]) => el.setAttribute(k, v));
          };

          setAttrs(filter, {
            id: filterId,
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            "color-interpolation-filters": "sRGB",
          });
          setAttrs(feImage, {
            href: canvas.toDataURL(),
            width: "100%",
            height: "100%",
            preserveAspectRatio: "none",
            result: "lens",
          });
          setAttrs(feDisp, {
            in: "SourceGraphic",
            in2: "lens",
            scale: String(distortion),
            xChannelSelector: "R",
            yChannelSelector: "G",
          });

          filter.append(feImage, feDisp);
          defs.querySelector(`#${filterId}`)?.remove();
          defs.append(filter);

          defs.querySelector(`#${maskId}`)?.remove();
          const mask = document.createElementNS(SVG_NS, "mask");
          const rect = document.createElementNS(SVG_NS, "rect");
          setAttrs(mask, {
            id: maskId,
            maskUnits: "userSpaceOnUse",
            maskContentUnits: "userSpaceOnUse",
            x: "0",
            y: "0",
            width: String(width),
            height: String(height),
          });
          setAttrs(rect, {
            width: String(width),
            height: String(height),
            rx: String(radius),
            fill: "white",
          });
          mask.append(rect);
          defs.append(mask);

          surface.style.setProperty("--gn-lens-mask", `url(#${maskId})`);
          surface.style.setProperty("--gn-displacement", `url(#${filterId})`);
          signatures.set(surface, signature);
        }
      } catch {
        surfaces.forEach(clearSurface);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(build);
    };

    const observer = new ResizeObserver(schedule);
    surfaces.forEach(s => observer.observe(s));
    preference.addEventListener("change", schedule);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      preference.removeEventListener("change", schedule);
      surfaces.forEach(clearSurface);
      svg.remove();
    };
  }, [scopeRef, uid, distortion]);
}

/**
 * H ONE Emblem Mark SVG (consistent with H ONE Glass Dashboard)
 */
function HOneLogoMark() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="m5 22 7.4-16h3.2L23 22h-4l-5-11.4L9 22H5Z" fill="currentColor" />
      <path d="M10 18h8l1.4 3h-10.8l1.4-3Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Reusable Liquid Glass Expandable Sidebar Component
 */
export function LiquidGlassExpandableSidebar({
  groups,
  activeId,
  brand = "H ONE",
  brandDetail = "SaaS Workspace",
  brandIcon,
  account,
  expanded: controlled,
  defaultExpanded = true,
  selectionLight = 1,
  glass = {},
  onExpandedChange,
  onNavigate,
}) {
  const [localExpanded, setLocalExpanded] = useState(defaultExpanded);
  const [search, setSearch] = useState("");
  const [closedGroups, setClosedGroups] = useState(() => new Set());
  const expanded = controlled ?? localExpanded;
  const query = expanded ? search.trim().toLowerCase() : "";

  const scopeRef = useRef(null);
  const bodyRef = useRef(null);
  const markerRef = useRef(null);
  const inputRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const bodyId = useId();

  const blurVal = clampNumber(glass.blur, 14, 0, 36);
  const opacityVal = clampNumber(glass.opacity, 0.72, 0.15, 0.95);
  const saturationVal = clampNumber(glass.saturation, 1.35, 0.6, 2);
  const edgeVal = clampNumber(glass.edge, 0.85, 0, 1);
  const distortionVal = clampNumber(glass.distortion, 18, 0, 50);

  useNavigationRefraction(scopeRef, distortionVal);

  const filtered = useMemo(() => {
    return groups.map(group => ({
      label: group.label,
      items: group.items.filter(
        item =>
          item.label.toLowerCase().includes(query) ||
          item.children?.some(child => child.label.toLowerCase().includes(query))
      ),
    }));
  }, [groups, query]);

  const hasResults = filtered.some(group => group.items.length > 0);

  const handleToggle = () => {
    const next = !expanded;
    if (controlled === undefined) setLocalExpanded(next);
    onExpandedChange?.(next);
  };

  const clearSearch = () => {
    setSearch("");
    inputRef.current?.focus();
  };

  const toggleGroup = id => {
    setClosedGroups(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNavClick = (item, event) => {
    event.preventDefault();
    onNavigate?.(item, event);
  };

  useEffect(() => {
    if (!expanded) setSearch("");
  }, [expanded]);

  // Synchronize smooth sliding highlight pill and scroll edge fades
  useEffect(() => {
    const list = bodyRef.current;
    const marker = markerRef.current;
    if (!list || !marker) return;

    const updateScrollEdges = () => {
      const remaining = list.scrollHeight - list.clientHeight;
      list.dataset.scrollable = String(remaining > 1);
      list.dataset.scrollStart = String(list.scrollTop > 1);
      list.dataset.scrollEnd = String(remaining - list.scrollTop > 1);
    };

    const updateMarker = () => {
      updateScrollEdges();
      const selected = list.querySelector('[data-selected="true"]');
      if (!selected) {
        marker.style.opacity = "0";
        return;
      }
      let top = 0;
      let node = selected;
      while (node && node !== list) {
        top += node.offsetTop;
        node = node.offsetParent;
      }
      marker.style.transform = `translateY(${top}px)`;
      marker.style.height = `${selected.offsetHeight}px`;
      marker.style.opacity = "1";
    };

    updateMarker();
    const observer = new ResizeObserver(updateMarker);
    observer.observe(list);
    list.addEventListener("scroll", updateScrollEdges, { passive: true });
    const timer = setTimeout(updateMarker, 160);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      list.removeEventListener("scroll", updateScrollEdges);
    };
  }, [activeId, query, expanded, closedGroups, groups]);

  const materialStyle = {
    "--gn-blur": `${blurVal}px`,
    "--gn-opacity": opacityVal,
    "--gn-saturation": saturationVal,
    "--gn-edge": edgeVal,
    "--gn-bend": distortionVal / 60,
    "--gn-strength": clampNumber(selectionLight, 1, 0, 1.4),
  };

  const currentAccount = account?.id !== undefined && account.id === activeId;

  return (
    <div ref={scopeRef} className="gn-scope" style={materialStyle}>
      <nav
        className="gn-sidebar"
        data-expanded={expanded}
        aria-label={`${brand} navigation`}
      >
        <div className="gn-sidebar-surface gn-material" data-gn-lens="sidebar" aria-hidden="true" />

        {/* Brand Header & Collapse Toggle */}
        <div className="gn-sidebar-brand">
          <span className="gn-sidebar-mark" aria-hidden="true">
            {brandIcon ?? <HOneLogoMark />}
          </span>
          {expanded && (
            <div className="gn-sidebar-brand-copy">
              <strong>{brand}</strong>
              {brandDetail && <small>{brandDetail}</small>}
            </div>
          )}
          <button
            type="button"
            className="gn-icon-btn"
            ref={toggleBtnRef}
            aria-expanded={expanded}
            aria-controls={bodyId}
            aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
            title={expanded ? "Collapse sidebar" : "Expand sidebar"}
            onClick={handleToggle}
          >
            {expanded ? <ArrowLeftToLine aria-hidden="true" /> : <ArrowRightFromLine aria-hidden="true" />}
          </button>
        </div>

        {/* Searchable Navigation Filter */}
        <div className="gn-sidebar-search" hidden={!expanded}>
          <Search aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            aria-label="Find a page"
            placeholder="Find a page..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            onKeyDown={event => {
              if (event.key === "Escape" && search) {
                event.preventDefault();
                clearSearch();
              }
            }}
          />
          {search && (
            <button
              type="button"
              className="gn-icon-btn"
              aria-label="Clear search"
              onClick={clearSearch}
            >
              <X aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Scrollable Grouped & Nested Links */}
        <div className="gn-sidebar-body" ref={bodyRef} id={bodyId}>
          <div className="gn-sidebar-selection" ref={markerRef} aria-hidden="true" />

          {filtered
            .filter(group => group.items.length > 0)
            .map(group => (
              <div className="gn-sidebar-group" key={group.label}>
                {expanded && <p>{group.label}</p>}
                <ul aria-label={group.label}>
                  {group.items.map(item => {
                    const children = item.label.toLowerCase().includes(query)
                      ? item.children
                      : item.children?.filter(child => child.label.toLowerCase().includes(query));
                    const open = expanded && (Boolean(query) || !closedGroups.has(item.id));
                    const childIsCurrent = item.children?.some(child => child.id === activeId);
                    const current = item.id === activeId;
                    const currentBranch = Boolean(childIsCurrent && !open);
                    const panelId = `${bodyId}-${encodeURIComponent(item.id)}`;

                    return (
                      <li key={item.id}>
                        <div className="gn-sidebar-row">
                          <a
                            href={item.href}
                            data-selected={current || currentBranch}
                            aria-label={item.badge ? `${item.label}, ${item.badge}` : item.label}
                            aria-current={current ? "page" : currentBranch ? "location" : undefined}
                            onClick={event => handleNavClick(item, event)}
                          >
                            <span className="gn-sidebar-icon" aria-hidden="true">
                              {item.icon}
                            </span>
                            <span className="gn-sidebar-label">{item.label}</span>
                            {expanded && item.badge && (
                              <span className="gn-sidebar-badge" aria-hidden="true">
                                {item.badge}
                              </span>
                            )}
                            {!expanded && item.badge && (
                              <span className="gn-sidebar-badge-dot" aria-hidden="true" />
                            )}
                          </a>

                          {expanded && Boolean(children?.length) && !query && (
                            <button
                              type="button"
                              className="gn-icon-btn gn-sidebar-disclosure"
                              aria-label={`${item.label} subpages`}
                              aria-expanded={open}
                              aria-controls={panelId}
                              onClick={() => toggleGroup(item.id)}
                            >
                              <ChevronDown aria-hidden="true" />
                            </button>
                          )}
                        </div>

                        {Boolean(children?.length) && (
                          <ul className="gn-sidebar-children" id={panelId} hidden={!open}>
                            {children.map(child => (
                              <li key={child.id}>
                                <a
                                  href={child.href}
                                  aria-current={child.id === activeId ? "page" : undefined}
                                  data-selected={child.id === activeId}
                                  onClick={event => handleNavClick(child, event)}
                                >
                                  <span className="gn-sidebar-icon" aria-hidden="true">
                                    {child.icon}
                                  </span>
                                  <span className="gn-sidebar-label">{child.label}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

          <p role="status" className={hasResults ? "gn-sr-only" : "gn-sidebar-empty"}>
            {!hasResults && (query ? "No matching pages. Try another keyword." : "No pages available.")}
            {hasResults && query && "Matching pages shown."}
          </p>
        </div>

        {/* Account Footer */}
        {account && (
          <a
            className="gn-sidebar-account"
            href={account.href}
            aria-label={expanded ? undefined : account.name}
            aria-current={currentAccount ? "page" : undefined}
            onClick={event =>
              handleNavClick(
                { id: account.id ?? "profile", label: account.name, href: account.href, icon: null },
                event
              )
            }
          >
            <span className="gn-sidebar-avatar" aria-hidden="true">
              {account.initials}
            </span>
            <span className="gn-sidebar-label" aria-hidden={!expanded || undefined}>
              <strong>{account.name}</strong>
              <small>{account.detail}</small>
            </span>
            {expanded && <ChevronRight aria-hidden="true" />}
          </a>
        )}
      </nav>
    </div>
  );
}

/**
 * Interactive Workspace Showcase pairing the H ONE Liquid Glass Sidebar
 * with a live contextual preview stage and material tuner.
 */
function HOneSidebarWorkspace() {
  const [theme, setTheme] = useState("light");
  const [activeId, setActiveId] = useState("command");
  const [expanded, setExpanded] = useState(true);
  const [frost, setFrost] = useState(14);
  const [edgeLight, setEdgeLight] = useState(0.85);
  const [refraction, setRefraction] = useState(18);
  const [selectionLight, setSelectionLight] = useState(1.0);

  const page = PAGE_META[activeId] ?? PAGE_META.command;

  const handleNavigate = useCallback(item => {
    setActiveId(item.id);
  }, []);

  return (
    <div className="hone-shell" data-theme={theme}>
      <style>{sidebarStyles}</style>

      {/* Ambient warm gradients to give the liquid glass depth */}
      <div className="hone-ambient" aria-hidden="true">
        <span className="hone-orb hone-orb-1" />
        <span className="hone-orb hone-orb-2" />
        <span className="hone-orb hone-orb-3" />
      </div>

      <div className="hone-layout">
        <LiquidGlassExpandableSidebar
          groups={HONE_NAV_GROUPS}
          activeId={activeId}
          brand="H ONE"
          brandDetail="SaaS Workspace"
          account={{
            id: "profile",
            name: "H ONE Admin",
            detail: "admin@hone.id",
            initials: "HO",
            href: "#profile",
          }}
          expanded={expanded}
          onExpandedChange={setExpanded}
          onNavigate={handleNavigate}
          selectionLight={selectionLight}
          glass={{
            blur: frost,
            edge: edgeLight,
            distortion: refraction,
          }}
        />

        {/* Contextual H ONE Workspace Stage */}
        <main className="hone-stage">
          <header className="hone-stage-head">
            <div>
              <span className="hone-kicker">
                <Sparkles aria-hidden="true" />
                H ONE · Active Route: #{activeId}
              </span>
              <h1>{page.title}</h1>
              <p>{page.subtitle}</p>
            </div>

            <div className="hone-head-actions">
              <button
                type="button"
                className="hone-pill-btn"
                onClick={() => setExpanded(prev => !prev)}
              >
                {expanded ? <ArrowLeftToLine aria-hidden="true" /> : <ArrowRightFromLine aria-hidden="true" />}
                {expanded ? "Collapse Rail" : "Expand Sidebar"}
              </button>
              <button
                type="button"
                className="hone-pill-btn primary"
                onClick={() => setTheme(prev => (prev === "light" ? "dark" : "light"))}
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
          </header>

          {/* Dynamic KPI Cards for the Selected Route */}
          <section className="hone-cards" key={activeId} aria-label="Route metrics">
            {page.metrics.map(card => (
              <article className="hone-card" key={card.label} data-tone={card.tone}>
                <small>{card.label}</small>
                <strong>{card.value}</strong>
                <span>{card.note}</span>
              </article>
            ))}
          </section>

          {/* Live Glass Material Tuner */}
          <section className="hone-studio" aria-label="Glass material controls">
            <div className="hone-studio-head">
              <h2>
                <SlidersHorizontal aria-hidden="true" />
                Liquid Glass Material Studio
              </h2>
              <span>Adjust real-time sidebar optics</span>
            </div>
            <div className="hone-sliders">
              <label className="hone-slider-row">
                <span className="hone-slider-label">
                  <span>Frost Blur</span>
                  <b>{frost}px</b>
                </span>
                <input
                  type="range"
                  min={2}
                  max={30}
                  step={1}
                  value={frost}
                  onChange={e => setFrost(Number(e.target.value))}
                />
              </label>

              <label className="hone-slider-row">
                <span className="hone-slider-label">
                  <span>Specular Edge Light</span>
                  <b>{Math.round(edgeLight * 100)}%</b>
                </span>
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={edgeLight}
                  onChange={e => setEdgeLight(Number(e.target.value))}
                />
              </label>

              <label className="hone-slider-row">
                <span className="hone-slider-label">
                  <span>Edge Refraction</span>
                  <b>{refraction}</b>
                </span>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={2}
                  value={refraction}
                  onChange={e => setRefraction(Number(e.target.value))}
                />
              </label>

              <label className="hone-slider-row">
                <span className="hone-slider-label">
                  <span>Selection Pill Glow</span>
                  <b>{Math.round(selectionLight * 100)}%</b>
                </span>
                <input
                  type="range"
                  min={0.3}
                  max={1.3}
                  step={0.05}
                  value={selectionLight}
                  onChange={e => setSelectionLight(Number(e.target.value))}
                />
              </label>
            </div>
          </section>

          {/* Live System Signals */}
          <section className="hone-studio" aria-label="Workspace highlights">
            <div className="hone-studio-head">
              <h2>
                <ShieldCheck aria-hidden="true" />
                H ONE Navigation Highlights
              </h2>
              <span>Interactive behaviors ready</span>
            </div>
            <div className="hone-feed">
              <div className="hone-feed-row">
                <div>
                  <strong>Instant Page Filtering</strong>
                  <small>Type inside the sidebar search bar to filter parent groups and nested subpages live.</small>
                </div>
                <span className="hone-tag">Searchable</span>
              </div>
              <div className="hone-feed-row">
                <div>
                  <strong>Collapsed Icon Rail with Floating Tooltips</strong>
                  <small>Collapse the sidebar to a 72px glass rail and hover any icon to reveal its label.</small>
                </div>
                <span className="hone-tag">Adaptive</span>
              </div>
              <div className="hone-feed-row">
                <div>
                  <strong>Operations Approval Badges</strong>
                  <small>2 pending finance & growth items stay visible in both expanded and collapsed states.</small>
                </div>
                <span className="hone-tag" data-tone="coral">2 Pending</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/**
 * Error Boundary for resilient rendering
 */
class SidebarErrorBoundary extends Component {
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
          <h2>Unable to load H ONE Sidebar.</h2>
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
            Reload Workspace
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <SidebarErrorBoundary>
      <HOneSidebarWorkspace />
    </SidebarErrorBoundary>
  );
}