import axios from 'axios';

const HOST = 'http://localhost:8080/api';

export const userApis = {
    login: '/auth/login/',
    currentUser: '/current-user',
    getUserBySlug: (slug) => `/users/${slug}`,

    getAllCourses: '/courses',
    getCoursesBySlug: (slug) => `/courses/${slug}`,

    getMyCourses: '/my-courses',
    createCourse: '/my-courses',

    createBlog: '/my-blogs',
    getMyBlogs: '/my-blogs',
    getMyBlogById: (id) => `/my-blogs/${id}`,
    updateMyBlog: (id) => `/my-blogs/${id}`,

    getAllBlogs: '/blogs/',
    getBlogsByTopic: (slug) => `/blogs/topics/${slug}`,
    getBlogById: (id) => `/blogs/${id}`,
    getOtherBlogs: (blog_id) => `/blogs/${blog_id}/others`,

    getNumberBlogLikes: (id) => `/blogs/${id}/likes`,
    getNumberBlogComments: (id) => `/blogs/${id}/count-comments`,
    likeBlog: (id) => `/blogs/${id}/likes`,
    checkLikedBlog: (id) => `/blogs/${id}/likes/checked`,

    getAllBookmarkBlogs: '/my-bookmarks',
    bookmarkBlog: (id) => `/blogs/${id}/bookmarks`,
    deleteBookmarkBlogs: (id) => `/my-bookmarks/${id}`,
    checkBookmark: (id) => `/blogs/${id}/bookmarks/checked`,

    getParentComments: (type, id) => `/${type}/${id}/comments`,
    createParentComment: (type, id) => `/${type}/${id}/comments`,
    createReplyComment: (type, blog_id) => `/${type}/${blog_id}/comments`,
    getChildrenComments: (type, blog_id, parent_comment_id) => `/${type}/${blog_id}/comments/${parent_comment_id}`,
    getNumberRepliesComment: (type, blog_id, parent_comment_id) =>
        `/${type}/${blog_id}/comments/${parent_comment_id}/count`,

    getLikeComments: (id) => `/comments/${id}/likes`, //Tách checkLiked ra vì checkLiked cần login
    likeComment: (id) => `/comments/${id}/likes`,
    getCommentById: (id) => `/comments/${id}`,
    updateComment: (id) => `/comments/${id}`,
    deleteComment: (id) => `/comments/${id}`,
    checkLikedComment: (id) => `/comments/${id}/check-liked`,
    register: '/auth/register/',
    verifyEmail: '/verify-email/',
    methodResetPassword: '/forgot-password/',

    sendResetPasswordOTP: '/otp/',
    sendResetPasswordEmail: '/email/',
    verifyOTP: '/otp-verification/',
    resetPassword: '/password/',
    refreshToken: '/refresh-token/',
    users: '/',
};

const api = axios.create({
    baseURL: HOST,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authAPI = () => {
    const token = localStorage.getItem('token');
    console.log('Token: ', token);

    return axios.create({
        baseURL: HOST,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;
