const rows = [["+50", "Friend joined with your code"], ["+20", "Course completed"], ["−100", "Reward redeemed"]]

export function PhoneUI({ className = "" }: { className?: string }) {
  return (
    <div className={`phone ${className}`} aria-hidden>
      <div className="absolute left-1/2 top-2.5 z-10 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
      <div className="phone-screen flex flex-col gap-2.5 px-3.5 pb-4 pt-9 text-[10px]">
        <div className="flex justify-between text-white/60"><span>Campus Ambassador</span><span>9:41</span></div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent/35 to-accent2/25 p-3.5">
          <p className="text-white/70">Total points</p>
          <p className="font-display text-3xl font-bold text-white">2,450</p>
          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-black/30 px-2.5 py-2">
            <span className="text-white/60">Referral code</span><b className="font-mono tracking-widest text-accent">ES•••••</b>
          </div>
        </div>
        <p className="mt-1 text-[9px] text-white/50">Points history</p>
        {rows.map(([p, t]) => (
          <div key={t} className="flex items-center justify-between rounded-xl bg-white/[.06] px-3 py-2">
            <span className="text-white/80">{t}</span><b className={p.startsWith("+") ? "text-accent" : "text-white/60"}>{p}</b>
          </div>
        ))}
        <div className="mt-auto flex items-center justify-between rounded-2xl bg-white/[.08] p-3">
          <span className="font-semibold text-white">Education Loan</span>
          <span className="rounded-full bg-accent px-2.5 py-1 font-bold text-ink">Apply</span>
        </div>
        <p className="text-center text-[8px] text-white/30">Illustrative screen</p>
      </div>
    </div>
  )
}
