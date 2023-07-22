import styled, { css } from 'styled-components';

interface FormProps {
  type: 'modal' | 'regular';
}

const Form = styled.form<FormProps>`
  ${({ type }) =>
    type !== 'modal' &&
    css`
      padding: 2.4rem 4rem;
      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${({ type }) =>
    type === 'modal' &&
    css`
      width: 80rem;

      @media (max-width: 780px) {
        width: 50rem;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;
Form.defaultProps = {
  type: 'modal',
};
export default Form;
