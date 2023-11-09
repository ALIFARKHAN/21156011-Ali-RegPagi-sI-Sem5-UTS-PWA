// Nama cache untuk menyimpan sumber daya
const CACHE_NAME = 'firstpwa-v1.0';

// Daftar sumber daya yang akan disimpan di cache
const urlsToCache = [
  "/",
  "/css/style.css",
  "/index.html",
  "/indexdb.js",
  "/register.js",
  "/service-worker.js",
  "/css/bootstrap.css",
  "/manifest.json",
  "/js/jquery.wmuSlider.js",
  "/js/easyResponsiveTabs.js",
  "/js/jquery.swipebox.min.js",
  "/css/swipebox.css",
  "/js/jquery.min.js",
  "/js/move-top.js",
  "/js/easing.js",




  // IMAGES:
  "/images/icons/appstore.png",
  "/images/icons/icon.png",
  "/images/icons/icon72.png",
  "/images/icons/icon96.png",
  "/images/icons/icon144.png",
  "/images/icons/icon192.png",
  "/images/icons/playstore.png",
  "/images/ali.jpg",
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/13.jpg",
  "/images/14.jpg",
  "/images/15.jpg",
  "/images/16.jpg",
  "/images/17.jpg",
  "/images/18.jpg",
  "/images/19.jpg",
  "/images/20.jpg",
  "images/img-sprite.png",
  "/images/banner.jpg",
  "/images/logo.png",
  "/images/left.png",
  "/images/to-top2.png",
  "/images/zoom-icon.png"
];

 // Install service worker dan menyimpan sumber daya di cache
self.addEventListener("install", event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
          return cache.addAll(urlsToCache);
      })
  );
});

//menggunakan file yang ada di cache
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(response => {
          // Menggunakan sumber daya dari cache jika tersedia
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          // Mengambil sumber daya dari server jika tidak ada di cache
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
});
  
// menghapus cache lama
self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});