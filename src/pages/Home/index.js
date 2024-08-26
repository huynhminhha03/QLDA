import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import HomeSlider from '~/components/Layouts/components/Slider';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <HomeSlider />
        </div>
    );
}

export default Home;
