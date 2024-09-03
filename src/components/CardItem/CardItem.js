import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CardItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function CardItem(data) {
    const to = data.isMyCourse ? `/my-course/${data.id}`: `/course/${data.id}`;

    return (
        <div className={cx('wrapper')}>
            <Link to={to} className={cx('link')}>
                <img className={cx('thumb')} src={data.src} alt={data.title} />
            </Link>
            <div className={cx('content')}>
                <h3 className={cx('title')}>
                    <Link to={to}>{data.title}</Link>
                </h3>
                <p className={cx('desc')}>{data.desc}</p>
                {!data.isMyCourse && (
                    <>
                        <div className={cx('price')}>
                            <span className={cx('main-price')}>{!data.isFree ? `${data.price}đ` : 'Miễn phí'}</span>
                        </div>

                        <div className={cx('more-info')}>
                            <div className={cx('info-item')} title={`Teacher: ${data.name}`}>
                                <div className={cx('avatar')}>
                                    <img src={data.avatar || images.defaultAvatar} alt={data.name} />
                                </div>
                                <span>{data.name}</span>
                            </div>
                        </div>
                    </> 
                )}
            </div>
        </div>
    );
}

export default CardItem;
