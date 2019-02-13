export const statement = (invoice, plays) => {
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
    return invoice.performances.reduce((result, performance) => {
      return result + volumeCreditsFor(performance);
    }, 0);
  };

  const usd = (number) => {
    return new Intl.NumberFormat("en-US",
      {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
      }).format(number)
  };

  const totalAmount = () => {
    return invoice.performances.reduce((result, performance) => {
      return result + amountFor(performance);
    }, 0);
  };

  const enrichPerformance = (performance) => {
    const result = Object.assign({}, performance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    return result;
  };

  const renderPlainText = (data) => {
    let result = `Statement for ${data.customer}\n`;

    for (let performance of data.performances) {
      result += `  ${performance.play.name}: ${usd(performance.amount / 100)} (${performance.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
  };

  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount();
  statementData.totalVolumeCredits = totalVolumeCredits();

  return renderPlainText(statementData);
};



