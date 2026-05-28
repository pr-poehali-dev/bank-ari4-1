import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

type Section = "home" | "accounts" | "transfers" | "payments" | "cards" | "history" | "profile" | "support";

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative glass-strong rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-montserrat font-bold text-white text-lg">{title}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

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
  const [accounts, setAccounts] = useState([
    { name: "Основной счёт", number: "40817 810 5 0000 1234567", balance: 42850, currency: "₽", type: "Текущий", color: "#9b5fe0", rate: null as string | null },
    { name: "Накопительный", number: "40817 810 5 0000 7654321", balance: 15200, currency: "₽", type: "Сберегательный", color: "#06d6a0", rate: "9.5%" as string | null },
    { name: "Валютный счёт", number: "40817 840 5 0000 1122334", balance: 2340, currency: "$", type: "Валютный", color: "#4cc9f0", rate: null as string | null },
  ]);
  const [openNew, setOpenNew] = useState(false);
  const [openTopUp, setOpenTopUp] = useState<number | null>(null);
  const [openReq, setOpenReq] = useState<number | null>(null);
  const [newType, setNewType] = useState("Сберегательный");
  const [topUpAmount, setTopUpAmount] = useState("");

  const types = [
    { name: "Текущий", desc: "Для повседневных операций", color: "#9b5fe0" },
    { name: "Сберегательный", desc: "До 9.5% годовых", color: "#06d6a0" },
    { name: "Валютный", desc: "USD, EUR, юани", color: "#4cc9f0" },
  ];

  const createAccount = () => {
    const t = types.find(t => t.name === newType)!;
    const num = "40817 810 5 " + Math.floor(Math.random() * 9000000000 + 1000000000);
    setAccounts([...accounts, { name: t.name + " счёт", number: num, balance: 0, currency: "₽", type: t.name, color: t.color, rate: t.name === "Сберегательный" ? "9.5%" : null }]);
    setOpenNew(false);
    toast.success("Счёт открыт!", { description: `Новый ${t.name.toLowerCase()} счёт готов к использованию` });
  };

  const topUp = () => {
    if (!topUpAmount || Number(topUpAmount) <= 0) return;
    const i = openTopUp!;
    const updated = [...accounts];
    updated[i] = { ...updated[i], balance: updated[i].balance + Number(topUpAmount) };
    setAccounts(updated);
    toast.success(`Счёт пополнен на ${Number(topUpAmount).toLocaleString("ru-RU")} ₽`);
    setTopUpAmount(""); setOpenTopUp(null);
  };

  const total = accounts.filter(a => a.currency === "₽").reduce((s, a) => s + a.balance, 0);

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-5 flex items-center justify-between">
        <div>
          <div className="text-white/60 text-sm">Всего на счетах</div>
          <div className="font-montserrat font-black text-white text-3xl">{total.toLocaleString("ru-RU")} ₽</div>
        </div>
        <button onClick={() => setOpenNew(true)} className="rounded-xl px-5 py-2.5 text-white text-sm font-medium gradient-card-purple hover:opacity-90 transition-opacity neon-purple">
          + Открыть счёт
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {accounts.map((acc, i) => (
          <div key={acc.number} className="glass rounded-2xl p-5 card-hover">
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
              <button onClick={() => setOpenTopUp(i)} className="flex-1 glass rounded-xl py-2 text-white/80 text-xs hover:text-white transition-colors">Пополнить</button>
              <button onClick={() => setOpenReq(i)} className="flex-1 glass rounded-xl py-2 text-white/80 text-xs hover:text-white transition-colors">Реквизиты</button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={openNew} onClose={() => setOpenNew(false)} title="Открытие нового счёта">
        <div className="space-y-3">
          {types.map(t => (
            <button key={t.name} onClick={() => setNewType(t.name)}
              className={`w-full rounded-xl px-4 py-3 flex items-center gap-3 text-left transition-all ${newType === t.name ? "border border-[#9b5fe0]" : "border border-white/10 hover:border-white/30"}`}
              style={{ background: newType === t.name ? t.color + "20" : "rgba(255,255,255,0.03)" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: t.color + "30" }}>
                <Icon name="Wallet" size={16} style={{ color: t.color }} />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{t.name}</div>
                <div className="text-white/50 text-xs">{t.desc}</div>
              </div>
              {newType === t.name && <Icon name="Check" size={18} style={{ color: t.color }} />}
            </button>
          ))}
          <button onClick={createAccount} className="w-full mt-3 rounded-xl py-3 font-medium text-white gradient-card-purple hover:opacity-90 transition-opacity">
            Открыть счёт
          </button>
        </div>
      </Modal>

      <Modal open={openTopUp !== null} onClose={() => setOpenTopUp(null)} title="Пополнение счёта">
        <div className="space-y-3">
          <div className="text-white/60 text-sm">{openTopUp !== null && accounts[openTopUp].name}</div>
          <input value={topUpAmount} onChange={e => setTopUpAmount(e.target.value.replace(/\D/g, ""))} placeholder="Сумма ₽"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0] font-montserrat font-bold text-2xl" />
          <div className="flex gap-2 flex-wrap">
            {[1000, 5000, 10000, 50000].map(v => (
              <button key={v} onClick={() => setTopUpAmount(String(v))} className="glass rounded-full px-4 py-1.5 text-white/70 text-sm hover:text-white">
                {v.toLocaleString()} ₽
              </button>
            ))}
          </div>
          <button onClick={topUp} className="w-full rounded-xl py-3 font-medium text-white gradient-card-purple hover:opacity-90 transition-opacity">
            Пополнить
          </button>
        </div>
      </Modal>

      <Modal open={openReq !== null} onClose={() => setOpenReq(null)} title="Реквизиты счёта">
        {openReq !== null && (() => {
          const a = accounts[openReq];
          const copy = (text: string, label: string) => { navigator.clipboard.writeText(text); toast.success(`${label} скопирован`); };
          const rows = [
            { label: "Получатель", value: "Кузнецова Арина Сергеевна" },
            { label: "Номер счёта", value: a.number },
            { label: "Банк", value: "АРИ4 Банк" },
            { label: "БИК", value: "044525974" },
            { label: "Корр. счёт", value: "30101 810 1 4525 0000974" },
            { label: "ИНН", value: "7710140679" },
          ];
          return (
            <div className="space-y-2">
              {rows.map(r => (
                <button key={r.label} onClick={() => copy(r.value, r.label)} className="w-full glass rounded-xl px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="text-white/50 text-xs">{r.label}</div>
                    <div className="text-white text-sm font-mono truncate">{r.value}</div>
                  </div>
                  <Icon name="Copy" size={16} className="text-white/40" />
                </button>
              ))}
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}

const TRANSFERS_API = "https://functions.poehali.dev/ebbc2942-afe4-4283-88b2-1d52ac8a4ea4";
const MY_PHONE = "+79991234567";
const AVATAR_COLORS = ["#9b5fe0", "#f72585", "#4cc9f0", "#06d6a0", "#ff6b35"];
function getInitials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}
function normalizePhone(p: string) {
  const digits = p.replace(/\D/g, "");
  if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) return "+7" + digits.slice(1);
  if (digits.length === 10) return "+7" + digits;
  return "+" + digits;
}

function TransfersSection() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [recipient, setRecipient] = useState<{ name: string; phone: string } | null>(null);
  const [lookupStatus, setLookupStatus] = useState<"idle" | "loading" | "found" | "notfound">("idle");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const recentContacts = [
    { name: "Алексей Петров", phone: "+79991234568", color: "#9b5fe0" },
    { name: "Мария Соколова", phone: "+79269876543", color: "#f72585" },
    { name: "Дмитрий Козлов", phone: "+79165554433", color: "#4cc9f0" },
    { name: "Катя Василенко", phone: "+79031112233", color: "#06d6a0" },
  ];

  const lookup = async (raw: string) => {
    const normalized = normalizePhone(raw);
    if (normalized.replace(/\D/g, "").length < 11) { setRecipient(null); setLookupStatus("idle"); return; }
    setLookupStatus("loading");
    try {
      const res = await fetch(`${TRANSFERS_API}?action=lookup&phone=${encodeURIComponent(normalized)}`);
      const data = await res.json();
      if (res.ok && data.user) { setRecipient(data.user); setLookupStatus("found"); }
      else { setRecipient(null); setLookupStatus("notfound"); }
    } catch { setRecipient(null); setLookupStatus("notfound"); }
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val); setResult(null);
    if (val.replace(/\D/g, "").length >= 10) lookup(val);
    else { setRecipient(null); setLookupStatus("idle"); }
  };

  const selectContact = (c: { name: string; phone: string }) => {
    setPhone(c.phone); setRecipient(c); setLookupStatus("found"); setResult(null);
  };

  const handleSend = async () => {
    if (!recipient || !amount || Number(amount) <= 0) return;
    setSending(true); setResult(null);
    try {
      const res = await fetch(TRANSFERS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_phone: MY_PHONE, to_phone: recipient.phone, amount: Number(amount), comment }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResult({ ok: true, message: `Перевод ${Number(amount).toLocaleString("ru-RU")} ₽ → ${recipient.name} выполнен!` });
        setPhone(""); setAmount(""); setComment(""); setRecipient(null); setLookupStatus("idle");
      } else {
        setResult({ ok: false, message: data.error || "Ошибка перевода" });
      }
    } catch { setResult({ ok: false, message: "Ошибка соединения" }); }
    finally { setSending(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {result && (
        <div className={`rounded-2xl p-4 flex items-center gap-3 animate-fade-in ${result.ok ? "bg-[#06d6a0]/15 border border-[#06d6a0]/30" : "bg-[#f72585]/15 border border-[#f72585]/30"}`}>
          <Icon name={result.ok ? "CheckCircle" : "AlertCircle"} size={20} style={{ color: result.ok ? "#06d6a0" : "#f72585" }} />
          <span className="text-white text-sm font-medium">{result.message}</span>
        </div>
      )}
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-montserrat font-bold text-white">Перевод по номеру телефона</h2>
        <div>
          <label className="text-white/60 text-sm mb-2 block">Номер телефона получателя</label>
          <div className="relative">
            <input value={phone} onChange={e => handlePhoneChange(e.target.value)} placeholder="+7 900 000-00-00"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0] transition-colors" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {lookupStatus === "loading" && <Icon name="Loader" size={18} className="text-white/40 animate-spin" />}
              {lookupStatus === "found" && <Icon name="CheckCircle" size={18} style={{ color: "#06d6a0" }} />}
              {lookupStatus === "notfound" && <Icon name="XCircle" size={18} style={{ color: "#f72585" }} />}
            </div>
          </div>
          {lookupStatus === "found" && recipient && (
            <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#06d6a0]/10 border border-[#06d6a0]/20 animate-fade-in">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: AVATAR_COLORS[recipient.name.charCodeAt(0) % AVATAR_COLORS.length] + "90" }}>
                {getInitials(recipient.name)}
              </div>
              <span className="text-[#06d6a0] text-sm font-medium">{recipient.name}</span>
            </div>
          )}
          {lookupStatus === "notfound" && (
            <p className="mt-2 text-[#f72585] text-xs px-1 animate-fade-in">Пользователь с таким номером не найден в АРИ4</p>
          )}
        </div>
        <div>
          <label className="text-white/60 text-sm mb-2 block">Сумма перевода</label>
          <div className="relative">
            <input value={amount} onChange={e => setAmount(e.target.value.replace(/\D/g, ""))} placeholder="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0] transition-colors font-montserrat font-bold text-2xl" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-xl">₽</span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[500, 1000, 2000, 5000].map(v => (
            <button key={v} onClick={() => setAmount(String(v))}
              className={`glass rounded-full px-4 py-1.5 text-sm transition-all ${amount === String(v) ? "border-[#9b5fe0]/60 text-white" : "text-white/70 hover:text-white"}`}>
              {v.toLocaleString()} ₽
            </button>
          ))}
        </div>
        <div>
          <label className="text-white/60 text-sm mb-2 block">Комментарий (необязательно)</label>
          <input value={comment} onChange={e => setComment(e.target.value)} placeholder="За ужин, долг и т.д."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0] transition-colors text-sm" />
        </div>
        <button onClick={handleSend} disabled={!recipient || !amount || Number(amount) <= 0 || sending}
          className="w-full rounded-xl py-4 font-montserrat font-bold text-white gradient-card-purple hover:opacity-90 transition-opacity neon-purple disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {sending
            ? <><Icon name="Loader" size={18} className="animate-spin" /> Отправка...</>
            : <><Icon name="Send" size={18} /> Перевести {amount ? `${Number(amount).toLocaleString("ru-RU")} ₽` : ""}</>}
        </button>
      </div>
      <div>
        <h3 className="font-montserrat font-bold text-white mb-3">Быстрый выбор</h3>
        <div className="grid grid-cols-2 gap-3">
          {recentContacts.map((r) => (
            <button key={r.name} onClick={() => selectContact(r)} className="glass rounded-2xl p-4 flex items-center gap-3 card-hover text-left">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: r.color + "50" }}>
                {getInitials(r.name)}
              </div>
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
  const [search, setSearch] = useState("");
  const [openPay, setOpenPay] = useState<typeof payments[0] | null>(null);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [autopays, setAutopays] = useState([
    { name: "Ростелеком", amount: 590, date: "1 числа", icon: "Wifi", color: "#4cc9f0" },
    { name: "МТС Мобильный", amount: 400, date: "5 числа", icon: "Smartphone", color: "#9b5fe0" },
  ]);
  const [openAdd, setOpenAdd] = useState(false);
  const [newAuto, setNewAuto] = useState({ name: "", amount: "", date: "1 числа" });

  const filtered = payments.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()));

  const doPay = () => {
    if (!account || !amount || Number(amount) <= 0) { toast.error("Заполните все поля"); return; }
    toast.success(`Оплата ${openPay?.name} прошла успешно`, { description: `${Number(amount).toLocaleString("ru-RU")} ₽ списано` });
    setOpenPay(null); setAccount(""); setAmount("");
  };

  const addAutopay = () => {
    if (!newAuto.name || !newAuto.amount) { toast.error("Заполните данные"); return; }
    setAutopays([...autopays, { name: newAuto.name, amount: Number(newAuto.amount), date: newAuto.date, icon: "Repeat", color: "#06d6a0" }]);
    toast.success("Автоплатёж добавлен");
    setOpenAdd(false); setNewAuto({ name: "", amount: "", date: "1 числа" });
  };

  const removeAutopay = (i: number) => {
    setAutopays(autopays.filter((_, idx) => idx !== i));
    toast("Автоплатёж удалён");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="glass rounded-2xl p-4 flex items-center gap-3">
        <Icon name="Search" size={18} className="text-white/40" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Найти услугу..." className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none" />
        {search && <button onClick={() => setSearch("")} className="text-white/40 hover:text-white"><Icon name="X" size={16} /></button>}
      </div>
      <div>
        <h2 className="font-montserrat font-bold text-white mb-4">Популярные услуги</h2>
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-white/50 text-sm">Ничего не найдено</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {filtered.map((p) => (
              <button key={p.name} onClick={() => setOpenPay(p)} className="glass rounded-2xl p-4 flex flex-col items-center gap-3 card-hover text-center">
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
        )}
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-montserrat font-bold text-white mb-4">Автоплатежи</h3>
        <div className="space-y-3">
          {autopays.length === 0 && <div className="text-white/40 text-sm">Автоплатежей нет</div>}
          {autopays.map((ap, i) => (
            <div key={i} className="flex items-center gap-3 px-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: ap.color + "25" }}>
                <Icon name={ap.icon} size={16} style={{ color: ap.color }} />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{ap.name}</div>
                <div className="text-white/50 text-xs">{ap.date}</div>
              </div>
              <div className="text-white font-bold">{ap.amount} ₽</div>
              <button onClick={() => removeAutopay(i)} className="text-white/30 hover:text-[#f72585] transition-colors">
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => setOpenAdd(true)} className="mt-4 w-full glass rounded-xl py-2.5 text-[#9b5fe0] text-sm hover:text-white transition-colors">
          + Добавить автоплатёж
        </button>
      </div>

      <Modal open={!!openPay} onClose={() => setOpenPay(null)} title={`Оплата · ${openPay?.name ?? ""}`}>
        <div className="space-y-3">
          <div className="text-white/60 text-sm">{openPay?.desc}</div>
          <div>
            <label className="text-white/60 text-xs mb-1 block">Номер лицевого счёта / договор</label>
            <input value={account} onChange={e => setAccount(e.target.value)} placeholder="0000000000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0]" />
          </div>
          <div>
            <label className="text-white/60 text-xs mb-1 block">Сумма</label>
            <input value={amount} onChange={e => setAmount(e.target.value.replace(/\D/g, ""))} placeholder="0"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0] font-montserrat font-bold text-xl" />
          </div>
          <button onClick={doPay} className="w-full rounded-xl py-3 font-medium text-white gradient-card-purple hover:opacity-90 transition-opacity">
            Оплатить
          </button>
        </div>
      </Modal>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Новый автоплатёж">
        <div className="space-y-3">
          <input value={newAuto.name} onChange={e => setNewAuto({ ...newAuto, name: e.target.value })} placeholder="Название услуги"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0]" />
          <input value={newAuto.amount} onChange={e => setNewAuto({ ...newAuto, amount: e.target.value.replace(/\D/g, "") })} placeholder="Сумма"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0]" />
          <select value={newAuto.date} onChange={e => setNewAuto({ ...newAuto, date: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9b5fe0]">
            <option className="bg-[#1a1a2e]">1 числа</option>
            <option className="bg-[#1a1a2e]">5 числа</option>
            <option className="bg-[#1a1a2e]">10 числа</option>
            <option className="bg-[#1a1a2e]">15 числа</option>
            <option className="bg-[#1a1a2e]">25 числа</option>
          </select>
          <button onClick={addAutopay} className="w-full rounded-xl py-3 font-medium text-white gradient-card-purple hover:opacity-90 transition-opacity">
            Создать автоплатёж
          </button>
        </div>
      </Modal>
    </div>
  );
}

