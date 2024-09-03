import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
// import { useState } from 'react';

import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

function SearchItem({ title, img, slug, closeSearchModal }) {
    const to = `/course/${slug}`;
    return (
        <Link to={to} className={cx('wrapper')} onClick={closeSearchModal}>
            <div className={cx('image')}>
                <img src={img} alt="html-css" />
            </div>
            <span>{title}</span>
        </Link>
    );
}

export default SearchItem;
