import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import page1 from '@/components/page1'
import page2 from '@/components/page2'
import page3 from '@/components/page3'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'index',
			component: index,
			meta: {
				keepAlive: false, //此组件不需要被缓存
			}
		},
		{
			path: '/page1',
			name: 'page1',
			component: page1,
			meta: {
				keepAlive: true, //此组件需要被缓存
				isBack: false, //用于判断上一个页面是哪个
			}
		},
		{
			path: '/page2',
			name: 'page2',
			component: page2,
			meta: {
				keepAlive: true, // 此组件需要被缓存
				isBack: false, //用于判断上一个页面是哪个
			}
		},
		{
			path: '/page3',
			name: 'page3',
			component: page3,
			meta: {
				keepAlive: false, // 此组件不需要被缓存
			}
		}
	],
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})