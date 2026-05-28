import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "accounts" | "transfers" | "payments" | "cards" | "history" | "profile" | "support";

const navItems = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "accounts", label: "Счета", icon: "Wallet" },
  { id: "transfers", label: "Переводы", icon: "ArrowLeftRight" },
  { id: "payments", label: "Платежи", icon: "Zap" },
  { id: "cards", label: "Карты", icon: "CreditCard" },
  { id: "history", label: "История", icon: "Clock" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "support", label: "Поддержка", icon: "MessageCircle" },
] as const;

const transactions = [
  { id: 1, name: "Spotify", category: "Музыка", amount: -299, date: "Сегодня", icon: "Music", color: "#1db954", cashback: 5.98 },
  { id: 2, name: "Перевод от Алексея", category: "Входящий", amount: +5000, date: "Сегодня", icon: "ArrowDownLeft", color: "#06d6a0", cashback: 0 },
  { id: 3, name: "Яндекс Go", category: "Такси", amount: -450, date: "Вчера", icon: "Car", color: "#ff6b35", cashback: 9.00 },
  { id: 4, name: "Пятёрочка", category: "Продукты", amount: -1240, date: "Вчера", icon: "ShoppingCart", color: "#4cc9f0", cashback: 24.80 },
  { id: 5, name: "Netflix", category: "Кино", amount: -799, date: "27 мая", icon: "Play", color: "#e50914", cashback: 15.98 },
  { id: 6, name: "Зарплата", category: "Поступление", amount: +85000, date: "26 мая", icon: "TrendingUp", color: "#06d6a0", cashback: 0 },
  { id: 7, name: "ВкусВилл", category: "Продукты", amount: -890, date: "26 мая", icon: "ShoppingBag", color: "#9b5fe0", cashback: 17.80 },
  { id: 8, name: "Детский мир", category: "Покупки", amount: -3200, date: "25 мая", icon: "Gift", color: "#f72585", cashback: 96.00 },
];

const cards = [
  { id: 1, number: "**** 4821", type: "VISA Signature", balance: 42850, color: "gradient-card-purple", cashback: 3 },
  { id: 2, number: "**** 7304", type: "МИР Premium", balance: 15200, color: "gradient-card-pink", cashback: 5 },
  { id: 3, number: "**** 1192", type: "VISA Classic", balance: 3400, color: "gradient-card-green", cashback: 1 },
];

const cashbackCategories = [
  { name: "Рестораны", percent: 10, icon: "UtensilsCrossed", color: "#ff6b35", earned: 840 },
  { name: "АЗС", percent: 5, icon: "Fuel", color: "#4cc9f0", earned: 320 },
  { name: "Кино", percent: 7, icon: "Film", color: "#9b5fe0", earned: 210 },
  { name: "Такси", percent: 5, icon: "Car", color: "#06d6a0", earned: 180 },
];

const payments = [
  { name: "ЖКХ", icon: "Home", color: "#4cc9f0", desc: "Коммунальные услуги" },
  { name: "Телефон", icon: "Smartphone", color: "#9b5fe0", desc: "Мобильная связь" },
  { name: "Интернет", icon: "Wifi", color: "#06d6a0", desc: "Домашний интернет" },
  { name: "Штрафы", icon: "AlertTriangle", color: "#ff6b35", desc: "ГИБДД и ФНС" },
  { name: "Налоги", icon: "Receipt", color: "#f72585", desc: "ФНС России" },
  { name: "Образование", icon: "GraduationCap", color: "#4cc9f0", desc: "Школы и ВУЗы" },
  { name: "Страхование", icon: "Shield", color: "#9b5fe0", desc: "Полисы ОСАГО" },
  { name: "Благотворит.", icon: "Heart", color: "#f72585", desc: "Помощь фондам" },
];

