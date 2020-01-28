require('dotenv').config()

const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/main.scss',
    'sweetalert2/dist/sweetalert2.min.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/authenticate',
    '@/plugins/feathericons',
    { src: '@/plugins/v-select', ssr: false },
    { src: '@/plugins/v-multiselect', ssr: false },
    { src: '@/plugins/typeahead', ssr: false },
    { src: '@/plugins/datepicker', ssr: false },
    { src: '@/plugins/datetimepicker', ssr: false },
    { src: '@/plugins/daterangepicker', ssr: false },
    { src: '@/plugins/draggable', ssr: false },
    { src: '@/plugins/full-calendar', ssr: false },
    { src: '@/plugins/tel-input', ssr: false },
    { src: '@/plugins/chart', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/

    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    ['nuxt-validate', {
      inject: true,
      fieldsBagName: 'veeFields',
    }],
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: [
            'faBell',
            'faBookmark',
            'faCalendar',
            'faCalendarAlt',
            'faCalendarCheck',
            'faClipboardCheck',
            'faClipboardList',
            'faClock',
            'faComments',
            'faHistory',
            'faMapMarkerAlt',
            'faUserMd',
            'faUserCircle',
          ]
        }
      ]
    }],
    'vue-sweetalert2/nuxt',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: { proxy: true },
  /**
   * Server Middleware
   */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    // session middleware
    // session({
    //   name: process.env.SESSION_NAME,
    //   secret: process.env.SECRET_KEY,
    //   cookie: {
    //     maxAge: Number(process.env.SESSION_LIFETIME)
    //   },
    //   saveUninitialized: true,
    //   resave: false,
    // }),
    session({
      name: process.env.SESSION_NAME,
      store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      }),
      secret: process.env.SECRET_KEY,
      cookie: {
        maxAge: Number(process.env.SESSION_LIFETIME)
      },
      saveUninitialized: true,
      resave: false
    }),
    // Server Proxy for Auth
    '~/api/auth'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    watch: ['api'],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.devtool = '#source-map'
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    },
  }
}
