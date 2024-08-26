import { useEffect, useState } from 'react';

import MainContent from '~/components/MainContent';
import CardItem from '~/components/CardItem';
import AddCard from '~/components/AddCard';
import config from '~/config';
import { authAPI, userApis } from '~/utils/api';

function MyCourse() {
    const [myCourses, setMyCourses] = useState([]);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const response = await authAPI().get(userApis.getMyCourses);
                setMyCourses(response.data);
                console.log('myCourses ', response.data);
            } catch (error) {
                // Xử lý lỗi ở đây
                console.log(error);
            }
        };
        fetchMyCourses();
    }, []);

    return (
        <MainContent
            title={'Khóa học của tôi'}
            isEmpty={!!myCourses.length <= 0}
            desc={'Danh sách các khoá học của bạn!'}
            noResults={'Chưa có khoá học nào. Tạo mới ngay!'}
        >
            <div>
                <div className="container-fluid">
                    <div className="row">
                        {myCourses.length > 0 &&
                            myCourses.map((course, index) => (
                                <div key={index} className="col mt-5 col-lg-3">
                                    <CardItem
                                        slug={course.slug}
                                        src={course?.image_url}
                                        title={course?.title}
                                        desc={course?.desc}
                                        isMyCourse
                                    />
                                </div>
                            ))}
                        <div className="col mt-5 col-lg-3">
                            <AddCard to={config.routes.createCourse} />
                        </div>
                    </div>
                </div>
            </div>
        </MainContent>
    );
}

export default MyCourse;
