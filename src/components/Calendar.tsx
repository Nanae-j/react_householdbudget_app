import React from 'react';
import FullCalender from '@fullcalendar/react';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import '../Calendar.css';
import { Balance, CalenderContent, Transaction } from '../types';
import { calculateDailyBalances } from '../utils/financeCalculations';
import { formatCurrency } from '../utils/formatting';
import { Palette } from '@mui/icons-material';
import { useTheme } from '@mui/material';

interface CalenderProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
}

const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
}: CalenderProps) => {
  const theme = useTheme();
  // const events = [
  //   {
  //     title: 'Meeting',
  //     start: new Date(),
  //     income: 300,
  //     expense: 500,
  //     balance: 200,
  //   },
  //   { title: 'Meeting', start: '2024-12-29' },
  //   { title: 'Meeting', start: '2024-12-30' },
  // ];

  //月間データから各日付の収支を計算
  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  // 各日付の収支データをfullCalanderのイベントに登録できる形式に変換する関数
  const createCalenderEvents = (
    dailyBalances: Record<string, Balance>,
  ): CalenderContent[] => {
    // Object.keys({}) オブジェクトの中からキーだけを取り出し配列に格納する
    // 今回取り出しているのは'2024-12-20'のような日付
    //その配列を.mapで一つずつ処理
    return Object.keys(dailyBalances).map((date) => {
      // 分割代入
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };
  // 各日付の収支データをfullCalanderのイベントに登録できる形式に変換する関数 ここまで
  const calenderEvents = createCalenderEvents(dailyBalances);

  // 選択した日付に背景色をつけるためのイベント
  //handleDateClickでcurrentDayが切り替わるのでクリックされた日に背景色のイベントが入ることになる
  const backgroundEvent = {
    start: currentDay,
    display: 'background',
    backgroundColor: theme.palette.incomeColor.light,
  };

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

  const handleDateSet = (datesetInfo: DatesSetArg) => {
    // currentMonthが更新されApp.tsxでformatMonthの引数に渡される
    setCurrentMonth(datesetInfo.view.currentStart);
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  };

  return (
    <FullCalender
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calenderEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
