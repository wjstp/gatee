import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useHolidayStore } from "../store/useHolidayStore";
// import { Holiday, HolidayStore } from "../types"

const useHoliday = (year: string) => {
  const { years, holidays, setHolidays, setYears } = useHolidayStore();

  useEffect(() => {
    // store에 해당 년도의 휴일이 저장되어 있다면 그 값을 사용
    if (years.includes(year)) {
      console.log(`${year}의 데이터가 이미 저장되어 있습니다.\n ${holidays}`)
    }

    // store에 해당 년도의 휴일이 저장되어 있지 않다면 Google Calendar API 호출
    else {
      const googleCalendarApiKey: string | undefined = process.env.REACT_APP_GOOGLE_API_KEY;
      const googleCalendarId: string | undefined = process.env.REACT_APP_GOOGLE_CALENDAR_ID;
      const startDate = new Date(`${year}-01-01`).toISOString();
      const endDate = new Date(`${year}-12-31`).toISOString();
      console.log(`${year}의 데이터를 불러오는 중입니다.`)

      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${googleCalendarId}/events?key=${googleCalendarApiKey}&orderBy=startTime&singleEvents=true&timeMin=${startDate}&timeMax=${endDate}`,
      ).then((response) => {
        console.log(response)
      })
    }
  }, []);
}

export default useHoliday;