import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './CreateBlog.module.scss';
import classNames from 'classnames/bind';
import Topic from '~/components/Topic';
import { useNavigate } from 'react-router-dom';
import { authAPI, userApis } from '~/utils/api';
import Spinner from '~/components/Spinner';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams(); 

    const isButtonDisabled = !title.trim() || !content.replace(/<\/?[^>]+(>|$)/g, '').trim();

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'font',
        'list',
        'bullet',
        'bold',
        'italic',
        'underline',
        'color',
        'background',
        'align',
        'link',
        'image',
    ];

    useEffect(() => {
        document.title = title || 'Tạo bài viết'; // Set a default title if `title` is empty
    }, [title]);

    useEffect(() => {
        const fetchBlogData = async () => {
            if (id) {
                try {
                    const response = await authAPI().get(userApis.getMyBlogById(id));
                    const blogData = response.data;
                    console.log(blogData);
                    setTitle(blogData.title);
                    setContent(blogData.content);
                    setTopic(blogData.topic_id.slug);
                } catch (error) {
                    console.error('Error fetching blog data:', error);
                }
            }
        };

        fetchBlogData();
    }, [id]);

    const handleSelectedTopic = ({ slug }) => {
        setTopic(slug);
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            if (id) {
                await authAPI().patch(userApis.updateMyBlog(id), {
                    title,
                    content,
                    desc,
                    topic_slug: topic,
                });
            } else {
                await authAPI().post(userApis.createBlog, {
                    title,
                    content,
                    desc,
                    topic_slug: topic,
                });
            }

            navigate('/me/posts');
            document.title = "Bài viết của tôi";
        } catch (error) {
            setIsSubmitting(false);
            console.error('Error creating or updating blog:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('text-editor-container')}>
                <input
                    type="text"
                    placeholder="Tiêu đề"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={cx('title-input')}
                />
                <input
                    type="text"
                    placeholder="Mô tả tin khi được hiển thị"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className={cx('desc-input')}
                />
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Nội dung viết ở đây"
                    className={cx('quill-editor')}
                />
            </div>
            <div className={cx('wrap-topic')}>
                <Topic setTopic={handleSelectedTopic} isTopicActivated={topic} title="Thêm chủ đề cho bài viết" />
            </div>

            <div className={cx('wrap-btn')}>
                <button
                    type="button"
                    className={cx('button', { disabled: isButtonDisabled })}
                    disabled={isButtonDisabled || isSubmitting}
                    onClick={handleSubmit}
                >
                    <span className={cx('title')}>
                        {isSubmitting ? <Spinner /> : id ? 'LƯU VÀ XUẤT BẢN' : 'XUẤT BẢN'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default CreateBlog;
