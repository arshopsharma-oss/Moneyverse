import React, { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion } from "framer-motion";
import {
  Home,
  Wallet,
  Target,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Check,
  X,
  Coins,
  ChevronRight,
  Bell,
  Heart,
  Lightbulb,
  LockKeyhole,
  Search,
  Settings,
  CreditCard,
  PiggyBank,
  BookOpen,
  Menu,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  BarChart3
} from "lucide-react";

type Tab = "home" | "wallet" | "savings" | "shop" | "missions" | "parent" | "budget" | "journal";
type Product = { id: number; name: string; category: string; price: number; emoji: string; description: string; color: string };
type Goal = { id: number; name: string; target: number; saved: number; emoji: string };
type Transaction = { id: number; title: string; amount: number; date: string; type: "in" | "out"; category: string };
type Request = { id: number; name: string; amount: number; reason: string; status: "pending" | "approved" | "declined" };

const catalogue: Array<Omit<Product, "id">> = [
  // BOOKS & STORIES
  {name:"Adventure Storybook",category:"Books",price:180,emoji:"📚",description:"Discover a new adventure on every page.",color:"blue"},
  {name:"Space Explorer Stories",category:"Books",price:220,emoji:"🚀",description:"Travel through stories beyond Earth.",color:"violet"},
  {name:"Animal Tales Collection",category:"Books",price:160,emoji:"🦁",description:"Wonderful stories from the animal kingdom.",color:"gold"},
  {name:"Mystery Detective Book",category:"Books",price:240,emoji:"🔎",description:"Solve clever mysteries with every chapter.",color:"green"},
  {name:"Science for Curious Minds",category:"Books",price:280,emoji:"🔬",description:"Simple explanations of amazing science.",color:"mint"},
  {name:"Ocean Adventure Book",category:"Books",price:190,emoji:"🐬",description:"Explore the secrets of the deep blue.",color:"blue"},
  {name:"Dinosaur Discovery Book",category:"Books",price:210,emoji:"🦖",description:"Meet fascinating prehistoric creatures.",color:"green"},
  {name:"Little Inventors Handbook",category:"Books",price:260,emoji:"💡",description:"Ideas and inspiration for young creators.",color:"peach"},
  {name:"Nature Wonders Book",category:"Books",price:200,emoji:"🌿",description:"Discover the beauty of our planet.",color:"mint"},
  {name:"My First Atlas",category:"Books",price:320,emoji:"🌍",description:"Explore countries, maps and cultures.",color:"violet"},

  // CREATIVITY
  {name:"Creative Art Kit",category:"Creativity",price:350,emoji:"🎨",description:"A little space for big imagination.",color:"peach"},
  {name:"Watercolour Painting Set",category:"Creativity",price:290,emoji:"🖌️",description:"Bring colourful ideas to life.",color:"blue"},
  {name:"DIY Paper Craft Box",category:"Creativity",price:180,emoji:"✂️",description:"Create wonderful things with paper.",color:"mint"},
  {name:"Clay Modelling Set",category:"Creativity",price:320,emoji:"🏺",description:"Shape your imagination with clay.",color:"gold"},
  {name:"Friendship Bracelet Kit",category:"Creativity",price:210,emoji:"📿",description:"Make colourful handmade creations.",color:"violet"},
  {name:"Origami Starter Pack",category:"Creativity",price:150,emoji:"🦢",description:"Turn simple paper into art.",color:"green"},
  {name:"Canvas Painting Board",category:"Creativity",price:260,emoji:"🖼️",description:"Your next masterpiece starts here.",color:"peach"},
  {name:"DIY Greeting Card Kit",category:"Creativity",price:170,emoji:"💌",description:"Make thoughtful cards for loved ones.",color:"pink"},
  {name:"Colour Pencil Collection",category:"Creativity",price:240,emoji:"🖍️",description:"A rainbow of creative possibilities.",color:"blue"},
  {name:"Decorate Your Diary Kit",category:"Creativity",price:280,emoji:"✨",description:"Personalise your own creative journal.",color:"violet"},

  // GAMES & PUZZLES
  {name:"Puzzle Explorer",category:"Games",price:220,emoji:"🧠",description:"A fun challenge for curious minds.",color:"gold"},
  {name:"Wooden Brain Teaser",category:"Games",price:190,emoji:"🧩",description:"Give your problem-solving skills a workout.",color:"green"},
  {name:"Family Board Game",category:"Games",price:390,emoji:"🎲",description:"Enjoy a thoughtful game together.",color:"peach"},
  {name:"Number Challenge Cards",category:"Games",price:140,emoji:"🔢",description:"Make numbers fun with mini challenges.",color:"blue"},
  {name:"Memory Match Game",category:"Games",price:180,emoji:"🃏",description:"Train your memory through play.",color:"violet"},
  {name:"Maze Adventure Book",category:"Games",price:130,emoji:"🌀",description:"Find your way through tricky mazes.",color:"mint"},
  {name:"Word Builder Game",category:"Games",price:210,emoji:"🔤",description:"Build words and expand vocabulary.",color:"gold"},
  {name:"Tangram Shape Set",category:"Games",price:170,emoji:"🔷",description:"Create pictures using geometric shapes.",color:"blue"},
  {name:"Logic Detective Cards",category:"Games",price:200,emoji:"🕵️",description:"Solve puzzles using careful thinking.",color:"green"},
  {name:"Strategy Board Game",category:"Games",price:450,emoji:"♟️",description:"Plan ahead and make clever choices.",color:"violet"},

  // LEARNING & SCIENCE
  {name:"Mini Science Lab",category:"Learning",price:620,emoji:"🔬",description:"Explore how the world works.",color:"mint"},
  {name:"Space Discovery Set",category:"Learning",price:540,emoji:"🚀",description:"Bring the universe a little closer.",color:"blue"},
  {name:"Solar System Model",category:"Learning",price:480,emoji:"🪐",description:"Discover the planets in our solar system.",color:"violet"},
  {name:"Magnet Discovery Kit",category:"Learning",price:310,emoji:"🧲",description:"Explore the fascinating world of magnets.",color:"peach"},
  {name:"Weather Explorer Kit",category:"Learning",price:390,emoji:"🌦️",description:"Learn about clouds, rain and weather.",color:"blue"},
  {name:"Human Body Learning Set",category:"Learning",price:520,emoji:"🫀",description:"Understand how our bodies work.",color:"green"},
  {name:"Maths Activity Box",category:"Learning",price:260,emoji:"➗",description:"Explore maths through activities.",color:"gold"},
  {name:"Junior Geography Kit",category:"Learning",price:340,emoji:"🗺️",description:"Discover maps and our planet.",color:"mint"},
  {name:"Electricity Learning Board",category:"Learning",price:580,emoji:"💡",description:"Understand simple electrical concepts.",color:"violet"},
  {name:"Microscope Explorer Set",category:"Learning",price:750,emoji:"🔍",description:"Look closer at the tiny world.",color:"blue"},

  // NATURE & GARDEN
  {name:"Garden Starter Kit",category:"Nature",price:280,emoji:"🌱",description:"Grow something wonderful.",color:"green"},
  {name:"Herb Growing Kit",category:"Nature",price:240,emoji:"🌿",description:"Discover how herbs grow.",color:"mint"},
  {name:"Butterfly Garden Guide",category:"Nature",price:190,emoji:"🦋",description:"Learn about beautiful butterflies.",color:"peach"},
  {name:"Bird Watching Set",category:"Nature",price:420,emoji:"🐦",description:"Observe birds and learn about them.",color:"blue"},
  {name:"Plant Care Journal",category:"Nature",price:160,emoji:"📔",description:"Record the growth of your plants.",color:"green"},
  {name:"Nature Explorer Magnifier",category:"Nature",price:150,emoji:"🔎",description:"Observe nature more closely.",color:"gold"},
  {name:"Seed Collection Box",category:"Nature",price:220,emoji:"🌻",description:"Discover different kinds of seeds.",color:"mint"},
  {name:"Ocean Life Learning Set",category:"Nature",price:350,emoji:"🐠",description:"Explore fascinating marine life.",color:"blue"},
  {name:"Rock & Mineral Collection",category:"Nature",price:390,emoji:"💎",description:"Discover rocks and minerals.",color:"violet"},
  {name:"Eco Explorer Kit",category:"Nature",price:310,emoji:"🌎",description:"Learn simple ways to care for Earth.",color:"green"},

  // STATIONERY
  {name:"Premium Notebook Set",category:"Stationery",price:190,emoji:"📓",description:"A fresh page for every new idea.",color:"peach"},
  {name:"Pastel Highlighter Pack",category:"Stationery",price:150,emoji:"🖍️",description:"Make important notes stand out.",color:"violet"},
  {name:"Creative Pencil Case",category:"Stationery",price:220,emoji:"✏️",description:"Keep your stationery organised.",color:"blue"},
  {name:"Geometry Box",category:"Stationery",price:180,emoji:"📐",description:"Useful tools for geometry practice.",color:"mint"},
  {name:"Sticky Notes Collection",category:"Stationery",price:120,emoji:"🗒️",description:"Save reminders and little ideas.",color:"gold"},
  {name:"Colour Gel Pen Set",category:"Stationery",price:210,emoji:"🖊️",description:"Add colour to your writing.",color:"peach"},
  {name:"Daily Planner",category:"Stationery",price:240,emoji:"📅",description:"Organise tasks and everyday plans.",color:"green"},
  {name:"Bookmark Collection",category:"Stationery",price:90,emoji:"🔖",description:"Keep your favourite pages marked.",color:"violet"},
  {name:"Desk Organiser",category:"Stationery",price:320,emoji:"🗃️",description:"Give your study desk a tidy home.",color:"blue"},
  {name:"Sketching Pencil Set",category:"Stationery",price:260,emoji:"✍️",description:"Explore drawing with different pencils.",color:"mint"},

  // SPORTS & FITNESS
  {name:"Mini Football",category:"Sports",price:350,emoji:"⚽",description:"Enjoy a friendly game outdoors.",color:"green"},
  {name:"Badminton Starter Set",category:"Sports",price:580,emoji:"🏸",description:"Start a fun game with family.",color:"blue"},
  {name:"Skipping Rope",category:"Sports",price:140,emoji:"🪢",description:"Enjoy active play and movement.",color:"peach"},
  {name:"Frisbee Disc",category:"Sports",price:180,emoji:"🥏",description:"A fun outdoor activity.",color:"gold"},
  {name:"Table Tennis Set",category:"Sports",price:490,emoji:"🏓",description:"Practise coordination and friendly play.",color:"violet"},
  {name:"Mini Basketball",category:"Sports",price:420,emoji:"🏀",description:"Have fun practising your shots.",color:"peach"},
  {name:"Sports Water Bottle",category:"Sports",price:190,emoji:"🚰",description:"A reusable bottle for activity time.",color:"blue"},
  {name:"Yoga Activity Cards",category:"Sports",price:160,emoji:"🧘",description:"Learn simple movement activities.",color:"mint"},
  {name:"Soft Catch Ball Set",category:"Sports",price:220,emoji:"🥎",description:"Enjoy a gentle catching game.",color:"green"},
  {name:"Balance Challenge Kit",category:"Sports",price:290,emoji:"🤸",description:"Try fun coordination challenges.",color:"violet"},

  // TOYS & BUILDING
  {name:"Building Blocks",category:"Toys",price:450,emoji:"🧱",description:"Build your next big idea.",color:"violet"},
  {name:"Wooden Train Set",category:"Toys",price:520,emoji:"🚂",description:"Create your own little railway.",color:"peach"},
  {name:"Mini Vehicle Collection",category:"Toys",price:310,emoji:"🚗",description:"A collection for imaginative play.",color:"blue"},
  {name:"Soft Plush Elephant",category:"Toys",price:380,emoji:"🐘",description:"A soft companion for playtime.",color:"mint"},
  {name:"Magnetic Building Tiles",category:"Toys",price:650,emoji:"🔶",description:"Build colourful shapes and structures.",color:"gold"},
  {name:"Wooden Animal Set",category:"Toys",price:340,emoji:"🦒",description:"Create stories with animal figures.",color:"green"},
  {name:"Mini Construction Set",category:"Toys",price:490,emoji:"🏗️",description:"Build and explore simple structures.",color:"blue"},
  {name:"Dinosaur Figure Set",category:"Toys",price:360,emoji:"🦕",description:"Bring prehistoric adventures to playtime.",color:"violet"},
  {name:"Stacking Tower",category:"Toys",price:230,emoji:"🗼",description:"Build a tower with careful balance.",color:"peach"},
  {name:"Rocket Building Toy",category:"Toys",price:410,emoji:"🚀",description:"Create your own space adventure.",color:"mint"},

  // MUSIC & HOBBIES
  {name:"Music Maker Kit",category:"Music",price:390,emoji:"🎵",description:"Make your own little melodies.",color:"peach"},
  {name:"Mini Keyboard",category:"Music",price:850,emoji:"🎹",description:"Explore simple musical notes.",color:"violet"},
  {name:"Rhythm Instrument Set",category:"Music",price:420,emoji:"🥁",description:"Discover rhythm through sound.",color:"gold"},
  {name:"Harmonica Starter",category:"Music",price:280,emoji:"🎶",description:"Try making your first melodies.",color:"blue"},
  {name:"Music Theory Cards",category:"Music",price:170,emoji:"🎼",description:"Learn basic music concepts.",color:"mint"},
  {name:"DIY Paper Instrument Kit",category:"Music",price:190,emoji:"🎺",description:"Craft simple musical instruments.",color:"green"},
  {name:"Drawing Hobby Journal",category:"Music",price:220,emoji:"🎨",description:"Keep track of creative ideas.",color:"peach"},
  {name:"Photography Discovery Cards",category:"Music",price:180,emoji:"📷",description:"Learn to notice interesting details.",color:"blue"},
  {name:"Beginner Craft Collection",category:"Music",price:330,emoji:"🧶",description:"Try a variety of creative hobbies.",color:"violet"},
  {name:"Origami Hobby Collection",category:"Music",price:210,emoji:"🕊️",description:"Explore paper folding as a hobby.",color:"mint"},

  // EVERYDAY ESSENTIALS
  {name:"Reusable Lunch Box",category:"Essentials",price:290,emoji:"🍱",description:"Pack your favourite snacks neatly.",color:"green"},
  {name:"Study Desk Lamp",category:"Essentials",price:520,emoji:"💡",description:"A helpful light for your study space.",color:"gold"},
  {name:"Reusable Shopping Bag",category:"Essentials",price:110,emoji:"🛍️",description:"A reusable everyday carry bag.",color:"mint"},
  {name:"Travel Pencil Pouch",category:"Essentials",price:180,emoji:"🎒",description:"Carry small essentials together.",color:"blue"},
  {name:"Reading Light",category:"Essentials",price:240,emoji:"🔦",description:"A compact reading companion.",color:"violet"},
  {name:"Desk Calendar",category:"Essentials",price:150,emoji:"🗓️",description:"Keep track of important dates.",color:"peach"},
  {name:"Reusable Snack Container",category:"Essentials",price:170,emoji:"🥪",description:"Keep snacks organised.",color:"green"},
  {name:"Mini Storage Box",category:"Essentials",price:210,emoji:"📦",description:"Organise your little collections.",color:"blue"},
  {name:"Book Reading Stand",category:"Essentials",price:310,emoji:"📖",description:"A stand for comfortable reading.",color:"gold"},
  {name:"Reusable Water Flask",category:"Essentials",price:260,emoji:"💧",description:"A reusable flask for daily hydration.",color:"mint"}
];

