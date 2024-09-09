import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Settings() {
    const [currentSection, setCurrentSection] = useState('info');

    return (
        <div className={cx('wrapper')}>
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col col-lg-4">
                        <div className={cx('sidebar')}>
                            <Link to="/">
                                <img className={cx('logo')} src={images.logo} alt="Yuko" />
                            </Link>
                            <ul>
                                <li
                                    className={cx({ active: currentSection === 'info' })}
                                    onClick={() => setCurrentSection('info')}
                                >
                                    <span>Thông tin cá nhân</span>
                                </li>
                                <li
                                    className={cx({ active: currentSection === 'security' })}
                                    onClick={() => setCurrentSection('security')}
                                >
                                    <span>Mật khẩu và bảo mật</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col col-lg-8">
                        <div className={cx('content')}>
                            {currentSection === 'info' && (
                                <div className={cx('section')}>
                                    <h2>Thông tin cá nhân</h2>
                                    <div className={cx('info-group')}>
                                        <label>Họ và tên</label>
                                        <p>Hà Huỳnh Minh</p>
                                    </div>
                                    <div className={cx('info-group')}>
                                        <label>Tên người dùng</label>
                                        <p>huynh-minh-ha-1</p>
                                    </div>
                                    <div className={cx('info-group')}>
                                        <label>Giới thiệu</label>
                                        <p>Chưa cập nhật</p>
                                    </div>
                                    <div className={cx('info-group')}>
                                        <label>Ảnh đại diện</label>
                                        <p>Chưa cập nhật</p>
                                    </div>
                                </div>
                            )}
                            {currentSection === 'security' && (
                                <div className={cx('section')}>
                                    
                                    <h2>Mật khẩu và bảo mật</h2>
                                    <div className={cx('info-group')}>
                                        <label>Đổi mật khẩu</label>
                                        <p>Chưa đổi mật khẩu</p>
                                    </div>
                                   
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
