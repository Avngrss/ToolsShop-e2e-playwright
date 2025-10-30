export function isSortedAscendingString(arr: string[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

export function isSortedDescendingString(arr: string[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) return false;
  }
  return true;
}

export function isSortedAscendingNumber(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

export function isSortedDescendingNumber(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) return false;
  }
  return true;
}

const CO2_RATING_VALUE: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
};

function co2ToValue(rating: string): number {
  return CO2_RATING_VALUE[rating] || 0;
}

export function isSortedAscendingCO2(arr: string[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (co2ToValue(arr[i]) < co2ToValue(arr[i - 1])) return false;
  }
  return true;
}

export function isSortedDescendingCO2(arr: string[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (co2ToValue(arr[i]) > co2ToValue(arr[i - 1])) return false;
  }
  return true;
}
