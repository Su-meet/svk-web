
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-2Z7FA3AN.js",
      "chunk-YAZVTKY2.js",
      "chunk-OAKXAI2D.js",
      "chunk-H4IYBPU4.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-O2QP5PKI.js",
      "chunk-YAZVTKY2.js",
      "chunk-OAKXAI2D.js",
      "chunk-H4IYBPU4.js"
    ],
    "route": "/services"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-O2QP5PKI.js",
      "chunk-YAZVTKY2.js",
      "chunk-OAKXAI2D.js",
      "chunk-H4IYBPU4.js"
    ],
    "route": "/services/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-O5GXNV2Q.js",
      "chunk-OAKXAI2D.js",
      "chunk-4TZMLDYN.js",
      "chunk-H4IYBPU4.js"
    ],
    "route": "/service/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-WUF4YMIQ.js",
      "chunk-4TZMLDYN.js",
      "chunk-H4IYBPU4.js"
    ],
    "route": "/cart"
  },
  {
    "renderMode": 0,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 18008, hash: '5d7068f4a25cedc252b5af4b7e17edc4cdd0343f1bbd60b7129e71d0116676d3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2747, hash: 'e5daa441bb39ba062050ea4f81a64a573e43b8534dc1490f441892e0ba306018', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 81841, hash: 'ae2e90b23e25579b993c0c38f243be4135f7d5f5fdb414f0f8ae28b0a460ccce', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 44856, hash: 'eeb0999077e1da7cc6056db2562f2fb84fa0bf1a876e6affe148cc940d59b647', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'services/index.html': {size: 107799, hash: 'c2ecee8f1a258aee432ccd5fa42bb4c281fb748cd7386377f25fef258348f221', text: () => import('./assets-chunks/services_index_html.mjs').then(m => m.default)},
    'styles-EAEGZUZN.css': {size: 25856, hash: 'h2d0il6m6wk', text: () => import('./assets-chunks/styles-EAEGZUZN_css.mjs').then(m => m.default)}
  },
};
