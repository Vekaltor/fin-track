export function roundToCurrencyPrecision(value: number): number {
  return Math.round(value * 100) / 100;
}

export function hasDecimalPart(value: number): boolean {
  return Math.round(Math.abs(value) * 100) % 100 !== 0;
}

export function parsePlnAmount(input: string): number | null {
  const normalized: string = input
    .trim()
    .replace(/\s/g, '')
    .replace(/[^\d,.-]/g, '')
    .replace(',', '.');

  if (!normalized || normalized === '-' || normalized === '.') {
    return null;
  }

  const parsed: number = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return roundToCurrencyPrecision(parsed);
}

export function formatCurrencyPln(value: number | null | undefined, showSign = false): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '0 zł';
  }

  const rounded: number = roundToCurrencyPrecision(value);
  const absolute: number = Math.abs(rounded);
  const showDecimals: boolean = hasDecimalPart(rounded);

  let formatted: string = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(absolute);

  formatted = formatted.replace(/[\u00A0\u202F]/g, ' ');

  let sign = '';
  if (rounded < 0) {
    sign = '-';
  } else if (showSign && rounded > 0) {
    sign = '+';
  }

  return `${sign}${formatted} zł`;
}
