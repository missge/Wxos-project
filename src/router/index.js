import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import register from '@/components/register/register'
import Home from '@/components/Home/Home'
import OnlineOrder from '@/components/OnlineOrder/OnlineOrder'
import PersonalCenter from '@/components/PersonalCenter/PersonalCenter'
import OrderList from '@/components/OrderList/OrderList'
import Orderdetail_pay  from '@/components/Orderdetail_pay/Orderdetail_pay'
import Orderdetail_goods  from '@/components/Orderdetail_goods/Orderdetail_goods'
import OrderedFoodList  from '@/components/OrderedFoodList/OrderedFoodList'
import MealCard  from '@/components/MealCard/MealCard'
import OrderedFoodSuccess  from '@/components/OrderedFoodSuccess/OrderedFoodSuccess'
import ScenePay  from '@/components/ScenePay/ScenePay'
import InformationModifine  from '@/components/InformationModifine/InformationModifine'
import ChangePhone  from '@/components/InformationModifine/ChangePhone'
import ChangeSex  from '@/components/InformationModifine/ChangeSex'
import orderMessage  from '@/components/orderMessage/orderMessage'
import noCardNew  from '@/components/noCard/noCardNew'
import noCard  from '@/components/noCard/noCard'
import error  from '@/components/noCard/error'
import Nothing from '@/components/noCard/Nothing'
import test from '@/components/test'
import MallList from '@/Ecommerce/MallList'
import RefundType from '@/Ecommerce/RefundType'
import DetailsPage from '@/Ecommerce/DetailsPage'
import CategoryPage from '@/Ecommerce/CategoryPage'
import ShoppingCard from '@/Ecommerce/ShoppingCard'
import RefundOrder from '@/Ecommerce/RefundOrder'
import ApplyforRefund from '@/Ecommerce/ApplyforRefund'
// import image_file from '@/Ecommerce/image_file'
import GoodsReturn from '@/Ecommerce/GoodsReturn'
import SelectAddress from '@/Ecommerce/SelectAddress'
import DeliveryAddress from '@/Ecommerce/DeliveryAddress'
import AddAdress from '@/Ecommerce/AddAdress'
import EPaySuccess from '@/Ecommerce/EPaySuccess'
import Ehome from '@/Ecommerce/Ehome'
import AddReturn from '@/Ecommerce/AddReturn'
import clickPage from '@/Ecommerce/clickPage'
import EOrderedFoodList from '@/Ecommerce/EOrderedFoodList'
import FontSize from '@/Ecommerce/FontSize'
import Refunding from '@/Ecommerce/Refunding'
import RefundingDetaile from '@/Ecommerce/RefundingDetaile'
import footer from '@/Ecommerce/footer'
import Search from '@/Ecommerce/Search'
import imageUploader from '@/Ecommerce/imageUploader'



