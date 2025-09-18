export class CurrencyConverter {
  // Current exchange rate (USD to INR) - in production, this should be fetched from a live API
  private static readonly USD_TO_INR_RATE = 83.25

  static convertUSDToINR(usdAmount: number): number {
    return Math.round(usdAmount * this.USD_TO_INR_RATE)
  }

  static formatINR(amount: number): string {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  static formatUSDToINR(usdAmount: number): string {
    const inrAmount = this.convertUSDToINR(usdAmount)
    return this.formatINR(inrAmount)
  }

  static parseUSDFromString(priceString: string): number {
    // Extract number from strings like "$299", "USD 299", "$299-399"
    const match = priceString.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/)
    return match ? Number.parseFloat(match[1].replace(/,/g, "")) : 0
  }

  static convertPriceStringToINR(usdPriceString: string): string {
    const usdAmount = this.parseUSDFromString(usdPriceString)
    if (usdAmount === 0) return usdPriceString

    const inrAmount = this.convertUSDToINR(usdAmount)
    return this.formatINR(inrAmount)
  }

  // Get live exchange rate (for future implementation)
  static async getLiveExchangeRate(): Promise<number> {
    try {
      // In production, use a real exchange rate API
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      // const data = await response.json();
      // return data.rates.INR;
      return this.USD_TO_INR_RATE
    } catch (error) {
      console.error("Failed to fetch live exchange rate:", error)
      return this.USD_TO_INR_RATE // Fallback to static rate
    }
  }
}
