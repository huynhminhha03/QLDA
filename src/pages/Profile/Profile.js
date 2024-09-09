import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { ParticipationIcon } from '~/components/Icons';
import { authAPI, userApis } from '~/utils/api';
import { calculateTimeSinceCreation } from '~/utils/calculateTimeSinceCreation';
import { Link, useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Profile() {
    const { slug } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm trạng thái loading
    const [registerCourse, setRegisterCourses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await authAPI().get(userApis.getUserBySlug(slug));
                setUserData(response.data);
                console.log('user-data ', response.data);
            } catch (error) {
                console.log(error);
                navigate('/404');

            } finally {
                setLoading(false); 
            }
        };
        fetchUserData();

        const handleFetchRegisterCourses = async () => {
            try {
                const response = await authAPI().get(userApis.getRegisterCourses);
                setRegisterCourses(response.data.courses);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        handleFetchRegisterCourses();
    }, [slug, navigate]);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    

    return (
        <div className={cx('page-wrapper')}>
            <div className={cx('banner')}>
                <div className={cx('user')}>
                    <div className={cx('user-avatar')}>
                        <div className={cx('avatar')}>
                            <img
                                src={userData.avatar || 'https://fullstack.edu.vn/assets/fallback-avatar-BFb1fhaR.jpg'}
                                alt={userData.name || 'Avatar'}
                            />
                        </div>
                    </div>
                    <div className={cx('user-name')}>
                        <span>{userData.name}</span>
                    </div>
                </div>
            </div>

            <div className={cx('container')}>
                <div className={cx('index-module_l-5', 'index-module_col')}>
                    <div className={cx('content-left')}>
                        <div className={cx('wrapper')}>
                            <h4 className={cx('title')}>Giới thiệu</h4>
                            <div className={cx('bio')}>
                                <span>{userData.desc}</span>
                            </div>
                            <div className={cx('participation')}>
                                <ParticipationIcon className={cx('participation-icon')} />
                                <span>
                                    Thành viên của <strong>Yuko - Học lập trình để đi làm</strong> từ {calculateTimeSinceCreation(userData.createdAt)}
                                </span>
                            </div>
                        </div>
                        <div className={cx('wrapper')}>
                            <h4 className={cx('title')}>Hoạt động gần đây</h4>
                            <div className={cx('no-result')}>Chưa có hoạt động gần đây</div>
                        </div>
                    </div>
                </div>

                <div className={cx('index-module_l-7', 'index-module_col')}>
                    <div className={cx('wrapper')}>
                        <h4 className={cx('title')}>Các khóa học đã tham gia</h4>

                        <div>
                            {registerCourse && registerCourse.map((course) => (
                                <div className={cx('inner')} key={course?.course_id?._id}>
                                    <Link className={cx('thumb')} to={`/course/${course?.course_id?._id}`}>
                                        <img
                                            src={course?.course_id?.image_url}
                                            className={cx('thumb-img')}
                                            alt={course?.course_id?.title}
                                        />
                                    </Link>

                                    <div className={cx('info')}>
                                        <h3 className={cx('info-title')}>
                                            <Link to={`/course/${course?.course_id?._id}`}>{course?.course_id?.title}</Link>
                                        </h3>
                                        <p className={cx('info-desc')}>{course?.course_id?.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
