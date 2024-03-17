import { Box, Center } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const ClockComponents = () => {
    const [vietnameseDate, setVietnameseDate] = useState('');

    function getVietnameseDate() {
        const months = [
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
        ];
        const days = [
            "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
        ];

        const date = new Date();
        const seconds = addLeadingZero(date.getSeconds());
        const minutes = addLeadingZero(date.getMinutes());
        const hours = addLeadingZero(date.getHours());

        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${hours}:${minutes}:${seconds} - ${dayOfWeek}, Ngày ${dayOfMonth} ${month} Năm ${year}`;
    }

    function addLeadingZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setVietnameseDate(getVietnameseDate());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box fontSize={24}>
            {vietnameseDate}
        </Box>
    )
}

export default ClockComponents