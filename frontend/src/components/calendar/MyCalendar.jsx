import Calendar from "react-calendar"
import styles from "./MyCalendar.css"
import React, { useState } from 'react';
import moment from 'moment';



export default function MyCalendar() {
  const [date, setDate] = useState(new Date())
  const [activeDate, setActiveDate] = useState(new Date())

  return (
    <div className="MyCalendar">
        <div className="calender-container">
        <Calendar className="react-calendar"
        onChange={setDate}
        value={date}
        // 일요일 먼저
        calendarType="Hebrew"

        // 연도 못보게
        minDetail="month"

        // 이전, 다음달 못보게
        maxDetail="month"
        showNeighboringMonth={false}

        // 달력에 '일' 빼는 코드
        formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
        
        tileClassName={({ date }) => {
        // 토요일: 파란색, 일요일: 빨간색
        if (moment(date).format("LLLL").split(",")[0] === "Saturday") {
          return "highlight-saturday"
        } else if (moment(date).format("LLLL").split(",")[0] === "Sunday") {
          return "highlight-sunday"
        }}}
      />
        <div className="select-date">
            {moment(date).format("YYYY년 MM월 DD일")}
        </div>
        </div>
    </div>
  );
}
