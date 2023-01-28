import Vue from "vue"
import VueRouter from "vue-router"

import HomePage from "./views/HomePage"
import ContactPage from "./views/ContactPage"
import BanListPage from "./views/BanListPage"
import ShopPage from "./views/ShopPage"
import WebPostPage from "./views/WebPostPage"

import ProfilePage from "./views/ProfilePage"
import ConsolePage from "./views/ConsolePage"

import LoginPage from "./views/LoginPage"
import RegisterPage from "./views/RegisterPage"

/*
import ContactInfo from "./views/ContactInfo"
import AppInfo from "./views/AppInfo"
import LearningCourse from "./views/LearningCourse"
import LoginScreen from '../components/LoginScreen'

import FormCourseNew from './views/FormCourseNew'
import FormCourseEdit from './views/FormCourseEdit'
import FormTestNew from './views/FormTestNew'
import FormTestEdit from './views/FormTestEdit'
import FormAccCheck from './views/FormAccCheck'

import DesktopLoadTests from "./views/DesktopLoadTests"
import UseTest from './views/UseTest'
import TestRecord from './views/TestRecord'
import TestRecordsList from './views/TestRecordsList'


import ShowCourse from './views/ShowCourse'

import NotHavePerms from './views/errors/NotHavePerms'
import NotFound from './views/errors/NotFound'

import { tokenManager } from "../main";
import { userManager } from "../main";


Vue.use(VueRouter)

const routes = [

    { path: "/prihlaseni", component: LoginScreen, name: "login"},
    { path: "/kontakty", component: ContactInfo, name: "contacts", meta: { requireAuth: true }},
    { path: "/", component: AppInfo, name: "application", meta: { requireAuth: true }},
    
    { path: "/testy", component: DesktopLoadTests, name: "test", props: true, meta: { requireAuth: true }},
    { path: "/test/novy", component: FormTestNew, name: "newTest", meta: { requireAuth: true }},
    { path: "/test/vypracovat/:id_test", component: UseTest, name: "useTest", meta: { requireAuth: true }},
    { path: "/test/upravit", component: FormTestEdit, name: "editTest", props: true, meta: { requireAuth: true }},
    { path: "/testy/vysledky", component: TestRecordsList, name: "testRecords", props: true, meta: { requireAuth: true }},
    { path: "/test/vysledek/:id_record", component: TestRecord, name: "testRecord", meta: { requireAuth: true }},
   


    { path: "/sprava/ucty", component: FormAccCheck, name: "checkParents", meta: { requireAuth: true }},


    { path: "/chyba/prava", component: NotHavePerms, name: "errNotPerms"},

    /* --- kurz --- */
    /*
    { path: "/vyuka", component: LearningCourse, name: "course", meta: { requireAuth: true }, props: true},
    { path: "/vyuka/kurz/:id_course", component: ShowCourse, name: "courseById", props: true, meta: { requireAuth: true }},
    { path: "/vyuka/novy/kurz", component: FormCourseNew, name: "newCourse", meta: { requireAuth: true }},
    { path: "/vyuka/upravit/kurz", component: FormCourseEdit, name: "editCourse", props: true, meta: { requireAuth: true }},

    { path: "*", component: NotFound, name: "notFound"},

    /*
    { path: "/register", component: Register, name: "register"},
    { path: "/contacts", component: Contacts, name: "contacts"},
    { path: "/profile", component: Profile, name: "profile"},
    { path: "/profile/edit", component: ModifyProfile, name: "profileEdit"},
    { path: "/info", component: Info, name: "info"},
    { path: "", component: Home, name: "home"},
    { path: "/rooms", component: Rooms, name: "rooms", meta: { requireAuth: true }},
    { path: "/room/:id", component: Room, name: "room", meta: { requireAuth: true }},
    { path: "/room/new", component: NewRoom, name: "newRoom", meta: { requireAuth: true }},
    { path: "*", component: NotFound, name: "notFound"},
    
];

*/

import { credentialsManager } from "../main";

Vue.use(VueRouter)

const routes = [
    { path: "/", component: HomePage, name: "homePage", meta: {
        title: 'CraftFun - Neoficiální minecraft server',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      }},
    { path: "/kontakty", component: ContactPage, name: "contactPage", meta: {
        title: 'Kontakty',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      }},
      { path: "/prispevek/:id_post", component: WebPostPage, props: true, name: "webPostPage", meta: {
        title: 'Příspěvek',
        metaTags: [
          {
            name: 'description',
            content: 'The home page of our example app.'
          },
          {
            property: 'og:description',
            content: 'The home page of our example app.'
          }
        ]
      }},
    { path: "/obchod", component: ShopPage, name: "shopPage"},
    { path: "/prihlaseni", component: LoginPage, name: "loginPage"},
    { path: "/registrace", component: RegisterPage, name: "registerPage"},
    { path: "/banlist", component: BanListPage, name: "banListPage"},
    { path: "/profil", component: ProfilePage, name: "profilePage", meta: { requireAuth: true }},
    { path: "/terminal", component: ConsolePage, name: "consolePage", meta: { requireAuth: true }},
];

const router = new VueRouter( {routes: routes, mode: "history"} );

//loggining
router.beforeEach((to, from, next) => {
    if(to.meta != null && to.meta.requireAuth){
        //kontrola, jestli mam potrebne udaje
        if(credentialsManager.isUserCredentialsData()){
            next();
        } else {
            credentialsManager.removeCredentials();
            next({ name: "loginPage" });
        } 
    } else {
        next();
    }
});

// for page titles and other meta
router.beforeEach((to, from, next) => {
    
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  
    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) {
      document.title = nearestWithTitle.meta.title;
    } else if(previousNearestWithMeta) {
      document.title = previousNearestWithMeta.meta.title;
    }
  
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  
    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();
  
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');
  
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
  
      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');
  
      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
  
    next();
  });


export default router;

