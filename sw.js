/**
 * Service worker do mini game
 * @author Luiz Fernando
 */

// Instalação (cache "armazenamento local")
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
                cache.add('/jogoAvalia-o/')
                cache.add('/jogoAvalia-o/manifest.json')
                cache.add('/jogoAvalia-o/index.html')
                cache.add('/jogoAvalia-o/style.css')
                cache.add('/jogoAvalia-o/app.js')
                cache.add('/jogoAvalia-o/img/papel.png')
                cache.add('/jogoAvalia-o/img/pedra.png')
                cache.add('/jogoAvalia-o/img/tesoura.png')
                cache.add('/jogoAvalia-o/img/pc.png')
                cache.add('/jogoAvalia-o/img/pcpapel.png')
                cache.add('/jogoAvalia-o/img/pcpedra.png')
                cache.add('/jogoAvalia-o/img/pctesoura.png')
            })
    )
})
// Ativação
self.addEventListener('activate', (event) => {
    console.log("Ativando o service worker...", event)
    return self.clients.claim()
})
// Interceptação (solicitações https servindo em cache quando off-line)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    )
})