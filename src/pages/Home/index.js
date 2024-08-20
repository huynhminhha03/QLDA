import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slider from '~/components/Layout/components/Slider';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Slider />
        </div>
    );
}

export default Home;
