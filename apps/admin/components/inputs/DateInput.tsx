import React from 'react';
import isEqual from 'react-fast-compare';
import { Dayjs, dayjs } from '../../utils/utc';

import { PickerProps } from 'antd/lib/date-picker/generatePicker';
import DatePicker from './DatePicker';
/**
 * Creates a `DatePicker` as defined in {@link https://ant.design/components/date-picker/ AntD DatePicker}
 *
 * @param defaultValue - Default starting value for date picker
 *
 * @public
 */
const defaultProps: PickerProps<Dayjs> = {
  format: 'YYYY-MM-DD HH:mm',
};

const DateInput = (props: PickerProps<Dayjs>) => {
  const { defaultValue, value, format, ...rest } = props;
  const dv = getValue(defaultValue, format);
  const v = getValue(value, format);

  return (
    <DatePicker
      defaultValue={dv}
      value={v}
      style={{ width: '100%' }}
      format={format}
      {...rest}
    />
  );
};
DateInput.defaultProps = defaultProps;

export default React.memo(DateInput, isEqual);

function getValue(value: Dayjs | null | undefined, format: any) {
  if (value && typeof value === 'string') {
    const v = dayjs(value, String(format));
    return v.isValid() ? v : dayjs(value);
  }
  return value || undefined;
}
