import React from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { Value } from 'react-time-picker/dist/cjs/shared/types';

interface TimePickerProps {
  selectedTime: Value;
  onTimeChange: (time: Value) => void;
}

const TimePickerComponent: React.FC<TimePickerProps> = ({
  selectedTime,
  onTimeChange,
}) => {
  return (
    <TimePicker
      value={selectedTime}
      onChange={(value: Value) => onTimeChange(value)}
      format="HH:mm"
    />
  );
};

export default TimePickerComponent;
