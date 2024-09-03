import classNames from 'classnames/bind';
import styles from './AddCard.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddCard({ to }) {
    return (
        <Link to={to} className={cx('add-btn')}>
            <div className={cx('add-icon')}>+</div>
        </Link>
    );
}

export default AddCard;
