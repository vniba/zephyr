import styled, { css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

type ButtonProps = {
  active: boolean;
};
const FilterButton = styled.button<ButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${({ active }) =>
    active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
interface FilterPops {
  filterField: string;
  options: { value: string; label: string }[];
}

function Filter({ filterField, options }: FilterPops) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      {options.map(opt => (
        <FilterButton
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          active={searchParams.get(filterField) === opt.value}>
          {opt.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
