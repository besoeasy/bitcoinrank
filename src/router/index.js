import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/index.vue';
import GoView from '../views/go.vue';

const router = createRouter({
	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
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
