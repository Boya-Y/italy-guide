/* Italy guide shell + emergency offline cache */
const CACHE = 'italy-guide-v1'
const PRECACHE = [
  './',
  './index.html',
  './emergency.html',
  './share.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  const isEmergency = url.pathname.endsWith('emergency.html') || url.pathname.endsWith('/emergency')
  if (isEmergency) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request)
          .then((res) => {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(request, copy))
            return res
          })
          .catch(() => cached)
        return cached || network
      }),
    )
    return
  }

  event.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone()
        caches.open(CACHE).then((c) => c.put(request, copy))
        return res
      })
      .catch(() => caches.match(request).then((c) => c || caches.match('./index.html'))),
  )
})