function CardsSection() {
  const [cardList, setCardList] = useState(cards);
  const [frozen, setFrozen] = useState<boolean[]>(cards.map(() => false));
  const [blocked, setBlocked] = useState<boolean[]>(cards.map(() => false));
  const [openIssue, setOpenIssue] = useState(false);
  const [openReq, setOpenReq] = useState<number | null>(null);
  const [confirmBlock, setConfirmBlock] = useState<number | null>(null);
  const [newCardType, setNewCardType] = useState("VISA Classic");

  const types = [
    { name: "VISA Classic", cashback: 1, color: "gradient-card-green", desc: "Стартовая карта без платы" },
    { name: "VISA Signature", cashback: 3, color: "gradient-card-purple", desc: "Премиум-карта · 3% кешбэк" },
    { name: "МИР Premium", cashback: 5, color: "gradient-card-pink", desc: "Российская карта · 5% кешбэк" },
  ];

  const issueCard = () => {
    const t = types.find(t => t.name === newCardType)!;
    const num = "**** " + Math.floor(1000 + Math.random() * 9000);
    setCardList([...cardList, { id: Date.now(), number: num, type: t.name, balance: 0, color: t.color, cashback: t.cashback }]);
    setFrozen([...frozen, false]);
    setBlocked([...blocked, false]);
    setOpenIssue(false);
    toast.success("Карта выпущена!", { description: `${t.name} ${num} · доставка через 2-3 дня` });
  };

  const toggleFreeze = (i: number) => {
    const n = [...frozen]; n[i] = !n[i]; setFrozen(n);
    toast(n[i] ? "Карта заморожена ❄" : "Карта разморожена ☀");
  };

  const blockCard = (i: number) => {
    const n = [...blocked]; n[i] = true; setBlocked(n);
    setConfirmBlock(null);
    toast.error("Карта заблокирована", { description: "Новая карта будет выпущена бесплатно" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-montserrat font-bold text-white text-xl">Мои карты</h2>
        <button onClick={() => setOpenIssue(true)} className="rounded-xl px-4 py-2 text-sm font-medium text-white gradient-card-purple hover:opacity-90 transition-opacity">
          + Выпустить карту
        </button>
      </div>
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {cardList.map((card, i) => (
          <div key={card.id} className="space-y-3">
            <div className={`${card.color} rounded-2xl p-6 card-hover relative overflow-hidden`}
              style={{ filter: blocked[i] ? "grayscale(1) brightness(0.5)" : frozen[i] ? "grayscale(0.5) brightness(0.7)" : "none" }}>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10 animate-spin-slow" />
              <div className="flex justify-between items-start">
                <span className="text-white/80 text-sm">{card.type}</span>
                {blocked[i] && <span className="glass rounded-full px-3 py-1 text-xs text-red-300">🚫 Заблокирована</span>}
                {!blocked[i] && frozen[i] && <span className="glass rounded-full px-3 py-1 text-xs text-blue-300">❄ Заморожена</span>}
              </div>
              <div className="mt-6 font-montserrat font-black text-white text-2xl">{card.balance.toLocaleString("ru-RU")} ₽</div>
              <div className="text-white/70 mt-1 font-mono text-sm tracking-widest">{card.number}</div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-white/70 text-xs">Кешбэк <span className="text-white font-bold">{card.cashback}%</span></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button disabled={blocked[i]} onClick={() => toggleFreeze(i)} className="glass rounded-xl py-2.5 flex flex-col items-center gap-1 card-hover disabled:opacity-30 disabled:cursor-not-allowed">
                <Icon name={frozen[i] ? "Sun" : "Snowflake"} size={16} className="text-white/70" />
                <span className="text-white/60 text-xs">{frozen[i] ? "Разморозить" : "Заморозить"}</span>
              </button>
              <button onClick={() => setOpenReq(i)} className="glass rounded-xl py-2.5 flex flex-col items-center gap-1 card-hover">
                <Icon name="FileText" size={16} className="text-white/70" />
                <span className="text-white/60 text-xs">Реквизиты</span>
              </button>
              <button disabled={blocked[i]} onClick={() => setConfirmBlock(i)} className="glass rounded-xl py-2.5 flex flex-col items-center gap-1 card-hover disabled:opacity-30 disabled:cursor-not-allowed">
                <Icon name="Lock" size={16} className="text-[#f72585]" />
                <span className="text-[#f72585] text-xs">Блокировка</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={openIssue} onClose={() => setOpenIssue(false)} title="Выпуск новой карты">
        <div className="space-y-3">
          {types.map(t => (
            <button key={t.name} onClick={() => setNewCardType(t.name)}
              className={`w-full rounded-xl p-4 text-left transition-all ${newCardType === t.name ? "border-2 border-[#9b5fe0]" : "border border-white/10"} ${t.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-white/80 text-xs mt-1">{t.desc}</div>
                </div>
                {newCardType === t.name && <Icon name="CheckCircle" size={20} className="text-white" />}
              </div>
            </button>
          ))}
          <button onClick={issueCard} className="w-full mt-2 rounded-xl py-3 font-medium text-white gradient-card-purple hover:opacity-90 transition-opacity">
            Выпустить карту
          </button>
        </div>
      </Modal>

      <Modal open={openReq !== null} onClose={() => setOpenReq(null)} title="Реквизиты карты">
        {openReq !== null && (() => {
          const c = cardList[openReq];
          const fullNum = c.number.replace("****", "5536 9137 8" + (1000 + openReq * 111));
          const copy = (text: string, label: string) => { navigator.clipboard.writeText(text); toast.success(`${label} скопирован`); };
          return (
            <div className="space-y-3">
              <div className={`${c.color} rounded-2xl p-5`}>
                <div className="text-white/80 text-xs">{c.type}</div>
                <div className="text-white font-mono text-lg mt-3 tracking-widest">{fullNum}</div>
                <div className="flex justify-between mt-3 text-xs text-white/70">
                  <span>12/28</span>
                  <span>CVV ***</span>
                </div>
              </div>
              {[
                { label: "Держатель", value: "ARINA KUZNETSOVA" },
                { label: "Номер", value: fullNum.replace(/ /g, "") },
                { label: "Срок", value: "12/28" },
                { label: "CVV", value: "342" },
              ].map(r => (
                <button key={r.label} onClick={() => copy(r.value, r.label)} className="w-full glass rounded-xl px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10">
                  <div className="flex-1">
                    <div className="text-white/50 text-xs">{r.label}</div>
                    <div className="text-white text-sm font-mono">{r.value}</div>
                  </div>
                  <Icon name="Copy" size={16} className="text-white/40" />
                </button>
              ))}
            </div>
          );
        })()}
      </Modal>

      <Modal open={confirmBlock !== null} onClose={() => setConfirmBlock(null)} title="Заблокировать карту?">
        <div className="space-y-4">
          <div className="text-white/70 text-sm">
            После блокировки картой нельзя будет пользоваться. Действие необратимо — потребуется выпустить новую карту.
          </div>
          <div className="flex gap-2">
            <button onClick={() => setConfirmBlock(null)} className="flex-1 glass rounded-xl py-3 text-white/80 hover:text-white">
              Отмена
            </button>
            <button onClick={() => blockCard(confirmBlock!)} className="flex-1 rounded-xl py-3 bg-[#f72585] text-white font-medium hover:opacity-90">
              Заблокировать
            </button>
          </div>
        </div>
      </Modal>
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
  const [profile, setProfile] = useState({ name: "Арина Кузнецова", phone: "+7 999 123-45-67", email: "arina@ari4.ru" });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [openSetting, setOpenSetting] = useState<string | null>(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [settings, setSettings] = useState({ notifPush: true, notifEmail: true, notifSms: false, theme: "dark" });

  const items = [
    { id: "personal", label: "Персональные данные", icon: "User", color: "#9b5fe0" },
    { id: "security", label: "Безопасность и пароль", icon: "Shield", color: "#06d6a0" },
    { id: "notif", label: "Уведомления", icon: "Bell", color: "#4cc9f0" },
    { id: "devices", label: "Привязанные устройства", icon: "Smartphone", color: "#ff6b35" },
    { id: "docs", label: "Документы и справки", icon: "FileText", color: "#f72585" },
    { id: "settings", label: "Настройки приложения", icon: "Settings", color: "#9b5fe0" },
  ];

  const saveProfile = () => { setProfile(draft); setEditing(false); toast.success("Профиль обновлён"); };

  return (
    <div className="space-y-5 max-w-xl">
      <div className="glass rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl gradient-card-pink flex items-center justify-center text-white font-montserrat font-black text-xl">АК</div>
        <div className="flex-1">
          <div className="font-montserrat font-bold text-white text-xl">{profile.name}</div>
          <div className="text-white/50 text-sm">{profile.phone} · {profile.email}</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#9b5fe0]/20 text-[#b87aff]">Premium</span>
            <span className="text-xs text-white/40">Клиент с 2023</span>
          </div>
        </div>
        <button onClick={() => { setDraft(profile); setEditing(true); }} className="text-white/40 hover:text-white transition-colors">
          <Icon name="Edit" size={18} />
        </button>
      </div>
      <div className="rounded-2xl p-5 relative overflow-hidden gradient-card-orange">
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="flex items-center gap-3 mb-3">
          <Icon name="Star" size={20} className="text-white" />
          <span className="font-montserrat font-bold text-white">Бонусный счёт АРИ</span>
        </div>
        <div className="font-montserrat font-black text-white text-4xl">1 870</div>
        <div className="text-white/70 text-sm mt-1">бонусов накоплено</div>
        <button onClick={() => toast.info("1 бонус = 1 рубль", { description: "Используйте бонусы при оплате любых услуг" })} className="mt-4 glass rounded-xl px-4 py-2 inline-block hover:bg-white/15 transition-colors">
          <span className="text-white text-sm">1 бонус = 1 рубль при оплате</span>
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <button key={item.id} onClick={() => setOpenSetting(item.id)} className="w-full glass rounded-xl px-4 py-3.5 flex items-center gap-3 card-hover text-left">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.color + "25" }}>
              <Icon name={item.icon} size={16} style={{ color: item.color }} />
            </div>
            <span className="text-white flex-1">{item.label}</span>
            <Icon name="ChevronRight" size={16} className="text-white/30" />
          </button>
        ))}
      </div>
      <button onClick={() => setLogoutConfirm(true)} className="w-full glass rounded-xl px-4 py-3.5 flex items-center gap-3 card-hover text-left">
        <div className="w-8 h-8 rounded-lg bg-[#f72585]/20 flex items-center justify-center flex-shrink-0">
          <Icon name="LogOut" size={16} className="text-[#f72585]" />
        </div>
        <span className="text-[#f72585]">Выйти из аккаунта</span>
      </button>

      <Modal open={editing} onClose={() => setEditing(false)} title="Редактирование профиля">
        <div className="space-y-3">
          <div>
            <label className="text-white/60 text-xs mb-1 block">Имя</label>
            <input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9b5fe0]" />
          </div>
          <div>
            <label className="text-white/60 text-xs mb-1 block">Телефон</label>
            <input value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9b5fe0]" />
          </div>
          <div>
            <label className="text-white/60 text-xs mb-1 block">Email</label>
            <input value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9b5fe0]" />
          </div>
          <button onClick={saveProfile} className="w-full rounded-xl py-3 font-medium text-white gradient-card-purple hover:opacity-90">
            Сохранить
          </button>
        </div>
      </Modal>

      <Modal open={openSetting === "personal"} onClose={() => setOpenSetting(null)} title="Персональные данные">
        <div className="space-y-3 text-sm">
          {[
            ["ФИО", profile.name],
            ["Дата рождения", "15 марта 1995"],
            ["Паспорт", "4514 ******"],
            ["ИНН", "770414**0123"],
            ["СНИЛС", "123-456-789 01"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between glass rounded-xl px-4 py-3">
              <span className="text-white/60">{k}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={openSetting === "security"} onClose={() => setOpenSetting(null)} title="Безопасность">
        <div className="space-y-3">
          {[
            { label: "Сменить пароль", icon: "Key", action: () => toast.success("Письмо для смены пароля отправлено") },
            { label: "Двухфакторная аутентификация", icon: "ShieldCheck", action: () => toast("2FA включена") },
            { label: "Биометрия (Face/Touch ID)", icon: "Fingerprint", action: () => toast("Биометрия настроена") },
            { label: "История входов", icon: "History", action: () => toast.info("Подозрительной активности не обнаружено") },
          ].map(b => (
            <button key={b.label} onClick={b.action} className="w-full glass rounded-xl px-4 py-3 flex items-center gap-3 text-left hover:bg-white/10">
              <Icon name={b.icon} size={18} className="text-[#06d6a0]" />
              <span className="text-white text-sm flex-1">{b.label}</span>
              <Icon name="ChevronRight" size={16} className="text-white/30" />
            </button>
          ))}
        </div>
      </Modal>

      <Modal open={openSetting === "notif"} onClose={() => setOpenSetting(null)} title="Уведомления">
        <div className="space-y-2">
          {([
            ["Push-уведомления", "notifPush"],
            ["Email-рассылка", "notifEmail"],
            ["SMS-оповещения", "notifSms"],
          ] as const).map(([label, key]) => (
            <div key={key} className="glass rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-white text-sm">{label}</span>
              <button onClick={() => { setSettings({ ...settings, [key]: !settings[key] }); toast(`${label} ${!settings[key] ? "включены" : "выключены"}`); }}
                className={`relative w-11 h-6 rounded-full transition-colors ${settings[key] ? "bg-[#9b5fe0]" : "bg-white/10"}`}>
                <span className={`absolute top-0.5 ${settings[key] ? "left-5" : "left-0.5"} w-5 h-5 bg-white rounded-full transition-all`} />
              </button>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={openSetting === "devices"} onClose={() => setOpenSetting(null)} title="Привязанные устройства">
        <div className="space-y-2">
          {[
            { name: "iPhone 15 Pro", last: "Активен сейчас", active: true, icon: "Smartphone" },
            { name: "MacBook Air", last: "Вчера в 14:32", active: false, icon: "Laptop" },
            { name: "iPad Pro", last: "3 дня назад", active: false, icon: "Tablet" },
          ].map(d => (
            <div key={d.name} className="glass rounded-xl px-4 py-3 flex items-center gap-3">
              <Icon name={d.icon} size={18} className="text-white/70" />
              <div className="flex-1">
                <div className="text-white text-sm">{d.name}</div>
                <div className="text-white/50 text-xs">{d.last}</div>
              </div>
              {d.active ? (
                <span className="text-[#06d6a0] text-xs">● Сейчас</span>
              ) : (
                <button onClick={() => toast(`Доступ для ${d.name} отозван`)} className="text-[#f72585] text-xs hover:underline">Отвязать</button>
              )}
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={openSetting === "docs"} onClose={() => setOpenSetting(null)} title="Документы и справки">
        <div className="space-y-2">
          {[
            "Справка о доходах 2-НДФЛ",
            "Выписка по счёту",
            "Справка о наличии счетов",
            "Договор обслуживания",
          ].map(d => (
            <button key={d} onClick={() => toast.success("Документ заказан", { description: "Готов через 1-2 минуты в этом разделе" })} className="w-full glass rounded-xl px-4 py-3 flex items-center gap-3 text-left hover:bg-white/10">
              <Icon name="FileText" size={18} className="text-[#f72585]" />
              <span className="text-white text-sm flex-1">{d}</span>
              <Icon name="Download" size={16} className="text-white/30" />
            </button>
          ))}
        </div>
      </Modal>

      <Modal open={openSetting === "settings"} onClose={() => setOpenSetting(null)} title="Настройки приложения">
        <div className="space-y-3 text-sm">
          <div className="glass rounded-xl px-4 py-3">
            <div className="text-white/60 mb-2">Версия приложения</div>
            <div className="text-white">АРИ4 Banking v2.6.1</div>
          </div>
          <button onClick={() => toast.success("Кеш очищен")} className="w-full glass rounded-xl px-4 py-3 text-left text-white hover:bg-white/10">
            Очистить кеш
          </button>
          <button onClick={() => toast.info("Вы используете последнюю версию")} className="w-full glass rounded-xl px-4 py-3 text-left text-white hover:bg-white/10">
            Проверить обновления
          </button>
        </div>
      </Modal>

      <Modal open={logoutConfirm} onClose={() => setLogoutConfirm(false)} title="Выход из аккаунта">
        <div className="space-y-4">
          <p className="text-white/70 text-sm">Вы уверены, что хотите выйти? Потребуется повторный вход с паролем.</p>
          <div className="flex gap-2">
            <button onClick={() => setLogoutConfirm(false)} className="flex-1 glass rounded-xl py-3 text-white/80 hover:text-white">
              Остаться
            </button>
            <button onClick={() => { setLogoutConfirm(false); toast("Вы вышли из аккаунта", { description: "До скорой встречи!" }); }} className="flex-1 rounded-xl py-3 bg-[#f72585] text-white font-medium hover:opacity-90">
              Выйти
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function SupportSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Здравствуйте, Арина! Я — ассистент АРИ4. Чем могу помочь?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [ticketText, setTicketText] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  const faqs = [
    { q: "Как заблокировать карту?", a: "Перейдите в раздел «Карты», выберите нужную карту и нажмите «Блокировка»." },
    { q: "Как узнать реквизиты счёта?", a: "В разделе «Счета» нажмите «Реквизиты» рядом с нужным счётом." },
    { q: "Как подключить кешбэк?", a: "Кешбэк начисляется автоматически на все карты АРИ4. Повышенный кешбэк — в разделе «Карты»." },
    { q: "Как открыть новый счёт?", a: "В разделе «Счета» нажмите «+ Открыть счёт» и выберите подходящий тип." },
  ];

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setChatInput("");
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let reply = "Спасибо за обращение! Оператор скоро ответит вам, или попробуйте уточнить вопрос.";
      if (lower.includes("карт")) reply = "По вопросам с картами: можно заморозить или заблокировать карту в разделе «Карты». Что именно нужно?";
      else if (lower.includes("перевод")) reply = "Переводы по номеру телефона доступны в разделе «Переводы». Комиссии нет внутри банка АРИ4.";
      else if (lower.includes("кешбэк") || lower.includes("кеш")) reply = "Кешбэк начисляется автоматически: до 10% на категории и базовый 1-5% на остальные покупки.";
      else if (lower.includes("привет") || lower.includes("здравств")) reply = "Здравствуйте! Чем могу помочь?";
      else if (lower.includes("спасибо")) reply = "Всегда рады помочь! Хорошего дня 🚀";
      setMessages(m => [...m, { role: "bot", text: reply }]);
    }, 600);
  };

  const sendTicket = () => {
    if (!ticketText.trim()) { toast.error("Опишите проблему"); return; }
    toast.success("Обращение отправлено", { description: "Номер заявки #" + Math.floor(10000 + Math.random() * 89999) });
    setTicketText("");
  };

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
        <button onClick={() => setChatOpen(true)} className="rounded-xl px-4 py-2 text-white text-sm font-medium gradient-card-purple hover:opacity-90 transition-opacity flex-shrink-0">
          Начать чат
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <a href="tel:88005553535" className="glass rounded-2xl p-4 flex flex-col items-center gap-2 card-hover">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#06d6a025" }}>
            <Icon name="Phone" size={20} style={{ color: "#06d6a0" }} />
          </div>
          <div className="font-medium text-white text-sm">Позвонить</div>
          <div className="text-white/50 text-xs">8 800 555-35-35</div>
        </a>
        <a href="https://t.me/ari4bank" target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-4 flex flex-col items-center gap-2 card-hover">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#4cc9f025" }}>
            <Icon name="Send" size={20} style={{ color: "#4cc9f0" }} />
          </div>
          <div className="font-medium text-white text-sm">Telegram</div>
          <div className="text-white/50 text-xs">@ari4bank</div>
        </a>
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
        <textarea value={ticketText} onChange={e => setTicketText(e.target.value)} placeholder="Опишите вашу проблему..." rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#9b5fe0] transition-colors resize-none text-sm" />
        <button onClick={sendTicket} className="mt-3 w-full rounded-xl py-3 font-medium text-white gradient-card-purple hover:opacity-90 transition-opacity">
          Отправить обращение
        </button>
      </div>

      <Modal open={chatOpen} onClose={() => setChatOpen(false)} title="Чат с поддержкой">
        <div className="flex flex-col h-[60vh]">
          <div ref={chatRef} className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === "user" ? "gradient-card-purple text-white" : "glass text-white/90"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ваш вопрос..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#9b5fe0]" />
            <button onClick={sendMessage} className="rounded-xl px-4 gradient-card-purple text-white hover:opacity-90">
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function Index() {
  const [active, setActive] = useState<Section>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { icon: "ArrowDownLeft", color: "#06d6a0", title: "Поступление 5 000 ₽", desc: "От Алексея Петрова · 2 мин назад" },
    { icon: "Sparkles", color: "#9b5fe0", title: "Начислен кешбэк 24.80 ₽", desc: "За покупку в Пятёрочке · 1 ч назад" },
    { icon: "Bell", color: "#4cc9f0", title: "Платёж по автоплатежу", desc: "Ростелеком 590 ₽ · сегодня" },
  ];

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
            <button onClick={() => { setActive("profile"); setSidebarOpen(false); }} className="text-white/40 hover:text-white/80 transition-colors"><Icon name="LogOut" size={16} /></button>
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
            <button onClick={() => setNotifOpen(true)} className="relative text-white/60 hover:text-white transition-colors">
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f72585] text-white text-[10px] flex items-center justify-center font-bold">3</span>
            </button>
            <button onClick={() => setActive("profile")} className="w-8 h-8 rounded-full gradient-card-pink flex items-center justify-center text-white font-bold text-xs hover:opacity-90">
              АК
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div key={active} className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>

      <Modal open={notifOpen} onClose={() => setNotifOpen(false)} title="Уведомления">
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <div key={i} className="glass rounded-xl px-4 py-3 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: n.color + "25" }}>
                <Icon name={n.icon} size={16} style={{ color: n.color }} />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{n.title}</div>
                <div className="text-white/50 text-xs mt-0.5">{n.desc}</div>
              </div>
            </div>
          ))}
          <button onClick={() => { toast("Все уведомления отмечены прочитанными"); setNotifOpen(false); }} className="w-full mt-2 glass rounded-xl py-2.5 text-[#9b5fe0] text-sm hover:text-white transition-colors">
            Отметить все прочитанными
          </button>
        </div>
      </Modal>
    </div>
  );
}