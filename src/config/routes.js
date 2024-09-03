const routes = {
    home: '/',
    blog: '/blog',
    live: '/live',
    profile:(slug) => `/${slug}`,
    upload: '/upload',
    search: '/search',

    courseDetails: (course_id) => `course/${course_id}`,


    myCourseDetails: (course_id) => `my-course/${course_id}`,

    registeredCourse: '/registered-course',
    myCourse: '/my-course',
    createCourse: '/new-course/',
    roadmap: '/roadmap',
    bookmark: '/me/bookmark',
    myBlog: '/me/posts',
    createBlog: '/new-post',
    blogDetails:(id) => `/blog/${id}`,
    editBlog:(id) => `/posts/${id}/edit`,
    
    loginEmail: '/login/email',
    registerEmail: '/register/email',
    forgotPassword: '/forgot-password',
}

export default routes