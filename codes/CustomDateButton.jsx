import { DatePickerComponent } from './DatePickerComponent';
import { Calendar, ChevronDown } from 'lucide-react';

export function CustomDateButton({ value, onChange }) {
  return (
    <div className="relative inline-block">
      <DatePickerComponent
        value={value}
        onChange={onChange}
        buttonClassName="flex items-center gap-2 min-w-[200px] px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-colors"
        buttonContent={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="font-medium">
                {value ? value.toString() : 'Pick date'}
              </span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        }
        popoverClassName="mt-2"
        calendarClassName="p-6 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
      />
    </div>
  );
}
