import { useState } from "react";
import {
  Wallet, PiggyBank, ShoppingBag, House, Bell, Sparkles, Heart, Send, ShieldCheck, TrendingUp
} from "lucide-react";
import "./index.css";

export default function App() {
  const [view, setView] = useState<"child" | "parent">("child");
  const [balance, setBalance] = useState(1250);
  const [saved, setSaved] = useState(500);
  const [requests, setRequests] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const notify = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 2500);
  };

  const buy = (name: string, price: number) => {
    if (balance < price) return notify("Not enough virtual coins!");
    setBalance(balance - price);
    notify(`${name} purchased successfully!`);
  };

  const requestMoney = () => {
    setRequests([...requests, "Request for 200 virtual coins"]);
    notify("Request sent to Parent!");
  };

  const approve = () => {
    setBalance(balance + 200);
    setRequests(requests.slice(1));
    notify("Request approved!");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><div className="brand-icon">M</div><span>moneyverse<span className="dot">.</span></span></div>
        <div className="side-label">YOUR SPACE</div>
        <button className="nav active"><House size={19}/> Overview</button>
        <button className="nav" onClick={() => notify("Your wallet is ready!") }><Wallet size={19}/> My Wallet</button>
        <button className="nav" onClick={() => document.getElementById("savings")?.scrollIntoView({behavior:"smooth"})}><PiggyBank size={19}/> Savings Goals</button>
        <button className="nav" onClick={() => document.getElementById("shop")?.scrollIntoView({behavior:"smooth"})}><ShoppingBag size={19}/> Money Shop</button>
        <div className="side-bottom">
          <div className="mascot">🐻</div>
          <b>Money buddy</b>
          <p>Little choices today, smarter money decisions tomorrow.</p>
          <span className="online"><i/> Your learning space is safe</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div><span className="eyebrow">YOUR FINANCIAL JOURNEY</span><h2>{view === "child" ? "Your little money world" : "Parent overview"}</h2></div>
          <div className="top-actions">
            <button className="icon-btn" onClick={() => notify("You're all caught up!") }><Bell size={19}/></button>
            <button className="profile" onClick={() => setView(view === "child" ? "parent" : "child")}>{view === "child" ? "C" : "P"}</button>
          </div>
        </header>

        <div className="switcher">
          <button className={view === "child" ? "selected" : ""} onClick={() => setView("child")}>Child experience</button>
          <button className={view === "parent" ? "selected" : ""} onClick={() => setView("parent")}>Parent dashboard</button>
        </div>

        {view === "child" ? <>
          <section className="welcome">
            <div><span className="eyebrow light">WEDNESDAY · YOUR MONEY MOMENT</span><h1>Hey there, money explorer! ✨</h1><p>Every smart choice brings you one step closer to your goals.</p></div>
            <div className="welcome-mascot">🐻<span>Hi, friend!</span></div>
            <div className="orb orb1"/><div className="orb orb2"/>
          </section>

          <section className="stats">
            <div className="stat-card balance-card"><div className="stat-top"><span>AVAILABLE BALANCE</span><Wallet size={20}/></div><h2>🪙 {balance.toLocaleString("en-IN")}</h2><p>Virtual coins · Not real money</p><div className="card-line"/></div>
            <div className="stat-card"><div className="stat-top"><span>TOTAL SAVED</span><PiggyBank size={20}/></div><h2>🪙 {saved.toLocaleString("en-IN")}</h2><p>You're building a good habit!</p></div>
            <div className="stat-card"><div className="stat-top"><span>SMART CHOICES</span><TrendingUp size={20}/></div><h2>08</h2><p>Decisions you've explored</p></div>
          </section>

          <div className="section-heading" id="savings"><div><span className="eyebrow">THINK ABOUT TOMORROW</span><h2>Your savings goals</h2></div><button className="text-btn" onClick={() => {if(balance>=100){setBalance(balance-100);setSaved(saved+100);notify("100 coins added to savings!")}else notify("Not enough coins!")}}>+ Save 100 coins</button></div>
          <section className="goal-card"><div className="goal-icon">🎧</div><div className="goal-info"><h3>My dream headphones</h3><p>Keep saving, you're getting closer!</p><div className="progress"><span style={{width:`${Math.min(saved/1500*100,100)}%`}}/></div><small>{saved} / 1,500 coins</small></div><div className="goal-percent">{Math.round(Math.min(saved/1500*100,100))}%</div></section>

          <div className="section-heading" id="shop"><div><span className="eyebrow">SPEND THOUGHTFULLY</span><h2>The little money shop</h2></div><span className="shop-note">Practice with virtual coins</span></div>
          <section className="shop-grid">
            {[{name:"Art kit",price:150,emoji:"🎨",desc:"Create something wonderful"},{name:"Story book",price:100,emoji:"📚",desc:"A new adventure awaits"},{name:"Plant buddy",price:200,emoji:"🪴",desc:"Grow something green"}].map(item=><div className="product" key={item.name}><div className="product-emoji">{item.emoji}</div><h3>{item.name}</h3><p>{item.desc}</p><div className="product-bottom"><b>🪙 {item.price}</b><button onClick={()=>buy(item.name,item.price)}>Choose</button></div></div>)}
          </section>
          <section className="request-card"><div className="request-icon"><Heart size={23}/></div><div><h3>Need a little help?</h3><p>Send a request to your parent. They'll see it in their dashboard.</p></div><button onClick={requestMoney}><Send size={16}/> Ask Parent</button></section>
        </> : <>
          <section className="parent-hero"><div><span className="eyebrow light">FAMILY MONEY SPACE</span><h1>Growing money confidence, together.</h1><p>A simple view of your child's virtual learning activity.</p></div><div className="parent-shield"><ShieldCheck size={48}/><span>Private family space</span></div></section>
          <section className="stats">
            <div className="stat-card"><div className="stat-top"><span>VIRTUAL BALANCE</span><Wallet size={20}/></div><h2>🪙 {balance.toLocaleString("en-IN")}</h2><p>Child's available coins</p></div>
            <div className="stat-card"><div className="stat-top"><span>SAVINGS</span><PiggyBank size={20}/></div><h2>🪙 {saved.toLocaleString("en-IN")}</h2><p>Coins set aside</p></div>
            <div className="stat-card"><div className="stat-top"><span>PARENT REQUESTS</span><Bell size={20}/></div><h2>{requests.length}</h2><p>Awaiting your attention</p></div>
          </section>
          <div className="section-heading"><div><span className="eyebrow">FAMILY CONNECTION</span><h2>Child requests</h2></div></div>
          <section className="parent-panel">{requests.length===0?<div className="empty"><div>🌱</div><h3>All caught up!</h3><p>New requests from your child will appear here.</p></div>:requests.map((r,i)=><div className="request-row" key={i}><div><b>{r}</b><p>Virtual money request · Just now</p></div><button onClick={approve}>Approve +200</button><button className="decline" onClick={()=>setRequests(requests.slice(1))}>Decline</button></div>)}</section>
          <div className="parent-note"><ShieldCheck size={20}/><p><b>Learning, not banking.</b> All balances and transactions in MoneyVerse are fictional simulations. No real money moves.</p></div>
        </>}
        <footer>MoneyVerse <span>·</span> Learn today. Choose wisely tomorrow.</footer>
      </main>
      {notice && <div className="toast"><Sparkles size={17}/>{notice}</div>}
    </div>
  );
}