Vue.use(Router)
Vue.use(require('vue-wechat-title'))
const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: register,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/Home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/OnlineOrder',
      component: OnlineOrder,
      meta: {
        title: '网上订餐'
      }
    },
    {
      path: '/test',
      component: test
    },
     {
      path: '/PersonalCenter',
      component: PersonalCenter,
      meta: {
        title: '个人中心'
      }
    },
     {
      path: '/OrderList',
      component: OrderList,
      meta: {
        title: '订单列表'
      }
    },
     {
      path: '/Orderdetail_pay',
      component: Orderdetail_pay,
       meta: {
        title: '订单详情'
      }
    },
     {
      path: '/Orderdetail_goods',
      component: Orderdetail_goods,
       meta: {
        title: '订单详情'
      }
    },
     {
      path: '/MealCard',
      component: MealCard,
      meta: {
        title: '我的饭卡'
      }
    },
     {
      path: '/OrderedFoodList',
      component: OrderedFoodList,
       meta: {
        title: '点餐订单'
      }
    },
     {
      path: '/OrderedFoodSuccess',
      component: OrderedFoodSuccess,
      meta:{
        title:'点餐成功'
      }
    },
     {
      path: '/ScenePay',
      component: ScenePay,
      meta:{
        title:'现场支付'
      }
    },
     {
      path: '/InformationModifine',
      component: InformationModifine,
       meta:{
        title:'信息修改'
      }
    },
     {
      path: '/ChangePhone',
      component: ChangePhone,
      meta:{
        title:'修改手机号'
      }
    },
     {
      path: '/ChangeSex',
      component: ChangeSex,
      meta:{
        title:'修改性别'
      }
    },
     {
      path: '/orderMessage',
      component: orderMessage,
      meta:{
        title:'订单留言'
      }
    },
     {
      path: '/noCard',
      component: noCard,
       meta:{
        title:'无卡'
      }
    },
     {
      path: '/noCardNew',
      component: noCardNew,
       meta:{
        title:'无卡'
      }
    },
     {
      path: '/error',
      component: error,
       meta:{
        title:'错误'
      }
    },
     {
      path: '/RefundType',
      component: RefundType,
       meta:{
        title:'退货类型'
      }
    },
     {
      name:'DetailsPage',
      path: '/DetailsPage',
      component: DetailsPage,
      meta:{
        title:'商品详情'
      }
    },
    {
      path: '/CategoryPage',
      component: CategoryPage,
       meta:{
        title:'商品分类'
      }
    },{
      path: '/ShoppingCard',
      component: ShoppingCard,
      meta:{
        title:'购物车'
      }
    },{
      path: '/RefundOrder',
      component: RefundOrder,
      meta:{
        title:'订单详情'
      }
    },{
      path: '/ApplyforRefund',
      component: ApplyforRefund,
      meta:{
        title:'申请退款'
      }
    },{
      path: '/GoodsReturn',
      component: GoodsReturn,
       meta:{
        title:'提交成功'
      }
    },{
      path: '/SelectAddress',
      component: SelectAddress,
      meta:{
        title:'收货地址'
      }
    },{
      path: '/DeliveryAddress',
      component: DeliveryAddress,
       meta:{
        title:'编辑收货地址'
      }
    },{
      path: '/AddAdress',
      component: AddAdress,
       meta:{
        title:'设置收货地址'
      }
    },{
      path: '/EPaySuccess',
      component: EPaySuccess,
       meta:{
        title:'支付成功'
      }
    },{
      path: '/AddReturn',
      component: AddReturn,
       meta:{
        title:'商品回寄'
      }
    },{
      path: '/MallList',
      component: MallList,
      meta:{
        title:'商品列表',
        keepAlive: true, //此组件需要被缓存
        isBack: false, //用于判断上一个页面是哪个
      }
    },{
      path: '/clickPage',
      component: clickPage,
       meta:{
        title:'点击页面'
      }
    },{
      path: '/Ehome',
      component: Ehome,
       meta:{
        title:'首页'
      }
    },{
      path: '/EOrderedFoodList',
      component: EOrderedFoodList,
       meta:{
        title:'订单页'
      }
    },{
      path: '/FontSize',
      component: FontSize,
       meta:{
        title:'字体大小'
      }
    },{
      path: '/Refunding',
      component: Refunding,
       meta:{
        title:'退款'
      }
    },{
      path: '/RefundingDetaile',
      component: RefundingDetaile,
       meta:{
        title:'退款记录详情'
      }
    },{
      path: '/footer',
      component: footer,
       meta:{
        title:'底部导航'
      }
    },{
      path: '/Search',
      component: Search,
       meta:{
        title:'搜索'
      }
    },{
      path: '/imageUploader',
      component: imageUploader,
       meta:{
        title:'图片上传'
      }
    },{
      path: '/Nothing',
      component: Nothing,
       meta:{
        title:'暂无'
      }
    }
  ]
})

export default router
