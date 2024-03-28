import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "../components/login/LoginPage.vue";
import RegisterPage from "../components/login/RegisterPage.vue";
import IndexView from "../components/app/manager/IndexView.vue";
import UserView from "../components/app/manager/user/UserView.vue";
import ResourceView from "../components/app/manager/resource/ResourceView.vue";
import TaskView from "../components/app/manager/task/TaskView.vue";
import FieldView from "../components/app/manager/field/FieldView.vue";
import GreenView from "../components/app/manager/green/GreenView.vue";
import AdminIndexView from "../components/app/admin/AdminIndexView.vue";
import StaffIndexView from "../components/app/staff/StaffIndexView.vue";
import FeedbackView from "../components/app/admin/feedback/FeedbackView.vue";
import UserManageView from "../components/app/admin/feedback/UserManageView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/reg',
            name: 'register',
            component: RegisterPage
        },
        {
            path: '/index',
            name: 'index',
            component: IndexView,
            children: [
                {
                    path: 'green',
                    name: 'green',
                    component: GreenView
                },
                {
                    path: 'field',
                    name: 'field',
                    component: FieldView
                },
                {
                    path: 'task',
                    name: 'task',
                    component: TaskView
                },
                {
                    path:'resource',
                    name:'resource',
                    component:ResourceView
                },
                {
                    path:'user',
                    name:'user',
                    component:UserView
                }
            ]
        },
        // 平台管理员
        {
            path: '/admin',
            name: 'admin',
            component: AdminIndexView,
            children:[
                {
                    path: 'feedback',
                    name:'feedback',
                    component: FeedbackView
                },
                {
                    path: 'user',
                    name:'user',
                    component: UserManageView
                },
            ]
        },
        // 庄园工人
        {
            path: '/staff',
            name: 'staff',
            component: StaffIndexView
        },
    ]
})

export default router