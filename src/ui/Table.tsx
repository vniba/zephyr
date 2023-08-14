import styled from 'styled-components';
import { createContext, ReactNode, useContext } from 'react';
import { Cabins } from '../../types/supabase.ts';
import Empty from './Empty.tsx';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;
interface CommonRowProps {
  columns: string;
}

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

interface ITableContext {
  columns: string;
}
const TableContext = createContext<ITableContext>({ columns: '' });
interface TableProps {
  columns: string;
  children: ReactNode;
}
function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role='table'>{children}</StyledTable>
    </TableContext.Provider>
  );
}
interface Props {
  children: ReactNode;
}
function Header({ children }: Props) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role='row' columns={columns}>
      {children}
    </StyledHeader>
  );
}
function Row({ children }: Props) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role='row' columns={columns}>
      {children}
    </StyledRow>
  );
}
interface BodyProps {
  render: (cabin: Cabins) => ReactNode;
  data: Cabins[] | undefined;
}
function Body({ render, data }: BodyProps) {
  if (!data?.length) return <Empty>No data found</Empty>;
  return <StyledBody>{data?.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
export default Table;
