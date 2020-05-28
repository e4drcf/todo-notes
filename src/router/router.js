import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from '../components/Board.vue';
import NoteEditor from '../components/NoteEditor'
Vue.use(VueRouter)



const routes = [
    { path: '/', component: Board },
    { path: '/note/:id', component: NoteEditor }
]

const router = new VueRouter({
    routes
})

export default router;