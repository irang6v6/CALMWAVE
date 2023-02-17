import React, { useState } from 'react';
import PiechartDoneCategoriesToday from './PiechartDoneCategoriesToday';
import PiechartDoneCategoriesDateRange from './PiechartDoneCategoriesDateRange';
import Dropdown from './Dropdown';

const options = ['오늘', '이번주', '이번달'];

function DoneCategoriesVisualization({ className }) {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div>
                <Dropdown options={options} onOptionChange={handleOptionChange} />
                    <div className="piechart">
                        {/*오늘(오늘 새벽 4시~내일 새벽 4시) 기준 끝낸 카테고리 파이차트*/}
                        {selectedOption === '오늘' && <PiechartDoneCategoriesToday />}
                        {/*이번주(일요일 새벽 4시 ~ 다음주 일요일 새벽 4시) 기준 끝낸 카테고리 파이차트*/}
                        {selectedOption === '이번주' && <PiechartDoneCategoriesDateRange selected="이번주" />}
                        {/*이번달(이번달 1일 새벽 4시 ~ 다음달 1일 새벽 4시) 기준 끝낸 카테고리 파이차트*/}
                        {selectedOption === '이번달' && <PiechartDoneCategoriesDateRange selected="이번달" />}
                </div>
            </div>
        </>
    );
}

export default DoneCategoriesVisualization;