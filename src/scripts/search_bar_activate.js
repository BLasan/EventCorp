"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivate_searchBar = deactivate_searchBar;
exports.activate_searchBar = activate_searchBar;
exports.click_redirect_href = click_redirect_href;

function deactivate_searchBar() {
  $('#search_box').attr('disabled', 'disabled');
  $('#search_button').attr('disabled', 'disabled');
  $('#search_bar').css('display', 'none');
}

function activate_searchBar() {
  $('#search_box').removeAttr('disabled');
  $('#search_button').removeAttr('disabled');
  $('#search_bar').css('display', 'flex');
}

function click_redirect_href() {
  $('#redirect_user_href')[0].click();
}