const products: Product[] = catalogue.map((product, index) => ({
  ...product,
  id: index + 1
}));

const initialGoals: Goal[] = [
  { id: 1, name: "Dream Bicycle", target: 3000, saved: 1200, emoji: "🚲" },
  { id: 2, name: "Art & Creativity Kit", target: 1500, saved: 650, emoji: "🎨" },
  { id: 3, name: "Future Fund", target: 5000, saved: 850, emoji: "🌟" }
];

const initialTransactions: Transaction[] = [
  { id: 1, title: "Weekly allowance", amount: 500, date: "Today", type: "in", category: "Allowance" },
  { id: 2, title: "Storybook", amount: 120, date: "Yesterday", type: "out", category: "Shopping" },
  { id: 3, title: "Savings contribution", amount: 200, date: "Yesterday", type: "out", category: "Savings" }
];

function readStore<T,>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem("moneyverse2_" + key);
    return value ? JSON.parse(value) as T : fallback;
  } catch { return fallback; }
}

function money(value: number) {
  return "₹" + value.toLocaleString("en-IN");
}

const navItems: { id: Tab; label: string; icon: React.ElementType; group: string }[] = [
  { id: "home", label: "Overview", icon: Home, group: "YOUR SPACE" },
  { id: "wallet", label: "My Wallet", icon: Wallet, group: "YOUR SPACE" },
  { id: "savings", label: "Savings Goals", icon: Target, group: "YOUR SPACE" },
  { id: "shop", label: "Explore Shop", icon: ShoppingBag, group: "DISCOVER" },
  { id: "missions", label: "Money Missions", icon: Sparkles, group: "DISCOVER" },
  { id: "budget", label: "My Budget", icon: BarChart3, group: "DISCOVER" },
  { id: "journal", label: "Money Journal", icon: BookOpen, group: "DISCOVER" },
  { id: "parent", label: "Parent Space", icon: ShieldCheck, group: "FAMILY" }
];

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [balance, setBalance] = useState(() => readStore("balance", 1250));
  const [transactions, setTransactions] = useState<Transaction[]>(() => readStore("transactions", initialTransactions));
  const [goals, setGoals] = useState<Goal[]>(() => readStore("goals", initialGoals));
  const [requests, setRequests] = useState<Request[]>(() => readStore("requests", [
    { id: 1, name: "Drawing Kit", amount: 350, reason: "For my art project", status: "pending" },
    { id: 2, name: "Storybook", amount: 180, reason: "A book I want to read", status: "pending" }
  ]));
  const [completed, setCompleted] = useState<number[]>(() => readStore("completed", [1]));
  const [wishlist, setWishlist] = useState<number[]>(() => readStore("wishlist", [3]));
  const [journal, setJournal] = useState<string[]>(() => readStore("journal", ["I saved money instead of buying something I did not need."]));
  const [allowance, setAllowance] = useState(() => readStore("allowance", 500));
  const [modal, setModal] = useState<"goal" | "allowance" | "journal" | null>(null);
  const [checkout, setCheckout] = useState<Product | null>(null);
  const [checkoutStage, setCheckoutStage] = useState<"review" | "pin" | "processing" | "success" | "error">("review");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("1000");
  const [journalText, setJournalText] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [budgetLimit, setBudgetLimit] = useState(() => readStore("budgetLimit", 1000));

  useEffect(() => { localStorage.setItem("moneyverse2_balance", JSON.stringify(balance)); }, [balance]);
  useEffect(() => { localStorage.setItem("moneyverse2_transactions", JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem("moneyverse2_goals", JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem("moneyverse2_requests", JSON.stringify(requests)); }, [requests]);
  useEffect(() => { localStorage.setItem("moneyverse2_completed", JSON.stringify(completed)); }, [completed]);
  useEffect(() => { localStorage.setItem("moneyverse2_wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("moneyverse2_journal", JSON.stringify(journal)); }, [journal]);
  useEffect(() => { localStorage.setItem("moneyverse2_allowance", JSON.stringify(allowance)); }, [allowance]);
  useEffect(() => { localStorage.setItem("moneyverse2_budgetLimit", JSON.stringify(budgetLimit)); }, [budgetLimit]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const pageTitles: Record<Tab, string> = {
    home: "Your little universe", wallet: "My wallet", savings: "Dreams in progress",
    shop: "The discovery shop", missions: "Money missions", parent: "Parent space",
    budget: "My spending plan", journal: "Money journal"
  };

  const spent = transactions.filter(t => t.type === "out").reduce((sum, t) => sum + t.amount, 0);
  const saved = goals.reduce((sum, goal) => sum + goal.saved, 0);
  const pendingRequests = requests.filter(r => r.status === "pending").length;
  const filteredProducts = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  ), [category, search]);

  function addTransaction(title: string, amount: number, type: "in" | "out", categoryName: string) {
    setTransactions(prev => [{ id: Date.now(), title, amount, date: "Just now", type, category: categoryName }, ...prev]);
  }

  function startCheckout(product: Product) {
    setCheckout(product);
    setCheckoutStage("review");
    setPin("");
    setReceiptId("MV-" + Math.random().toString(36).slice(2, 8).toUpperCase());
  }

  function processPayment() {
    if (!checkout) return;
    if (pin.length !== 4) { notify("Enter your 4-digit demo PIN."); return; }
    if (pin !== "2468") { setCheckoutStage("error"); return; }
    if (balance < checkout.price) { setCheckoutStage("error"); notify("Not enough virtual balance."); return; }
    setCheckoutStage("processing");
    window.setTimeout(() => {
      setBalance(prev => prev - checkout.price);
      addTransaction(checkout.name, checkout.price, "out", "Shopping");
      setCheckoutStage("success");
    }, 1500);
  }

  function contribute(goalId: number, amount: number) {
    if (amount <= 0 || amount > balance) { notify("Check your available balance."); return; }
    setBalance(prev => prev - amount);
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, saved: Math.min(g.target, g.saved + amount) } : g));
    addTransaction("Savings contribution", amount, "out", "Savings");
    notify("A little closer to your dream!");
  }

  function createGoal() {
    const target = Number(goalTarget);
    if (!goalName.trim() || target <= 0) { notify("Add a goal name and a valid target."); return; }
    setGoals(prev => [...prev, { id: Date.now(), name: goalName.trim(), target, saved: 0, emoji: "✨" }]);
    setGoalName(""); setGoalTarget("1000"); setModal(null); notify("Your new dream is ready!");
  }

  function addJournal() {
    if (!journalText.trim()) return;
    setJournal(prev => [journalText.trim(), ...prev]);
    setJournalText(""); setModal(null); notify("Thought added to your journal.");
  }

  function handleRequest(id: number, status: "approved" | "declined") {
    const request = requests.find(r => r.id === id);
    if (!request || request.status !== "pending") return;
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (status === "approved") {
      setBalance(prev => prev + request.amount);
      addTransaction("Parent reward: " + request.name, request.amount, "in", "Family");
    }
    notify(status === "approved" ? "Request approved. Demo allowance added." : "Request declined.");
  }

  function finishMission(id: number) {
    if (completed.includes(id)) return;
    setCompleted(prev => [...prev, id]);
    setBalance(prev => prev + 50);
    addTransaction("Mission reward", 50, "in", "Learning");
    notify("Mission complete! You earned 50 demo coins.");
  }

  const missions = [
    { id: 1, title: "Need or Want?", desc: "Can you tell the difference between something you need and something you simply want?", emoji: "🧭", tag: "Smart choices" },
    { id: 2, title: "The Saving Superpower", desc: "Discover how small amounts can grow into something meaningful.", emoji: "🌱", tag: "Saving" },
    { id: 3, title: "Be a Price Detective", desc: "Compare two choices and think about which gives better value.", emoji: "🔎", tag: "Shopping" },
    { id: 4, title: "Plan Before You Spend", desc: "Make a simple plan for your next virtual shopping trip.", emoji: "🗓️", tag: "Budgeting" }
  ];

  const pageVariants = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  return (
    <div className="mv-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={21} /></div>
          <div><strong>moneyverse<span>.</span></strong><small>LEARN · GROW · GLOW</small></div>
          <button className="mobile-close" onClick={() => setMobileMenu(false)}><X size={19} /></button>
        </div>
        <div className="profile-mini">
          <div className="avatar">🦊</div>
          <div><strong>Curious Explorer</strong><small>My little money journey</small></div>
          <span className="online-dot" />
        </div>
        <nav className="side-nav">
          {["YOUR SPACE", "DISCOVER", "FAMILY"].map(group => (
            <div className="nav-group" key={group}>
              <span className="nav-label">{group}</span>
              {navItems.filter(item => item.group === group).map(item => {
                const Icon = item.icon;
                return <button key={item.id} className={`nav-item ${tab === item.id ? "active" : ""}`} onClick={() => { setTab(item.id); setMobileMenu(false); }}>
                  <Icon size={18} strokeWidth={1.8} /><span>{item.label}</span>
                  {item.id === "parent" && pendingRequests > 0 && <i className="nav-badge">{pendingRequests}</i>}
                  {tab === item.id && <ChevronRight className="nav-arrow" size={15} />}
                </button>;
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip"><div className="tip-icon"><Lightbulb size={17} /></div><p><strong>A little wisdom</strong><br />Good choices today make room for bigger dreams tomorrow.</p></div>
          <div className="sidebar-footer"><ShieldCheck size={15} /> Safe learning space <span>v2.0</span></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileMenu(true)}><Menu /></button>
          <div className="breadcrumb"><span>MY SPACE</span><ChevronRight size={13} /><strong>{pageTitles[tab]}</strong></div>
          <div className="top-actions">
            <div className="top-balance"><Coins size={16} /><span>{money(balance)}</span></div>
            <button className="icon-button notification-button" onClick={() => setTab("parent")} aria-label="Notifications"><Bell size={18} />{pendingRequests > 0 && <i />}</button>
            <div className="top-avatar">🦊</div>
          </div>
        </header>

        <div className="page-content">
          <AnimatePresence mode="wait">
            <motion.div key={tab} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: .24 }}>
              {tab === "home" && <section>
                <div className="hero-panel">
                  <div className="hero-copy">
                    <div className="eyebrow"><Sparkles size={14} /> YOUR FINANCIAL ADVENTURE</div>
                    <h1>Big dreams start<br />with <em>little choices.</em></h1>
                    <p>Every coin has a story. Every choice helps you learn. Ready to make today count?</p>
                    <button className="primary-button" onClick={() => setTab("missions")}>Explore today's missions <ArrowUpRight size={17} /></button>
                  </div>
                  <div className="hero-art">
                    <div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" />
                    <div className="hero-star star-a">✦</div><div className="hero-star star-b">✧</div>
                    <div className="hero-mascot">🦊</div>
                    <div className="mascot-caption"><span>YOUR GUIDE</span><strong>Finley the Fox</strong></div>
                    <div className="floating-coin coin-a">₹</div><div className="floating-coin coin-b">✦</div>
                  </div>
                  <div className="hero-bottom"><span><span className="live-dot" /> YOUR JOURNEY IS IN MOTION</span><span>ONE GOOD CHOICE AT A TIME</span></div>
                </div>

                <div className="section-heading"><div><span className="eyebrow">YOUR OVERVIEW</span><h2>A look at your universe</h2></div><span className="date-chip"><CalendarDays size={14} /> YOUR PROGRESS</span></div>
                <div className="stats-grid">
                  <div className="stat-panel balance-stat"><div className="stat-top"><span>AVAILABLE BALANCE</span><Wallet size={18} /></div><strong>{money(balance)}</strong><small>Your virtual pocket money</small><div className="stat-decoration">₹</div></div>
                  <div className="stat-panel"><div className="stat-top"><span>TOTAL SAVED</span><PiggyBank size={18} /></div><strong>{money(saved)}</strong><small>Across {goals.length} dreams</small><div className="stat-line mint-line" /></div>
                  <div className="stat-panel"><div className="stat-top"><span>MISSIONS DONE</span><Sparkles size={18} /></div><strong>{completed.length}<small> / {missions.length}</small></strong><small>Curiosity in action</small><div className="stat-line violet-line" /></div>
                  <div className="stat-panel"><div className="stat-top"><span>SMART CHOICES</span><Heart size={18} /></div><strong>{transactions.filter(t => t.category === "Savings").length + completed.length}</strong><small>Every choice counts</small><div className="stat-line gold-line" /></div>
                </div>

                <div className="home-grid">
                  <div className="content-panel goals-preview">
                    <div className="panel-heading"><div><span className="eyebrow">DREAM BIG</span><h3>Savings in progress</h3></div><button className="text-button" onClick={() => setTab("savings")}>View all <ArrowUpRight size={15} /></button></div>
                    {goals.slice(0, 2).map(goal => <div className="goal-row" key={goal.id}><div className="goal-emoji">{goal.emoji}</div><div className="goal-info"><div className="goal-title"><strong>{goal.name}</strong><span>{Math.round(goal.saved / goal.target * 100)}%</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${Math.min(100, goal.saved / goal.target * 100)}%` }} /></div><small>{money(goal.saved)} of {money(goal.target)}</small></div></div>)}
                  </div>
                  <div className="content-panel wisdom-panel"><div className="wisdom-symbol">✧</div><span className="eyebrow">A THOUGHT TO KEEP</span><h3>“Saving is not about having less. It's about making room for what matters more.”</h3><div className="wisdom-footer"><span>YOUR MONEY MOMENT</span><Sparkles size={17} /></div></div>
                </div>

                <div className="content-panel activity-panel"><div className="panel-heading"><div><span className="eyebrow">RECENT MOVEMENT</span><h3>Your latest activity</h3></div><button className="text-button" onClick={() => setTab("wallet")}>Full history <ArrowUpRight size={15} /></button></div>
                  {transactions.slice(0, 4).map(t => <div className="transaction-row" key={t.id}><div className={`transaction-icon ${t.type}`}>{t.type === "in" ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}</div><div className="transaction-name"><strong>{t.title}</strong><small>{t.category} · {t.date}</small></div><strong className={`transaction-amount ${t.type}`}>{t.type === "in" ? "+" : "−"}{money(t.amount)}</strong></div>)}
                </div>
              </section>}

              {tab === "wallet" && <section>
                <div className="page-intro"><span className="eyebrow">YOUR MONEY, YOUR STORY</span><h1>My <em>wallet.</em></h1><p>A safe place to understand how money moves.</p></div>
                <div className="wallet-layout">
                  <div className="virtual-card"><div className="card-top"><div className="card-brand">moneyverse<span>.</span></div><span className="card-chip">DEMO CARD</span></div><div className="card-chip-art"><div /></div><div className="card-number">•••• &nbsp; •••• &nbsp; •••• &nbsp; 2048</div><div className="card-bottom"><div><small>CARDHOLDER</small><strong>CURIOUS EXPLORER</strong></div><div><small>VALID THRU</small><strong>12/30</strong></div><div className="card-contactless">)))</div></div><div className="card-glow" /></div>
                  <div className="wallet-summary"><span className="eyebrow">AVAILABLE TO EXPLORE</span><h2>{money(balance)}</h2><p>Your virtual balance</p><div className="wallet-actions"><button className="primary-button" onClick={() => setModal("allowance")}><Plus size={16} /> Request allowance</button><button className="secondary-button" onClick={() => setTab("shop")}><ShoppingBag size={16} /> Visit shop</button></div><div className="secure-note"><LockKeyhole size={15} /> Fictional demo card · No real payments</div></div>
                </div>
                <div className="content-panel activity-panel"><div className="panel-heading"><div><span className="eyebrow">MONEY MOVEMENT</span><h3>Transaction history</h3></div><span className="count-chip">{transactions.length} activities</span></div>
                  {transactions.map(t => <div className="transaction-row" key={t.id}><div className={`transaction-icon ${t.type}`}>{t.type === "in" ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}</div><div className="transaction-name"><strong>{t.title}</strong><small>{t.category} · {t.date}</small></div><strong className={`transaction-amount ${t.type}`}>{t.type === "in" ? "+" : "−"}{money(t.amount)}</strong></div>)}
                </div>
              </section>}

              {tab === "savings" && <section>
                <div className="page-intro"><span className="eyebrow">SMALL STEPS, BIG DREAMS</span><h1>Dreams in <em>progress.</em></h1><p>Give your goals a name. Then watch your choices bring them closer.</p></div>
                <div className="savings-banner"><div><span className="eyebrow">YOUR SAVINGS JOURNEY</span><h2>{money(saved)} <small>saved so far</small></h2><p>Keep going. Every little contribution matters.</p></div><div className="savings-banner-icon">🌱</div></div>
                <div className="section-heading"><div><span className="eyebrow">YOUR DREAM BOARD</span><h2>Goals you're growing</h2></div><button className="primary-button" onClick={() => setModal("goal")}><Plus size={16} /> New goal</button></div>
                <div className="goals-grid">{goals.map((goal, i) => <motion.div className="goal-card" key={goal.id} whileHover={{ y: -5 }}><div className={`goal-art goal-art-${i % 4}`}><span>{goal.emoji}</span><small>{goal.saved >= goal.target ? "DREAM REACHED" : "IN PROGRESS"}</small></div><div className="goal-card-body"><h3>{goal.name}</h3><div className="goal-amounts"><strong>{money(goal.saved)}</strong><span>of {money(goal.target)}</span></div><div className="progress-track large"><div className="progress-fill" style={{ width: `${Math.min(100, goal.saved / goal.target * 100)}%` }} /></div><div className="goal-meta"><span>{Math.min(100, Math.round(goal.saved / goal.target * 100))}% complete</span><span>{money(Math.max(0, goal.target - goal.saved))} to go</span></div><button className="secondary-button full-button" onClick={() => { const amount = Number(window.prompt("How much would you like to add? (Demo coins)", "100")); if (Number.isFinite(amount) && amount > 0) contribute(goal.id, amount); }}> <Plus size={15} /> Add savings</button></div></motion.div>)}</div>
              </section>}

              {tab === "shop" && <section>
                <div className="shop-hero"><div><span className="eyebrow">CURIOUS MINDS MARKET</span><h1>Explore. Choose.<br /><em>Think it through.</em></h1><p>A pretend marketplace where every choice is a chance to learn.</p></div><div className="shop-hero-art">🛍️<span>✦</span></div></div>
                <div className="shop-toolbar"><div className="search-box"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find something wonderful..." /></div><div className="category-pills">{["All", ...Array.from(new Set(products.map(product => product.category)))].map(c => <button key={c} className={category === c ? "selected" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
                <div className="shop-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>Little things, big possibilities</h2></div><span className="count-chip"><Coins size={14} /> {money(balance)} available</span></div>
                <div className="products-grid">{filteredProducts.map(product => <motion.article className="product-card" key={product.id} whileHover={{ y: -5 }}><div className={`product-art ${product.color}`}><span>{product.emoji}</span><button className={`wishlist-button ${wishlist.includes(product.id) ? "liked" : ""}`} onClick={() => setWishlist(prev => prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id])}><Heart size={17} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /></button></div><div className="product-info"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><div className="product-bottom"><strong>{money(product.price)}</strong><button onClick={() => startCheckout(product)}>Explore <ArrowUpRight size={15} /></button></div></div></motion.article>)}</div>
                {filteredProducts.length === 0 && <div className="empty-state"><Search size={30} /><h3>No matches yet</h3><p>Try a different search or category.</p></div>}
                {wishlist.length > 0 && <div className="wishlist-strip"><Heart size={17} /><span><strong>{wishlist.length} saved for later</strong> — your wishlist is here whenever you need it.</span></div>}
              </section>}

              {tab === "missions" && <section>
                <div className="page-intro"><span className="eyebrow">LEARN BY DOING</span><h1>Money <em>missions.</em></h1><p>Short adventures that make everyday money decisions easier.</p></div>
                <div className="mission-feature"><div className="mission-feature-icon">🧠</div><div><span className="eyebrow">YOUR LEARNING PATH</span><h2>Curiosity is your superpower.</h2><p>Explore each mission at your own pace. No pressure, just discovery.</p></div><div className="mission-progress"><strong>{completed.length}/{missions.length}</strong><small>completed</small></div></div>
                <div className="missions-grid">{missions.map((m, i) => <motion.div className={`mission-card mission-${i}`} key={m.id} whileHover={{ y: -4 }}><div className="mission-card-top"><span className="mission-emoji">{m.emoji}</span>{completed.includes(m.id) ? <span className="done-chip"><Check size={13} /> Completed</span> : <span className="new-chip">{m.tag}</span>}</div><h3>{m.title}</h3><p>{m.desc}</p><div className="mission-card-bottom"><span><Coins size={14} /> 50 demo coins</span><button disabled={completed.includes(m.id)} onClick={() => finishMission(m.id)}>{completed.includes(m.id) ? "Completed" : "Complete mission"} <ChevronRight size={15} /></button></div></motion.div>)}</div>
              </section>}

              {tab === "parent" && <section>
                <div className="page-intro parent-intro"><span className="eyebrow"><ShieldCheck size={13} /> FAMILY COMPANION</span><h1>Parent <em>space.</em></h1><p>A clear view of learning, choices and virtual activity.</p></div>
                <div className="parent-welcome"><div><span className="eyebrow">FAMILY OVERVIEW</span><h2>Learning grows with support.</h2><p>This demo dashboard shows the child's simulated activity on this device.</p></div><div className="parent-shield"><ShieldCheck size={38} /></div></div>
                <div className="stats-grid parent-stats"><div className="stat-panel"><div className="stat-top"><span>VIRTUAL BALANCE</span><Wallet size={18} /></div><strong>{money(balance)}</strong><small>Current demo balance</small></div><div className="stat-panel"><div className="stat-top"><span>SAVINGS</span><PiggyBank size={18} /></div><strong>{money(saved)}</strong><small>Across active goals</small></div><div className="stat-panel"><div className="stat-top"><span>LEARNING</span><BookOpen size={18} /></div><strong>{completed.length}/{missions.length}</strong><small>Missions completed</small></div><div className="stat-panel"><div className="stat-top"><span>REQUESTS</span><Bell size={18} /></div><strong>{pendingRequests}</strong><small>Waiting for review</small></div></div>
                <div className="content-panel requests-panel"><div className="panel-heading"><div><span className="eyebrow">FAMILY CONNECTION</span><h3>Requests to review</h3></div><span className="count-chip">{pendingRequests} pending</span></div>
                  {requests.length === 0 && <p className="muted">No requests yet.</p>}
                  {requests.map(r => <div className="request-row" key={r.id}><div className="request-icon">🎁</div><div className="request-info"><strong>{r.name}</strong><small>{r.reason} · {money(r.amount)}</small></div>{r.status === "pending" ? <div className="request-actions"><button className="approve-button" onClick={() => handleRequest(r.id, "approved")}><Check size={14} /> Approve</button><button className="decline-button" onClick={() => handleRequest(r.id, "declined")}><X size={14} /></button></div> : <span className={`status-chip ${r.status}`}>{r.status}</span>}</div>)}
                </div>
                <div className="content-panel allowance-panel"><div><span className="eyebrow">DEMO CONTROLS</span><h3>Weekly allowance</h3><p>Adjust the example amount used in this learning environment.</p></div><div className="allowance-control"><strong>{money(allowance)}</strong><button className="secondary-button" onClick={() => setModal("allowance")}><Settings size={15} /> Adjust</button></div></div>
                <div className="privacy-note"><LockKeyhole size={17} /><div><strong>Privacy by design</strong><p>MoneyVerse uses fictional money and local demo data. No real payments, bank accounts or external child profiles are connected.</p></div></div>
              </section>}

              {tab === "budget" && <section>
                <div className="page-intro"><span className="eyebrow">PLAN WITH PURPOSE</span><h1>My <em>budget.</em></h1><p>Give your money a job before you decide where it goes.</p></div>
                <div className="budget-layout"><div className="content-panel budget-main"><span className="eyebrow">YOUR SPENDING PLAN</span><h2>{money(spent)} <small>spent so far</small></h2><div className="budget-track"><div style={{ width: `${Math.min(100, spent / Math.max(1, budgetLimit) * 100)}%` }} /></div><div className="budget-labels"><span>{money(spent)} used</span><span>{money(Math.max(0, budgetLimit - spent))} remaining</span></div><label className="field-label">Set your demo budget</label><div className="budget-input"><span>₹</span><input type="number" min="0" value={budgetLimit} onChange={e => setBudgetLimit(Math.max(0, Number(e.target.value)))} /></div><p className="muted">A budget is a plan, not a rule to feel bad about.</p></div><div className="content-panel budget-side"><div className="budget-icon">🧭</div><span className="eyebrow">A HELPFUL REMINDER</span><h3>Pause before you purchase.</h3><p>Ask yourself: Do I need it? Will I use it? Does it fit my plan?</p></div></div>
                <div className="content-panel activity-panel"><div className="panel-heading"><div><span className="eyebrow">WHERE IT WENT</span><h3>Spending categories</h3></div></div>{["Shopping", "Savings", "Learning", "Family"].map(c => { const total = transactions.filter(t => t.type === "out" && t.category === c).reduce((s, t) => s + t.amount, 0); return <div className="category-row" key={c}><span>{c}</span><div className="category-track"><div style={{ width: `${spent ? total / spent * 100 : 0}%` }} /></div><strong>{money(total)}</strong></div>; })}</div>
              </section>}

              {tab === "journal" && <section>
                <div className="page-intro"><span className="eyebrow">THINK · REFLECT · LEARN</span><h1>Money <em>journal.</em></h1><p>A little space to remember what you learned about money.</p></div>
                <div className="journal-compose"><div className="journal-art">✍️</div><div><span className="eyebrow">A THOUGHT WORTH KEEPING</span><h2>What did money teach you today?</h2><p>Write down a choice, a question or a small win.</p><button className="primary-button" onClick={() => setModal("journal")}><Plus size={16} /> Add a thought</button></div></div>
                <div className="section-heading"><div><span className="eyebrow">YOUR NOTES</span><h2>Moments of learning</h2></div><span className="count-chip">{journal.length} notes</span></div>
                <div className="journal-list">{journal.map((entry, i) => <div className="journal-entry" key={i}><div className="journal-entry-icon">✦</div><div><p>{entry}</p><small>YOUR MONEY JOURNEY · NOTE {journal.length - i}</small></div></div>)}</div>
              </section>}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {checkout && <motion.div className="checkout-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="checkout-window" initial={{ y: 35, opacity: 0, scale: .97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ type: "spring", damping: 25 }}>
            <div className="checkout-top"><button className="icon-button" onClick={() => setCheckout(null)}><ArrowLeft size={18} /></button><div><span className="eyebrow">MONEYVERSE CHECKOUT</span><strong>Secure demo payment</strong></div><div className="checkout-lock"><LockKeyhole size={16} /> DEMO</div></div>
            <div className="checkout-body">
              <div className="checkout-product"><div className={`checkout-product-art ${checkout.color}`}>{checkout.emoji}</div><div><span className="eyebrow">YOUR SELECTION</span><h2>{checkout.name}</h2><p>{checkout.description}</p></div></div>
              {checkoutStage === "review" && <><div className="checkout-summary"><div><span>Item total</span><strong>{money(checkout.price)}</strong></div><div><span>Demo fees</span><strong>₹0</strong></div><div className="summary-total"><span>Total to pay</span><strong>{money(checkout.price)}</strong></div></div><div className="balance-check"><Wallet size={18} /><div><span>Available virtual balance</span><strong>{money(balance)}</strong></div>{balance >= checkout.price ? <CheckCircle2 className="balance-ok" /> : <AlertCircle className="balance-no" />}</div><div className="checkout-card-mini"><div className="card-mini-brand">moneyverse<span>.</span></div><CreditCard size={25} /><strong>•••• &nbsp; •••• &nbsp; •••• &nbsp; 2048</strong><small>CURIOUS EXPLORER · DEMO CARD</small></div><button className="primary-button checkout-continue" disabled={balance < checkout.price} onClick={() => setCheckoutStage("pin")}>Continue to payment <ArrowUpRight size={17} /></button>{balance < checkout.price && <p className="checkout-error">Not enough virtual balance. Save more or choose another item.</p>}</>}
              {checkoutStage === "pin" && <div className="pin-screen"><div className="pin-icon"><LockKeyhole size={25} /></div><span className="eyebrow">CARD VERIFICATION</span><h2>Enter your demo PIN</h2><p>Use your fictional MoneyVerse card PIN to complete this learning simulation.</p><div className="pin-input-wrap"><input autoFocus type={showPin ? "text" : "password"} inputMode="numeric" maxLength={4} value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="••••" /><button onClick={() => setShowPin(!showPin)}>{showPin ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><small className="pin-hint">DEMO PIN FOR THIS PROTOTYPE: 2468</small><button className="primary-button checkout-continue" onClick={processPayment}>Pay {money(checkout.price)} <LockKeyhole size={16} /></button><button className="text-button pin-back" onClick={() => { setCheckoutStage("review"); setPin(""); }}>Back to order summary</button></div>}
              {checkoutStage === "processing" && <div className="checkout-state"><div className="processing-ring"><CreditCard size={30} /></div><h2>Making a little magic...</h2><p>Checking your demo card and virtual balance.</p><div className="processing-bar"><span /></div></div>}
              {checkoutStage === "error" && <div className="checkout-state"><div className="state-icon error-icon"><AlertCircle size={32} /></div><h2>{pin !== "2468" ? "That PIN didn't match." : "Payment couldn't continue."}</h2><p>{pin !== "2468" ? "Check your fictional demo PIN and try again." : "Your virtual balance may be too low."}</p><button className="primary-button" onClick={() => { setCheckoutStage("pin"); setPin(""); }}>Try again</button><button className="text-button" onClick={() => setCheckoutStage("review")}>Review order</button></div>}
              {checkoutStage === "success" && <div className="checkout-state success-state"><div className="success-orbit"><Check size={37} /></div><span className="eyebrow">DEMO PAYMENT COMPLETE</span><h2>Wonderful choice!</h2><p>Your virtual purchase has been recorded. No real money was used.</p><div className="receipt-card"><div><span>ITEM</span><strong>{checkout.name}</strong></div><div><span>AMOUNT</span><strong>{money(checkout.price)}</strong></div><div><span>RECEIPT ID</span><strong>{receiptId}</strong></div><div><span>REMAINING BALANCE</span><strong>{money(balance - checkout.price)}</strong></div></div><button className="primary-button checkout-continue" onClick={() => { setCheckout(null); setTab("wallet"); notify("Your receipt is in your transaction history."); }}>View my wallet <ArrowUpRight size={16} /></button></div>}
            </div>
            <div className="checkout-footer"><ShieldCheck size={14} /> SIMULATED LEARNING EXPERIENCE · NO REAL PAYMENT</div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {modal && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)}><motion.div className="modal-card" initial={{ y: 20, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 15, opacity: 0 }} onClick={e => e.stopPropagation()}>
          <div className="modal-heading"><div><span className="eyebrow">MONEYVERSE</span><h2>{modal === "goal" ? "Create a new dream" : modal === "journal" ? "Add a little reflection" : "Allowance settings"}</h2></div><button className="icon-button" onClick={() => setModal(null)}><X size={18} /></button></div>
          {modal === "goal" && <div className="modal-form"><label>What are you saving for?</label><input value={goalName} onChange={e => setGoalName(e.target.value)} placeholder="e.g. A new bicycle" /><label>How much will it cost?</label><input type="number" min="1" value={goalTarget} onChange={e => setGoalTarget(e.target.value)} /><button className="primary-button full-button" onClick={createGoal}>Create my goal <ArrowUpRight size={16} /></button></div>}
          {modal === "journal" && <div className="modal-form"><label>Your thought</label><textarea rows={4} value={journalText} onChange={e => setJournalText(e.target.value)} placeholder="Today I learned that..." /><button className="primary-button full-button" onClick={addJournal}>Save my thought <Check size={16} /></button></div>}
          {modal === "allowance" && <div className="modal-form"><label>Weekly demo allowance amount</label><input type="number" min="0" value={allowance} onChange={e => setAllowance(Math.max(0, Number(e.target.value)))} /><p className="muted">This only changes the example amount. To add demo money to the wallet, use the button below.</p><button className="primary-button full-button" onClick={() => { setBalance(prev => prev + allowance); addTransaction("Demo allowance", allowance, "in", "Allowance"); setModal(null); notify("Demo allowance added to your wallet."); }}>Add {money(allowance)} demo allowance <Plus size={16} /></button></div>}
        </motion.div></motion.div>}
      </AnimatePresence>

      <AnimatePresence>{toast && <motion.div className="toast-message" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><CheckCircle2 size={17} /> {toast}</motion.div>}</AnimatePresence>
      <div className="mobile-bottom-nav">{navItems.slice(0, 5).map(item => { const Icon = item.icon; return <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id)}><Icon size={19} /><small>{item.label.split(" ")[0]}</small></button>; })}</div>
    </div>
  );
}


