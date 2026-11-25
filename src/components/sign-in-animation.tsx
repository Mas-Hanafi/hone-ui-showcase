import React, { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogOut,
  Mail,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react"

// ============================================================================
// H ONE HOSPITALITY OS — PRO SIGN-IN ANIMATION (GLASSMORPHISM EDITION)
// Single-file interactive glass-style sign-in experience:
// - Sculpted frosted liquid-glass card with cursor-tracking specular sheen
// - Layered aurora light orbs + concentric orbital rings refracting behind glass
// - Smooth requestAnimationFrame pointer parallax (respects reduced motion)
// - Full interactive Sign In, Create Account, Reset Password & OAuth flows
// - Light (Crystal Frost) & Dark (Smoked Obsidian Glass) themes + EN/ID locale
// ============================================================================

const RING_SIZES = [300, 372, 452, 542, 644, 758, 884, 1000]

const COPY = {
  en: {
    brandSub: "Hospitality OS",
    newPrompt: "New to H One?",
    createAccount: "Create account",
    haveAccount: "Already have an account?",
    backToSignIn: "Sign in",
    welcomeTitle: "Welcome back.",
    welcomeSub: "Your hospitality workspace awaits.",
    registerTitle: "Join H One.",
    registerSub: "Set up your property workspace in seconds.",
    forgotTitle: "Reset password.",
    forgotSub: "We will send a secure recovery link to your inbox.",
    fullName: "Full name",
    email: "Work email address",
    password: "Password",
    forgotLink: "Forgot password?",
    signInBtn: "Sign in",
    createBtn: "Create account",
    resetBtn: "Send recovery link",
    signingIn: "Authenticating...",
    or: "or",
    googleBtn: "Continue with Google",
    facebookBtn: "Continue with Facebook",
    footerTag: "Seamless operations start here.",
    terms: "Terms",
    privacy: "Privacy",
    invalidEmail: "Please enter a valid work email address.",
    shortPassword: "Password must be at least 6 characters.",
    missingName: "Please enter your full name.",
    resetSentTitle: "Recovery link sent",
    resetSentDesc: "Check your inbox for instructions to reset your H One password.",
    signedInBadge: "Authenticated Session",
    signedInTitle: "Signed in to H One",
    signedInDesc: "Your property dashboard and live F&B operations are ready.",
    signOutBtn: "Sign out & preview again",
    demoFill: "Use demo credentials",
    termsTitle: "H One Terms of Service",
    privacyTitle: "H One Privacy Policy",
    legalBody:
      "H One Hospitality OS protects guest records, property operations, and staff sessions with end-to-end encrypted authentication and strict role-based access control.",
  },
  id: {
    brandSub: "Hospitality OS",
    newPrompt: "Baru di H One?",
    createAccount: "Buat akun",
    haveAccount: "Sudah punya akun?",
    backToSignIn: "Masuk",
    welcomeTitle: "Selamat datang.",
    welcomeSub: "Ruang kerja properti Anda telah siap.",
    registerTitle: "Gabung H One.",
    registerSub: "Siapkan workspace hotel Anda dalam hitungan detik.",
    forgotTitle: "Atur ulang sandi.",
    forgotSub: "Kami akan mengirimkan tautan pemulihan aman ke email Anda.",
    fullName: "Nama lengkap",
    email: "Alamat email kerja",
    password: "Kata sandi",
    forgotLink: "Lupa kata sandi?",
    signInBtn: "Masuk",
    createBtn: "Buat akun",
    resetBtn: "Kirim tautan pemulihan",
    signingIn: "Memverifikasi...",
    or: "atau",
    googleBtn: "Lanjutkan dengan Google",
    facebookBtn: "Lanjutkan dengan Facebook",
    footerTag: "Operasional hotel mulus dimulai di sini.",
    terms: "Ketentuan",
    privacy: "Privasi",
    invalidEmail: "Mohon masukkan alamat email kerja yang valid.",
    shortPassword: "Kata sandi minimal terdiri dari 6 karakter.",
    missingName: "Mohon masukkan nama lengkap Anda.",
    resetSentTitle: "Tautan pemulihan terkirim",
    resetSentDesc: "Periksa kotak masuk Anda untuk mengatur ulang sandi H One.",
    signedInBadge: "Sesi Terverifikasi",
    signedInTitle: "Berhasil masuk ke H One",
    signedInDesc: "Dashboard properti dan operasional F&B Anda siap digunakan.",
    signOutBtn: "Keluar & lihat pratinjau lagi",
    demoFill: "Isi akun demo",
    termsTitle: "Ketentuan Layanan H One",
    privacyTitle: "Kebijakan Privasi H One",
    legalBody:
      "H One Hospitality OS melindungi data tamu, operasional properti, dan sesi staf menggunakan autentikasi terenkripsi serta kontrol akses berbasis peran.",
  },
}

/** Brand Google multi-color SVG icon */
function GoogleIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.6h3.3c1.9-1.8 2.9-4.4 2.9-7.5Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2.1 1-3.4 1a5.9 5.9 0 0 1-5.5-4.1H3.1v2.7A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.5 13.9a6 6 0 0 1 0-3.8V7.4H3.1a10 10 0 0 0 0 9.2l3.4-2.7Z"
      />
      <path
        fill="#EA4335"
        d="M12 6c1.5 0 2.8.5 3.9 1.5l2.9-2.9A9.8 9.8 0 0 0 3.1 7.4l3.4 2.7A5.9 5.9 0 0 1 12 6Z"
      />
    </svg>
  )
}

