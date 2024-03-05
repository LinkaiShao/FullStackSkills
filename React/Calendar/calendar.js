import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
    // Update the selected date to the first day of the selected month
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ marginRight: '10px' }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          showMonthYearPicker={false}
          selectsRange={true}
          startDate={selectedDate}
          endDate={selectedDate}
        />
      </div>
      <div>
        <DatePicker
          selected={selectedMonth}
          onChange={handleMonthChange}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
        />
      </div>
    </div>
  );
};

export default Calendar;
