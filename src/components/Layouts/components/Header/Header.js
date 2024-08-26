import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { ModalTypeContext } from '~/context/ModalTypeContext';
import Search from '~/components/Layouts/components/Search';
import ProgressBar from '~/components/ProgressBar';
import BackButton from '~/components/BackButton';
import Avatar from '~/components/Avatar';
import styles from './Header.module.scss';
import Modal from '~/components/Modal';
import images from '~/assets/images';
import config from '~/config';
import { authAPI, userApis } from '~/utils/api';
import { BellIcon } from '~/components/Icons';
import UserContext from '~/context/UserContext';

const cx = classNames.bind(styles);

function Header({ transparent, hasBackBtn }) {
    const { user, setUser } = useContext(UserContext);

    const [userData, setUserData] = useState(null);

    const location = useLocation();
    const [modalType, setModalType] = useState(null);
    const [showMyCourses, setShowMyCourses] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    console.log(user);

    const openModal = (type) => {
        console.log(type);
        setModalType(type);
    };

    const closeModal = () => {
        setModalType(null);
    };

    useEffect(() => {
        if (token) {
            const fetchUserData = async () => {
                try {
                    const response = await authAPI().get(userApis.currentUser);
                    setUserData(response.data);
                    setUser(response.data);
                    console.log('user-data ', response.data);
                } catch (error) {
                    // Xử lý lỗi ở đây
                    console.log(error);
                }
            };
            fetchUserData();
        }
    }, [token, setUser]);

    return (
        <ModalTypeContext.Provider value={{ modalType, setModalType }}>
            <header className={cx('wrapper', { transparent })}>
                <div className={cx('inner')}>
                    <div className={cx('navbar')}>
                        <Link to={config.routes.home}>
                            <img className={cx('logo')} src={images.logo} alt="Yuko_logo" />
                        </Link>
                        {config.routes.registeredCourse === location.pathname || hasBackBtn ? (
                            <BackButton />
                        ) : (
                            <Link to={config.routes.home} className={cx('logo-heading')}>
                                <h4>Học cùng Yuko</h4>
                            </Link>
                        )}
                    </div>

                    {!transparent && <Search />}

                    <div className={cx('actions')}>
                        {!token ? (
                            <>
                                <button className={cx('register-btn')} onClick={() => openModal('register')}>
                                    Đăng ký
                                </button>
                                <button className={cx('login-btn')} onClick={() => openModal('login')}>
                                    Đăng nhập
                                </button>
                                {modalType && <Modal onClose={closeModal} />}
                            </>
                        ) : (
                            <>
                                {(!transparent || config.routes.createBlog === location.pathname) && (
                                    <HeadlessTippy
                                        visible={showMyCourses && config.routes.registeredCourse !== location.pathname}
                                        interactive
                                        placement="bottom-end"
                                        onClickOutside={() => setShowMyCourses(false)}
                                        render={(attrs) => (
                                            <PopperWrapper>
                                                <div
                                                    tabIndex="-1"
                                                    className={cx('wrap-popper', 'my-courses')}
                                                    {...attrs}
                                                >
                                                    <div className={cx('header')}>
                                                        <h6 className={cx('heading')}>Khoá học đã đăng ký</h6>
                                                        <Link
                                                            to={config.routes.registeredCourse}
                                                            className={cx('view-all-btn')}
                                                            onClick={() => setShowMyCourses(false)}
                                                        >
                                                            Xem tất cả
                                                        </Link>
                                                    </div>
                                                    <div className={cx('content')}>
                                                        <div className={cx('course-item')}>
                                                            <span>
                                                                <img
                                                                    className={cx('course-thumb')}
                                                                    src="https://files.fullstack.edu.vn/f8-prod/courses/6.png"
                                                                    alt="Node&ExpressJS"
                                                                />
                                                            </span>
                                                            <div className={cx('course-info')}>
                                                                <h3 className={cx('course-title')}>Node & ExpressJS</h3>
                                                                <p className={cx('last-completed')}>
                                                                    Học cách đây 21 ngày trước
                                                                </p>
                                                                <ProgressBar />
                                                            </div>
                                                        </div>

                                                        <div className={cx('course-item')}>
                                                            <span>
                                                                <img
                                                                    className={cx('course-thumb')}
                                                                    src="https://files.fullstack.edu.vn/f8-prod/courses/6.png"
                                                                    alt="Node&ExpressJS"
                                                                />
                                                            </span>
                                                            <div className={cx('course-info')}>
                                                                <h3 className={cx('course-title')}>Node & ExpressJS</h3>
                                                                <p className={cx('last-completed')}>
                                                                    Học cách đây 21 ngày trước
                                                                </p>
                                                                <ProgressBar />
                                                            </div>
                                                        </div>

                                                        <div className={cx('course-item')}>
                                                            <span>
                                                                <img
                                                                    className={cx('course-thumb')}
                                                                    src="https://files.fullstack.edu.vn/f8-prod/courses/6.png"
                                                                    alt="Node&ExpressJS"
                                                                />
                                                            </span>
                                                            <div className={cx('course-info')}>
                                                                <h3 className={cx('course-title')}>Node & ExpressJS</h3>
                                                                <p className={cx('last-completed')}>
                                                                    Học cách đây 21 ngày trước
                                                                </p>
                                                                <ProgressBar />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopperWrapper>
                                        )}
                                    >
                                        <button
                                            className={cx('my-course-btn', {
                                                actived: config.routes.registeredCourse === location.pathname,
                                            })}
                                            onClick={() => setShowMyCourses(!showMyCourses)}
                                        >
                                            Khoá học đã đăng ký
                                        </button>
                                    </HeadlessTippy>
                                )}

                                {/* Ẩn thông báo */}
                                <HeadlessTippy
                                    visible={showNotify}
                                    interactive
                                    placement="bottom-end"
                                    onClickOutside={() => setShowNotify(false)}
                                    render={(attrs) => (
                                        <PopperWrapper>
                                            <div tabIndex="-1" className={cx('wrap-popper', 'notify')} {...attrs}>
                                                <div className={cx('header')}>
                                                    <h6 className={cx('heading')}>Thông báo</h6>
                                                    <span className={cx('view-all-btn')}>Đánh dấu đã đọc</span>
                                                </div>
                                                <div className={cx('content')}>
                                                    <div className={cx('notify-item')}>
                                                        <div className={cx('avatar')}>
                                                            <Avatar
                                                                fontsize="4.7px"
                                                                alt="Huynh Minh Ha"
                                                                src="https://www.gravatar.com/avatar/c10970ad0deaaf378db943894a69b1ba.jpg?s=80&d=mp&r=g"
                                                            />
                                                        </div>

                                                        <div className={cx('message-wrapper')}>
                                                            <div>
                                                                Bài học{' '}
                                                                <strong>Tham gia cộng đồng F8 trên Discord</strong> mới
                                                                được thêm vào.
                                                            </div>
                                                            <div className={cx('created-time')}>4 tháng trước</div>
                                                        </div>
                                                    </div>

                                                    <div className={cx('notify-item')}>
                                                        <div className={cx('avatar')}>
                                                            <Avatar
                                                                fontsize="4.7px"
                                                                alt={userData?.name}
                                                                src={userData?.avatar}
                                                            />
                                                        </div>

                                                        <div className={cx('message-wrapper')}>
                                                            <div>
                                                                Bài học{' '}
                                                                <strong>Tham gia cộng đồng F8 trên Discord</strong> mới
                                                                được thêm vào.
                                                            </div>
                                                            <div className={cx('created-time')}>4 tháng trước</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </PopperWrapper>
                                    )}
                                >
                                    <div className={cx('notification-btn')} onClick={() => setShowNotify(!showNotify)}>
                                        <BellIcon className={cx('notification-icon')} />
                                    </div>
                                </HeadlessTippy>

                                <HeadlessTippy
                                    visible={showProfile}
                                    interactive
                                    placement="bottom-end"
                                    onClickOutside={() => setShowProfile(false)}
                                    render={(attrs) => (
                                        <PopperWrapper>
                                            <div tabIndex="-1" className={cx('wrap-popper', 'profile')} {...attrs}>
                                                <Link to={config.routes.profile(userData?.slug)} className={cx('user')}>
                                                    <div className={cx('avatar-profile')}>
                                                        <Avatar
                                                            fontsize="5.6px"
                                                            alt={userData?.name}
                                                            src={userData?.avatar}
                                                        />
                                                    </div>
                                                    <div className={cx('profile-info')}>
                                                        <span className={cx('profile-name')}>{userData?.name}</span>
                                                        <div className={cx('username')}>{userData?.slug}</div>
                                                    </div>
                                                </Link>
                                                <hr />

                                                <ul className={cx('list')}>
                                                    <li>
                                                        <Link
                                                            to={config.routes.profile(userData?.slug)}
                                                            className={cx('item')}
                                                            onClick={() => setShowProfile(false)}
                                                        >
                                                            Trang cá nhân
                                                        </Link>
                                                    </li>
                                                </ul>

                                                <hr />

                                                <ul className={cx('list')}>
                                                    <li>
                                                    <Link
                                                            to={config.routes.myCourse}
                                                            className={cx('item')}
                                                            onClick={() => setShowProfile(false)}
                                                        >
                                                            Khoá học của tôi
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <hr />

                                                <ul className={cx('list')}>
                                                    <li>
                                                        <Link
                                                            className={cx('item')}
                                                            to={config.routes.createBlog}
                                                            onClick={() => setShowProfile(false)}
                                                        >
                                                            Viết blog
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            className={cx('item')}
                                                            to={config.routes.myBlog}
                                                            onClick={() => setShowProfile(false)}
                                                        >
                                                            Bài viết của tôi
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            className={cx('item')}
                                                            to={config.routes.bookmark}
                                                            onClick={() => setShowProfile(false)}
                                                        >
                                                            Bài viết đã lưu
                                                        </Link>
                                                    </li>
                                                </ul>

                                                <hr />

                                                <ul className={cx('list')}>
                                                    <li>
                                                        <span className={cx('item')}>Cài đặt</span>
                                                    </li>
                                                    <li>
                                                        <span className={cx('item')} onClick={handleLogout}>
                                                            Đăng xuất
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </PopperWrapper>
                                    )}
                                >
                                    <div className={cx('avatar-wrapper')} onClick={() => setShowProfile(!showProfile)}>
                                        <Avatar fontsize="3.2px" alt={userData?.name} src={userData?.avatar} />
                                    </div>
                                </HeadlessTippy>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </ModalTypeContext.Provider>
    );
}

export default Header;
