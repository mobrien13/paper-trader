import React from 'react';


export function Holding(ticker, pricePerShare, quantity) {
    this.ticker = ticker || '';
    this.pricePerShare = pricePerShare || 0;
    this.quantity = quantity || 0;
}

export function User(email, watchlist, funds, holdings) {
    this.email = email || '';
    this.watchlist = watchlist || ['APPL', 'TSLA'];
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


var holding1 = new Holding('TSLA', 100, 100);
var holding2 = new Holding('APPL', 100, 100);

var admin = new User('admin@papertrader.com', ['APPL', 'TSLA', 'AMD', 'MSFT', 'GOOG', 'NVDA', 'FB', 'ATVI'], 1000, [holding1, holding2]);
var user1 = new User('user1@papertrader.com');
var user2 = new User('user2@papertrader.com');

export const usersDatabase = [admin, user1, user2];