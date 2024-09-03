import classNames from 'classnames/bind';

import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ src, alt, fontsize }) {
    return (
        <div className={cx('wrapper')} style={{ '--font-size': fontsize }}>
            <img
                className={cx('img')}
                src={src || 'https://fullstack.edu.vn/assets/fallback-avatar-BFb1fhaR.jpg'}
                alt={alt}
            />
        </div>
    );
}

export default Avatar;
