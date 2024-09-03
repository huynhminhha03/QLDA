import classNames from 'classnames/bind';

import styles from './MainContent.module.scss';

const cx = classNames.bind(styles);

function MainContent({ title, desc, isEmpty, children, noResults }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-top')}>
                <h1 className={cx('heading')}>{title}</h1>
                <div className={cx('heading-desc')}>
                    <p>{isEmpty ? noResults : desc}</p>
                </div>
                {children}
            </div>
        </div>
    );
}

export default MainContent;
