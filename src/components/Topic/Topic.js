import classNames from 'classnames/bind';
import styles from './Topic.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const topics = [
    {
        label: 'Front-end / Mobile apps',
        slug: 'front-end-mobile-apps',
        desc: 'Các bài viết về Front-end và phát triển ứng dụng di động.',
    },
    { label: 'Back-end / Devops', slug: 'back-end-devops', desc: 'Các bài viết về Back-end và DevOps.' },
    { label: 'UI / UX / Design', slug: 'ui-ux-design', desc: 'Các bài viết về UI, UX và thiết kế.' },
    { label: 'Others', slug: 'others', desc: 'Các bài viết khác.' },
];

function Topic({ title = 'Xem các bài viết theo chủ đề', setTopic, isTopicActivated }) {
    const [selectedTopic, setSelectedTopic] = useState(null);

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic.label);
        setTopic(topic);
    };

    return (
        <div className={cx('wrapper')}>
            <h3>{title}</h3>
            <ul className={cx('topics')}>
                {topics.map((topic, index) => (
                    <li key={index}>
                        <span
                            className={cx({
                                actived: selectedTopic === topic.label || isTopicActivated === topic.slug,
                            })}
                            onClick={() => handleTopicClick(topic)}
                        >
                            {topic.label}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Topic;
