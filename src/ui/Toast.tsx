import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { IoCloseCircleSharp } from 'react-icons/io5';
import styled from 'styled-components';

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-grey-900);
  font-size: 2rem;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    outline: none;
    color: var(--color-grey-700);
  }
`;
function Toast() {
  const dismissToast = (toastID: string) => {
    toast.dismiss(toastID);
  };
  return (
    <Toaster
      position='top-center'
      gutter={13}
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: '1.5rem',
          maxWidth: '550px',
          padding: '1.5rem 2rem',
          backgroundColor: 'var(--color-grey-0)',
          color: 'var(--color-grey-700)',
        },
      }}>
      {t => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <CloseButton onClick={() => dismissToast(t.id)}>
                  <IoCloseCircleSharp />
                </CloseButton>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default Toast;
