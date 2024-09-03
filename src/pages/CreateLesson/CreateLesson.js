import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './CreateLesson.module.scss';
import { authAPI, userApis } from '~/utils/api';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

function CreateLesson() {
    const [formData, setFormData] = useState({
        title: '',
    });
    const [video, setVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { course_id, lesson_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (lesson_id) {
            const fetchMyLessonDetails = async () => {
                try {
                    const response = await authAPI().get(userApis.getLessonById(course_id, lesson_id));
                    const lesson = response.data;
                    console.log(response.data.title);
                    setFormData({
                        title: lesson.title || '',
                    });

                    setVideoPreview(lesson.video_url);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchMyLessonDetails();
        }
    }, [course_id, lesson_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            // Tạo URL tạm thời cho video để xem trước
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSubmit = new FormData();
        dataToSubmit.append('title', formData.title);
        if (video) dataToSubmit.append('video', video);

        try {
            setIsSubmitting(true);

            if (course_id && lesson_id) {
                const response = await authAPI().patch(userApis.updateLesson(course_id, lesson_id), dataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
            } else if (course_id) {
                const response = await authAPI().post(userApis.createLesson(course_id), dataToSubmit, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response.data);
            }
            setIsSubmitting(false);

            navigate(-1);
        } catch (error) {
            setIsSubmitting(false);
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form className={cx('lesson-form')} onSubmit={handleSubmit}>
            <h1 className={cx('heading')}>{lesson_id ? 'Chỉnh sửa bài học' : 'Tạo bài học mới'}</h1>
            
            <div className={cx('form-group')}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter course title"
                    required
                />
            </div>

            <div className={cx('form-group')}>
                <label htmlFor="video">Video</label>
                <input
                    type="file"
                    id="video"
                    name="video"
                    accept="video/*"
                    onChange={handleVideoChange}
                    required={!lesson_id}
                />
            </div>

            {/* Phần preview video */}
            {videoPreview && (
                <div className={cx('video-preview')}>
                    <video src={videoPreview} controls className={cx('video')} />
                </div>
            )}

            <button type="submit" className={cx('submit-button')} disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : lesson_id ? 'Chỉnh sửa' : 'Thêm bài học'}
            </button>
        </form>
    );
}

export default CreateLesson;
