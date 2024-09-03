import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './MyLessonDetails.module.scss';
import { authAPI, userApis } from '~/utils/api';
import DeleteModal from '~/components/DeleteModal';

const cx = classNames.bind(styles);

function MyLessonDetails() {
    const [lesson, setLesson] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { course_id, lesson_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await authAPI().get(userApis.getLessonById(course_id, lesson_id));
                console.log(response.data);
                setLesson(response.data);
            } catch (error) {
                console.error('Failed to fetch lesson data:', error);
            }
        };

        fetchCourse();
    }, [course_id, lesson_id]);

    const handleEdit = () => {
        navigate(`/course/${course_id}/lesson/${lesson_id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await authAPI().delete(userApis.deleteLesson(course_id, lesson_id));
            navigate(`my-course/${course_id}`, { replace: true });
        } catch (error) {
            console.error('Failed to delete lesson:', error);
        }
    };

    const hideDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleContextMenu = (e) => {
        e.preventDefault(); // Chặn nhấp chuột phải
    };

    return (
        <div>
            {lesson ? (
                <div className={cx('wrapper')}>
                    <div className="container">
                        <div className="row">
                            <div className="col col-lg-9">
                                <div className={cx('lesson-video')}>
                                    <video 
                                        src={lesson.video_url} 
                                        controls 
                                        controlsList="nodownload"
                                        onContextMenu={handleContextMenu} 
                                        alt={lesson.title} 
                                    />
                                </div>
                                <h1 className={cx('lesson-title')}>{lesson.title}</h1>

                                <div>Xem bình luận</div>
                            </div>
                            <div className="col col-lg-3">
                                <div className={cx('lesson-actions')}>
                                    <button onClick={handleEdit} className={cx('btn', 'btn-edit')}>
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteModal(true)}
                                        className={cx('btn', 'btn-delete')}
                                    >
                                        Xóa
                                    </button>
                                </div>
                                {showDeleteModal && (
                                    <DeleteModal
                                        title="Xác nhận Xoá"
                                        onClose={hideDeleteModal}
                                        onConfirm={handleDelete}
                                    >
                                        {`Bạn chắc chắn muốn xoá bài học này? `}
                                    </DeleteModal>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MyLessonDetails;
