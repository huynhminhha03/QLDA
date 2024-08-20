import classNames from 'classnames/bind';
// import Tippy from '@tippyjs/react';

import styles from './Header.module.scss';
import images from '~/assets/images';
import { SearchIcon, BellIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Header() {
    // const currentUser = true;

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('navbar')}>
                    <a href="/">
                        <img className={cx('logo')} src={images.logo} alt="Yuko_logo" />
                    </a>
                    <h4 className={cx('logo-heading')}>Học cùng Yuko</h4>
                </div>
                <div className={cx('search')}>
                    
                    <input
                        className={cx('search-input')}
                        type="text"
                        placeholder="Tìm kiếm khoá học, bài viết, video,..."
                        spellCheck="false"
                    />
                    <button className={cx('search-btn')}>
                        <SearchIcon className={cx('search-icon')} />
                    </button>
                </div>
                <div className={cx('actions')}>
                    <button className={cx('my-courses')}>Khoá học của tôi</button>
                    <div className={cx('notification-btn')}>
                        <BellIcon className={cx('notification-icon')} />
                    </div>
                    <div className={cx('avatar')}>
                        <img
                            className={cx('avatar-img')}
                            src="https://www.gravatar.com/avatar/c10970ad0deaaf378db943894a69b1ba.jpg?s=80&d=mp&r=g"
                            alt="Huynh Minh Ha"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
