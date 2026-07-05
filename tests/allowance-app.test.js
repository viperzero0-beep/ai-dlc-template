const test = require('node:test');
const assert = require('node:assert/strict');
const { createTransaction, calculateSummary, groupByMonth, deleteTransaction, summarizeByCategory } = require('../src/allowance-app');

test('createTransaction returns a transaction with the expected fields', () => {
    const transaction = createTransaction({
        date: '2026-07-01',
        type: 'expense',
        amount: 500,
        category: 'snack',
        memo: 'Ice cream'
    });

    assert.equal(transaction.type, 'expense');
    assert.equal(transaction.amount, 500);
    assert.equal(transaction.category, 'snack');
    assert.equal(transaction.memo, 'Ice cream');
});

test('calculateSummary returns totals and balance for transactions', () => {
    const transactions = [
        createTransaction({ date: '2026-07-01', type: 'income', amount: 1000, category: 'allowance', memo: 'Monthly allowance' }),
        createTransaction({ date: '2026-07-02', type: 'expense', amount: 500, category: 'snack', memo: 'Ice cream' })
    ];

    const summary = calculateSummary(transactions);

    assert.equal(summary.totalIncome, 1000);
    assert.equal(summary.totalExpense, 500);
    assert.equal(summary.balance, 500);
});

test('groupByMonth groups transactions by month', () => {
    const transactions = [
        createTransaction({ date: '2026-07-01', type: 'expense', amount: 500, category: 'snack', memo: 'Ice cream' }),
        createTransaction({ date: '2026-06-20', type: 'income', amount: 1000, category: 'allowance', memo: 'Monthly allowance' })
    ];

    const monthly = groupByMonth(transactions, '2026-07');

    assert.equal(monthly.length, 1);
    assert.equal(monthly[0].amount, 500);
});

test('deleteTransaction removes a transaction by id', () => {
    const t1 = createTransaction({ date: '2026-07-01', type: 'expense', amount: 500, category: 'snack', memo: 'Ice cream' });
    const t2 = createTransaction({ date: '2026-07-02', type: 'income', amount: 1000, category: 'allowance', memo: 'Monthly allowance' });
    const transactions = [t1, t2];

    const remaining = deleteTransaction(transactions, t1.id);

    assert.equal(remaining.length, 1);
    assert.equal(remaining[0].id, t2.id);
});

test('summarizeByCategory groups transactions by category', () => {
    const transactions = [
        createTransaction({ date: '2026-07-01', type: 'income', amount: 1000, category: 'allowance', memo: 'Monthly allowance' }),
        createTransaction({ date: '2026-07-02', type: 'expense', amount: 500, category: 'snack', memo: 'Ice cream' }),
        createTransaction({ date: '2026-07-03', type: 'expense', amount: 300, category: 'snack', memo: 'Candy' })
    ];

    const summary = summarizeByCategory(transactions, '2026-07');

    assert.equal(summary.length, 2);
    const snackCategory = summary.find((c) => c.category === 'snack');
    assert.equal(snackCategory.expense, 800);
    assert.equal(snackCategory.income, 0);
});

