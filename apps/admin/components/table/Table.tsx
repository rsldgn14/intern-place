import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Table as AntTable,
  TableProps as AntTableProps,
  TableColumnType,
  Button,
} from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FormTypes } from '../form/formTypes';

export interface ColumnType<R extends object> extends TableColumnType<R> {
  description?: boolean;
  type?: FormTypes;
}

export interface Table<R extends object>
  extends Omit<AntTableProps<R>, 'dataSource' | 'columns'> {
  columns: ColumnType<R>[];
  dataSource?: any;
  actions?: { delete?: boolean; create?: boolean; detail?: boolean };
  path?: string;
}

export default function Table<R extends object>(props: Table<R>) {
  const [colums, setColumns] = useState<ColumnType<R>[]>(props.columns);

  useEffect(() => {
    if (props.actions?.detail) {
      setColumns((prev) => [
        ...prev,
        {
          title: 'Action',
          dataIndex: 'ID',
          key: 'ID',
          render: (value) => (
            <Link href={`${props.path}/detail/${value}`}>
              {' '}
              <Button icon={<ArrowRightOutlined />} shape={'circle'} />{' '}
            </Link>
          ),
        },
      ]);
    }
  }, [props.actions?.detail, props.path]);

  return (
    <>
      <AntTable
        {...props}
        columns={colums}
        style={{ margin: '20px 10px' }}
        dataSource={props.dataSource}
      />
      {props.actions?.create && (
        <Link href={`${props.path}/new`}>
          {' '}
          <Button icon={<PlusOutlined />} title={'New'}>
            {' '}
            New{' '}
          </Button>{' '}
        </Link>
      )}
    </>
  );
}
