import classNames from 'classnames/bind';
import { useState, useContext, useRef, useEffect } from 'react';

import styles from './CommentSection.module.scss';
import Avatar from '~/components/Avatar';
import UserContext from '~/context/UserContext';
import { authAPI, userApis } from '~/utils/api';

const cx = classNames.bind(styles);

function CommentSection({
    setShowSection,
    content,
    commentId,
    type,
    replyMode,
    type_id,
    fetchParentComments,
    fetchChildrenComments,
    parentId,
}) {
    const [commentText, setCommentText] = useState(content || '');
    const { user } = useContext(UserContext);

    const inputRef = useRef();

    useEffect(() => {
        if (content) {
            inputRef.current.focus();
        }
    }, [content]);

    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleAddComment = async () => {
        try {
            if (content && parentId) {
                const response = await authAPI().patch(userApis.updateComment(commentId), {
                    content: commentText,
                });
                console.log(response.data);
                setShowSection(false);
                fetchChildrenComments(parentId);
            } else if (parentId) {
                await authAPI().post(userApis.createReplyComment(type, type_id), {
                    content: commentText,
                    parent_id: parentId,
                });
                setShowSection(false);
                fetchChildrenComments(parentId);
            } else if (content) {
                const response = await authAPI().patch(userApis.updateComment(commentId), {
                    content: commentText,
                });
                console.log(response.data);
                fetchParentComments();
                setShowSection(false);
            } else {
                await authAPI().post(userApis.createParentComment(type, type_id), {
                    content: commentText,
                });
                fetchParentComments();
                setCommentText('');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && commentText.trim()) {
            handleAddComment();
        }
    };

    return (
        <div className={cx('wrapper', { replyMode })}>
            <Avatar fontsize="4.5px" alt={user.name} src={user.avatar} />

            <div className={cx('comment-section')}>
                <div className={cx('new-comment')}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={commentText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập bình luận mới của bạn"
                    />
                    <button onClick={handleAddComment} disabled={!commentText.trim()}>
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommentSection;
