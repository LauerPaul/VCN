const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  // render: {
  //   bundleRenderer: {
  //     cache: require('lru-cache')({
  //       max: 1000,
  //       maxAge: 1000 * 60 * 15
  //     })
  //   }
  // },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: []
  },
  css: [
    // node.js module but we specify the lang
    // { src: 'bulma', lang: 'sass' },
    resolve(__dirname, 'assets/styles/styles.css'),
    'swiper/dist/css/swiper.css',
    'vue2-animate/dist/vue2-animate.min.css'
  ],
  serverMiddleware: ['./api/auth'],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /* - - - - - - - - -*/
  /*      PLUGINS     */
  /* - - - - - - - - -*/
  plugins: [
    { src: '~/plugins/log', ssr: false },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/lazyload.js', ssr: false },
    // { src: '~/plugins/vuex-persistedstate.js', ssr: false },
  ],
  /* - - - - - - - - -*/
  /*       AXIOS      */
  /* - - - - - - - - -*/
  axios: {
    proxy: false
  },
  proxy: {
    '/api': 'http://localhost:3000'
  },
  /* - - - - - - - - -*/
  /*       AUTH       */
  /* - - - - - - - - -*/
  auth: {
    plugins: [ '~/plugins/auth' ],
    redirect: {
      callback: '/callback'
    },
    strategies: {
      local: {
        endpoints: {
          login: { propertyName: 'token.accessToken' }
        }
      },
      auth0: {
        domain: 'nuxt-auth.auth0.com',
        client_id: 'q8lDHfBLJ-Fsziu7bf351OcYQAIe3UJv'
      },
      facebook: {
        client_id: '1671464192946675',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
      google: {
        client_id:
          '956748748298-kr2t08kdbjq3ke18m3vkl6k843mra1cg.apps.googleusercontent.com'
      },
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET
      },
      twitter: {
        client_id: 'FAJNuxjMTicff6ciDKLiZ4t0D'
      }
    }
  },
  router: {
    // middleware: ['visits', 'user-agent']
  }
}
