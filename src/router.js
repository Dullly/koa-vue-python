import NoFind from './page/NoFind.vue'
import Seo from './page/seo/Seo.vue'

export default {
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
	{
		path: '*',
		name: '/404',
		component: NoFind
	}, {
		path: '/',
		redirect: '/seo'
	}, {
		path: '/seo',
		name: 'seo',
		meta: {
			title: 'AI for SEO'
		},
		component: Seo
	}]
}
