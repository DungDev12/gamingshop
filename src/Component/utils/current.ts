export function currentNumber(number: number, character: string = "."): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, character);
}
