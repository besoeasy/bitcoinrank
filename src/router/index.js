import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/index.vue';
import GoView from '../views/go.vue';
import network from '../views/network.vue';

const router = createRouter({
	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/network/',
			name: 'network',
			component: network,
		},
		{
			path: '/go/:addr',
			name: 'go',
			props: true,
			component: GoView,
		},
	],
});

export default router;
