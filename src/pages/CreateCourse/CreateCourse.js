import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateCourse.module.scss';
import { authAPI, userApis } from '~/utils/api';
import Spinner from '~/components/Spinner';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function CreateCourse() {
    const [formData, setFormData] = useState({
        title: 'Node & ExpressJS',
        desc: 'Learn Node & ExpressJS with me!!!',
        start_time: '',
        price: '',
        isFree: false,
    });
    const [image, setImage] = useState(null); // Thay đổi tên biến để lưu tệp hình ảnh
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            console.log(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSubmit = new FormData();
        dataToSubmit.append('title', formData.title);
        dataToSubmit.append('desc', formData.desc);
        dataToSubmit.append('start_time', formData.start_time);
        dataToSubmit.append('price', formData.isFree ? 0 : formData.price);
        dataToSubmit.append('isFree', formData.isFree);
        dataToSubmit.append('image', image);

        try {
            setIsSubmitting(true);

            const response = await authAPI().post(userApis.createCourse, dataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setIsSubmitting(false);

            navigate('/my-course');
        } catch (error) {
            setIsSubmitting(false);
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form className={cx('course-form')} onSubmit={handleSubmit}>
            <h1 className={cx('heading')}>Tạo khoá học mới</h1>
            <div className={cx('form-group')}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter course title"
                    required
                />
            </div>

            <div className={cx('form-group')}>
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required />
                {imagePreview && (
                    <img src={imagePreview} alt="Preview of the selected file" className={cx('image-preview')} />
                )}
            </div>

            <div className={cx('form-group')}>
                <label htmlFor="desc">Description</label>
                <textarea
                    id="desc"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                    placeholder="Enter course description"
                ></textarea>
            </div>

            <div className={cx('form-group')}>
                <label htmlFor="start_time">Start Time</label>
                <input
                    type="date"
                    id="start_time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={cx('form-group', { hidden: formData.isFree })}>
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter course price"
                    required={!formData.isFree}
                />
            </div>

            <div className={cx('form-group', 'checkbox-group')}>
                <label htmlFor="isFree" className={cx('checkbox-label')}>
                    <input
                        type="checkbox"
                        id="isFree"
                        name="isFree"
                        checked={formData.isFree}
                        onChange={handleChange}
                    />
                    <span className={cx('checkbox-text')}>Is Free</span>
                </label>
            </div>

            <button type="submit" className={cx('submit-button')} disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : 'Submit'}
            </button>
        </form>
    );
}

export default CreateCourse;
