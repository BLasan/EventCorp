"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redirect_to_login = redirect_to_login;

function redirect_to_login() {
  $('#redirect_login').attr('href', '/login');
  $('#redirect_login')[0].click();
}
