/**
 * Service worker do mini game
 * @author Luiz Fernando
 */

const CACHE_NAME = 'jokenpo-v1';
const STATIC_ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './img/papel.png',
    './img/pedra.png',
    './img/tesoura.png',
    './img/pc.png',
    './img/pcpapel.png',
    './img/pcpedra.png',
    './img/pctesoura.png',
    './img/icon48.png',
    './img/icon96.png',
    './img/icon144.png',
    './img/icon192.png',
    './img/icon256.png',
    './img/icon384.png',
    './img/icon512.png'
];

// Instalação (cache "armazenamento local")
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(STATIC_ASSETS);
            })
            .catch(error => console.error('Erro ao adicionar assets ao cache:', error))
    );
});

// Ativação
self.addEventListener('activate', (event) => {
    console.log("Ativando o service worker...", event);
    // Limpeza de caches antigos
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Deletando cache antigo:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Interceptação (solicitações https servindo em cache quando off-line)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request);
                }
            })
    );
});
