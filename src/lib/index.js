/**
 * Created by huangye on 2018/6/6.
 */
import vuePowerfulTable from './PowerfulTable.vue'

const PowerfulTable = {
  install (Vue, options) {
    Vue.component(vuePowerfulTable.name, vuePowerfulTable)
  }
}
// if (typeof window !== 'undefined' && window.Vue) {
//   window.PowerfulTable = PowerfulTable
//   Vue.use(PowerfulTable)
// }
export default PowerfulTable
