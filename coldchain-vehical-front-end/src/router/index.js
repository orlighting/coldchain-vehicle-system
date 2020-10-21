import en from "../i18n/lang/en"
import Vue from "vue"
import Router from "vue-router"
import CommerViews from "@/views/commerViews"
import Login from "@/views/login/index"
import Layout from "@/views/layout/layout"
import HomeMain from "@/views/index/mainIndex"

// 不是必须加载的组件使用懒加载

const NotFound = () => import("@/views/page404")


const BoxInfo = () => import("@/views/car/boxstate")
const GoodInfo = () => import("@/views/car/goodstate")
const DriveInfo = () => import("@/views/driver/driveState")
const FaceInfo = () => import("@/views/driver/faceState")
const HelpInfo = () => import("@/views/helpexit/helpinfo")

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)
let routeName = en.routeName
let defaultRouter = [
  { path: "/",
    redirect: "/index",
    hidden: true,
    children: []
  },
  {
    path: "/login",
    component: Login,
    name: "",
    hidden: true,
    children: []
  },
  {
    path: "/index",
    iconCls: "fa fa-dashboard", // 图标样式class
    name: routeName.home,
    component: Layout,
    alone: true,
    children: [
      {
        path: "/index",
        iconCls: "fa fa-dashboard", // 图标样式class
        name: "主页",
        component: HomeMain,
        children: []
      }
    ]
  },
  {
    path: "/404",
    component: NotFound,
    name: "404",
    hidden: true,
    children: []
  }
]

let addRouter = [

  /*
  {
    path: "/",
    iconCls: "el-icon-tickets", // 图标样式class
    name: routeName.article,
    component: Layout,
    children: [
      {
        path: "/addArticle",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: routeName.publishArticle,
        component: AddArticle,
        children: []
      },
      {
        path: "/addArticleEditor",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: routeName.publishArticleEditor,
        hidden: true,
        component: AddArticleEditor,
        children: []
      }
    ]
  },

  {
    path: "/",
    iconCls: "fa fa-exchange", // 图标样式class
    name: routeName.shuttleBox,
    component: Layout,
    children: [
      {
        path: "/transfer",
        iconCls: "fa fa-sign-in", // 图标样式class
        name: routeName.demoShuttle,
        component: Transfer,
        children: []
      }
    ]
  },



  {
    path: "/",
    iconCls: "fa fa-cloud-upload", // 图标样式class
    name: routeName.upload,
    component: Layout,
    meta: {role: ["superAdmin"]},
    children: [
      {
        path: "/upload",
        iconCls: "el-icon-upload2", // 图标样式class
        name: routeName.fileUpload,
        component: Upload,
        children: []
      }
    ]
  },

  {
    path: "/",
    iconCls: "el-icon-edit", // 图标样式class
    name: routeName.editor,
    component: Layout,
    meta: {role: ["superAdmin", "admin"]},
    children: [
      {
        path: "/markdown",
        iconCls: "fa fa-file-code-o", // 图标样式class
        name: routeName.markdown,
        component: Markdown,
        children: []
      },
      {
        path: "/wangeditor",
        iconCls: "fa fa-file-code-o", // 图标样式class
        name: routeName.wangeditor,
        component: WangeditorView,
        children: []
      }
    ]
  },

  {
    path: "/",
    iconCls: "el-icon-setting", // 图标样式class
    name: routeName.systemSettings,
    component: Layout,
    meta: {role: ["superAdmin"]},
    children: [
      {
        path: "/navClassifies",
        iconCls: "el-icon-menu", // 图标样式class
        name: routeName.navMenu,
        component: NavClassify,
        children: []
      }
    ]
  },
   */


  {
    path: "/",
    iconCls: "fa fa-automobile", // 图标样式class
    name: routeName.carState,
    component: Layout,
    children: [
      {
        path: "/box",
        iconCls: "fa fa-thermometer-half", // 图标样式class
        name: routeName.boxState,
        component: BoxInfo,
        children: [],
      },
      {
        path: "/good",
        iconCls: "fa fa-archive", // 图标样式class
        name: routeName.goodInfo,
        component: GoodInfo,
        children: []
      },
    ]
  },


  {
    path: "/",
    iconCls: "fa fa-drivers-license-o", // 图标样式class
    name: routeName.driverInfo,
    component: Layout,
    children: [
      {
        path: "/face",
        iconCls: "fa fa-user-circle-o", // 图标样式class
        name: routeName.faceInfo,
        component: FaceInfo,
        children: [],
      },
      {
        path: "/drive",
        iconCls: "fa fa-tachometer", // 图标样式class
        name: routeName.driveInfo,
        component: DriveInfo,
        children: []
      },
    ]
  },

  {
    path: "/",
    iconCls: "fa fa-reorder", // 图标样式class
    name: routeName.helpExit,
    component: Layout,
    children: [
      {
        path: "/help",
        iconCls: "fa fa-question-circle-o", // 图标样式class
        name: routeName.helpInfo,
        component: HelpInfo,
        children: [],
      },

    ]
  },



  { path: "*",
    redirect: "/404",
    hidden: true,
    component: NotFound
  }

]




export default new Router({
  routes: defaultRouter
})
export {defaultRouter, addRouter}
