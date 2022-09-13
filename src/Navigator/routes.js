import {STRINGS} from "../utils/base";
import {lazy} from "react";

const Dashboard = lazy(() => import("../components/Dashboard/dashboard"));
const BuildWorkSpace = lazy(() => import("../components/BuilderWorkSpace/buildWorkSpace"));
const Templates = lazy(()=> import ("../components/Templates/templates"));


const Login = lazy(() => import("../components/Login/login"));

export const routes = [
    {
        name: "Dashboard",
        path: `${STRINGS.ROUTES.ROOT}/:id?`,
        component: Dashboard,
        isPrivate: false,
        exact: true
    },
    {
        name: "Builder Work Space",
        path: `${STRINGS.ROUTES.BWS}/:id?`,
        component: BuildWorkSpace,
        isPrivate: false,
        exact: true
    },
    {
        name: "Bot Template",
        path: `${STRINGS.ROUTES.TEMPLATES}`,
        component: Templates,
        isPrivate: false,
        exact: true
    },

    {
        name: "Login",
        path: `${STRINGS.ROUTES.AUTH.LOGIN}`,
        component: Login,
        isPrivate: false,
        exact: true
    },


]