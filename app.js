const storageKey = 'allowance-app-transactions';
const app = window.allowanceApp;
const form = document.getElementById('transaction-form');
const dateInput = document.getElementById('transaction-date');
const typeInput = document.getElementById('transaction-type');
const amountInput = document.getElementById('transaction-amount');
const categoryInput = document.getElementById('transaction-category');
const memoInput = document.getElementById('transaction-memo');
const transactionList = document.getElementById('transaction-list');
const categoryList = document.getElementById('category-list');
const monthFilter = document.getElementById('month-filter');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const balance = document.getElementById('balance');
const monthlySummary = document.getElementById('monthly-summary');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const state = {
    transactions: [],
    editingId: null
};

function loadTransactions() {
    const savedTransactions = window.localStorage.getItem(storageKey);
    if (!savedTransactions) {
        return [];
    }

    try {
        return JSON.parse(savedTransactions);
    } catch {
        return [];
    }
}

function saveTransactions() {
    window.localStorage.setItem(storageKey, JSON.stringify(state.transactions));
}

function formatCurrency(value) {
    return `¥${value.toLocaleString()}`;
}

function renderTransactionList() {
    const selectedMonth = monthFilter.value || new Date().toISOString().slice(0, 7);
    const monthlyTransactions = app.groupByMonth(state.transactions, selectedMonth);
    monthlySummary.textContent = `${formatCurrency(
        monthlyTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
    )}`;

    transactionList.innerHTML = '';
    if (monthlyTransactions.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.className = 'empty-state';
        emptyItem.textContent = 'まだ取引がありません。';
        transactionList.appendChild(emptyItem);
        return;
    }

    monthlyTransactions
        .slice()
        .sort((left, right) => right.date.localeCompare(left.date))
        .forEach((transaction) => {
            const item = document.createElement('li');
            item.className = transaction.type === 'income' ? 'transaction income' : 'transaction expense';
            item.innerHTML = `
        <div>
          <div class="transaction-date">${transaction.date}</div>
          <div class="transaction-meta">${transaction.category} · ${transaction.memo || 'メモなし'}</div>
        </div>
        <div class="transaction-actions">
          <strong>${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}</strong>
          <button class="action-btn delete-btn" data-id="${transaction.id}" title="削除">✕</button>
        </div>
      `;
            transactionList.appendChild(item);

            item.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('この取引を削除してもよろしいですか？')) {
                    state.transactions = app.deleteTransaction(state.transactions, transaction.id);
                    saveTransactions();
                    render();
                }
            });
        });
}

function renderCategoryList() {
    const selectedMonth = monthFilter.value || new Date().toISOString().slice(0, 7);
    const categories = app.summarizeByCategory(state.transactions, selectedMonth);

    categoryList.innerHTML = '';
    if (categories.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.className = 'empty-state';
        emptyItem.textContent = 'まだ取引がありません。';
        categoryList.appendChild(emptyItem);
        return;
    }

    categories.forEach((cat) => {
        const item = document.createElement('li');
        item.className = 'category-item';
        item.innerHTML = `
        <div>
          <strong>${cat.category}</strong>
        </div>
        <div class="category-stats">
          <span class="income">収入: ${formatCurrency(cat.income)}</span>
          <span class="expense">支出: ${formatCurrency(cat.expense)}</span>
          <span class="balance">差額: ${formatCurrency(cat.balance)}</span>
        </div>
      `;
        categoryList.appendChild(item);
    });
}

function render() {
    const summary = app.calculateSummary(state.transactions);
    totalIncome.textContent = formatCurrency(summary.totalIncome);
    totalExpense.textContent = formatCurrency(summary.totalExpense);
    balance.textContent = formatCurrency(summary.balance);

    renderTransactionList();
    renderCategoryList();
}

function initialize() {
    dateInput.value = new Date().toISOString().slice(0, 10);
    monthFilter.value = new Date().toISOString().slice(0, 7);
    state.transactions = loadTransactions();
    render();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const transaction = app.createTransaction({
        date: dateInput.value,
        type: typeInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value,
        memo: memoInput.value
    });

    state.transactions = [transaction, ...state.transactions];
    saveTransactions();
    form.reset();
    dateInput.value = new Date().toISOString().slice(0, 10);
    monthFilter.value = new Date().toISOString().slice(0, 7);
    render();
});

monthFilter.addEventListener('change', render);

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        tabContents.forEach((content) => content.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(`${button.dataset.tab}-tab`).classList.add('active');
    });
});

window.addEventListener('DOMContentLoaded', initialize);
