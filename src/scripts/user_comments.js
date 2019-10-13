"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add_comment_script = add_comment_script;
exports.remove_comment_script = remove_comment_script;
exports.bind_scroll = bind_scroll;

function add_comment_script() {
  $(document).click('#load_comments', function (e) {
    e.preventDefault();
    $('#comments').removeAttr('style');
    $('#remove_items').removeAttr('style');
    $('#load_items').css('display', 'none');
  });
}

function remove_comment_script() {
  $(document).click('#remove_comments', function (e) {
    e.preventDefault();
    $('#comments').css('display', 'none');
    $('#remove_items').css('display', 'none');
    $('#load_items').css('display', 'block');
  });
}

function bind_scroll() {
  $('#comments').attr('class', 'list-group');
}