/** Brand Facebook SVG icon */
function FacebookIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 512 512" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
      />
    </svg>
  )
}

/** Animated geometric H One glass monogram mark */
function HOneMark({ darkMode, className = "hone-mark hone-rise" }) {
  return (
    <div className="hone-mark-wrap hone-rise">
      <svg className={className} viewBox="0 0 48 48" aria-label="H One">
        <rect
          className="hone-mark-bg"
          width="48"
          height="48"
          rx="14"
          fill={darkMode ? "rgba(255,255,255,0.12)" : "rgba(11,11,15,0.9)"}
          stroke={darkMode ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.5)"}
          strokeWidth="1.2"
        />
        <g className="hone-mark-glyph" fill="#FAFAFA">
          <rect x="11.5" y="13" width="4.4" height="22" rx="2.2" />
          <rect x="23.2" y="13" width="4.4" height="22" rx="2.2" />
          <rect x="14.5" y="21.8" width="10.2" height="4.2" rx="2" />
          <path
            d="M34.2 13C35.4 13 36.4 14 36.4 15.2V32.8C36.4 34 35.4 35 34.2 35C33 35 32 34 32 32.8V18.3L30.5 19.3C29.8 19.8 28.9 19.4 28.9 18.6V17.4C28.9 16.9 29.1 16.5 29.5 16.2L32.9 13.4C33.3 13.1 33.7 13 34.2 13Z"
            fill="url(#hone-mark-accent)"
          />
        </g>
        <defs>
          <linearGradient
            id="hone-mark-accent"
            x1="29"
            y1="13"
            x2="37"
            y2="35"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#02EEFF" />
            <stop offset="0.6" stopColor="#7FA0FF" />
            <stop offset="1" stopColor="#4B64BF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function HOneSignInPortal({
  defaultLocale = "en",
  defaultDarkMode = false,
  onSuccess,
}) {
  const portalRef = useRef(null)
  const cardRef = useRef(null)

  const [locale, setLocale] = useState(defaultLocale)
  const [darkMode, setDarkMode] = useState(defaultDarkMode)
  const [hovering, setHovering] = useState(false)
  const [focusedField, setFocusedField] = useState("email")

  // Auth flow state: "signin" | "register" | "forgot"
  const [mode, setMode] = useState("signin")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState("")
  const [loadingProvider, setLoadingProvider] = useState(null)
  const [resetSent, setResetSent] = useState(false)
  const [sessionUser, setSessionUser] = useState(null)
  const [legalModal, setLegalModal] = useState(null)

  const t = COPY[locale]

  // Smooth rAF pointer parallax for orbital rings & luminous backdrop orbs
  useEffect(() => {
    const portal = portalRef.current
    if (!portal) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) return

    let frame = 0
    let px = 0
    let py = 0
    let targetX = 0
    let targetY = 0

    const handlePointerMove = (event) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1
      targetY = (event.clientY / window.innerHeight) * 2 - 1

      // Update liquid-glass specular spotlight position relative to the card
      const card = cardRef.current
      if (card) {
        const rect = card.getBoundingClientRect()
        const mx = event.clientX - rect.left
        const my = event.clientY - rect.top
        card.style.setProperty("--mx", `${mx.toFixed(1)}px`)
        card.style.setProperty("--my", `${my.toFixed(1)}px`)
      }
    }

    const handlePointerLeave = () => {
      targetX = 0
      targetY = 0
    }

    const animate = () => {
      px += (targetX - px) * 0.055
      py += (targetY - py) * 0.055

      portal.style.setProperty("--tx", `${(px * -16).toFixed(2)}px`)
      portal.style.setProperty("--ty", `${(py * -12).toFixed(2)}px`)

      frame = requestAnimationFrame(animate)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)
    frame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError("")
    setResetSent(false)
  }

  const handleDemoFill = () => {
    setError("")
    setEmail("manager@hone.hospitality")
    setPassword("HOne#2026")
    if (mode === "register") {
      setFullName("Dimas Pratama")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    const trimmedEmail = email.trim()
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)

    if (mode === "register" && fullName.trim().length < 2) {
      setError(t.missingName)
      return
    }
    if (!emailValid) {
      setError(t.invalidEmail)
      return
    }
    if (mode !== "forgot" && password.length < 6) {
      setError(t.shortPassword)
      return
    }

    setLoadingProvider("email")

    setTimeout(() => {
      setLoadingProvider(null)
      if (mode === "forgot") {
        setResetSent(true)
        return
      }
      const user = {
        name: fullName.trim() || trimmedEmail.split("@")[0].replace(/[._-]/g, " "),
        email: trimmedEmail,
        provider: "Email",
      }
      setSessionUser(user)
      onSuccess?.(user)
    }, 850)
  }

  const handleSocialLogin = (provider) => {
    setError("")
    setLoadingProvider(provider)
    setTimeout(() => {
      setLoadingProvider(null)
      const user = {
        name: provider === "google" ? "H One GM (Google)" : "H One Staff (Facebook)",
        email: provider === "google" ? "gm@hone.hospitality" : "staff@hone.hospitality",
        provider: provider === "google" ? "Google" : "Facebook",
      }
      setSessionUser(user)
      onSuccess?.(user)
    }, 750)
  }

  const handleSignOut = () => {
    setSessionUser(null)
    setPassword("")
    setMode("signin")
  }

  return (
    <div
      ref={portalRef}
      className={`hone-signin ${darkMode ? "is-dark" : "is-light"} ${
        hovering || focusedField ? "is-hovering" : ""
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap');

        @keyframes hone-rise {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hone-orbit {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes hone-wave {
          0% {
            transform: scale(1);
            opacity: 0;
          }
          12% {
            opacity: 0.8;
          }
          100% {
            transform: scale(3.3);
            opacity: 0;
          }
        }

        @keyframes hone-float-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(28px, -22px, 0) scale(1.08); }
        }

        @keyframes hone-float-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-26px, 24px, 0) scale(1.06); }
        }

        @keyframes hone-in-a {
          from {
            transform: rotate(-140deg) scale(0.6);
            opacity: 0;
          }
          to {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes hone-in-b {
          from {
            transform: rotate(140deg) scale(0.6);
            opacity: 0;
          }
          to {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes hone-sweep {
          0%, 62% {
            left: -55%;
          }
          100% {
            left: 135%;
          }
        }

        .hone-signin {
          --tx: 0px;
          --ty: 0px;
          position: relative;
          min-height: 100svh;
          width: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          transition: background 0.4s ease, color 0.35s ease;
          -webkit-font-smoothing: antialiased;
        }

        /* CRYSTAL FROST (LIGHT GLASS) THEME */
        .hone-signin.is-light {
          --fg: #0b1020;
          --muted: #52607a;
          --glass-card: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.72) 0%,
            rgba(255, 255, 255, 0.44) 52%,
            rgba(240, 247, 255, 0.56) 100%
          );
          --glass-border: rgba(255, 255, 255, 0.85);
          --glass-outer-ring: rgba(15, 23, 42, 0.08);
          --glass-inset-top: rgba(255, 255, 255, 0.95);
          --glass-inset-bottom: rgba(148, 163, 184, 0.16);
          --glass-shadow:
            0 28px 65px -20px rgba(30, 58, 138, 0.18),
            0 10px 26px -12px rgba(15, 23, 42, 0.09);
          --specular-spot: rgba(255, 255, 255, 0.65);

          --surface: rgba(255, 255, 255, 0.52);
          --surface-hover: rgba(255, 255, 255, 0.78);
          --surface-active: rgba(255, 255, 255, 0.9);
          --border: rgba(15, 23, 42, 0.09);
          --border-strong: rgba(75, 100, 191, 0.34);

          --ring-base: rgba(15, 23, 42, 0.075);
          --wave-stroke: rgba(75, 100, 191, 0.28);

          --primary-bg: linear-gradient(135deg, rgba(14, 18, 32, 0.94), rgba(34, 46, 86, 0.92));
          --primary-fg: #ffffff;
          --primary-border: rgba(255, 255, 255, 0.24);
          --shadow: 0 14px 30px -12px rgba(30, 58, 138, 0.38);

          --glow-a: rgba(2, 238, 255, 0.28);
          --glow-b: rgba(127, 160, 255, 0.34);
          --glow-c: rgba(167, 139, 250, 0.18);

          background:
            radial-gradient(circle at 16% 18%, rgba(186, 230, 253, 0.72), transparent 46%),
            radial-gradient(circle at 86% 22%, rgba(199, 210, 254, 0.7), transparent 48%),
            radial-gradient(circle at 52% 92%, rgba(165, 243, 252, 0.52), transparent 52%),
            linear-gradient(180deg, #eef4fc 0%, #f6f9fe 52%, #ebf1fb 100%);
          color: var(--fg);
        }

        /* SMOKED OBSIDIAN (DARK GLASS) THEME */
        .hone-signin.is-dark {
          --fg: #f8fafc;
          --muted: #9fb0cc;
          --glass-card: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.11) 0%,
            rgba(18, 26, 46, 0.54) 55%,
            rgba(12, 18, 34, 0.68) 100%
          );
          --glass-border: rgba(255, 255, 255, 0.18);
          --glass-outer-ring: rgba(2, 238, 255, 0.12);
          --glass-inset-top: rgba(255, 255, 255, 0.26);
          --glass-inset-bottom: rgba(0, 0, 0, 0.35);
          --glass-shadow:
            0 34px 80px -20px rgba(0, 0, 0, 0.72),
            0 12px 32px -14px rgba(2, 238, 255, 0.12);
          --specular-spot: rgba(127, 160, 255, 0.18);

          --surface: rgba(255, 255, 255, 0.065);
          --surface-hover: rgba(255, 255, 255, 0.11);
          --surface-active: rgba(255, 255, 255, 0.14);
          --border: rgba(255, 255, 255, 0.13);
          --border-strong: rgba(2, 238, 255, 0.45);

          --ring-base: rgba(255, 255, 255, 0.075);
          --wave-stroke: rgba(2, 238, 255, 0.28);

          --primary-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(219, 234, 254, 0.92));
          --primary-fg: #070b14;
          --primary-border: rgba(255, 255, 255, 0.65);
          --shadow: 0 16px 38px -12px rgba(2, 238, 255, 0.26);

          --glow-a: rgba(2, 238, 255, 0.24);
          --glow-b: rgba(127, 160, 255, 0.28);
          --glow-c: rgba(75, 100, 191, 0.2);

          background:
            radial-gradient(circle at 18% 18%, rgba(2, 238, 255, 0.14), transparent 44%),
            radial-gradient(circle at 84% 24%, rgba(99, 102, 241, 0.22), transparent 48%),
            radial-gradient(circle at 50% 90%, rgba(56, 189, 248, 0.16), transparent 50%),
            linear-gradient(180deg, #050811 0%, #090f1d 55%, #060913 100%);
          color: var(--fg);
        }

        /* Luminous Floating Glass Orbs (for visible refraction through glass card) */
        .hone-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
          filter: blur(56px);
          will-change: transform;
        }

        .hone-orb-1 {
          width: 340px;
          height: 340px;
          left: calc(50% - 290px);
          top: calc(50% - 240px);
          background: radial-gradient(circle, rgba(2, 238, 255, 0.42), transparent 70%);
          animation: hone-float-a 12s ease-in-out infinite;
        }

        .hone-orb-2 {
          width: 380px;
          height: 380px;
          left: calc(50% + 20px);
          top: calc(50% - 60px);
          background: radial-gradient(circle, rgba(127, 160, 255, 0.44), transparent 70%);
          animation: hone-float-b 15s ease-in-out infinite;
        }

        .hone-signin.is-dark .hone-orb-1 {
          opacity: 0.55;
        }

        .hone-signin.is-dark .hone-orb-2 {
          opacity: 0.58;
        }

        /* Ambient Portal Glow */
        .hone-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 820px;
          height: 820px;
          border-radius: 9999px;
          pointer-events: none;
          background: radial-gradient(
            circle at 50% 50%,
            var(--glow-a) 0%,
            var(--glow-b) 35%,
            var(--glow-c) 60%,
            transparent 74%
          );
          filter: blur(44px);
          opacity: 0.76;
          transform: translate3d(
            calc(-50% + var(--tx) * 1.15),
            calc(-50% + var(--ty) * 1.15),
            0
          ) scale(1);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .hone-signin.is-hovering .hone-glow {
          opacity: 1;
          transform: translate3d(
            calc(-50% + var(--tx) * 1.15),
            calc(-50% + var(--ty) * 1.15),
            0
          ) scale(1.1);
        }

        /* Concentric Orbital Rings */
        .hone-rings {
          position: absolute;
          left: 50%;
          top: 50%;
          width: max(132vmax, 1520px);
          height: max(132vmax, 1520px);
          pointer-events: none;
          transform: translate3d(
            calc(-50% + var(--tx)),
            calc(-50% + var(--ty)),
            0
          );
          will-change: transform;
        }

        .hone-rings .base {
          fill: none;
          stroke: var(--ring-base);
          stroke-width: 1.15;
        }

        .hone-rings .arc {
          fill: none;
          stroke: url(#hone-arc-gradient);
          stroke-width: 2.5;
          stroke-linecap: round;
          opacity: 0.68;
          transform-origin: 1000px 1000px;
          animation: hone-orbit var(--duration, 45s) linear infinite;
          transition: opacity 0.45s ease, stroke-width 0.45s ease;
        }

        .hone-rings .arc.reverse {
          animation-direction: reverse;
        }

        .hone-signin.is-hovering .hone-rings .arc {
          opacity: 1;
          stroke-width: 3;
        }

        .hone-rings .wave {
          fill: none;
          stroke: var(--wave-stroke);
          stroke-width: 1.45;
          transform-origin: 1000px 1000px;
          animation: hone-wave 9.5s cubic-bezier(0.16, 0.68, 0.32, 1) infinite;
        }

        .hone-rings .wave-b {
          animation-delay: -4.75s;
        }

        /* Floating Glass Header */
        .hone-top {
          position: relative;
          z-index: 20;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .hone-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px 6px 7px;
          border-radius: 999px;
          text-decoration: none;
          color: inherit;
          background: var(--surface);
          border: 1px solid var(--glass-border);
          box-shadow:
            inset 0 1px 0 var(--glass-inset-top),
            0 10px 26px -14px rgba(15, 23, 42, 0.18);
          backdrop-filter: blur(20px) saturate(165%);
          -webkit-backdrop-filter: blur(20px) saturate(165%);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .hone-brand:hover {
          background: var(--surface-hover);
          transform: translateY(-1px);
        }

        .hone-brand-badge {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: var(--primary-bg);
          color: var(--primary-fg);
          box-shadow: 0 6px 16px -6px rgba(0, 0, 0, 0.32);
        }

        .hone-brand-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.03em;
          line-height: 1.1;
        }

        .hone-brand-sub {
          font-size: 10px;
          color: var(--muted);
          font-weight: 500;
        }

        .hone-top-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hone-join {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12.5px;
          color: var(--muted);
          background: var(--surface);
          border: 1px solid var(--glass-border);
          box-shadow: inset 0 1px 0 var(--glass-inset-top);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
        }

        .hone-join-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          color: var(--fg);
          background: none;
          border: 0;
          padding: 2px;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .hone-join-btn:hover {
          opacity: 0.78;
        }

        .hone-join-btn svg {
          transition: transform 0.22s ease;
        }

        .hone-join-btn:hover svg {
          transform: translateX(3px);
        }

        .hone-pill {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          border: 1px solid var(--glass-border);
          background: var(--surface);
          box-shadow: inset 0 1px 0 var(--glass-inset-top);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          padding: 3px;
        }

        .hone-pill button {
          border: 0;
          background: transparent;
          color: var(--muted);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 9px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hone-pill button.active {
          background: var(--primary-bg);
          color: var(--primary-fg);
        }

        .hone-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: 1px solid var(--glass-border);
          background: var(--surface);
          box-shadow: inset 0 1px 0 var(--glass-inset-top);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          color: var(--fg);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .hone-icon-btn:hover {
          background: var(--surface-hover);
          transform: scale(1.06);
        }

        /* Center Glass Portal Column */
        .hone-col {
          position: relative;
          z-index: 15;
          width: 100%;
          max-width: 444px;
          margin: auto;
          padding: 12px 18px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Sculpted Liquid-Glass Card Vessel */
        .hone-glass-card {
          --mx: 50%;
          --my: 18%;
          position: relative;
          width: 100%;
          padding: 34px 30px 30px;
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--glass-card);
          border: 1px solid var(--glass-border);
          box-shadow:
            0 0 0 1px var(--glass-outer-ring),
            inset 0 1.5px 1px var(--glass-inset-top),
            inset 0 -1px 1px var(--glass-inset-bottom),
            var(--glass-shadow);
          backdrop-filter: blur(28px) saturate(185%);
          -webkit-backdrop-filter: blur(28px) saturate(185%);
          overflow: hidden;
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        /* Interactive Cursor-Tracking Specular Glass Sheen */
        .hone-glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            360px circle at var(--mx) var(--my),
            var(--specular-spot),
            transparent 65%
          );
          opacity: 0.72;
          transition: opacity 0.35s ease;
        }

        /* Crisp Glass Rim Reflection */
        .hone-glass-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.92),
            rgba(2, 238, 255, 0.45),
            transparent
          );
          opacity: 0.85;
        }

        .hone-glass-card > * {
          position: relative;
          z-index: 2;
        }

        .hone-mark-wrap {
          padding: 5px;
          border-radius: 19px;
          margin-bottom: 16px;
          background: var(--surface);
          border: 1px solid var(--glass-border);
          box-shadow:
            inset 0 1px 0 var(--glass-inset-top),
            0 12px 24px -10px rgba(15, 23, 42, 0.24);
          backdrop-filter: blur(12px);
        }

        .hone-mark {
          display: block;
          width: 48px;
          height: 48px;
        }

        .hone-mark-bg {
          transform-origin: 24px 24px;
          animation: hone-in-b 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .hone-mark-glyph {
          transform-origin: 24px 24px;
          animation: hone-in-a 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.06s both;
        }

        .hone-h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 29px;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0;
          text-align: center;
        }

        .hone-sub {
          font-size: 13.5px;
          color: var(--muted);
          margin: 6px 0 22px;
          text-align: center;
        }

        /* Staggered Entrance */
        .hone-rise {
          animation: hone-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hone-rise:nth-child(2) { animation-delay: 0.05s; }
        .hone-rise:nth-child(3) { animation-delay: 0.1s; }
        .hone-rise:nth-child(4) { animation-delay: 0.15s; }
        .hone-rise:nth-child(5) { animation-delay: 0.2s; }
        .hone-rise:nth-child(6) { animation-delay: 0.25s; }
        .hone-rise:nth-child(7) { animation-delay: 0.3s; }

        /* Recessed Frosted Form Fields */
        .hone-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .hone-field {
          position: relative;
          display: flex;
          align-items: center;
          gap: 11px;
          height: 48px;
          width: 100%;
          padding: 0 14px;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--surface);
          box-shadow:
            inset 0 1px 0 var(--glass-inset-top),
            0 4px 14px -8px rgba(15, 23, 42, 0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
        }

        .hone-field:hover {
          background: var(--surface-hover);
          border-color: var(--border-strong);
        }

        .hone-field.is-active {
          background: var(--surface-active);
          border-color: #7FA0FF;
          box-shadow:
            inset 0 1px 0 var(--glass-inset-top),
            0 0 0 3.5px rgba(127, 160, 255, 0.24),
            0 10px 24px -10px rgba(2, 238, 255, 0.26);
        }

        .hone-field .ic {
          width: 17px;
          height: 17px;
          color: var(--muted);
          flex-shrink: 0;
          transition: color 0.2s ease;
        }

        .hone-field.is-active .ic {
          color: var(--fg);
        }

        .hone-field input {
          width: 100%;
          height: 100%;
          border: 0;
          outline: none;
          background: transparent;
          color: var(--fg);
          font-size: 14px;
          font-weight: 450;
        }

        .hone-field input::placeholder {
          color: var(--muted);
          opacity: 0.85;
        }

        .hone-eye-btn {
          border: 0;
          background: transparent;
          color: var(--muted);
          padding: 5px;
          display: grid;
          place-items: center;
          cursor: pointer;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .hone-eye-btn:hover {
          color: var(--fg);
          background: rgba(127, 160, 255, 0.16);
        }

        .hone-row-links {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 2px 3px 4px;
          font-size: 12.5px;
        }

        .hone-link-btn {
          border: 0;
          background: none;
          padding: 2px 0;
          color: var(--muted);
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: color 0.2s ease;
        }

        .hone-link-btn:hover {
          color: var(--fg);
        }

        /* Primary Crystal/Obsidian Glass Button */
        .hone-primary {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 48px;
          margin-top: 4px;
          border-radius: 14px;
          border: 1px solid var(--primary-border);
          background: var(--primary-bg);
          color: var(--primary-fg);
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.28),
            var(--shadow);
          transition: transform 0.22s ease, box-shadow 0.25s ease, opacity 0.2s ease;
        }

        .hone-primary::after {
          content: "";
          position: absolute;
          top: 0;
          left: -55%;
          width: 42%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transform: skewX(-22deg);
          animation: hone-sweep 5s ease-in-out infinite;
          pointer-events: none;
        }

        .hone-signin.is-dark .hone-primary::after {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(2, 238, 255, 0.34),
            transparent
          );
        }

        .hone-primary:hover:not(:disabled) {
          transform: translateY(-1.5px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.36),
            0 18px 34px -12px rgba(75, 100, 191, 0.5);
        }

        .hone-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .hone-primary:disabled {
          opacity: 0.72;
          cursor: wait;
        }

        .hone-primary .hone-arrow {
          transition: transform 0.22s ease;
        }

        .hone-primary:hover .hone-arrow {
          transform: translateX(3px);
        }

        /* Divider */
        .hone-or {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 18px 0 14px;
          font-size: 12px;
          font-weight: 500;
          color: var(--muted);
        }

        .hone-or i {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-strong), transparent);
        }

        /* Frosted Glass Social Buttons */
        .hone-soc-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hone-soc {
          width: 100%;
          height: 46px;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--surface);
          box-shadow: inset 0 1px 0 var(--glass-inset-top);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: var(--fg);
          font-size: 13.5px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hone-soc:hover:not(:disabled) {
          background: var(--surface-hover);
          border-color: var(--border-strong);
          box-shadow:
            inset 0 1px 0 var(--glass-inset-top),
            0 10px 22px -12px rgba(15, 23, 42, 0.22);
          transform: translateY(-1px);
        }

        .hone-soc:disabled {
          opacity: 0.65;
          cursor: wait;
        }

        /* Footer */
        .hone-foot {
          position: relative;
          z-index: 20;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 14px 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 12.5px;
          color: var(--muted);
        }

        .hone-foot-pill {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 6px 14px;
          border-radius: 999px;
          background: var(--surface);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .hone-foot button {
          border: 0;
          background: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          padding: 2px 0;
          transition: color 0.2s ease;
        }

        .hone-foot button:hover {
          color: var(--fg);
        }

        @media (max-width: 639px) {
          .hone-top {
            padding: 14px 14px;
          }
          .hone-join span {
            display: none;
          }
          .hone-glass-card {
            padding: 28px 20px 24px;
            border-radius: 26px;
          }
          .hone-foot {
            flex-direction: column;
            text-align: center;
            padding: 12px 16px 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hone-rings .arc,
          .hone-rings .wave,
          .hone-orb,
          .hone-primary::after,
          .hone-rise,
          .hone-mark-bg,
          .hone-mark-glyph {
            animation: none !important;
          }
        }
      `}</style>

      {/* Luminous Floating Orbs for Glass Refraction */}
      <div className="hone-orb hone-orb-1" aria-hidden="true" />
      <div className="hone-orb hone-orb-2" aria-hidden="true" />

      {/* Ambient Glow Portal */}
      <div className="hone-glow" aria-hidden="true" />

      {/* Concentric Orbiting Rings & Pulse Waves */}
      <svg className="hone-rings" viewBox="0 0 2000 2000" aria-hidden="true">
        <defs>
          <linearGradient
            id="hone-arc-gradient"
            gradientUnits="userSpaceOnUse"
            x1="300"
            y1="300"
            x2="1700"
            y2="1700"
          >
            <stop stopColor="#02EEFF" />
            <stop offset="0.55" stopColor="#7FA0FF" />
            <stop offset="1" stopColor="#4B64BF" />
          </linearGradient>
        </defs>

        <circle className="wave" cx="1000" cy="1000" r="300" />
        <circle className="wave wave-b" cx="1000" cy="1000" r="300" />

        {RING_SIZES.map((radius, index) => {
          const length = 9 + (index % 3) * 5
          return (
            <React.Fragment key={radius}>
              <circle className="base" cx="1000" cy="1000" r={radius} />
              <circle
                className={`arc ${index % 2 ? "reverse" : ""}`}
                cx="1000"
                cy="1000"
                r={radius}
                pathLength="100"
                strokeDasharray={`${length} ${100 - length}`}
                style={{
                  "--duration": `${38 + index * 12}s`,
                  animationDelay: `${-index * 7.3}s`,
                }}
              />
            </React.Fragment>
          )
        })}
      </svg>

      {/* Top Glass Header */}
      <header className="hone-top">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            switchMode("signin")
          }}
          className="hone-brand"
        >
          <span className="hone-brand-badge">H1</span>
          <div>
            <div className="hone-brand-title">H ONE</div>
            <div className="hone-brand-sub">{t.brandSub}</div>
          </div>
        </a>

        <div className="hone-top-right">
          {!sessionUser && (
            <div className="hone-join">
              <span>{mode === "register" ? t.haveAccount : t.newPrompt}</span>
              <button
                type="button"
                className="hone-join-btn"
                onClick={() => switchMode(mode === "register" ? "signin" : "register")}
              >
                {mode === "register" ? t.backToSignIn : t.createAccount}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Language Switch */}
          <div className="hone-pill" role="group" aria-label="Language">
            <button
              type="button"
              className={locale === "en" ? "active" : ""}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={locale === "id" ? "active" : ""}
              onClick={() => setLocale("id")}
            >
              ID
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            className="hone-icon-btn"
            aria-label="Toggle theme"
            onClick={() => setDarkMode((v) => !v)}
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Center Frosted Glass Card */}
      <main className="hone-col">
        <div ref={cardRef} className="hone-glass-card">
          {sessionUser ? (
            <div className="hone-rise w-full text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500 border border-emerald-400/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/12 border border-sky-400/25 px-3 py-1 text-[11px] font-semibold text-sky-600 dark:text-sky-300 mb-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                {t.signedInBadge} · {sessionUser.provider}
              </div>
              <h1 className="hone-h1" style={{ fontSize: "24px" }}>
                {t.signedInTitle}
              </h1>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {t.signedInDesc}
              </p>
              <div
                className="mt-4 rounded-2xl border px-4 py-3 text-left text-xs backdrop-blur-md"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="font-semibold capitalize">{sessionUser.name}</div>
                <div style={{ color: "var(--muted)" }}>{sessionUser.email}</div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="hone-primary mt-5"
                onPointerEnter={() => setHovering(true)}
                onPointerLeave={() => setHovering(false)}
              >
                <LogOut className="h-4 w-4" />
                {t.signOutBtn}
              </button>
            </div>
          ) : (
            <>
              <HOneMark darkMode={darkMode} />

              <h1 className="hone-h1 hone-rise">
                {mode === "signin"
                  ? t.welcomeTitle
                  : mode === "register"
                    ? t.registerTitle
                    : t.forgotTitle}
              </h1>
              <p className="hone-sub hone-rise">
                {mode === "signin"
                  ? t.welcomeSub
                  : mode === "register"
                    ? t.registerSub
                    : t.forgotSub}
              </p>

              {resetSent ? (
                <div
                  className="hone-rise w-full rounded-2xl border p-5 text-center backdrop-blur-xl"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <CheckCircle2 className="mx-auto mb-2.5 h-8 w-8 text-emerald-500" />
                  <div className="text-sm font-semibold">{t.resetSentTitle}</div>
                  <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                    {t.resetSentDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => switchMode("signin")}
                    className="hone-primary mt-4"
                  >
                    {t.backToSignIn}
                    <ArrowRight className="h-4 w-4 hone-arrow" />
                  </button>
                </div>
              ) : (
                <>
                  <form className="hone-form hone-rise" onSubmit={handleSubmit} noValidate>
                    {mode === "register" && (
                      <label
                        className={`hone-field ${focusedField === "name" ? "is-active" : ""}`}
                      >
                        <User className="ic" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          placeholder={t.fullName}
                          autoComplete="name"
                        />
                      </label>
                    )}

                    <label
                      className={`hone-field ${focusedField === "email" ? "is-active" : ""}`}
                    >
                      <Mail className="ic" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t.email}
                        autoComplete="email"
                      />
                    </label>

                    {mode !== "forgot" && (
                      <label
                        className={`hone-field ${focusedField === "password" ? "is-active" : ""}`}
                      >
                        <Lock className="ic" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedField("password")}
                          onBlur={() => setFocusedField(null)}
                          placeholder={t.password}
                          autoComplete={
                            mode === "register" ? "new-password" : "current-password"
                          }
                        />
                        <button
                          type="button"
                          className="hone-eye-btn"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </label>
                    )}

                    {error && (
                      <div
                        role="alert"
                        className="rounded-xl border border-rose-500/35 bg-rose-500/12 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-300 backdrop-blur-md"
                      >
                        {error}
                      </div>
                    )}

                    <div className="hone-row-links">
                      <button
                        type="button"
                        className="hone-link-btn"
                        onClick={handleDemoFill}
                      >
                        <Sparkles className="h-3.5 w-3.5 text-sky-500" />
                        {t.demoFill}
                      </button>
                      {mode === "signin" ? (
                        <button
                          type="button"
                          className="hone-link-btn"
                          onClick={() => switchMode("forgot")}
                        >
                          {t.forgotLink}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="hone-link-btn"
                          onClick={() => switchMode("signin")}
                        >
                          {t.backToSignIn}
                        </button>
                      )}
                    </div>

                    <button
                      className="hone-primary"
                      type="submit"
                      disabled={loadingProvider !== null}
                      onPointerEnter={() => setHovering(true)}
                      onPointerLeave={() => setHovering(false)}
                    >
                      {loadingProvider === "email" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t.signingIn}</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {mode === "signin"
                              ? t.signInBtn
                              : mode === "register"
                                ? t.createBtn
                                : t.resetBtn}
                          </span>
                          <ArrowRight className="h-4 w-4 hone-arrow" />
                        </>
                      )}
                    </button>
                  </form>

                  {mode !== "forgot" && (
                    <>
                      <div className="hone-or hone-rise">
                        <i />
                        <span>{t.or}</span>
                        <i />
                      </div>

                      <div className="hone-soc-group hone-rise">
                        <button
                          className="hone-soc"
                          type="button"
                          disabled={loadingProvider !== null}
                          onClick={() => handleSocialLogin("google")}
                          onPointerEnter={() => setHovering(true)}
                          onPointerLeave={() => setHovering(false)}
                        >
                          {loadingProvider === "google" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <GoogleIcon />
                          )}
                          <span>{t.googleBtn}</span>
                        </button>

                        <button
                          className="hone-soc"
                          type="button"
                          disabled={loadingProvider !== null}
                          onClick={() => handleSocialLogin("facebook")}
                          onPointerEnter={() => setHovering(true)}
                          onPointerLeave={() => setHovering(false)}
                        >
                          {loadingProvider === "facebook" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <FacebookIcon />
                          )}
                          <span>{t.facebookBtn}</span>
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Glass Footer */}
      <footer className="hone-foot">
        <span className="hone-foot-pill">{t.footerTag}</span>
        <nav className="hone-foot-pill">
          <button type="button" onClick={() => setLegalModal("terms")}>
            {t.terms}
          </button>
          <button type="button" onClick={() => setLegalModal("privacy")}>
            {t.privacy}
          </button>
        </nav>
      </footer>

      {/* Frosted Glass Legal Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-md"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border p-6 shadow-2xl"
            style={{
              background: "var(--glass-card)",
              borderColor: "var(--glass-border)",
              color: "var(--fg)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              boxShadow: "inset 0 1px 0 var(--glass-inset-top), var(--glass-shadow)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold">
                {legalModal === "terms" ? t.termsTitle : t.privacyTitle}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="rounded-xl p-1.5 opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {t.legalBody}
            </p>
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="hone-primary mt-5"
              style={{ height: "42px" }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return <HOneSignInPortal defaultLocale="en" defaultDarkMode={false} />
}