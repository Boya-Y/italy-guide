if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = new URL('sw.js', document.baseURI || location.href)
    navigator.serviceWorker.register(swUrl.href).catch(() => {})
  })
}
