/*
 * Fichier uniquement utilisé pour le fonctionnement de l'ide
 * Pour modifier le fonctionnement de webpack, utiliser quasar.conf.js
 */
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      // Officiel
      'src': path.resolve('./src'),
      'app': path.resolve('./'),
      'components': path.resolve('./src/components'),
      'layouts': path.resolve('./src/layouts'),
      'pages': path.resolve('./src/pages'),
      'assets': path.resolve('./src/assets'),
      'boot': path.resolve('./src/boot')
    }
  }
}
