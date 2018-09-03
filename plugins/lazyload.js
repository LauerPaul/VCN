import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://www.itspecialist.com/portals/0/Images/500.png?ver=2016-01-27-105527-223',
  loading: 'https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif',
  attempt: 1
})