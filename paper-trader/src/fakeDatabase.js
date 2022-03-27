import React from 'react';


export function User(email,password,watchlist,funds){
    this.email = email || '';
    this.password = password || '';
    this.watchlist = watchlist || ['APPL','TSLA'];
    this.funds = funds || 1000;
}

User.prototype.setEmail = function (name) {
    this.name = name;
}

User.prototype.setPassword = function (password) {
    this.password = password;
}

User.prototype.setWatchlist = function (watchlist){
    this.watchlist = watchlist;
}

User.prototype.getEmail = function (){
    return this.email;
}


var admin = new User('admin@papertrader.com','admin12',['APPL','TSLA','AMD','MSFT','GOOG','NVDA','FB','ATVI']);
var user1 = new User('user1@papertrader.com','user1');
var user2 = new User('user1@papertrader.com','user2');

export const usersDatabase = [admin, user1, user2];