import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie';


function PiechartDoneCategoriesToday() {
    const [works, setWork] = useState([]);

    useEffect(() => {
        const fetchWork = async () => {
        try {
            const result = await axios({
                method: "get",
                url: "/v1/data/mypage/done-works/today",
            })
            setWork(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchWork();
  }, []);

    const handle = {
        padClick: (data) => {
            console.log(data);
        },

        legendClick: (data) => {
            console.log(data);
        },
    };

    const totalMinutes = works.reduce((acc, work) => acc + work.totalTime, 0);

    const sumByCateName = works.reduce((acc, work) => {
        if (!acc[work.cateName]) {
          acc[work.cateName] = { id: work.cateName, minutes: 0, value: 0 };
        }
        acc[work.cateName].minutes += work.totalTime;
        acc[work.cateName].value = Math.round((acc[work.cateName].minutes / totalMinutes) * 100);
        return acc;
      }, {});

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '800px', height: '500px', margin: '0 auto' }}>
            <ResponsivePie
                
                /**
                 * chart에 사용될 데이터
                 */

                data = {Object.values(sumByCateName)}

                valueFormat={value =>
                    `${Number(value)}%`
                }
                /**
                 * chart margin
                 */
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                /**
                 * chart 중간 빈공간 반지름
                 */
                innerRadius={0.5}
                /**
                 * pad 간격
                 */
                padAngle={0.7}
                /**
                 * pad radius 설정 (pad별 간격이 있을 시 보임)
                 */
                cornerRadius={3}
                /** */
                activeOuterRadiusOffset={8}
                /**
                 * chart 색상
                 */
                //colors={['red', 'aqua', 'orange']} // 커스터하여 사용할 때
                colors={{ scheme: 'pastel2' }} // nivo에서 제공해주는 색상 조합 사용할 때
                /**
                 * pad border 두께 설정
                 */
                borderWidth={1}
                /** border color */
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                /**
                 * link label skip할 기준 각도
                 */
                arcLinkLabelsSkipAngle={10}
                /**
                 * link label 색상
                 */
                arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
                /**
                 * link label 연결되는 선 두께
                 */
                arcLinkLabelsThickness={2}
                /**
                 * link label 연결되는 선 색상
                 */
                arcLinkLabelsColor="white" // pad 색상에 따라감
                /**
                 * label (pad에 표현되는 글씨) skip할 기준 각도
                 */
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                theme={{
                    /**
                     * label style (pad에 표현되는 글씨)
                     */
                    labels: {
                        text: {
                            fontSize: 14,
                            fill: '#000000',
                        },
                    },
                }}
                /**
                 * pad 클릭 이벤트
                 */
                onClick={handle.padClick}
                /**
                 * legend 설정 (default로 하단에 있는 색상별 key 표시)
                 */
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 150,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default PiechartDoneCategoriesToday;