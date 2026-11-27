import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
  ArrowDown,
  CheckCircle2,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Minus,
  Moon,
  Play,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Sun,
  ThumbsDown,
  ThumbsUp,
  UtensilsCrossed,
  X,
} from "lucide-react"

// ============================================================================
// H ONE HOSPITALITY OS — DISH ORBIT CAROUSEL (SINGLE SECTION · 10 MENUS)
// Standalone culinary showcase section with:
// - 10 curated signature dishes framed cleanly without awkward zoom-cropping
// - Smooth GPU-accelerated orbit swing, two-weight title wipe & pastel arc morph
// - Scroll-pinned, swipe, keyboard, 10-dot pager & thumbnail strip navigation
// - Integrated minimalist H One section bar (EN/ID, Theme, Search, Order Cart)
// ============================================================================

// Placeholder lokal: kartu gradien dengan piring, warna diturunkan dari id foto asli.
// Tidak ada foto pihak ketiga dan tidak butuh internet. Ganti dengan foto sendiri bila perlu.
function centeredDishUrl(photoId, size = 800) {
  const hue = [...String(photoId)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7)
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${hue} 55% 64%)'/><stop offset='1' stop-color='hsl(${(hue + 40) % 360} 60% 36%)'/></linearGradient></defs><rect width='100' height='100' fill='url(#g)'/><circle cx='50' cy='50' r='31' fill='hsl(${hue} 75% 86%)'/><circle cx='50' cy='50' r='22' fill='none' stroke='hsl(${hue} 40% 55%)' stroke-width='1.5'/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const H_ONE_DISHES = [
  {
    id: "hone-01",
    title: "Char grill",
    subtitle: "Ribeye",
    label: "Char-grill Ribeye",
    category: "Signature Grill",
    image: centeredDishUrl("1544025162-d76694265947", 800),
    thumb: centeredDishUrl("1544025162-d76694265947", 240),
    alt: "Char-grilled prime ribeye platter seared over charcoal",
    rating: 4.9,
    chef: "Chef Dimas Pratama",
    kitchen: "Ocean Terrace Kitchen",
    description:
      "28-day dry-aged ribeye seared over live charcoal, basted in herb brown butter with roasted garlic and smoked jus.",
    descriptionId:
      "Ribeye dry-aged 28 hari dipanggang di atas arang, disiram herb brown butter dengan bawang panggang dan saus jus asap.",
    likes: 128,
    ingredients: ["Ribeye 250g", "Herb butter", "Roasted garlic", "Charred herbs", "Smoked jus"],
    accent: "#f6a37c",
    price: 245000,
    prepTime: "20 min",
    calories: "680 kcal",
  },
  {
    id: "hone-02",
    title: "Pan-seared",
    subtitle: "Salmon",
    label: "Seared Salmon",
    category: "Coastal Catch",
    image: centeredDishUrl("1467003909585-2f8a72700288", 800),
    thumb: centeredDishUrl("1467003909585-2f8a72700288", 240),
    alt: "Overhead plated pan-seared salmon with fresh greens and citrus",
    rating: 4.8,
    chef: "Chef Raka Wijaya",
    kitchen: "Saltwater Dining Room",
    description:
      "Crisp-skin Atlantic salmon fillet over warm garden greens, roasted seasonal vegetables, and bright lemon-dill emulsion.",
    descriptionId:
      "Fillet salmon Atlantik berkulit renyah di atas sayuran kebun hangat, sayuran panggang musiman, dan saus lemon dill segar.",
    likes: 104,
    ingredients: ["Atlantic salmon", "Garden greens", "Lemon zest", "Fresh dill", "Olive oil"],
    accent: "#f2a6c6",
    price: 175000,
    prepTime: "16 min",
    calories: "490 kcal",
  },
  {
    id: "hone-03",
    title: "Harvest",
    subtitle: "Poke Bowl",
    label: "Harvest Poke",
    category: "Wellness Bowl",
    image: centeredDishUrl("1546069901-ba9599a7e63c", 800),
    thumb: centeredDishUrl("1546069901-ba9599a7e63c", 240),
    alt: "Overhead white bowl filled with colorful greens, soft egg, and veggies",
    rating: 4.8,
    chef: "Chef Nadia Putri",
    kitchen: "The Greenhouse Lounge",
    description:
      "Vibrant harvest bowl with sesame greens, jammy farm egg, sweet cherry tomatoes, edamame, and roasted citrus dressing.",
    descriptionId:
      "Mangkuk sehat berisi sayuran segar, telur setengah matang, tomat ceri manis, edamame, dan saus jeruk panggang.",
    likes: 118,
    ingredients: ["Baby greens", "Soft egg", "Cherry tomato", "Edamame", "Citrus glaze"],
    accent: "#8fd3c8",
    price: 125000,
    prepTime: "12 min",
    calories: "440 kcal",
  },
  {
    id: "hone-04",
    title: "Artisan",
    subtitle: "Quinoa",
    label: "Quinoa Bowl",
    category: "Plant Forward",
    image: centeredDishUrl("1512621776951-a57141f2eefd", 800),
    thumb: centeredDishUrl("1512621776951-a57141f2eefd", 240),
    alt: "Overhead vibrant plant-based quinoa and roasted vegetable bowl",
    rating: 4.7,
    chef: "Chef Nadia Putri",
    kitchen: "The Greenhouse Lounge",
    description:
      "Tri-color quinoa tossed with roasted sweet potato, chickpeas, creamy avocado, pickled red cabbage, and tahini drizzle.",
    descriptionId:
      "Quinoa tiga warna dengan ubi panggang, kacang arab, alpukat lembut, acar kol ungu, dan siraman saus tahini.",
    likes: 92,
    ingredients: ["Tri-color quinoa", "Chickpeas", "Avocado", "Sweet potato", "Tahini"],
    accent: "#bcd98e",
    price: 110000,
    prepTime: "12 min",
    calories: "390 kcal",
  },
  {
    id: "hone-05",
    title: "Garden",
    subtitle: "Avocado",
    label: "Avocado Plate",
    category: "Light & Fresh",
    image: centeredDishUrl("1540189549336-e6e99c3679fe", 800),
    thumb: centeredDishUrl("1540189549336-e6e99c3679fe", 240),
    alt: "Overhead ceramic plate of fresh avocado salad and seasonal greens",
    rating: 4.6,
    chef: "Chef Nadia Putri",
    kitchen: "Pergola Pool Bar",
    description:
      "Chilled hass avocado, heirloom tomatoes, crunchy radish, and tender greens finished with cold-pressed olive oil and sea salt.",
    descriptionId:
      "Alpukat hass dingin, tomat heirloom, lobak renyah, dan sayuran muda dengan siraman minyak zaitun murni dan garam laut.",
    likes: 86,
    ingredients: ["Hass avocado", "Heirloom tomato", "Radish", "Baby greens", "EVOO"],
    accent: "#a7d89c",
    price: 98000,
    prepTime: "8 min",
    calories: "310 kcal",
  },
  {
    id: "hone-06",
    title: "Wood-fired",
    subtitle: "Margherita",
    label: "Brick Pizza",
    category: "Brick Oven",
    image: centeredDishUrl("1574071318508-1cdbab80d002", 800),
    thumb: centeredDishUrl("1574071318508-1cdbab80d002", 240),
    alt: "Whole round wood-fired Neapolitan Margherita pizza with fresh basil",
    rating: 4.9,
    chef: "Chef Marco Santini",
    kitchen: "Veranda Trattoria",
    description:
      "48-hour sourdough crust baked in a volcanic stone oven with San Marzano tomato passata, fior di latte, and sweet basil.",
    descriptionId:
      "Adonan sourdough fermentasi 48 jam dipanggang oven kayu dengan saus tomat San Marzano, mozzarella segar, dan basil.",
    likes: 152,
    ingredients: ["Sourdough", "San Marzano", "Fior di latte", "Fresh basil", "EVOO"],
    accent: "#f49f9b",
    price: 155000,
    prepTime: "16 min",
    calories: "720 kcal",
  },
  {
    id: "hone-07",
    title: "Roasted",
    subtitle: "Bisque",
    label: "Warm Bisque",
    category: "Warm Bowls",
    image: centeredDishUrl("1547592166-23ac45744acd", 800),
    thumb: centeredDishUrl("1547592166-23ac45744acd", 240),
    alt: "Overhead centered round bowl of rich warm gourmet soup",
    rating: 4.7,
    chef: "Chef Marco Santini",
    kitchen: "Veranda Trattoria",
    description:
      "Slow-roasted heritage soup finished with herb cream swirl, toasted pumpkin seeds, and warm crusty sourdough on the side.",
    descriptionId:
      "Sup panggang lembut dengan sentuhan krim herbal, biji labu sangrai, dan roti sourdough hangat yang renyah.",
    likes: 79,
    ingredients: ["Roasted tomato", "Herb cream", "Pumpkin seeds", "Garlic confit", "Sourdough"],
    accent: "#f3b685",
    price: 92000,
    prepTime: "10 min",
    calories: "340 kcal",
  },
  {
    id: "hone-08",
    title: "Teriyaki",
    subtitle: "Rice Bowl",
    label: "Teriyaki Bowl",
    category: "Asian Kitchen",
    image: centeredDishUrl("1512058564366-18510be2db19", 800),
    thumb: centeredDishUrl("1512058564366-18510be2db19", 240),
    alt: "Overhead centered bowl of savory glazed rice with colorful vegetables",
    rating: 4.8,
    chef: "Chef Kenji Sato",
    kitchen: "Noodle & Broth Bar",
    description:
      "Fragrant steamed rice topped with house-glazed savory protein, crisp sauteed vegetables, toasted sesame, and scallion.",
    descriptionId:
      "Nasi hangat harum dengan topping saus teriyaki racikan dapur, tumis sayuran renyah, wijen sangrai, dan daun bawang.",
    likes: 136,
    ingredients: ["Steamed rice", "Teriyaki glaze", "Seasonal veggies", "Toasted sesame", "Scallion"],
    accent: "#f5d26a",
    price: 118000,
    prepTime: "14 min",
    calories: "560 kcal",
  },
  {
    id: "hone-09",
    title: "Charcoal",
    subtitle: "Skewers",
    label: "Ember Skewers",
    category: "Ember Grill",
    image: centeredDishUrl("1555939594-58d7cb561ad1", 800),
    thumb: centeredDishUrl("1555939594-58d7cb561ad1", 240),
    alt: "Centered overhead platter of sizzling charcoal-grilled meat skewers",
    rating: 4.9,
    chef: "Chef Dimas Pratama",
    kitchen: "Ocean Terrace Kitchen",
    description:
      "Spice-marinated tenderloin skewers flame-kissed over coconut charcoal, served with charred shallots and signature dipping glaze.",
    descriptionId:
      "Sate daging pilihan marinasi rempah dibakar di atas arang batok kelapa, disajikan bersama bawang bakar dan saus khas.",
    likes: 147,
    ingredients: ["Beef tenderloin", "Spice rub", "Charred shallots", "Lime wedge", "House glaze"],
    accent: "#c8b6e2",
    price: 162000,
    prepTime: "15 min",
    calories: "540 kcal",
  },
  {
    id: "hone-10",
    title: "Golden",
    subtitle: "Pancakes",
    label: "Brunch Stack",
    category: "All-Day Breakfast",
    image: centeredDishUrl("1567620905732-2d1ec7ab7445", 800),
    thumb: centeredDishUrl("1567620905732-2d1ec7ab7445", 240),
    alt: "Centered stack of fluffy golden brunch pancakes with berries and syrup",
    rating: 4.8,
    chef: "Chef Dimas Pratama",
    kitchen: "In-Room Dining",
    description:
      "Fluffy buttermilk pancake stack layered with seasonal berries, whipped vanilla butter, and pure amber maple syrup.",
    descriptionId:
      "Tumpukan pancake buttermilk lembut dengan buah beri musiman, mentega vanila kocok, dan sirup maple murni.",
    likes: 131,
    ingredients: ["Buttermilk batter", "Fresh berries", "Vanilla butter", "Maple syrup", "Mint"],
    accent: "#9fcbe8",
    price: 88000,
    prepTime: "12 min",
    calories: "480 kcal",
  },
]

