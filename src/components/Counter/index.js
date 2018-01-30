import counterComponent from './counter.vue'

const counter = {
	install:function(Vue){
		Vue.component('counter',counterComponent)
	}
}

export default counter