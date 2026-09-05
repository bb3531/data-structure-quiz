self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(response) {
        if (response.ok) {
          var clone = response.clone();
          caches.open('v1').then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      });
    })
  );
});
