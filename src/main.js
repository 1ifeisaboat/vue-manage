import Vue from 'vue'
import App from './App.vue'
import {
  Button, Radio,
  Aside, Header, Container,
  Main, Menu, Submenu, MenuItem, MenuItemGroup,
  Dropdown, DropdownItem, DropdownMenu,
  Row, Col, Card,
  Table, TableColumn,
  Breadcrumb, BreadcrumbItem,
  Tag,
  Form, FormItem, Input, Select, Option, Switch, DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import http from 'axios'
import './api/mock'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Radio)

Vue.use(Aside)
Vue.use(Header)
Vue.use(Container)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)

Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

// router.matcher = new Router().matcher
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
