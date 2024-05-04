import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Holiday, HolidayStore } from "../types"

export const useHolidayStore = create<HolidayStore>()(
  persist(
    (set) => ({
      years: [],
      setYears: (newYears: string[]) => {
        set((prevYears) => ({
          years: [...prevYears.years, ...newYears]
        }))
      },
      holidays: [],
      setHolidays: (newHolidays: Holiday[]) => {
        set((prevHolidays) => ({
          holidays: [...prevHolidays.holidays, ...newHolidays]
        }));
      }
    }),
    {
      name: "__holidays"
    }
  )
);