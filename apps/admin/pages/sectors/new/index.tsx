import { Sector, Sectors } from '@intern-place/types';
import { ColumnType } from '../../../components/table/Table';
import Form from '../../../components/form/Form';
import { useCallback } from 'react';

const columns: ColumnType<Sector>[] = [
  {
    title: 'Name',
    key: 'Name',
  },
];

export default function Index() {
  const onSubmit = useCallback((value: any) => {
    Sectors.create(value);
  }, []);

  return <Form items={columns} onSubmit={onSubmit}></Form>;
}
