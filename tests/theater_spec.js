import { statement } from '../src/theater.js';
import invoices from './invoices.json';
import plays from './plays.json';

describe('theater', function() {
  it('returns the correct statement', function () {
    expect(statement(invoices[0], plays).indexOf('Statement for BigCo')!== -1).toBe(true);
    expect(statement(invoices[0], plays).indexOf('  Hamlet: $650.00 (55 seats)\n')!== -1).toBe(true);
    expect(statement(invoices[0], plays).indexOf('  As You Like It: $580.00 (35 seats)\n')!== -1).toBe(true);
    expect(statement(invoices[0], plays).indexOf('  Othello: $500.00 (40 seats)\n')!== -1).toBe(true);
    expect(statement(invoices[0], plays).indexOf('Amount owed is $1,730.00\n')!== -1).toBe(true);
    expect(statement(invoices[0], plays).indexOf('You earned 47 credits')!== -1).toBe(true);
  });
});
