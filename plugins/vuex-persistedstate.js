import createPersistedState from 'vuex-persistedstate'
import store from '~/store/'
 
export default ({store}) => {
  createPersistedState({
      key: 'vuex',
      // paths: []
  })(store)
}