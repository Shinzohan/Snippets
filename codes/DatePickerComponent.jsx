import React from 'react';
import {
  DatePicker,
  Group,
  Button,
  Popover,
  Dialog,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading
} from 'react-aria-components';

export function DatePickerComponent({ 
  value, 
  onChange, 
  buttonClassName = 'px-4 py-2 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500',
  buttonContent,
  popoverClassName = 'mt-2',
  calendarClassName = 'p-6 bg-white rounded-lg shadow-lg'
}) {
  return (
    <DatePicker value={value} onChange={onChange}>
      <Group className="flex">
        <Button className={buttonClassName}>
          {buttonContent}
        </Button>
      </Group>
      <Popover className={popoverClassName}>
        <Dialog className={calendarClassName}>
          <Calendar>
            <header className="flex items-center justify-between mb-4">
              <Button slot="previous" className="p-2 hover:bg-gray-100 rounded-full transition-colors">◀</Button>
              <Heading className="text-lg font-semibold text-gray-700" />
              <Button slot="next" className="p-2 hover:bg-gray-100 rounded-full transition-colors">▶</Button>
            </header>
            <CalendarGrid className="border-collapse w-full">
              {(date) => (
                <CalendarCell
                  date={date}
                  className={({ isSelected, isDisabled }) => `
                    w-10 h-10 rounded-full flex items-center justify-center text-center transition-colors
                    ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : 'hover:bg-gray-100'}
                    ${isDisabled ? 'text-gray-400' : 'text-gray-700'}
                  `}
                />
              )}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
