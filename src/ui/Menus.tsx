import styled from 'styled-components';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { CgMenuGridR } from 'react-icons/cg';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick.ts';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListInterface {
  position: {
    x: number;
    y: number;
  };
}

const StyledList = styled.ul<StyledListInterface>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${({ position }) => position.x}px;
  top: ${({ position }) => position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
interface MenusContextInterface {
  openId: number;
  open: (id: number) => void;
  close: () => void;
  position: { x: number; y: number };
  setPosition: (p: { x: number; y: number }) => void;
}

const MenusContext = createContext<MenusContextInterface>({
  openId: 0,
  open: () => {},
  close: () => {},
  position: { x: 0, y: 0 },
  setPosition: () => {},
});
function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState(-1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const close = () => setOpenId(-1);
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: number }) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = (e.target as Element)
      .closest('button')!
      .getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height,
    });
    openId === -1 || openId !== id ? open(id) : close();
  };
  return (
    <StyledToggle onClick={handleClick}>
      <CgMenuGridR />
    </StyledToggle>
  );
}
function List({ id, children }: { id: number; children: ReactNode }) {
  const { openId, position } = useContext(MenusContext);
  if (openId !== id) return false;
  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body,
  );
}
function Button({
  children,
  icon,
  onClick,
}: {
  children: ReactNode;
  icon: ReactElement;
  onClick?: () => void;
}) {
  const { close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLButtonElement>(close, true);
  const handleClick = () => {
    onClick?.();
    close();
    console.log('handlclick');
  };
  return (
    <li>
      <StyledButton onClick={handleClick} ref={ref}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
