import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// PreCaching
precacheAndRoute(self.__WB_MANIFEST)

// Caching strategies
registerRoute(
  ({ url }) => url.href.startsWith('https'),
  new StaleWhileRevalidate()
)
