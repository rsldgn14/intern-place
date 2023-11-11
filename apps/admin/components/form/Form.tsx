import {
  Button,
  Descriptions,
  Form as AForm,
  FormProps,
  Input as TInput,
} from 'antd';
import { ColumnType } from '../table/Table';
import styles from './form.module.css';
import { useCallback } from 'react';
import { FormTypes } from './formTypes';
import { useRouter } from 'next/router';
import DateInput from '../inputs/DateInput';

interface Props<R extends object> extends FormProps {
  items: ColumnType<R>[];
  onSubmit?: (values: Record<string, unknown>) => void;
  onDelete?: () => void;
}

export default function Form<R extends object>(props: Props<R>) {
  const [form] = AForm.useForm();
  const router = useRouter();

  const formItems = props.items
    .filter((i) => !i.description)
    .map((item) => (
      <AForm.Item
        className={styles.formItem}
        label={
          <span className={styles.formLabel}>{item.title?.toString()}</span>
        }
        key={item.key}
        name={item.key?.toString().split('.')}
      >
        {decideInputType(item.type)}
      </AForm.Item>
    ));

  const descriptions = props.items
    .filter((i) => i.description)
    .map((item, i) => {
      const value =
        props.initialValues && props.initialValues[item.key as string];
      const data = props.initialValues && props.initialValues[i];

      return (
        <Descriptions.Item
          className={styles.description}
          key={i}
          label={
            <span className={styles.descriptionLabel}>
              {item.title?.toString()}
            </span>
          }
        >
          {' '}
          <span className={styles.descriptionContent}>
            {' '}
            {item.render ? item.render(value, data, i) : value}
          </span>{' '}
        </Descriptions.Item>
      );
    });

  const onSave = useCallback(
    (e?: any) => {
      e.preventDefault();
      form.validateFields().then((values: { [key: string]: unknown }) => {
        console.log(props.initialValues);
        if (props.initialValues) {
          for (const key in values) {
            if (typeof values[key] === 'object') {
              if (!props.items?.some((i) => i.key === key)) {
                // if the key has exact match with a column key, it is value of some field else it means it is an embedded object. Do not send it.
                delete values[key];
              }
            }
          }
        }

        props.onSubmit?.(values);
        router.back();
      });
    },
    [form, props, router]
  );

  return (
    <div
      style={{ maxWidth: '1000px', marginLeft: '320px', padding: '50px 2px' }}
    >
      <Descriptions style={{ display: 'flex' }}>{descriptions}</Descriptions>
      <AForm
        form={form}
        style={{ display: 'flex', flexDirection: 'column' }}
        initialValues={props.initialValues}
      >
        {formItems}
        <div className={styles.actionButtons}>
          {props.onDelete && (
            <Button onClick={props.onDelete} danger type="primary">
              Delete
            </Button>
          )}
          {props.onSubmit && (
            <Button onClick={onSave} type={'primary'}>
              Save
            </Button>
          )}
        </div>
      </AForm>
    </div>
  );
}

const decideInputType = (type: FormTypes | undefined) => {
  switch (type) {
    case 'number':
      return <TInput type="number" style={{ marginLeft: 10 }} />;

    case 'text':
      <TInput />;
      break;

    case 'textarea':
      return <TInput.TextArea rows={10} style={{ marginLeft: 10 }} />;
    case 'datepicker':
      return <DateInput showTime />;
    default:
      return <TInput style={{ marginLeft: 10 }} />;
  }
};
