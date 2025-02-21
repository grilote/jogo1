/**
 * Service worker do mini game
 * @author Luiz Fernando
 */

// Instalação (cache "armazenamento local")
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
                cache.add('/jogo1/')
                cache.add('/jogo1/manifest.json')
                cache.add('/jogo1/index.html')
                cache.add('/jogo1/style.css')
                cache.add('/jogo1/app.js')
                cache.add('/jogo1/img/papel.png')
                cache.add('/jogo1/img/pedra.png')
                cache.add('/jogo1/img/tesoura.png')
                cache.add('/jogo1/img/pc.png')
                cache.add('/jogo1/img/pcpapel.png')
                cache.add('/jogo1/img/pcpedra.png')
                cache.add('/jogo1/img/pctesoura.png')
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