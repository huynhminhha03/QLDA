//Layout
import { WithoutSidebar } from '~/components/Layouts';
import BlogDetails from '~/pages/BlogDetails';
// import FooterOnly from '~/components/Layouts/FooterOnly';

import Bookmark from '~/pages/Bookmark';
import Home from '~/pages/Home';
import RegisterCourse from '~/pages/RegisterCourse';
import MyBlog from '~/pages/MyBlog';
import Blog from '~/pages/Blog';
import Profile from '~/pages/Profile';
import Roadmap from '~/pages/Roadmap';
import CreateBlog from '~/pages/CreateBlog';
import MyCourse from '~/pages/MyCourse';
import CreateCourse from '~/pages/CreateCourse';
import CourseDetails from '~/pages/CourseDetails';
import SearchResults from '~/pages/SearchResults';
import MyCourseDetails from '~/pages/MyCourseDetails';
import CreateLesson from '~/pages/CreateLesson';
import MyLessonDetails from '~/pages/MyLessonDetails';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/blog', component: Blog },
    { path: '/blog/topic/:slug', component: Blog },
    { path: '/blog/:id', component: BlogDetails, layout: WithoutSidebar },
    { path: '/me/bookmark', component: Bookmark },
    { path: '/new-post', component: CreateBlog, layout: WithoutSidebar },
    { path: '/me/posts', component: MyBlog },
    { path: '/posts/:id/edit', component: CreateBlog },
    { path: '/roadmap', component: Roadmap },
    { path: '/course/:course_id', component: CourseDetails },
    { path: '/course/:course_id/edit', component: CreateCourse, layout: WithoutSidebar },
    { path: '/course/results', component: SearchResults },
    { path: '/my-course/:course_id', component: MyCourseDetails, layout: WithoutSidebar },
    { path: '/my-course/:course_id/lesson', component: CreateLesson, layout: WithoutSidebar },
    { path: '/course/:course_id/lesson/:lesson_id/edit', component: CreateLesson, layout: WithoutSidebar },
    { path: '/my-course/:course_id/lesson/:lesson_id', component: MyLessonDetails, layout: WithoutSidebar },
    { path: '/my-course', component: MyCourse },
    { path: '/new-course', component: CreateCourse, layout: WithoutSidebar },
    { path: '/registered-course', component: RegisterCourse },
    { path: '/:slug', component: Profile, layout: WithoutSidebar },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
