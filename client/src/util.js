export async function checkAuthenticated() {
  let res = await fetch('/api/auth/status');
  let json = await res.json();
  return json.auth.toLowerCase() === 'user';
}