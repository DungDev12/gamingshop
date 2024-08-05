export const routerClient = [{
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
    meta: { requiresAuth: true }
}];
export const routerAdmin = [{}];
