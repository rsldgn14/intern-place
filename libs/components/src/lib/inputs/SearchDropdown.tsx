import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import useClickOutside from '../hooks/useClickOutside';
import { css } from '@emotion/react';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  span {
    font-weight: bold;
    width: fit-content;
    padding-right: 10px;
  }
`;

const DropdownButton = styled.div`
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
  width: fit-content;
  border-radius: 10px;
`;

const DropdownList = styled.ul`
  list-style: none;
  padding: 15px 0;
  margin: 0;
  position: absolute;
  top: 120%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  height: 200px;
  width: 250px;
  overflow-y: scroll;
`;

const DropdownItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
`;

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  options: Option[];
  onChange: (selectedOption: Option) => void;
  iconSrc?: string;
  label?: string;
  placeholder?: string;
  title?: string;
}

const containerCss = css`
  display: flex;
  gap: 60px;
`;

export default function SearchDropdown(props: Props) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = props.options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ref = useClickOutside(() => setIsOpen(false));

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onChange(option);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchTerm]);

  return (
    <div css={containerCss}>
      <span>{props.title}</span>
      <DropdownContainer ref={ref}>
        <DropdownInput
          type="text"
          placeholder={props.placeholder}
          value={searchTerm}
          onChange={onChangeInput}
        />
        <DropdownButton onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? selectedOption.label : props.label}
        </DropdownButton>

        {isOpen && (
          <DropdownList>
            {filteredOptions.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => handleSelect(option)}
              >
                {props.iconSrc && (
                  <Image
                    src={props.iconSrc}
                    alt="sector"
                    height={20}
                    width={20}
                  />
                )}
                {option.label}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    </div>
  );
}
