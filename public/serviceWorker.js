/* eslint-disable no-restricted-globals */
const CACHE_NAME = "smart-choice-cache-v1";
const urlsToCache = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  // In order to activate the new service worker, you have to close all pages, which are controlled by the old service worker.
  // If we want to avoid that, we can skip the waiting phase by adding self.skipWaiting()
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  // inform what to do with cached files
  event.respondWith(
    // caches.match(event.request).then((response) => {
    //   if (response) {
    //     return response;
    //   }
    //   return fetch(event.request);
    // })
    fetch(event.request)
  );
});
