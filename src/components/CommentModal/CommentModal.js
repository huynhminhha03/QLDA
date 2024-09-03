import classNames from 'classnames/bind';
import { useState, useCallback, useEffect } from 'react';
import { CloseIcon, NoCommentIcon } from '~/components/Icons';
import CommentSection from '~/components/CommentSection';
import Comment from '~/components/Comment';
import api, { userApis } from '~/utils/api';

import styles from './CommentModal.module.scss';

const cx = classNames.bind(styles);

function CommentModal({ onClose, type, type_id, commentCount, setCommentCount }) {
    const [isClosing, setIsClosing] = useState(false);
    const [comments, setComments] = useState([]);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    const fetchParentComments = useCallback(async () => {
        try {
            const response = await api.get(userApis.getParentComments(type, type_id));
            setComments(response.data.parent_comments);
            setCommentCount(response.data.total_comments);
            console.log(response.data);
        } catch (error) {
            console.log('Error fetching comments:', error);
        }
    }, [type, type_id, setCommentCount]);

    useEffect(() => {
        fetchParentComments();
    }, [fetchParentComments]);

    

    return (
        <div className={cx('wrapper', { isClosing })}>
            <div className={cx('overlay')} onClick={handleClose}></div>
            <div className={cx('container', { isClosing })}>
                <div className={cx('close-btn')} onClick={handleClose}>
                    <CloseIcon />
                </div>
                <div className={cx('comment-modal')}>
                    <div className={cx('body')}>
                        <div className="container" style={{ padding: '16px' }}>
                            <div className={cx('content')}>
                                <CommentSection
                                    type={type}
                                    type_id={type_id}
                                    fetchParentComments={fetchParentComments}
                                />
                            </div>
                            <div className={cx('show-comment')}>
                                <div className={cx('header')}>
                                    <h2 className={cx('title')}>{commentCount} bình luận</h2>
                                </div>

                                {comments && comments.length > 0 ? (
                                    comments.map((comment, index) => (
                                        <div key={index}>
                                            <Comment
                                                fetchParentComments={fetchParentComments}
                                                data={comment}
                                                type={type}
                                                type_id={type_id}
                                            />

                                        </div>
                                    ))
                                ) : (
                                    <div className={cx('comments')}>
                                        <NoCommentIcon />
                                        <p className={cx('message')}>Chưa có bình luận nào, hãy là người đầu tiên!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentModal;
