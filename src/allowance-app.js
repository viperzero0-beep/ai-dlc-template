(function (root, factory) {
    const api = factory();

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }

    root.allowanceApp = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
    function createTransaction({ date, type, amount, category, memo }) {
        return {
            id: `${date}-${Math.random().toString(36).slice(2, 9)}`,
            date,
            type,
            amount,
            category,
            memo
        };
    }

    function calculateSummary(transactions) {
        const totalIncome = transactions
            .filter((transaction) => transaction.type === 'income')
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const totalExpense = transactions
            .filter((transaction) => transaction.type === 'expense')
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense
        };
    }

    function groupByMonth(transactions, month) {
        return transactions.filter((transaction) => transaction.date.startsWith(month));
    }

    function deleteTransaction(transactions, id) {
        return transactions.filter((transaction) => transaction.id !== id);
    }

    function summarizeByCategory(transactions, month) {
        const monthly = groupByMonth(transactions, month);
        const summary = {};

        monthly.forEach((transaction) => {
            if (!summary[transaction.category]) {
                summary[transaction.category] = { income: 0, expense: 0 };
            }

            if (transaction.type === 'income') {
                summary[transaction.category].income += transaction.amount;
            } else {
                summary[transaction.category].expense += transaction.amount;
            }
        });

        return Object.entries(summary).map(([category, amounts]) => ({
            category,
            income: amounts.income,
            expense: amounts.expense,
            balance: amounts.income - amounts.expense
        }));
    }

    return {
        createTransaction,
        calculateSummary,
        groupByMonth,
        deleteTransaction,
        summarizeByCategory
    };
});
