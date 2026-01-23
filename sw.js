const CACHE_NAME = 'motivity-v6';
const assets = [
  './',
  './index.html', 
  './index_ar.html',
  './index_en.html', // أضفنا ملف الإنجليزية ليعمل التطبيق باللغتين بدون إنترنت
  './manifest.json'
  './icon_192.png',
  './icon_512.png',
];

// تثبيت ملفات التطبيق في ذاكرة الهاتف
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('تم حفظ ملفات Motivity في ذاكرة الجهاز');
      return cache.addAll(assets);
    })
  );
});

// استرجاع الملفات حتى لو لا يوجد إنترنت
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      // يعيد الملف من الذاكرة إذا وجد، وإلا يطلبه من الإنترنت
      return response || fetch(e.request);
    })
  );

});