const BACKDROP_WALL = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 900' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='w' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#ff9a6b'/><stop offset='.5' stop-color='#d4577e'/><stop offset='1' stop-color='#4a3f9f'/></linearGradient><filter id='b' x='-30%' y='-30%' width='160%' height='160%'><feGaussianBlur stdDeviation='70'/></filter></defs><rect width='1400' height='900' fill='url(#w)'/><g filter='url(#b)'><circle cx='260' cy='640' r='300' fill='#ffd166'/><circle cx='1120' cy='200' r='280' fill='#2ec4b6'/><circle cx='760' cy='820' r='220' fill='#7b2ff7'/><circle cx='520' cy='140' r='180' fill='#ff5d8f'/></g></svg>",
)}`

const COPY = {
  en: {
    brandSub: "Signature Menu",
    eyebrowPrefix: "Most loved dish",
    playVideo: "Watch prep",
    orderFood: "Add to order",
    added: "Added!",
    overview: "Overview",
    ingredients: "Ingredients",
    likes: "likes",
    searchPlaceholder: "Search dishes, chefs, or ingredients...",
    categories: "Browse Menu",
    cartTitle: "Your Table Order",
    emptyCart: "No dishes selected yet.",
    emptyCartHint: "Explore the orbit menu and add your favorite dishes.",
    roomOrTable: "Room / Table No.",
    subtotal: "Subtotal",
    serviceTax: "Tax & Service (15%)",
    total: "Total",
    placeOrder: "Send Order to Kitchen",
    orderConfirmed: "Order sent to H One Kitchen!",
    orderConfirmedSub: "Our culinary team is preparing your dishes now.",
    scrollHint: "Scroll, swipe, or click arrows to explore dishes",
  },
  id: {
    brandSub: "Menu Signature",
    eyebrowPrefix: "Menu paling disukai",
    playVideo: "Lihat proses",
    orderFood: "Tambah pesanan",
    added: "Ditambahkan!",
    overview: "Ringkasan",
    ingredients: "Komposisi",
    likes: "suka",
    searchPlaceholder: "Cari menu, chef, atau bahan...",
    categories: "Jelajah Menu",
    cartTitle: "Pesanan Meja Anda",
    emptyCart: "Belum ada menu dipilih.",
    emptyCartHint: "Jelajahi orbit menu dan tambahkan hidangan favorit Anda.",
    roomOrTable: "No. Kamar / Meja",
    subtotal: "Subtotal",
    serviceTax: "Pajak & Layanan (15%)",
    total: "Total",
    placeOrder: "Kirim Pesanan ke Dapur",
    orderConfirmed: "Pesanan terkirim ke Dapur H One!",
    orderConfirmedSub: "Tim kuliner kami sedang menyiapkan hidangan Anda.",
    scrollHint: "Scroll, geser, atau klik panah untuk memutar menu",
  },
}

// ============================================================================
// ORBIT & ARC GEOMETRY UTILITIES
// ============================================================================

const ORBIT_X = 285
const ORBIT_Y = -445
const ORBIT_R = 655
const SCROLL_PER_DISH = 0.42
const SWING = 44
const ITEM = 122
const VISIBLE = 4

const ARC_REST = [
  [52, 100],
  [46, 122],
  [58, 124],
  [42, 102],
]
const ARC_SWEEP = [38, 144]

// Precomputed arc taper profile (avoids repeated Math.pow calls every animation frame)
const ARC_STEPS = 32
const ARC_PROFILE = Array.from({ length: ARC_STEPS + 1 }, (_, i) => {
  const t = i / ARC_STEPS
  return Math.pow(Math.sin(Math.PI * t), 0.45)
})

function wrapIndex(i, n) {
  if (n <= 0) return 0
  return ((Math.round(i) % n) + n) % n
}

function stepDirection(from, to, n) {
  if (n <= 0) return 1
  const fwd = (((to - from) % n) + n) % n
  return fwd <= n - fwd ? 1 : -1
}

function stripStart(index, n, visible) {
  if (n <= visible) return 0
  return Math.max(0, Math.min(index - 1, n - visible))
}

function fitSize(chars, max, width, em) {
  return Math.min(max, width / (Math.max(1, chars) * em))
}

function arcRest(index) {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length]
}

/**
 * Generates the tapered pastel arc path following the plate's orbital circle.
 */
function arcPath(a0, a1, cx, cy, r, w) {
  const outer = new Array(ARC_STEPS + 1)
  const inner = new Array(ARC_STEPS + 1)
  const halfW = w / 2
  const degToRad = Math.PI / 180
  const span = a1 - a0
  for (let i = 0; i <= ARC_STEPS; i++) {
    const a = (a0 + (span * i) / ARC_STEPS) * degToRad
    const h = halfW * ARC_PROFILE[i]
    const c = Math.cos(a)
    const s = Math.sin(a)
    outer[i] = `${(cx + c * (r + h)).toFixed(1)} ${(cy + s * (r + h)).toFixed(1)}`
    inner[ARC_STEPS - i] = `${(cx + c * (r - h)).toFixed(1)} ${(cy + s * (r - h)).toFixed(1)}`
  }
  return "M" + outer.join("L") + "L" + inner.join("L") + "Z"
}

const ease = {
  cubicIn: (t) => t * t * t,
  cubicInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  quartOut: (t) => 1 - Math.pow(1 - t, 4),
  quintOut: (t) => 1 - Math.pow(1 - t, 5),
  sineInOut: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
}

function clamp01(v) {
  return v <= 0 ? 0 : v >= 1 ? 1 : v
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

/**
 * Parses either hex (#f6a37c) or rgb(r, g, b) into [r, g, b],
 * preventing color glitches when a transition is interrupted mid-flight.
 */
function parseRgb(color) {
  if (Array.isArray(color)) return color
  if (typeof color === "string" && color.startsWith("rgb")) {
    const m = color.match(/\d+/g)
    if (m && m.length >= 3) return [+m[0], +m[1], +m[2]]
  }
  const clean = String(color || "#f6a37c").replace("#", "")
  const num = parseInt(clean, 16)
  if (Number.isNaN(num)) return [246, 163, 124]
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function lerpRgb(rgbA, rgbB, t) {
  return [
    Math.round(lerp(rgbA[0], rgbB[0], t)),
    Math.round(lerp(rgbA[1], rgbB[1], t)),
    Math.round(lerp(rgbA[2], rgbB[2], t)),
  ]
}

function rgbToCss(rgb) {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

function formatIDR(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Fallback plated visual if an external image fails to load.
 */
function PlateFallback({ accent, title }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-[34px]"
      style={{
        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${accent}44 65%, ${accent}99 100%)`,
      }}
    >
      <div className="text-center px-3">
        <ChefHat className="mx-auto h-9 w-9 text-slate-700/80 mb-1" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-800/80">
          {title}
        </span>
      </div>
    </div>
  )
}

