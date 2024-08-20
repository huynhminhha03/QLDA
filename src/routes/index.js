//Layout
import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import MyCourse from '~/pages/MyCourse';
import Post from '~/pages/Post';
import Roadmap from '~/pages/Roadmap';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/post', component: Post },
    { path: '/roadmap', component: Roadmap},
    { path: '/my-course', component: MyCourse, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
