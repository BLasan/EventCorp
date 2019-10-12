"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disable_room_id = disable_room_id;
exports.disable_open_chat = disable_open_chat;
exports.disable_close_chat = disable_close_chat;

function disable_room_id() {
  $(document).click('#room_id', function (e) {
    e.preventDefault();
  });
}

function disable_open_chat() {
  $(document).click('#open_chat_selected', function (e) {
    e.preventDefault();
  });
}

function disable_close_chat() {
  $(document).click('#close_chat_href', function (e) {
    e.preventDefault();
  });
}
