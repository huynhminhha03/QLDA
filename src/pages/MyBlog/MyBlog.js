import classNames from 'classnames/bind';
import styles from './MyBlog.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import MainContent from '~/components/MainContent';
import { OptionIcon } from '~/components/Icons';
import { authAPI, userApis } from '~/utils/api';
import { calculateTimeSinceCreation } from '~/utils/calculateTimeSinceCreation';
import Modal from '~/components/DeleteModal'; // Import Modal component
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MyBlog() {
    const [showOptions, setShowOptions] = useState(null); // Track which blog's options are shown
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [selectedBlog, setSelectedBlog] = useState(null); // State to track the selected blog for deletion

    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            const response = await authAPI().get(userApis.getMyBlogs);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = (blog) => {
        setSelectedBlog(blog); // Store the selected blog for deletion
        setIsModalOpen(true); // Open the modal
    };

    const handleEdit = (type_id) => {
        navigate(`/posts/${type_id}/edit`);
    };
    const confirmDelete = () => {
        // Handle the delete logic here
        console.log('Deleting blog:', selectedBlog);
        setIsModalOpen(false);
    };

    return (
        <MainContent title={'Bài viết của tôi'}>
            <div className={cx('main-container')}>
                <div className="row">
                    <div className="col col-lg-10">
                        <div className={cx('types')}>
                            <ul className={cx('tabs')}>
                                <li>
                                    <span
                                        className={cx("actived")}
                                    >
                                        Đã xuất bản ({data?.blogCount})
                                    </span>
                                </li>
                            </ul>
                            <div className={cx('divider')}></div>
                        </div>

                        {data?.blogs &&
                            data?.blogs.length > 0 &&
                            data?.blogs.map((blog) => (
                                <div key={blog?._id} className={cx('wrapper')}>
                                    <h3 title={blog?.title}>
                                        <Link to={`/blogs/${blog?._id}`}>{blog?.title}</Link>
                                    </h3>
                                    <div className={cx('author')}>
                                        <Link to={`/blogs/${blog?._id}`}>
                                            Chỉnh sửa {calculateTimeSinceCreation(blog?.updatedAt)}
                                        </Link>
                                        <span className={cx('dot')}>·</span>
                                        <span>
                                            Tác giả <strong>{blog?.creator.name}</strong>
                                        </span>
                                    </div>
                                    <HeadlessTippy
                                        visible={showOptions === blog?._id} // Check if the current blog's options should be shown
                                        interactive
                                        placement="bottom-end"
                                        onClickOutside={() => setShowOptions(null)} // Close options when clicking outside
                                        render={(attrs) => (
                                            <div tabIndex="-1" className={cx('wrap-popper', 'options')} {...attrs}>
                                                <span onClick={() => handleEdit(blog?._id)}>Chỉnh sửa</span>
                                                <span onClick={() => handleDelete(blog?._id)}>Xóa</span>{' '}
                                                {/* Open modal on delete */}
                                            </div>
                                        )}
                                    >
                                        <div
                                            className={cx('more')}
                                            aria-expanded={showOptions === blog?._id}
                                            onClick={() => setShowOptions(showOptions === blog?._id ? null : blog?._id)} // Toggle options visibility
                                        >
                                            <OptionIcon />
                                        </div>
                                    </HeadlessTippy>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Modal for confirming deletion */}
            {isModalOpen && (
                <Modal title="Xác nhận Xóa" onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete}>
                    Bạn có chắc chắn muốn xóa bài viết này không?
                </Modal>
            )}
        </MainContent>
    );
}

export default MyBlog;