/**
 * Eagerly decoded dish photo so first-time swaps stay fluid.
 */
function DishPhoto({ src, alt, accent, title, className = "" }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return <PlateFallback accent={accent} title={title} />
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      className={className}
      draggable={false}
      onError={() => setFailed(true)}
    />
  )
}

// ============================================================================
// CORE SECTION COMPONENT: DISH ORBIT CAROUSEL
// ============================================================================

function DishOrbitSection({
  dishes,
  backdrop,
  locale = "en",
  darkMode = false,
  activeIndex,
  onIndexChange,
  onOrder,
  onPlay,
  headerSlot,
  jumpToRef,
}) {
  const n = dishes.length
  const copy = COPY[locale]

  const [tab, setTab] = useState("overview")
  const [liked, setLiked] = useState({})
  const [disliked, setDisliked] = useState({})
  const [justAdded, setJustAdded] = useState(false)

  const trackRef = useRef(null)
  const rootRef = useRef(null)
  const orbitsRef = useRef([])
  const headsRef = useRef([])
  const bodiesRef = useRef([])
  const arcPathRef = useRef(null)

  const shownRef = useRef(-1)
  const dirRef = useRef(1)
  const anglesRef = useRef({})
  const arcStateRef = useRef({
    a0: 52,
    a1: 100,
    rgb: parseRgb(dishes[0]?.accent || "#f6a37c"),
  })
  const rafRef = useRef(0)
  const swipeRef = useRef(null)
  const programScrollTargetRef = useRef(null)
  const programScrollTimerRef = useRef(0)
  const lastSegRef = useRef(0)

  const steps = Math.max(1, n - 1)

  // Preload & decode all dish images in background to eliminate first-swap hitch
  useEffect(() => {
    dishes.forEach((d) => {
      const img = new Image()
      img.decoding = "async"
      img.src = d.image
      if (typeof img.decode === "function") {
        img.decode().catch(() => {})
      }
    })
  }, [dishes])

  // Proportionally scale the 960x520 stage to fit viewport cleanly with safe margins
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const fit = () => {
      const w = el.clientWidth - 32
      const h = el.clientHeight - 112
      el.style.setProperty("--dsh-s", String(Math.max(0.62, Math.min(w / 960, h / 520, 1.32))))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Instantaneous rest state helper
  const applyRestState = (to) => {
    for (let i = 0; i < n; i++) {
      const orb = orbitsRef.current[i]
      const hd = headsRef.current[i]
      const bd = bodiesRef.current[i]
      const active = i === to
      anglesRef.current[i] = 0
      if (orb) {
        orb.style.visibility = active ? "visible" : "hidden"
        orb.style.opacity = active ? "1" : "0"
        orb.style.transform = "rotate(0deg) scale(1) translateZ(0)"
      }
      if (hd) {
        hd.style.visibility = active ? "visible" : "hidden"
        hd.style.opacity = active ? "1" : "0"
        const eye = hd.querySelector(".dsh-eye")
        const t1 = hd.querySelector(".dsh-t1")
        const t2 = hd.querySelector(".dsh-t2")
        const meta = hd.querySelector(".dsh-meta")
        if (eye) {
          eye.style.opacity = "1"
          eye.style.transform = "translate3d(0, 0, 0)"
        }
        if (t1) t1.style.clipPath = "inset(0% 0% 0% 0%)"
        if (t2) t2.style.clipPath = "inset(0% 0% 0% 0%)"
        if (meta) {
          meta.style.opacity = "1"
          meta.style.transform = "translate3d(0, 0, 0)"
        }
      }
      if (bd) {
        bd.style.visibility = active ? "visible" : "hidden"
        bd.style.opacity = active ? "1" : "0"
        bd.style.transform = "translate3d(0, 0, 0)"
        Array.from(bd.children).forEach((ch) => {
          ch.style.opacity = "1"
          ch.style.transform = "translate3d(0, 0, 0)"
        })
      }
    }

    const rest = arcRest(to)
    const targetRgb = parseRgb(dishes[to]?.accent || "#f6a37c")
    arcStateRef.current = { a0: rest[0], a1: rest[1], rgb: targetRgb }
    if (arcPathRef.current) {
      arcPathRef.current.setAttribute(
        "d",
        arcPath(rest[0], rest[1], ORBIT_X, ORBIT_Y, ORBIT_R, 114)
      )
      arcPathRef.current.style.fill = rgbToCss(targetRgb)
    }
  }

  // Interruptible GPU orbit swing + clip-path title wipe + staggered card + arc morph
  useLayoutEffect(() => {
    const from = shownRef.current
    const to = activeIndex
    cancelAnimationFrame(rafRef.current)

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (from === -1 || from === to || reducedMotion) {
      applyRestState(to)
      shownRef.current = to
      return
    }

    for (let i = 0; i < n; i++) {
      if (i !== from && i !== to) {
        anglesRef.current[i] = 0
        if (orbitsRef.current[i]) {
          orbitsRef.current[i].style.visibility = "hidden"
          orbitsRef.current[i].style.opacity = "0"
        }
        if (headsRef.current[i]) {
          headsRef.current[i].style.visibility = "hidden"
          headsRef.current[i].style.opacity = "0"
        }
        if (bodiesRef.current[i]) {
          bodiesRef.current[i].style.visibility = "hidden"
          bodiesRef.current[i].style.opacity = "0"
        }
      }
    }

    const orbA = orbitsRef.current[from]
    const orbB = orbitsRef.current[to]
    const hdA = headsRef.current[from]
    const hdB = headsRef.current[to]
    const bdA = bodiesRef.current[from]
    const bdB = bodiesRef.current[to]

    const eyeA = hdA?.querySelector(".dsh-eye")
    const t1A = hdA?.querySelector(".dsh-t1")
    const t2A = hdA?.querySelector(".dsh-t2")
    const metaA = hdA?.querySelector(".dsh-meta")

    const eyeB = hdB?.querySelector(".dsh-eye")
    const t1B = hdB?.querySelector(".dsh-t1")
    const t2B = hdB?.querySelector(".dsh-t2")
    const metaB = hdB?.querySelector(".dsh-meta")

    const d = dirRef.current
    const fromStartAngle = anglesRef.current[from] || 0
    const fromEndAngle = SWING * d
    const toStartAngle = -SWING * d

    const startA0 = arcStateRef.current.a0
    const startA1 = arcStateRef.current.a1
    const startRgb = arcStateRef.current.rgb
    const targetRest = arcRest(to)
    const targetRgb = parseRgb(dishes[to]?.accent || "#f6a37c")

    const totalDuration = 980
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime

      // 1. Plate Orbit Swing
      if (orbA) {
        if (elapsed < 460) {
          const p = ease.cubicIn(clamp01(elapsed / 460))
          const angle = lerp(fromStartAngle, fromEndAngle, p)
          const scale = lerp(1, 0.92, p)
          anglesRef.current[from] = angle
          orbA.style.visibility = "visible"
          orbA.style.opacity = String(1 - ease.cubicIn(clamp01((elapsed - 200) / 260)))
          orbA.style.transform = `rotate(${angle.toFixed(2)}deg) scale(${scale.toFixed(3)}) translateZ(0)`
        } else {
          anglesRef.current[from] = 0
          orbA.style.visibility = "hidden"
          orbA.style.opacity = "0"
          orbA.style.transform = "rotate(0deg) scale(1) translateZ(0)"
        }
      }
      if (orbB) {
        if (elapsed >= 160) {
          const p = ease.quintOut(clamp01((elapsed - 160) / 760))
          const angle = lerp(toStartAngle, 0, p)
          const scale = lerp(0.92, 1, p)
          anglesRef.current[to] = angle
          orbB.style.visibility = "visible"
          orbB.style.opacity = String(ease.quartOut(clamp01((elapsed - 160) / 240)))
          orbB.style.transform = `rotate(${angle.toFixed(2)}deg) scale(${scale.toFixed(3)}) translateZ(0)`
        } else {
          orbB.style.visibility = "hidden"
          orbB.style.opacity = "0"
        }
      }

      // 2. Two-Weight Title Wipe
      if (hdA) {
        if (elapsed < 340) {
          hdA.style.visibility = "visible"
          hdA.style.opacity = "1"
          const p1 = ease.cubicIn(clamp01(elapsed / 300))
          const p2 = ease.cubicIn(clamp01((elapsed - 40) / 300))
          const pEye = clamp01(elapsed / 180)
          if (t1A) t1A.style.clipPath = `inset(0% 0% 0% ${(p1 * 100).toFixed(1)}%)`
          if (t2A) t2A.style.clipPath = `inset(0% ${(p2 * 100).toFixed(1)}% 0% 0%)`
          if (eyeA) eyeA.style.opacity = String(1 - pEye)
          if (metaA) metaA.style.opacity = String(1 - pEye)
        } else {
          hdA.style.visibility = "hidden"
          hdA.style.opacity = "0"
        }
      }
      if (hdB) {
        if (elapsed >= 320) {
          hdB.style.visibility = "visible"
          hdB.style.opacity = "1"
          const pEye = ease.quartOut(clamp01((elapsed - 340) / 320))
          const p1 = ease.quintOut(clamp01((elapsed - 330) / 560))
          const p2 = ease.quintOut(clamp01((elapsed - 390) / 560))
          const pMeta = ease.quartOut(clamp01((elapsed - 430) / 380))
          if (eyeB) {
            eyeB.style.opacity = String(pEye)
            eyeB.style.transform = `translate3d(0, ${lerp(6, 0, pEye).toFixed(1)}px, 0)`
          }
          if (t1B) t1B.style.clipPath = `inset(0% 0% 0% ${((1 - p1) * 100).toFixed(1)}%)`
          if (t2B) t2B.style.clipPath = `inset(0% ${((1 - p2) * 100).toFixed(1)}% 0% 0%)`
          if (metaB) {
            metaB.style.opacity = String(pMeta)
            metaB.style.transform = `translate3d(0, ${lerp(6, 0, pMeta).toFixed(1)}px, 0)`
          }
        } else {
          hdB.style.visibility = "hidden"
          hdB.style.opacity = "0"
        }
      }

      // 3. Frosted Chef Card Cross-Fade + Smooth GPU Stagger
      if (bdA) {
        if (elapsed < 260) {
          const p = ease.cubicIn(clamp01((elapsed - 20) / 220))
          bdA.style.visibility = "visible"
          bdA.style.opacity = String(1 - p)
          bdA.style.transform = `translate3d(0, ${lerp(0, -6, p).toFixed(1)}px, 0)`
        } else {
          bdA.style.visibility = "hidden"
          bdA.style.opacity = "0"
        }
      }
      if (bdB) {
        if (elapsed >= 250) {
          bdB.style.visibility = "visible"
          bdB.style.opacity = "1"
          bdB.style.transform = "translate3d(0, 0, 0)"
          const kids = Array.from(bdB.children)
          kids.forEach((child, idx) => {
            const p = ease.quartOut(clamp01((elapsed - (250 + idx * 45)) / 420))
            child.style.opacity = String(p)
            child.style.transform = `translate3d(0, ${lerp(10, 0, p).toFixed(1)}px, 0)`
          })
        } else {
          bdB.style.visibility = "hidden"
          bdB.style.opacity = "0"
        }
      }

      // 4. Pastel Arc Sweep & Seamless RGB Morph
      let curA0
      let curA1
      if (elapsed < 400) {
        const p = ease.cubicInOut(clamp01(elapsed / 400))
        curA0 = lerp(startA0, ARC_SWEEP[0], p)
        curA1 = lerp(startA1, ARC_SWEEP[1], p)
      } else {
        const p = ease.quintOut(clamp01((elapsed - 400) / 580))
        curA0 = lerp(ARC_SWEEP[0], targetRest[0], p)
        curA1 = lerp(ARC_SWEEP[1], targetRest[1], p)
      }
      const pColor = ease.sineInOut(clamp01((elapsed - 40) / 800))
      const curRgb = lerpRgb(startRgb, targetRgb, pColor)

      arcStateRef.current = { a0: curA0, a1: curA1, rgb: curRgb }
      if (arcPathRef.current) {
        arcPathRef.current.setAttribute(
          "d",
          arcPath(curA0, curA1, ORBIT_X, ORBIT_Y, ORBIT_R, 114)
        )
        arcPathRef.current.style.fill = rgbToCss(curRgb)
      }

      if (elapsed < totalDuration) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        applyRestState(to)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    shownRef.current = to

    return () => cancelAnimationFrame(rafRef.current)
  }, [activeIndex, n, dishes])

  // Drive active dish smoothly via rAF-throttled scroll with anti-jitter hysteresis
  useEffect(() => {
    let scrollRaf = 0

    const syncFromScroll = () => {
      scrollRaf = 0
      const track = trackRef.current
      const root = rootRef.current
      if (!track || !root) return

      if (programScrollTargetRef.current !== null) {
        if (Math.abs(window.scrollY - programScrollTargetRef.current) <= 6) {
          programScrollTargetRef.current = null
          clearTimeout(programScrollTimerRef.current)
        }
        return
      }

      const rect = track.getBoundingClientRect()
      const scrollable = track.offsetHeight - root.offsetHeight
      if (scrollable <= 0) return

      const progress = clamp01(-rect.top / scrollable)
      const exactSeg = progress * steps
      const currentSeg = lastSegRef.current

      // Hysteresis buffer (+/- 0.56) prevents jitter on sensitive trackpads
      let seg = currentSeg
      if (exactSeg > currentSeg + 0.56) {
        seg = Math.min(steps, Math.round(exactSeg))
      } else if (exactSeg < currentSeg - 0.56) {
        seg = Math.max(0, Math.round(exactSeg))
      }

      if (seg === currentSeg) return

      const dir = seg > currentSeg ? 1 : -1
      lastSegRef.current = seg
      dirRef.current = dir
      const nextIdx = wrapIndex(seg, n)
      if (nextIdx !== activeIndex) {
        onIndexChange(nextIdx)
      }
    }

    const onScroll = () => {
      if (!scrollRaf) {
        scrollRaf = requestAnimationFrame(syncFromScroll)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(scrollRaf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [activeIndex, n, steps, onIndexChange])

  // Jump to any dish via buttons, pager, thumbnails, keys, or swipe
  const go = (to, explicitDir) => {
    if (n < 2) return
    const next = wrapIndex(to, n)
    if (next === activeIndex) return
    dirRef.current = explicitDir ?? stepDirection(activeIndex, next, n)
    lastSegRef.current = next

    const track = trackRef.current
    const root = rootRef.current
    if (track && root) {
      const scrollable = track.offsetHeight - root.offsetHeight
      if (scrollable > 0) {
        const trackTopAbs = window.scrollY + track.getBoundingClientRect().top
        const targetY = Math.round(trackTopAbs + (scrollable * next) / steps)
        programScrollTargetRef.current = targetY
        clearTimeout(programScrollTimerRef.current)
        window.scrollTo({ top: targetY, behavior: "smooth" })
        programScrollTimerRef.current = window.setTimeout(() => {
          programScrollTargetRef.current = null
        }, 720)
      }
    }

    onIndexChange(next)
  }

  useEffect(() => () => clearTimeout(programScrollTimerRef.current), [])

  const step = (d) => go(activeIndex + d, d)

  // Expose smooth dish jump handler to parent (e.g. Search Drawer) so scroll & orbit stay synced
  useEffect(() => {
    if (jumpToRef) {
      jumpToRef.current = go
    }
  })

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      step(1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      step(-1)
    }
  }

  const onPointerDown = (e) => {
    swipeRef.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e) => {
    const s = swipeRef.current
    swipeRef.current = null
    if (!s) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.4) {
      step(dx < 0 ? 1 : -1)
    }
  }

  const handleOrderClick = () => {
    const current = dishes[activeIndex]
    if (!current) return
    onOrder?.(current)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  const start = stripStart(activeIndex, n, VISIBLE)
  const dish = dishes[activeIndex]

  return (
    <section
      ref={trackRef}
      className="dsh-trk relative w-full"
      style={{ height: `calc(100svh * ${1 + steps * SCROLL_PER_DISH})` }}
      aria-label="H One Signature Menu Showcase"
    >
      <div
        ref={rootRef}
        className={`dsh-root ${darkMode ? "dsh-dark" : "dsh-light"}`}
        style={{ height: "100svh" }}
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {backdrop && (
          <>
            <img className="dsh-bd" src={backdrop} alt="" width={1400} height={900} />
            <div className="dsh-dim" />
            <div className="dsh-wash" />
          </>
        )}

        {/* Scoped Section Top Header Bar */}
        {headerSlot}

        {/* Centered Responsive Stage */}
        <div className="dsh-canvas">
          {/* Dynamic Pastel Orbit Arc */}
          <svg className="dsh-arc" viewBox="0 0 960 520" aria-hidden="true">
            <path ref={arcPathRef} style={{ opacity: darkMode ? 0.42 : 0.35 }} />
          </svg>

          {/* Left Vertical Pager */}
          <div className="dsh-pager" role="tablist" aria-label="Choose a dish">
            {dishes.map((d, i) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                className="dsh-btn dsh-dot"
                aria-selected={i === activeIndex}
                aria-current={i === activeIndex ? "true" : undefined}
                aria-label={`${d.title} ${d.subtitle}`}
                onClick={() => go(i)}
              >
                <i />
              </button>
            ))}
          </div>

          {/* Orbiting Dish Showcase */}
          <div
            className="dsh-plates"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipeRef.current = null)}
          >
            {dishes.map((d, i) => (
              <div
                key={d.id}
                ref={(el) => {
                  orbitsRef.current[i] = el
                }}
                className="dsh-orbit"
                aria-hidden={i !== activeIndex}
              >
                <div className="dsh-plate-shell">
                  <DishPhoto
                    src={d.image}
                    alt={d.alt}
                    accent={d.accent}
                    title={`${d.title} ${d.subtitle}`}
                    className="dsh-plate-img"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Two-Weight Title + Price & Kitchen Metadata */}
          <div className="dsh-head" aria-live="polite">
            {dishes.map((d, i) => (
              <div
                key={d.id}
                ref={(el) => {
                  headsRef.current[i] = el
                }}
                className="dsh-hd"
                aria-hidden={i !== activeIndex}
              >
                <p className="dsh-eye">
                  #{i + 1} · {d.category || copy.eyebrowPrefix}
                </p>
                <h2 style={{ margin: 0, font: "inherit" }}>
                  <span
                    className="dsh-t1"
                    style={{ fontSize: `${fitSize(d.title.length, 52, 304, 0.56)}px` }}
                  >
                    {d.title}
                  </span>
                  <span
                    className="dsh-t2"
                    style={{ fontSize: `${fitSize(d.subtitle.length, 58, 298, 0.64)}px` }}
                  >
                    {d.subtitle}
                  </span>
                </h2>
                <div className="dsh-meta">
                  <span className="dsh-price">{formatIDR(d.price)}</span>
                  <span className="dsh-dot-sep" aria-hidden="true" />
                  <span className="dsh-prep">
                    <Clock className="h-3.5 w-3.5" />
                    {d.prepTime}
                  </span>
                  <span className="dsh-prep">
                    <Flame className="h-3.5 w-3.5" />
                    {d.calories}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Primary Actions */}
          <div className="dsh-acts">
            <button
              type="button"
              className="dsh-btn dsh-act-play"
              onClick={() => dish && onPlay?.(dish)}
            >
              <span className="dsh-act-icon">
                <Play className="h-3 w-3 fill-current ml-0.5" />
              </span>
              {copy.playVideo}
            </button>
            <button
              type="button"
              className="dsh-btn dsh-act-order"
              onClick={handleOrderClick}
            >
              {justAdded ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>{copy.added}</span>
                </>
              ) : (
                <>
                  <UtensilsCrossed className="h-3.5 w-3.5" />
                  <span>{copy.orderFood}</span>
                </>
              )}
            </button>
          </div>

          {/* Frosted Glass Chef & Rating Card */}
          <div className="dsh-card">
            <div className="dsh-tabs" role="tablist" aria-label="Dish details">
              {["overview", "ingredients"].map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  className="dsh-btn dsh-tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                >
                  {t === "overview" ? copy.overview : copy.ingredients}
                </button>
              ))}
            </div>
            <div className="dsh-bodies">
              {dishes.map((d, i) => (
                <div
                  key={d.id}
                  ref={(el) => {
                    bodiesRef.current[i] = el
                  }}
                  className="dsh-body"
                  aria-hidden={i !== activeIndex}
                >
                  <div className="dsh-rate">
                    <div className="dsh-badge" style={{ background: d.accent }}>
                      <Star className="h-3 w-3 fill-slate-900/80 text-slate-900/80" />
                    </div>
                    <span className="dsh-num">{d.rating.toFixed(1)}</span>
                  </div>
                  <p className="dsh-chef">{d.chef}</p>
                  <p className="dsh-kit">{d.kitchen}</p>

                  {tab === "overview" ? (
                    <p className="dsh-desc">
                      {locale === "id" ? d.descriptionId : d.description}
                    </p>
                  ) : (
                    <ul className="dsh-ing">
                      {d.ingredients.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className="dsh-react">
                    <button
                      type="button"
                      className="dsh-btn dsh-like"
                      aria-pressed={!!liked[i]}
                      tabIndex={i === activeIndex ? 0 : -1}
                      onClick={() => {
                        setLiked((s) => ({ ...s, [i]: !s[i] }))
                        setDisliked((s) => ({ ...s, [i]: false }))
                      }}
                    >
                      <ThumbsUp
                        className={`h-3.5 w-3.5 ${liked[i] ? "fill-current" : ""}`}
                      />
                      {d.likes + (liked[i] ? 1 : 0)} {copy.likes}
                    </button>
                    <button
                      type="button"
                      className="dsh-btn dsh-meh"
                      aria-pressed={!!disliked[i]}
                      aria-label="Not for me"
                      tabIndex={i === activeIndex ? 0 : -1}
                      onClick={() => {
                        setDisliked((s) => ({ ...s, [i]: !s[i] }))
                        setLiked((s) => ({ ...s, [i]: false }))
                      }}
                    >
                      <ThumbsDown
                        className={`h-3.5 w-3.5 ${disliked[i] ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="dsh-strip">
            <button
              type="button"
              className="dsh-btn dsh-arrow"
              aria-label="Previous dish"
              onClick={() => step(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div
              className="dsh-win"
              style={{
                WebkitMaskImage:
                  start < n - VISIBLE
                    ? "linear-gradient(90deg, #000 90%, transparent)"
                    : "none",
                maskImage:
                  start < n - VISIBLE
                    ? "linear-gradient(90deg, #000 90%, transparent)"
                    : "none",
              }}
            >
              <div
                className="dsh-track"
                style={{ transform: `translate3d(${-start * ITEM}px, 0, 0)` }}
              >
                {dishes.map((d, i) => (
                  <div key={d.id} className="dsh-th">
                    <button
                      type="button"
                      className="dsh-btn"
                      aria-current={i === activeIndex ? "true" : undefined}
                      onClick={() => go(i)}
                    >
                      <div className="dsh-th-shell">
                        <DishPhoto
                          src={d.thumb}
                          alt=""
                          accent={d.accent}
                          title={d.subtitle}
                          className="dsh-th-img"
                        />
                      </div>
                      <span>{d.label}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="dsh-btn dsh-arrow"
              aria-label="Next dish"
              onClick={() => step(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Minimalist Bottom Scroll Indicator */}
        <div className="pointer-events-none absolute bottom-3.5 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 px-3.5 py-1 text-[11px] font-medium opacity-75 backdrop-blur-md">
          <ArrowDown className="h-3 w-3 animate-bounce" />
          <span>{copy.scrollHint}</span>
          <span className="ml-1 font-bold opacity-80">
            {activeIndex + 1}/{n}
          </span>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN SINGLE-SECTION H ONE SHOWCASE
// ============================================================================

export default function App() {
  const [locale, setLocale] = useState("en")
  const [darkMode, setDarkMode] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const jumpToRef = useRef(null)

  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [videoDish, setVideoDish] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [cart, setCart] = useState([])
  const [tableNumber, setTableNumber] = useState("Villa 04 / Table 12")
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  const copy = COPY[locale]

  const addToCart = (dish) => {
    setOrderSubmitted(false)
    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id)
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { dish, qty: 1 }]
    })
  }

  const updateQty = (dishId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.dish.id === dishId ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  )
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.dish.price * item.qty, 0),
    [cart]
  )
  const taxAndService = Math.round(subtotal * 0.15)
  const grandTotal = subtotal + taxAndService

  const filteredDishes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return H_ONE_DISHES
    return H_ONE_DISHES.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.subtitle.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.chef.toLowerCase().includes(q) ||
        d.ingredients.some((ing) => ing.toLowerCase().includes(q))
    )
  }, [searchQuery])

  const handleCheckout = () => {
    if (cart.length === 0) return
    setOrderSubmitted(true)
    setTimeout(() => {
      setCart([])
    }, 350)
  }

  // Integrated header bar inside the section
  const sectionHeader = (
    <div className="absolute top-0 inset-x-0 z-30 px-4 sm:px-7 pt-4">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-3">
        {/* H One Identity */}
        <div className="flex items-center gap-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 px-3 py-1.5 shadow-sm backdrop-blur-md">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-extrabold tracking-tight">
            <svg viewBox="-41.5 -18.3 300 300" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path fillRule="evenodd" d="M157.2 5.2 L157.2 43.8 L157.8 44.5 L179.8 44.5 L184.8 43.5 L186.5 42.8 L187.8 42.8 L200.8 37.8 L201.5 37.0 L209.5 32.8 L214.8 28.8 L215.9 27.5 L215.9 5.0 L215.5 4.5 L158.0 4.5ZM0.8 4.5 L0.0 5.5 L0.0 258.2 L0.5 258.8 L70.2 258.8 L70.6 258.2 L70.6 157.5 L71.2 156.8 L156.8 156.8 L157.2 157.2 L157.2 258.6 L217.0 258.6 L217.0 81.5 L181.8 81.5 L180.5 82.0 L179.0 81.5 L157.8 81.5 L157.2 82.2 L157.2 99.8 L156.8 100.2 L71.2 100.2 L70.5 99.2 L70.5 5.0 L70.0 4.5Z" /></svg>
          </span>
          <div className="leading-tight pr-1.5">
            <div className="text-xs font-bold tracking-wide">H ONE</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              {copy.brandSub}
            </div>
          </div>
        </div>

        {/* Compact Section Utilities */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 p-0.5 text-[11px] font-semibold shadow-sm backdrop-blur-md">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`rounded-full px-2.5 py-1 transition ${
                locale === "en"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("id")}
              className={`rounded-full px-2.5 py-1 transition ${
                locale === "id"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              ID
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setDarkMode((v) => !v)}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 shadow-sm backdrop-blur-md transition hover:scale-105"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Search Menu */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 shadow-sm backdrop-blur-md transition hover:scale-105"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Guest Order Cart */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3.5 py-2 text-xs font-semibold shadow-sm transition hover:opacity-90"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Order</span>
            {totalItems > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1.5 text-[10px] font-bold text-slate-950">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className={darkMode ? "dark bg-[#0b0d12] text-slate-50" : "bg-[#fbfaf8] text-slate-900"}>
      {/* Global Typography & Clean Orbit Stage CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;500;600;700;800&display=swap');

        .dsh-light {
          --dsh-bg: #fbfaf8;
          --dsh-fg: #18181b;
          --dsh-muted: #71717a;
          --dsh-primary: #18181b;
          --dsh-card-bg: rgba(255, 255, 255, 0.82);
          --dsh-card-border: rgba(24, 24, 27, 0.08);
          --dsh-chip: rgba(24, 24, 27, 0.06);
          --dsh-plate-ring: rgba(255, 255, 255, 0.92);
          --dsh-plate-surface: #ffffff;
        }
        .dsh-dark {
          --dsh-bg: #0b0d12;
          --dsh-fg: #f8fafc;
          --dsh-muted: #94a3b8;
          --dsh-primary: #f8fafc;
          --dsh-card-bg: rgba(18, 22, 31, 0.8);
          --dsh-card-border: rgba(255, 255, 255, 0.1);
          --dsh-chip: rgba(255, 255, 255, 0.08);
          --dsh-plate-ring: rgba(30, 36, 48, 0.92);
          --dsh-plate-surface: #141923;
        }

        .dsh-root {
          position: sticky;
          top: 0;
          overflow: hidden;
          width: 100%;
          background: var(--dsh-bg);
          color: var(--dsh-fg);
          font-family: 'Outfit', ui-sans-serif, system-ui, sans-serif;
          container-type: inline-size;
          -webkit-tap-highlight-color: transparent;
          transition: background-color 0.35s ease, color 0.35s ease;
        }
        .dsh-root * { box-sizing: border-box; }

        .dsh-bd {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; pointer-events: none; opacity: 0.72;
        }
        .dsh-dim {
          position: absolute; inset: 0; background: var(--dsh-bg);
          mix-blend-mode: multiply; opacity: 0.12; pointer-events: none;
        }
        .dsh-wash {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 45%, transparent 15%, var(--dsh-bg) 88%);
          opacity: 0.25; pointer-events: none;
        }

        .dsh-canvas {
          position: absolute; left: 50%; top: 52%;
          width: 960px; height: 520px;
          transform: translate3d(-50%, -50%, 0) scale(var(--dsh-s, 1));
          transform-origin: 50% 50%;
          contain: layout style;
        }
        .dsh-arc {
          position: absolute; left: 0; top: 0; width: 960px; height: 520px;
          overflow: visible; pointer-events: none;
        }
        .dsh-btn {
          appearance: none; border: 0; background: none; color: inherit;
          font: inherit; padding: 0; margin: 0; cursor: pointer;
        }
        .dsh-btn:focus-visible {
          outline: 2px solid var(--dsh-primary); outline-offset: 3px; border-radius: 10px;
        }

        /* Left Vertical Pager (centered cleanly for 10 dishes) */
        .dsh-pager {
          position: absolute; left: 36px; top: 205px;
          transform: translateY(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .dsh-dot {
          width: 14px; height: 9px; display: grid; place-items: center;
          transition: height 0.42s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dsh-dot i {
          display: block; width: 3.5px; height: 3.5px; border-radius: 3px;
          background: var(--dsh-fg); opacity: 0.32;
          transition: height 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease;
        }
        .dsh-dot[aria-current] { height: 22px; }
        .dsh-dot[aria-current] i { height: 18px; opacity: 0.92; }

        /* Soft Squircle Platter Stage with GPU-promoted Orbit Pivot */
        .dsh-plates {
          position: absolute; left: 90px; top: 64px;
          width: 278px; height: 278px; touch-action: pan-y; cursor: grab;
        }
        .dsh-plates:active { cursor: grabbing; }
        .dsh-orbit {
          position: absolute; inset: 0;
          transform-origin: 70% -188%;
          visibility: hidden;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .dsh-plate-shell {
          position: relative;
          width: 100%; height: 100%;
          border-radius: 40px;
          padding: 6px;
          background: var(--dsh-plate-ring);
          box-shadow:
            0 24px 44px -14px rgba(0, 0, 0, 0.22),
            0 8px 16px -6px rgba(0, 0, 0, 0.1),
            0 0 0 1px var(--dsh-card-border);
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          transform: translateZ(0);
        }
        .dsh-plate-img {
          display: block;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center center;
          border-radius: 34px;
          background: var(--dsh-plate-surface);
          user-select: none; -webkit-user-drag: none;
        }

        /* Two-Weight Title & Metadata */
        .dsh-head {
          position: absolute; left: 396px; top: 82px; width: 304px; height: 176px;
        }
        .dsh-hd { position: absolute; inset: 0; visibility: hidden; }
        .dsh-eye {
          font-size: 11.5px; font-weight: 600; letter-spacing: 0.04em;
          text-transform: uppercase;
          margin: 0 0 6px 2px; color: var(--dsh-muted);
          will-change: transform, opacity;
        }
        .dsh-t1, .dsh-t2 {
          display: block; white-space: nowrap; line-height: 1.02;
          text-transform: uppercase; margin: 0;
          will-change: clip-path;
        }
        .dsh-t1 { font-weight: 200; letter-spacing: -0.015em; margin-top: 4px; }
        .dsh-t2 { font-weight: 800; letter-spacing: -0.025em; margin-top: 4px; opacity: 0.92; }
        .dsh-meta {
          display: flex; align-items: center; gap: 10px; margin-top: 16px;
          will-change: transform, opacity;
        }
        .dsh-price {
          font-size: 17px; font-weight: 700; letter-spacing: -0.02em;
        }
        .dsh-dot-sep {
          width: 3px; height: 3px; border-radius: 999px;
          background: var(--dsh-muted); opacity: 0.5;
        }
        .dsh-prep {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 11.5px; font-weight: 500; color: var(--dsh-muted);
        }

        /* Action Buttons */
        .dsh-acts {
          position: absolute; left: 396px; top: 278px;
          display: flex; align-items: center; gap: 16px;
          font-size: 12.5px; font-weight: 600;
        }
        .dsh-acts .dsh-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px; border-radius: 999px; transition: all 0.2s;
        }
        .dsh-act-play {
          border: 1px solid var(--dsh-card-border);
          background: var(--dsh-card-bg);
          backdrop-filter: blur(8px);
        }
        .dsh-act-play:hover {
          background: var(--dsh-chip);
        }
        .dsh-act-icon {
          width: 22px; height: 22px; border-radius: 999px;
          display: grid; place-items: center;
          background: var(--dsh-chip);
        }
        .dsh-act-order {
          background: var(--dsh-fg);
          color: var(--dsh-bg);
          padding: 9px 18px !important;
          box-shadow: 0 12px 22px -10px rgba(0, 0, 0, 0.32);
        }
        .dsh-act-order:hover {
          transform: translateY(-1px);
          opacity: 0.92;
        }

        /* Frosted Glass Chef & Rating Card */
        .dsh-card {
          position: absolute; left: 718px; top: 96px; width: 230px;
          padding: 18px 20px 20px; border-radius: 22px;
          background: var(--dsh-card-bg);
          border: 1px solid var(--dsh-card-border);
          -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
          box-shadow: 0 22px 44px -26px rgba(0, 0, 0, 0.24);
        }
        .dsh-tabs {
          display: flex; justify-content: space-between;
          padding: 0 8px; font-size: 12px; margin-bottom: 18px;
        }
        .dsh-tab { color: var(--dsh-muted); font-weight: 500; padding: 3px 0; position: relative; }
        .dsh-tab[aria-selected="true"] { color: var(--dsh-fg); font-weight: 600; }
        .dsh-tab[aria-selected="true"]::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -2px;
          height: 2px; border-radius: 2px; background: var(--dsh-fg);
        }
        .dsh-bodies { display: grid; }
        .dsh-body {
          grid-area: 1 / 1; visibility: hidden;
          will-change: transform, opacity;
        }
        .dsh-body > * { will-change: transform, opacity; }
        .dsh-rate { position: relative; height: 60px; margin: 0 0 14px 4px; }
        .dsh-badge {
          position: absolute; left: 0; top: 0; width: 46px; height: 60px;
          border-radius: 12px; display: flex; align-items: flex-end;
          justify-content: center; padding-bottom: 8px;
        }
        .dsh-num {
          position: absolute; left: 10px; top: 4px; font-size: 35px;
          font-weight: 700; letter-spacing: -0.04em; line-height: 1;
        }
        .dsh-chef { font-size: 17.5px; font-weight: 600; letter-spacing: -0.01em; margin: 0; }
        .dsh-kit { font-size: 11px; color: var(--dsh-muted); margin: 3px 0 12px; }
        .dsh-desc { font-size: 12.2px; line-height: 1.48; margin: 0; min-height: 70px; opacity: 0.88; }
        .dsh-ing {
          display: flex; flex-wrap: wrap; gap: 5px; margin: 0; padding: 0;
          list-style: none; min-height: 70px; align-content: flex-start;
        }
        .dsh-ing li {
          font-size: 10.5px; padding: 4px 9px; border-radius: 99px;
          background: var(--dsh-chip); font-weight: 500;
        }
        .dsh-react { display: flex; gap: 10px; margin-top: 16px; }
        .dsh-like {
          display: inline-flex; align-items: center; gap: 7px; height: 34px;
          padding: 0 14px 0 11px; border-radius: 99px; font-size: 11px; font-weight: 500;
          background: var(--dsh-chip); transition: background 0.2s;
        }
        .dsh-meh {
          width: 34px; height: 34px; display: grid; place-items: center;
          border-radius: 99px; background: var(--dsh-chip);
        }

        /* Bottom Thumbnail Strip */
        .dsh-strip {
          position: absolute; left: 92px; top: 374px;
          width: 580px; height: 124px; display: flex; align-items: center;
        }
        .dsh-arrow {
          width: 36px; height: 36px; display: grid; place-items: center;
          flex: none; border-radius: 99px; transition: background 0.2s;
        }
        .dsh-arrow:hover { background: var(--dsh-chip); }
        .dsh-win {
          position: relative; width: ${ITEM * VISIBLE}px; height: 124px;
          overflow: hidden; flex: none; margin: 0 4px;
          -webkit-mask-image: linear-gradient(90deg, #000 90%, transparent);
          mask-image: linear-gradient(90deg, #000 90%, transparent);
        }
        .dsh-track {
          position: absolute; left: 0; top: 0; display: flex;
          transition: transform 0.56s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
        .dsh-th {
          width: ${ITEM}px; height: 124px; display: flex;
          justify-content: center; padding-top: 4px;
        }
        .dsh-th .dsh-btn {
          width: 92px; height: 116px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center;
          gap: 7px; padding-top: 9px;
          transition: background 0.32s ease, box-shadow 0.32s ease;
        }
        .dsh-th .dsh-btn[aria-current] {
          background: var(--dsh-card-bg);
          box-shadow: 0 12px 24px -16px rgba(0,0,0,0.28), 0 0 0 1px var(--dsh-card-border);
        }
        .dsh-th-shell {
          width: 62px; height: 62px;
          border-radius: 16px;
          padding: 2.5px;
          background: var(--dsh-plate-ring);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12), 0 0 0 1px var(--dsh-card-border);
          overflow: hidden;
          transition: transform 0.36s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
        .dsh-th-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center center;
          border-radius: 13.5px;
          display: block;
        }
        .dsh-th .dsh-btn[aria-current] .dsh-th-shell { transform: scale(1.06); }
        .dsh-th span {
          font-size: 10.5px; line-height: 1.2; text-align: center;
          font-weight: 500; opacity: 0.85; max-width: 82px;
        }

        /* Responsive Mobile Stage */
        @container (max-width: 639px) {
          .dsh-canvas {
            position: relative; left: auto; top: auto; width: 100%; height: 100%;
            transform: none; display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding: 64px 16px 20px;
          }
          .dsh-arc { width: 200%; height: auto; left: -60%; top: -20px; }
          .dsh-pager { left: 10px; top: 48%; transform: translateY(-50%); gap: 4px; }
          .dsh-dot { height: 7px; }
          .dsh-dot[aria-current] { height: 16px; }
          .dsh-dot[aria-current] i { height: 14px; }
          .dsh-plates {
            position: relative; left: auto; top: auto;
            width: min(52vw, 25svh); height: min(52vw, 25svh);
          }
          .dsh-head {
            position: relative; left: auto; top: auto; width: 100%;
            height: 118px; margin-top: 10px;
          }
          .dsh-hd { text-align: center; transform: scale(0.76); transform-origin: 50% 0; }
          .dsh-meta { justify-content: center; }
          .dsh-acts { position: relative; left: auto; top: auto; margin-top: 4px; gap: 12px; }
          .dsh-card {
            position: relative; left: auto; top: auto; width: 100%;
            max-width: 380px; margin-top: 12px; padding: 14px 16px;
          }
          .dsh-desc, .dsh-ing { min-height: 48px; }
          .dsh-strip { display: none; }
        }
      `}</style>

      {/* =================================================================== */}
      {/* SINGLE SECTION: H ONE DISH ORBIT CAROUSEL                           */}
      {/* =================================================================== */}
      <DishOrbitSection
        dishes={H_ONE_DISHES}
        backdrop={BACKDROP_WALL}
        locale={locale}
        darkMode={darkMode}
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
        onOrder={addToCart}
        onPlay={(dish) => setVideoDish(dish)}
        headerSlot={sectionHeader}
        jumpToRef={jumpToRef}
      />

      {/* =================================================================== */}
      {/* SEARCH & QUICK JUMP DRAWER                                          */}
      {/* =================================================================== */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">{copy.categories}</h3>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  {H_ONE_DISHES.length} {locale === "id" ? "Menu" : "Dishes"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
              />
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-2.5 pr-1">
              {filteredDishes.map((d) => {
                const idx = H_ONE_DISHES.findIndex((x) => x.id === d.id)
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      if (jumpToRef.current) {
                        jumpToRef.current(idx)
                      } else {
                        setActiveIndex(idx)
                      }
                      setSearchOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                      idx === activeIndex
                        ? "border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/80"
                        : "border-black/10 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="h-12 w-12 shrink-0 rounded-xl overflow-hidden border border-black/10 bg-white dark:bg-slate-800">
                      <DishPhoto
                        src={d.thumb}
                        alt={d.alt}
                        accent={d.accent}
                        title={d.subtitle}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold truncate">
                        <span className="mr-1.5 text-xs font-bold text-slate-400">
                          #{idx + 1}
                        </span>
                        {d.title} {d.subtitle}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {d.category} · {d.chef}
                      </div>
                    </div>
                    <div className="text-xs font-bold whitespace-nowrap">
                      {formatIDR(d.price)}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* GUEST ORDER CART DRAWER (H ONE POS SIMULATION)                      */}
      {/* =================================================================== */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h3 className="text-base font-bold">{copy.cartTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {orderSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mb-4">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h4 className="text-lg font-bold">{copy.orderConfirmed}</h4>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {copy.orderConfirmedSub}
                </p>
                <p className="mt-3 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium">
                  {copy.roomOrTable}: <span className="font-bold">{tableNumber}</span>
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 text-slate-500 dark:text-slate-400">
                <UtensilsCrossed className="h-10 w-10 opacity-30 mb-3" />
                <p className="text-sm font-semibold">{copy.emptyCart}</p>
                <p className="mt-1 text-xs">{copy.emptyCartHint}</p>
              </div>
            ) : (
              <>
                <div className="mt-4">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    {copy.roomOrTable}
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm font-medium outline-none"
                  />
                </div>

                <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
                  {cart.map(({ dish, qty }) => (
                    <div
                      key={dish.id}
                      className="flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 p-3"
                    >
                      <div className="h-12 w-12 shrink-0 rounded-xl overflow-hidden border border-black/10 bg-white dark:bg-slate-800">
                        <DishPhoto
                          src={dish.thumb}
                          alt={dish.alt}
                          accent={dish.accent}
                          title={dish.subtitle}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold truncate">
                          {dish.title} {dish.subtitle}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {formatIDR(dish.price)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                        <button
                          type="button"
                          onClick={() => updateQty(dish.id, -1)}
                          className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-slate-700"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(dish.id, 1)}
                          className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-slate-700"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>{copy.subtotal}</span>
                    <span>{formatIDR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>{copy.serviceTax}</span>
                    <span>{formatIDR(taxAndService)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-1">
                    <span>{copy.total}</span>
                    <span>{formatIDR(grandTotal)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="mt-3 w-full rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 text-sm font-semibold shadow-md transition hover:opacity-90"
                  >
                    {copy.placeOrder}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CHEF PREP VIDEO PREVIEW MODAL                                       */}
      {/* =================================================================== */}
      {videoDish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setVideoDish(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={videoDish.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover scale-110 blur-xl opacity-35 pointer-events-none"
              />
              <img
                src={videoDish.image}
                alt={videoDish.alt}
                className="relative z-10 h-48 w-48 rounded-3xl object-cover object-center shadow-2xl ring-4 ring-white/25"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/15 to-black/25 pointer-events-none" />
              <button
                type="button"
                onClick={() => setVideoDish(null)}
                className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-white hover:bg-black/75"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-xl">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-4 left-5 right-5 z-20 text-white">
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold text-slate-900 mb-1"
                  style={{ backgroundColor: videoDish.accent }}
                >
                  Kitchen Reel · {videoDish.prepTime}
                </span>
                <h4 className="text-xl font-bold">
                  {videoDish.title} {videoDish.subtitle}
                </h4>
                <p className="text-xs text-white/80">
                  {videoDish.chef} — {videoDish.kitchen}
                </p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {locale === "id" ? videoDish.descriptionId : videoDish.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-base font-bold">{formatIDR(videoDish.price)}</span>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(videoDish)
                    setVideoDish(null)
                    setCartOpen(true)
                  }}
                  className="rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 text-xs font-semibold"
                >
                  {copy.orderFood}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}