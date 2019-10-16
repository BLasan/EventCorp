
export function redirect_to_login() {
  $('#redirect_login').attr('href', '/login');
  $('#redirect_login')[0].click();
}
