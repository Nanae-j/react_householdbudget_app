import React from 'react';
import FullCalender from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { EventContentArg } from '@fullcalendar/core';
import '../Calendar.css';
import { Transaction } from '../types';
import { calculateDailyBalances } from '../utils/financeCalculations';

interface CalenderProps {
  monthlyTransactions: Transaction[];
}

const Calendar = ({ monthlyTransactions }: CalenderProps) => {
  const events = [
    {
      title: 'Meeting',
      start: new Date(),
      income: 300,
      expense: 500,
      balance: 200,
    },
    { title: 'Meeting', start: '2024-12-29' },
    { title: 'Meeting', start: '2024-12-30' },
  ];

  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);

  const renderEventContent = (eventInfo: EventContentArg) => {
    // console.log(eventInfo);
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  return (
    <FullCalender
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
