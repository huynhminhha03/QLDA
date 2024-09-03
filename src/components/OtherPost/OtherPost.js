import classNames from 'classnames/bind';
import styles from './OtherPost.module.scss';
const cx = classNames.bind(styles);

function OtherPost({ posts, setBlogId }) {

    const handleClick = (id) => {
        setBlogId(id);
        window.history.pushState(null, '', `/blog/${id}`);
    }
    console.log(posts);
    return (
        <aside className={cx('wrapper')}>
            <h3 className={cx('heading')}>Bài đăng cùng tác giả</h3>
            {posts.length > 0 ? (
                <ul className={cx('list')}>
                    {posts.map((post, index) => {
                        return (
                            <li key={index} onClick={() => handleClick(post._id)}>
                                - {post.title}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className={cx('no-result')}>Tác giả chưa có bài đăng nào khác.</p>
            )}
        </aside>
    );
}

export default OtherPost;
