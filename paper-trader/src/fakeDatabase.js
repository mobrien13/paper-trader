import React from 'react';


export function Holding(ticker, pricePerShare, quantity) {
    this.ticker = ticker || '';
    this.pricePerShare = pricePerShare || 0;
    this.quantity = quantity || 0;
}

export function User(email, watchlist, funds, holdings) {
    this.email = email || '';
    this.watchlist = watchlist || ['AAPL', 'TSLA'];
    this.funds = funds || 1000;
    this.holdings = holdings || [Holding];
}

User.prototype.setEmail = function (name) {
    this.name = name;
}

User.prototype.setPassword = function (password) {
    this.password = password;
}

User.prototype.setWatchlist = function (watchlist) {
    this.watchlist = watchlist;
}

User.prototype.getEmail = function () {
    return this.email;
}


const holding1 = new Holding('TSLA', 100, 100);
const holding2 = new Holding('AAPL', 100, 100);

const admin = new User('admin@papertrader.com', ['AAPL', 'TSLA', 'AMD', 'MSFT', 'GOOG', 'NVDA', 'FB', 'ATVI'], 1000, [holding1, holding2]);
const user1 = new User('user1@papertrader.com');
const user2 = new User('user2@papertrader.com');

export const usersDatabase = [admin, user1, user2];