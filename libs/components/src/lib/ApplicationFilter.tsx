import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import ApplicationFilterItem from './ApplicationFilterItem';
import { Applications, Notices } from '@intern-place/types';

interface Props {
  notices: Notices.Notice[];
  applications: Applications.Application[];
  setFilteredData: (noticeID: number) => void;
}

export default function ApplicationFilter(props: Props) {
  const [notices, setNotices] = useState<Notices.Notice[]>(props.notices);
  const [searchTerm, setSearchTerm] = useState<string>('');

  console.log(props.applications);

  useEffect(() => {
    if (searchTerm) {
      const filteredNotices = props.notices.filter((n) =>
        n.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setNotices(filteredNotices);
    } else {
      setNotices(props.notices);
    }
  }, [searchTerm, props.notices]);

  return (
    <div css={appContainerCss}>
      <div css={leftPanelCss}>
        <input
          type="text"
          placeholder="İlan Ara"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          css={searchInputCss}
        />
        {notices.map((n: Notices.Notice, index) => (
          <ApplicationFilterItem
            key={index}
            applicationFilterItemIcons={{
              Approved: {
                Count: props.applications?.filter(
                  (a) =>
                    a.NoticeID === n.ID &&
                    a.Status === Applications.Status.Approved
                ).length,
                Icon: '/check.svg',
              },
              Rejected: {
                Count: props.applications?.filter(
                  (a) =>
                    a.NoticeID === n.ID &&
                    a.Status === Applications.Status.Rejected
                ).length,
                Icon: '/cancel.svg',
              },
              Waiting: {
                Count: props.applications?.filter(
                  (a) =>
                    a.NoticeID === n.ID &&
                    a.Status === Applications.Status.Waiting
                ).length,
                Icon: '/waiting.svg',
              },
            }}
            title={n.Title}
            onClick={() => props.setFilteredData(n.ID)}
          />
        ))}
      </div>
    </div>
  );
}

const appContainerCss = css`
  diplay: flex;
  gap: 300px;
  min-width: 300px;
  min-height: 500px;
`;

const leftPanelCss = css`
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const searchInputCss = css`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
