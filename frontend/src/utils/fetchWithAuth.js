export async function fetchWithAuth(url, options = {}, navigate) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    document.cookie = "token=; Max-Age=0"; 
    navigate("/"); 
    return null;
  }

  return res;
}
