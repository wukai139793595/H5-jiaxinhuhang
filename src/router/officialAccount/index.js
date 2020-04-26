const components = {
    index: r => require.ensure([], () => r(require('@/views/officialAccount/index')), 'index'),
    demand: r => require.ensure([], () => r(require('@/views/officialAccount/demand')), 'demand'),
    info: r => require.ensure([], () => r(require('@/views/officialAccount/info')), 'info'),
    order: r => require.ensure([], () => r(require('@/views/officialAccount/order')), 'order'),
    orderDetail: r => require.ensure([], () => r(require('@/views/officialAccount/orderDetail')), 'orderDetail'),
    product: r => require.ensure([], () => r(require('@/views/officialAccount/product')), 'product'),
    productDetail: r => require.ensure([], () => r(require('@/views/officialAccount/productDetail')), 'productDetail'),
    submitOrder: r => require.ensure([], () => r(require('@/views/officialAccount/submitOrder')), 'submitOrder'),
}
const router = [
    {
        path: '/index',
        name: 'index',
        component: components.index,
        meta: {
            tabbar: true,
            // keepAlive: true
        }
    },
    {
        path: '/demand',
        name: 'demand',
        component: components.demand,
        meta: {
            tabbar: true,
            // keepAlive: true
        }
    },
    {
        path: '/info',
        name: 'info',
        component: components.info,
        meta: {
            tabbar: true,
            // keepAlive: true
        }
    },
    {
        path: '/order',
        name: 'order',
        component: components.order,
        meta: {
            // keepAlive: true
        }
    },
    {
        path: '/orderDetail',
        name: 'orderDetail',
        component: components.orderDetail,
        meta: {
            // keepAlive: true
        }
    },
    {
        path: '/product',
        name: 'product',
        component: components.product,
        meta: {
            tabbar: true,
            // keepAlive: true
        }
    },
    {
        path: '/productDetail',
        name: 'productDetail',
        component: components.productDetail,
        meta: {
            // tabbar: true,
            // keepAlive: true
        }
    },
    {
        path: '/submitOrder',
        name: 'submitOrder',
        component: components.submitOrder,
        meta: {
            // keepAlive: true
        }
    },
    {
        path: '/*',
        redirect: '/index'
    }
]
export default router;
