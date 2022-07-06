export async function getAnimeList<T>(url: string):Promise<T> {
  return fetch(url)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json();
    })
}
