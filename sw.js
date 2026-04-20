const CACHE_NAME = 'lt-ventas-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/Icons/Icon 192.jpg',
  '/Icons/Icon 512.jpg'
];

// Instalar: guarda los archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activar: elimina cachés viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: sirve desde caché si está disponible, sino va a la red
self.addEventListener('fetch', e => {
  // Solo cachear GET, ignorar Firebase y scripts externos
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('firebaseio.com')) return;
  if (e.request.url.includes('googleapis.com')) return;
  if (e.request.url.includes('firebase')) return;

  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

// Push notifications en background
self.addEventListener('push', e => {
  if (!e.data) return;
  const data = e.data.json();
  self.registration.showNotification(data.title || 'Legend Travel', {
    body: data.body || '',
    icon: '/Icons/Icon 192.jpg',
    badge: '/Icons/Icon 192.jpg',
    data: data.url || '/',
    vibrate: [200, 100, 200]
  });
});

// Click en la notificación: abre la app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client)
          return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});
