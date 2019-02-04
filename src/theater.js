export const statement = (invoice, plays = plays) => {
  const playFor = (aPerformance) => {
    return plays[aPerformance.playID];
  };

  const amountFor = (aPerformance) => {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  };

  const volumeCreditsFor = (performance) => {
    let volumeCredits = 0;
    volumeCredits += Math.max(performance.audience - 30, 0);

    if ("comedy" === playFor(performance).type)
      volumeCredits += Math.floor(performance.audience / 5);

    return volumeCredits;
  };

  const totalVolumeCredits = () => {
    let volumeCredits = 0;

    for (let performance of invoice.performances) {
      volumeCredits += volumeCreditsFor(performance);
    }

    return volumeCredits;
  };

  const usd = (number) => {
    return new Intl.NumberFormat("en-US",
      {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
      }).format(number)
  };

  const totalAmount = () => {
    let result = 0;

    for (let performance of invoice.performances) {
      result += amountFor(performance, playFor(performance));
    }

    return result;
  };

  let result = `Statement for ${invoice.customer}\n`;

  for (let performance of invoice.performances) {
    result += `  ${playFor(performance).name}: ${usd(amountFor(performance) / 100)} (${performance.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount() / 100)}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
};



