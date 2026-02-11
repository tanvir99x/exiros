const EXI_KEY = "exiros_exi_balance";

export function getEXI(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(EXI_KEY) || 0);
}

export function addEXI(amount: number): number {
  const current = getEXI();
  const updated = current + amount;
  localStorage.setItem(EXI_KEY, String(updated));
  return updated;
}

export function getLevel(exi: number): number {
  if (exi >= 3500) return 5;
  if (exi >= 2200) return 4;
  if (exi >= 1200) return 3;
  if (exi >= 500) return 2;
  return 1;
}

export function getNextTarget(level: number): number {
  const targets: Record<number, number> = {
    1: 500,
    2: 1200,
    3: 2200,
    4: 3500,
    5: 5000,
  };

  return targets[level] || 5000;
}
