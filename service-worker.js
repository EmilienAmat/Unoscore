self.addEventListener('install', event => {
  event.waitUntil(
      caches.open('uno-score-cache').then(cache => {
          return cache.addAll([
              './index.html',
              './style.css',
              './script.js',
              './LOGO.png',
              './add.png',
              './subtract.png',
              './settingLogo.png',
              './resetLogo.png',
              './manifest.json',
              './image/icon-192x192.png',
              './image/icon-512x512.png'
          ]);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request);
      })
  );
});
