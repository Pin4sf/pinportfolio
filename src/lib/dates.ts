export type CalendarDateStyle = "short" | "long" | "month-year";

const dateOptions: Record<CalendarDateStyle, Intl.DateTimeFormatOptions> = {
  short: { month: "short", day: "numeric", year: "numeric" },
  long: { month: "long", day: "numeric", year: "numeric" },
  "month-year": { month: "short", year: "numeric" },
};

export function formatCalendarDate(
  date: string,
  style: CalendarDateStyle,
): string {
  const calendarDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? new Date(`${date}T00:00:00.000Z`)
    : new Date(date);

  return calendarDate.toLocaleDateString("en-US", {
    ...dateOptions[style],
    timeZone: "UTC",
  });
}
