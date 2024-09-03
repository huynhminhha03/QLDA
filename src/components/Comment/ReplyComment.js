import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Comment.module.scss';
import Avatar from '~/components/Avatar';
import { Link } from 'react-router-dom';
import { LikeIcon, OptionIcon } from '../Icons';
import CommentSection from '../CommentSection';
import { calculateTimeSinceCreation } from '~/utils/calculateTimeSinceCreation';
import config from '~/config';
import api, { authAPI, userApis } from '~/utils/api';
import UserContext from '~/context/UserContext';
import Comment from './Comment';

const cx = classNames.bind(styles);

function ReplyComment({ type, fetchParentComments, data, type_id }) {
    const [showOptions, setShowOptions] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [showRepliesComment, setShowRepliesComment] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [numberRepliesComment, setNumberRepliesComment] = useState(0);
    const [activedLike, setActivedLike] = useState(false);
    const [childrenComments, setChildrenComments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem('token');

    const { user } = useContext(UserContext);

    console.log('data: ', data);

    const likeComment = async () => {
        try {
            await authAPI().post(userApis.likeComment(data._id));
            const newLikeCount = activedLike ? likeCount - 1 : likeCount + 1;
            setLikeCount(newLikeCount);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLikeComment = () => {
        setActivedLike(!activedLike);
        likeComment();
    };

    const handleReply = () => {
        setShowReplies(true);
    };

    useEffect(() => {
        if (token) {
            const fetchHasLiked = async () => {
                try {
                    const response = await authAPI().get(userApis.checkLikedComment(data._id));
                    setActivedLike(response.data.hasLiked);
                    console.log('checkLikedComment ', response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchHasLiked();
        }
    }, [data._id, token]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Thực hiện cả hai yêu cầu bất đồng bộ cùng lúc
                const [likesResponse, repliesResponse] = await Promise.all([
                    api.get(userApis.getLikeComments(data._id)),
                    api.get(userApis.getNumberRepliesComment(type, type_id, data._id)),
                ]);

                // Cập nhật state sau khi cả hai yêu cầu hoàn thành
                setLikeCount(likesResponse.data.count);
                setNumberRepliesComment(repliesResponse.data.count);

                // Log kết quả ra console
                console.log('Likes:', likesResponse.data);
                console.log('Number of Replies:', repliesResponse.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [type, data._id, type_id]);

    const fetchChildrenComments = async () => {
        setShowRepliesComment(true);

        const response = await api.get(userApis.getChildrenComments(type, type_id, data._id));
        console.log(response.data);
        setChildrenComments(response.data);
    };


    const hidePanelReplyComment = () => {
        setShowReplies(false);
    };

    const handleEdit = () => {
        setShowOptions(false);
        setIsEditing(true);
    };

    const handleDeleteComment = async () => {
        try {
            setShowOptions(false);
            await authAPI().delete(userApis.deleteComment(data._id));
            fetchParentComments();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Link to={config.routes.profile(data?.creator?.slug)} className={cx('user')}>
                        <Avatar fontsize="4.5px" alt={data?.creator?.name} src={data?.creator?.avatar} />
                        <span className={cx('info')}>
                            <span className={cx('username')}>{data?.creator?.name}</span>
                            <span className={cx('createAt')}>{calculateTimeSinceCreation(data?.createdAt)}</span>
                        </span>
                    </Link>
                </div>

                <div className={cx('body')}>
                    <div className={cx('content')}>
                        <p>{data?.content}</p>
                    </div>
                    <div className={cx('reaction-bar')}>
                        <div className={cx('left')}>
                            <span>
                                <button
                                    className={cx('interaction', { hasLiked: activedLike })}
                                    onClick={handleLikeComment}
                                >
                                    {!activedLike ? 'Thích' : 'Đã thích'}
                                </button>
                            </span>
                            <button className={cx('interaction')} onClick={handleReply}>
                                Phản hồi
                            </button>
                            {likeCount > 0 && (
                                <div className={cx('react-btn')}>
                                    <LikeIcon />
                                    <span>{likeCount}</span>
                                </div>
                            )}
                            {showReplies && (
                                <button className={cx('interaction')} onClick={hidePanelReplyComment}>
                                    Ẩn
                                </button>
                            )}
                        </div>

                        <div className={cx('left')}>
                            {isEditing && (
                                <span className={cx('cancel-btn')} onClick={() => setIsEditing(false)}>
                                    Huỷ
                                </span>
                            )}

                            {user._id === data.creator._id && (
                                <HeadlessTippy
                                    visible={showOptions}
                                    interactive
                                    placement="top-end"
                                    onClickOutside={() => setShowOptions(false)}
                                    render={(attrs) => (
                                        <ul tabIndex="-1" className={cx('option-list')} {...attrs}>
                                            <li>
                                                <button className={cx('option')} onClick={handleEdit}>
                                                    Chỉnh sửa
                                                </button>
                                            </li>
                                            <li>
                                                <button className={cx('option')} onClick={handleDeleteComment}>
                                                    Xoá bình luận
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                >
                                    <button
                                        className={cx('interaction')}
                                        onClick={() => {
                                            setShowOptions(!showOptions);
                                        }}
                                    >
                                        <OptionIcon className={cx('option-icon')} />
                                    </button>
                                </HeadlessTippy>
                            )}
                        </div>
                    </div>
                    {isEditing && (
                        <CommentSection
                            setShowSection={setIsEditing}
                            parentId={data.parent_id}
                            fetchChildrenComments={fetchChildrenComments}
                            fetchParentComments={fetchParentComments}
                            content={data.content}
                            commentId={data._id}
                        />
                    )}
                    {showReplies && (
                        <div className={cx('replies')}>
                            <CommentSection
                                type={type}
                                type_id={type_id}
                                setShowSection={setShowReplies}
                                parentId={data._id}
                                fetchChildrenComments={fetchChildrenComments}
                                replyMode
                            />
                        </div>
                    )}

                    {numberRepliesComment > 0 && !showRepliesComment && (
                        <div className={cx('view-more')} onClick={fetchChildrenComments}>
                            Xem {numberRepliesComment} câu trả lời
                        </div>
                    )}

                    <div className={cx('view-replies')}>
                        {showRepliesComment && (
                            <div className={cx('replies-content')}>
                                {childrenComments?.length > 0 &&
                                    childrenComments.map((comment, index) => {
                                        return (
                                            <div key={index}>
                                                <Comment type={type} type_id={type_id} data={comment} />
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyComment;
