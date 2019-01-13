import VueActivePreview from './preview.vue'

const install = Vue => {
  Vue.component(VueActivePreview.name, VueActivePreview)
}

export default VueActivePreview
export { VueActivePreview, install }