function TransactionRow({ tx }: { tx: typeof transactions[0] }) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 card-hover">
      <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: tx.color + "25" }}>
        <Icon name={tx.icon} size={18} style={{ color: tx.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-medium text-sm truncate">{tx.name}</div>
        <div className="text-white/50 text-xs">{tx.category} · {tx.date}</div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className={`font-montserrat font-bold text-sm ${tx.amount > 0 ? "text-[#06d6a0]" : "text-white"}`}>
          {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("ru-RU")} ₽
        </div>
        {tx.cashback > 0 && (
          <div className="text-xs text-[#9b5fe0]">+{tx.cashback} ₽ кешбэк</div>
        )}
      </div>
    </div>
  );
}

function HomeSection({ setActive }: { setActive: (s: Section) => void }) {
  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl overflow-hidden p-6 lg:p-8 gradient-card-purple neon-purple">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/20 animate-spin-slow" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10" />
        </div>
        <div className="relative">
          <div className="text-white/70 text-sm mb-1">Общий баланс</div>
          <div className="font-montserrat font-black text-white text-4xl lg:text-5xl mb-4">61 450 ₽</div>
          <div className="flex flex-wrap gap-3">
            <div className="glass rounded-2xl px-4 py-2">
              <div className="text-white/60 text-xs">Кешбэк за май</div>
              <div className="text-white font-bold text-sm">+170.56 ₽</div>
            </div>
            <div className="glass rounded-2xl px-4 py-2">
              <div className="text-white/60 text-xs">Бонусы АРИ</div>
              <div className="text-white font-bold text-sm">1 870 бонусов</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Перевод", icon: "Send", action: "transfers" as Section, color: "#9b5fe0" },
          { label: "Платёж", icon: "Zap", action: "payments" as Section, color: "#f72585" },
          { label: "Счета", icon: "Wallet", action: "accounts" as Section, color: "#06d6a0" },
          { label: "История", icon: "Clock", action: "history" as Section, color: "#4cc9f0" },
        ].map((item) => (
          <button key={item.label} onClick={() => setActive(item.action)}
            className="flex flex-col items-center gap-2 glass rounded-2xl p-4 card-hover">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.color + "33" }}>
              <Icon name={item.icon} size={20} style={{ color: item.color }} />
            </div>
            <span className="text-xs text-white/70">{item.label}</span>
          </button>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-montserrat font-bold text-white">Мои карты</h2>
          <button onClick={() => setActive("cards")} className="text-sm text-[#9b5fe0] hover:text-[#b87aff] transition-colors">Все карты →</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {cards.map((card) => (
            <div key={card.id} className={`${card.color} rounded-2xl p-5 min-w-[240px] flex-shrink-0 card-hover relative overflow-hidden`}>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10 animate-spin-slow" />
              <div className="text-white/80 text-xs">{card.type}</div>
              <div className="mt-4 font-montserrat font-bold text-white text-xl">{card.balance.toLocaleString("ru-RU")} ₽</div>
              <div className="text-white/70 text-sm mt-1 font-mono">{card.number}</div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-white/60 text-xs">Кешбэк</span>
                <span className="glass rounded-full px-2 py-0.5 text-white text-xs font-bold">{card.cashback}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-montserrat font-bold text-white">Кешбэк этого месяца</h2>
          <span className="text-xs text-white/50">Май 2026</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cashbackCategories.map((cat) => (
            <div key={cat.name} className="rounded-xl p-3" style={{ background: cat.color + "15", border: `1px solid ${cat.color}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <Icon name={cat.icon} size={16} style={{ color: cat.color }} />
                <span className="text-white/80 text-xs">{cat.name}</span>
              </div>
              <div className="font-montserrat font-bold text-white">{cat.percent}%</div>
              <div className="text-xs mt-0.5" style={{ color: cat.color }}>+{cat.earned} ₽</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-montserrat font-bold text-white">Последние операции</h2>
          <button onClick={() => setActive("history")} className="text-sm text-[#9b5fe0] hover:text-[#b87aff] transition-colors">Все →</button>
        </div>
        <div className="space-y-2">
          {transactions.slice(0, 4).map((tx) => (<TransactionRow key={tx.id} tx={tx} />))}
        </div>
      </div>
    </div>
  );
}

function AccountsSection() {
  const accounts = [
    { name: "Основной счёт", number: "40817 810 5 0000 1234567", balance: 42850, currency: "₽", type: "Текущий", color: "#9b5fe0", rate: null },
    { name: "Накопительный", number: "40817 810 5 0000 7654321", balance: 15200, currency: "₽", type: "Сберегательный", color: "#06d6a0", rate: "9.5%" },
    { name: "Валютный счёт", number: "40817 840 5 0000 1122334", balance: 2340, currency: "$", type: "Валютный", color: "#4cc9f0", rate: null },
  ];
  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-white/60 text-sm">Всего на счетах</div>
          <div className="font-montserrat font-black text-white text-3xl">61 450 ₽</div>
        </div>
        <button className="rounded-xl px-5 py-2.5 text-white text-sm font-medium gradient-card-purple hover:opacity-90 transition-opacity neon-purple">
          + Открыть счёт
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {accounts.map((acc) => (
          <div key={acc.name} className="glass rounded-2xl p-5 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-montserrat font-bold text-white">{acc.name}</div>
                <div className="text-white/50 text-xs mt-1 font-mono">{acc.number}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: acc.color + "20", color: acc.color }}>{acc.type}</span>
            </div>
            <div className="font-montserrat font-black text-2xl" style={{ color: acc.color }}>
              {acc.balance.toLocaleString("ru-RU")} {acc.currency}
            </div>
            {acc.rate && (
              <div className="mt-2 text-xs text-[#06d6a0] flex items-center gap-1">
                <Icon name="TrendingUp" size={12} /> Доходность {acc.rate} в год
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <button className="flex-1 glass rounded-xl py-2 text-white/80 text-xs hover:text-white transition-colors">Пополнить</button>
              <button className="flex-1 glass rounded-xl py-2 text-white/80 text-xs hover:text-white transition-colors">Реквизиты</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransfersSection() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const recent = [
    { name: "Алексей П.", phone: "+7 999 123-45-67", avatar: "АП", color: "#9b5fe0" },
    { name: "Мария С.", phone: "+7 926 987-65-43", avatar: "МС", color: "#f72585" },
    { name: "Дмитрий К.", phone: "+7 916 555-44-33", avatar: "ДК", color: "#4cc9f0" },
    { name: "Катя В.", phone: "+7 903 111-22-33", avatar: "КВ", color: "#06d6a0" },
  ];
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-montserrat font-bold text-white">Перевод по номеру телефона</h2>
        <div>
          <label className="text-white/60 text-sm mb-2 block">Номер телефона получателя</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 000 000-00-00"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0] transition-colors" />
        </div>
        <div>
          <label className="text-white/60 text-sm mb-2 block">Сумма перевода</label>
          <div className="relative">
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0] transition-colors font-montserrat font-bold text-2xl" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xl">₽</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[500, 1000, 2000, 5000].map(v => (
            <button key={v} onClick={() => setAmount(String(v))} className="glass rounded-full px-4 py-1.5 text-white/70 text-sm hover:text-white transition-all">
              {v.toLocaleString()} ₽
            </button>
          ))}
        </div>
        <button className="w-full rounded-xl py-4 font-montserrat font-bold text-white gradient-card-purple hover:opacity-90 transition-opacity neon-purple">
          Перевести
        </button>
      </div>
      <div>
        <h3 className="font-montserrat font-bold text-white mb-3">Недавние получатели</h3>
        <div className="grid grid-cols-2 gap-3">
          {recent.map((r) => (
            <button key={r.name} className="glass rounded-2xl p-4 flex items-center gap-3 card-hover text-left">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: r.color + "50" }}>{r.avatar}</div>
              <div>
                <div className="text-white font-medium text-sm">{r.name}</div>
                <div className="text-white/50 text-xs">{r.phone}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentsSection() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="glass rounded-2xl p-4">
        <input placeholder="🔍  Найти услугу..." className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none" />
      </div>
      <div>
        <h2 className="font-montserrat font-bold text-white mb-4">Популярные услуги</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {payments.map((p) => (
            <button key={p.name} className="glass rounded-2xl p-4 flex flex-col items-center gap-3 card-hover text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: p.color + "25" }}>
                <Icon name={p.icon} size={22} style={{ color: p.color }} />
              </div>
              <div>
                <div className="text-white font-medium text-sm">{p.name}</div>
                <div className="text-white/50 text-xs mt-0.5">{p.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-montserrat font-bold text-white mb-4">Автоплатежи</h3>
        <div className="space-y-3">
          {[
            { name: "Ростелеком", amount: 590, date: "1 числа", icon: "Wifi", color: "#4cc9f0" },
            { name: "МТС Мобильный", amount: 400, date: "5 числа", icon: "Smartphone", color: "#9b5fe0" },
          ].map((ap) => (
            <div key={ap.name} className="flex items-center gap-3 px-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: ap.color + "25" }}>
                <Icon name={ap.icon} size={16} style={{ color: ap.color }} />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{ap.name}</div>
                <div className="text-white/50 text-xs">{ap.date}</div>
              </div>
              <div className="text-white font-bold">{ap.amount} ₽</div>
              <button className="text-white/30 hover:text-[#f72585] transition-colors">
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full glass rounded-xl py-2.5 text-[#9b5fe0] text-sm hover:text-white transition-colors">
          + Добавить автоплатёж
        </button>
      </div>
    </div>
  );
}

function CardsSection() {
  const [frozen, setFrozen] = useState([false, false, false]);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat font-bold text-white text-xl">Мои карты</h2>
        <button className="rounded-xl px-4 py-2 text-sm font-medium text-white gradient-card-purple hover:opacity-90 transition-opacity">
          + Выпустить карту
        </button>
      </div>
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, i) => (
          <div key={card.id} className="space-y-3">
            <div className={`${card.color} rounded-2xl p-6 card-hover relative overflow-hidden`} style={{ filter: frozen[i] ? "grayscale(0.5) brightness(0.7)" : "none" }}>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10 animate-spin-slow" />
              <div className="flex justify-between items-start">
                <span className="text-white/80 text-sm">{card.type}</span>
                {frozen[i] && <span className="glass rounded-full px-3 py-1 text-xs text-blue-300">❄ Заморожена</span>}
              </div>
              <div className="mt-6 font-montserrat font-black text-white text-2xl">{card.balance.toLocaleString("ru-RU")} ₽</div>
              <div className="text-white/70 mt-1 font-mono text-sm tracking-widest">{card.number}</div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-white/70 text-xs">Кешбэк <span className="text-white font-bold">{card.cashback}%</span></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: frozen[i] ? "Разморозить" : "Заморозить", icon: frozen[i] ? "Sun" : "Snowflake", action: () => { const n = [...frozen]; n[i] = !n[i]; setFrozen(n); } },
                { label: "Реквизиты", icon: "FileText", action: () => {} },
                { label: "Блокировка", icon: "Lock", action: () => {} },
              ].map((btn) => (
                <button key={btn.label} onClick={btn.action} className="glass rounded-xl py-2.5 flex flex-col items-center gap-1 card-hover">
                  <Icon name={btn.icon} size={16} className="text-white/70" />
                  <span className="text-white/60 text-xs">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-card-orange flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-white" />
          </div>
          <div>
            <div className="font-montserrat font-bold text-white">Программа кешбэка АРИ4</div>
            <div className="text-white/50 text-sm">До 10% на любимые категории</div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cashbackCategories.map((cat) => (
            <div key={cat.name} className="rounded-xl p-3 text-center" style={{ background: cat.color + "15", border: `1px solid ${cat.color}30` }}>
              <Icon name={cat.icon} size={20} style={{ color: cat.color }} className="mx-auto mb-1" />
              <div className="text-white text-sm font-medium">{cat.name}</div>
              <div className="font-montserrat font-black text-lg" style={{ color: cat.color }}>{cat.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistorySection() {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "Все" },
    { id: "income", label: "Поступления" },
    { id: "outcome", label: "Расходы" },
    { id: "cashback", label: "С кешбэком" },
  ];
  const filtered = filter === "income" ? transactions.filter(t => t.amount > 0)
    : filter === "outcome" ? transactions.filter(t => t.amount < 0)
    : filter === "cashback" ? transactions.filter(t => t.cashback > 0)
    : transactions;
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${filter === f.id ? "gradient-card-purple text-white" : "glass text-white/60 hover:text-white"}`}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="glass rounded-2xl p-5 flex gap-6">
        <div className="text-center">
          <div className="text-white/50 text-xs mb-1">Доходы</div>
          <div className="font-montserrat font-bold text-[#06d6a0]">+90 000 ₽</div>
        </div>
        <div className="w-px bg-white/10" />
        <div className="text-center">
          <div className="text-white/50 text-xs mb-1">Расходы</div>
          <div className="font-montserrat font-bold text-[#f72585]">−6 878 ₽</div>
        </div>
        <div className="w-px bg-white/10" />
        <div className="text-center">
          <div className="text-white/50 text-xs mb-1">Кешбэк</div>
          <div className="font-montserrat font-bold text-[#9b5fe0]">+170 ₽</div>
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map((tx) => (<TransactionRow key={tx.id} tx={tx} />))}
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div className="space-y-5 max-w-xl">
      <div className="glass rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl gradient-card-pink flex items-center justify-center text-white font-montserrat font-black text-xl">АК</div>
        <div className="flex-1">
          <div className="font-montserrat font-bold text-white text-xl">Арина Кузнецова</div>
          <div className="text-white/50 text-sm">+7 999 123-45-67 · arina@ari4.ru</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#9b5fe0]/20 text-[#b87aff]">Premium</span>
            <span className="text-xs text-white/40">Клиент с 2023</span>
          </div>
        </div>
        <button className="text-white/40 hover:text-white transition-colors"><Icon name="Edit" size={18} /></button>
      </div>
      <div className="rounded-2xl p-5 relative overflow-hidden gradient-card-orange">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <Icon name="Star" size={20} className="text-white" />
          <span className="font-montserrat font-bold text-white">Бонусный счёт АРИ</span>
        </div>
        <div className="font-montserrat font-black text-white text-4xl">1 870</div>
        <div className="text-white/70 text-sm mt-1">бонусов накоплено</div>
        <div className="mt-4 glass rounded-xl px-4 py-2 inline-block">
          <span className="text-white text-sm">1 бонус = 1 рубль при оплате</span>
        </div>
      </div>
      <div className="space-y-2">
        {[
          { label: "Персональные данные", icon: "User", color: "#9b5fe0" },
          { label: "Безопасность и пароль", icon: "Shield", color: "#06d6a0" },
          { label: "Уведомления", icon: "Bell", color: "#4cc9f0" },
          { label: "Привязанные устройства", icon: "Smartphone", color: "#ff6b35" },
          { label: "Документы и справки", icon: "FileText", color: "#f72585" },
          { label: "Настройки приложения", icon: "Settings", color: "#9b5fe0" },
        ].map((item) => (
          <button key={item.label} className="w-full glass rounded-xl px-4 py-3.5 flex items-center gap-3 card-hover text-left">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.color + "25" }}>
              <Icon name={item.icon} size={16} style={{ color: item.color }} />
            </div>
            <span className="text-white flex-1">{item.label}</span>
            <Icon name="ChevronRight" size={16} className="text-white/30" />
          </button>
        ))}
      </div>
      <button className="w-full glass rounded-xl px-4 py-3.5 flex items-center gap-3 card-hover text-left">
        <div className="w-8 h-8 rounded-lg bg-[#f72585]/20 flex items-center justify-center flex-shrink-0">
          <Icon name="LogOut" size={16} className="text-[#f72585]" />
        </div>
        <span className="text-[#f72585]">Выйти из аккаунта</span>
      </button>
    </div>
  );
}

function SupportSection() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Как заблокировать карту?", a: "Перейдите в раздел «Карты», выберите нужную карту и нажмите «Блокировка»." },
    { q: "Как узнать реквизиты счёта?", a: "В разделе «Счета» нажмите «Реквизиты» рядом с нужным счётом." },
    { q: "Как подключить кешбэк?", a: "Кешбэк начисляется автоматически на все карты АРИ4. Повышенный кешбэк — в разделе «Карты»." },
    { q: "Как открыть новый счёт?", a: "В разделе «Счета» нажмите «+ Открыть счёт» и выберите подходящий тип." },
  ];
  return (
    <div className="space-y-6 max-w-xl">
      <div className="glass rounded-2xl p-5 flex gap-4 items-center">
        <div className="w-12 h-12 rounded-2xl gradient-card-purple flex items-center justify-center flex-shrink-0 neon-purple">
          <Icon name="Headphones" size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="font-montserrat font-bold text-white">Онлайн-поддержка</div>
          <div className="text-white/50 text-sm">Среднее время ответа — 3 минуты</div>
        </div>
        <button className="rounded-xl px-4 py-2 text-white text-sm font-medium gradient-card-purple hover:opacity-90 transition-opacity flex-shrink-0">
          Начать чат
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Позвонить", icon: "Phone", color: "#06d6a0", desc: "8 800 555-35-35" },
          { label: "Telegram", icon: "Send", color: "#4cc9f0", desc: "@ari4bank" },
        ].map((c) => (
          <button key={c.label} className="glass rounded-2xl p-4 flex flex-col items-center gap-2 card-hover">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.color + "25" }}>
              <Icon name={c.icon} size={20} style={{ color: c.color }} />
            </div>
            <div className="font-medium text-white text-sm">{c.label}</div>
            <div className="text-white/50 text-xs">{c.desc}</div>
          </button>
        ))}
      </div>
      <div>
        <h3 className="font-montserrat font-bold text-white mb-3">Частые вопросы</h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                <span className="text-white font-medium text-sm">{faq.q}</span>
                <Icon name={open === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-white/40 flex-shrink-0 ml-2" />
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-white/60 text-sm animate-fade-in">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-montserrat font-bold text-white mb-3">Написать обращение</h3>
        <textarea placeholder="Опишите вашу проблему..." rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0] transition-colors resize-none text-sm" />
        <button className="mt-3 w-full rounded-xl py-3 font-medium text-white gradient-card-purple hover:opacity-90 transition-opacity">
          Отправить обращение
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (active) {
      case "home": return <HomeSection setActive={setActive} />;
      case "accounts": return <AccountsSection />;
      case "transfers": return <TransfersSection />;
      case "payments": return <PaymentsSection />;
      case "cards": return <CardsSection />;
      case "history": return <HistorySection />;
      case "profile": return <ProfileSection />;
      case "support": return <SupportSection />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass-strong flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-card-purple flex items-center justify-center neon-purple">
              <span className="text-white font-montserrat font-black text-sm">А4</span>
            </div>
            <div>
              <div className="font-montserrat font-black text-white text-lg leading-none">АРИ4</div>
              <div className="text-xs text-white/50 mt-0.5">Digital Bank</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActive(item.id as Section); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active === item.id ? "nav-active text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
              <Icon name={item.icon} size={18} />
              {item.label}
              {item.id === "support" && (
                <span className="ml-auto w-5 h-5 rounded-full bg-[#f72585] text-white text-xs flex items-center justify-center font-bold">2</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full gradient-card-pink flex items-center justify-center text-white font-bold text-sm">АК</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Арина Кузнецова</div>
              <div className="text-xs text-white/50">Premium клиент</div>
            </div>
            <button className="text-white/40 hover:text-white/80 transition-colors"><Icon name="LogOut" size={16} /></button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass border-b border-white/10 px-4 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white/60 hover:text-white">
            <Icon name="Menu" size={22} />
          </button>
          <div className="flex-1">
            <h1 className="font-montserrat font-bold text-white text-lg">
              {navItems.find(i => i.id === active)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-white/60 hover:text-white transition-colors">
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f72585] text-white text-[10px] flex items-center justify-center font-bold">3</span>
            </button>
            <div className="w-8 h-8 rounded-full gradient-card-pink flex items-center justify-center text-white font-bold text-xs">АК</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div key={active} className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
