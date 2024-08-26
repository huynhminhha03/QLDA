import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import styles from './Login.module.scss';
import InputWrapper from '~/components/InputWrapper';
import { handleInputBlur } from '~/utils/handleInputBlur';
import { ErrorIcon } from '~/components/Icons';
import RememberLogin from '~/components/RememberLogin';
import api, { userApis } from '~/utils/api';
import Spinner from '~/components/Spinner';


const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState({ value: 'hadep7a@gmail.com', error: '' });
    const [password, setPassword] = useState({ value: 'minhha2k3', error: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const usernameInputRef = useRef(null);

    const handleChange = (setter) => (e) => {
        setter({ value: e.target.value, error: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await api.post(userApis.login, {
                email: username.value,
                password: password.value,
            });

            localStorage.setItem('token', response.data.token);
            window.location.reload();

        } catch (error) {
            // Xử lý lỗi ở đây
            setIsSubmitting(false); // Set isSubmitting to true
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                // Xử lý lỗi và hiển thị thông báo tương ứng
                setUsername((prevState) => ({
                    ...prevState,
                    error: message.includes('email') ? message : '',
                }));
                setPassword((prevState) => ({
                    ...prevState,
                    error: message.includes('password') ? message : '',
                }));
            } else {
                console.log('Unexpected error: ', error);
            }
        }
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <InputWrapper>
                <div className={cx('label-group')}>
                    <label className={cx('label')}>Tên đăng nhập</label>
                </div>
                <div className={cx('input-wrap', { invalid: username.error })}>
                    <input
                        autoFocus
                        placeholder="Email hoặc Username"
                        name="email"
                        value={username.value}
                        onChange={handleChange(setUsername)}
                        onBlur={() => handleInputBlur(username.value, setUsername)}
                        ref={usernameInputRef}
                    />
                    {username.error && <ErrorIcon className={cx('error-icon')} />}
                </div>
                {username.error && <div className={cx('error-message')}>{username.error}</div>}
            </InputWrapper>

            <InputWrapper>
                <div className={cx('input-wrap', { invalid: password.error })}>
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={password.value}
                        onChange={handleChange(setPassword)}
                        onBlur={() => handleInputBlur(password.value, setPassword)}
                    />
                </div>
                {password.error && <div className={cx('error-message')}>{password.error}</div>}
            </InputWrapper>

            <InputWrapper>
                <RememberLogin />
            </InputWrapper>

            <InputWrapper>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={!username.value || !password.value || isSubmitting}
                    className={cx('submit-btn', {
                        disabled: !username.value || !password.value,
                        rounded: true,
                        primary: true,
                        loading: isSubmitting,
                    })}
                >
                    {isSubmitting ? <Spinner /> : 'Đăng nhập'}
                </button>
            </InputWrapper>
        </form>
    );
}

export default Login;
