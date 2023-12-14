import { Notices } from '@intern-place/types';
import CompanyNoticeCard from './CompanyNoticeCard';

interface Props {
  notices: Notices.Notice[];
}

export default function CompanyNoticeContainer(props: Props) {
    
  return props.notices.map((notice) => <CompanyNoticeCard notice={notice} />);
}

