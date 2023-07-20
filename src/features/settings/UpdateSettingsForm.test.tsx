import { act, screen, waitFor } from '@testing-library/react';
import { TestRouter } from '../../test/testRouter.tsx';
import UpdateSettingsForm from './UpdateSettingsForm.tsx';
import { beforeEach, expect, Mock, vi } from 'vitest';
import { useSettings } from './useSettings.ts';
import { useUpdateSettings } from './useUpdateSettings.ts';
import userEvent from '@testing-library/user-event';
const settings = {
  breakfastPrice: 10,
  maxBookingLength: 5,
  maxGuestsPerBooking: 3,
  minBookingLength: 1,
};
vi.mock('./useUpdateSettings', () => ({
  useUpdateSettings: vi.fn(),
}));
vi.mock('./useSettings', () => ({
  useSettings: vi.fn(),
}));

describe('render UpdateSettingForm', function () {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the spinner', async function () {
    (useSettings as Mock).mockReturnValue({ isLoading: true });
    (useUpdateSettings as Mock).mockReturnValue({ isUpdating: false });
    const { container } = TestRouter(<UpdateSettingsForm />);
    await waitFor(() => {
      expect(container.querySelector('#spinner')).toBeInTheDocument();
    });
  });
  it('should render 4 textbox', function () {
    (useSettings as Mock).mockReturnValue({ isLoading: false });
    (useUpdateSettings as Mock).mockReturnValue({ isUpdating: false });

    TestRouter(<UpdateSettingsForm />);
    expect(screen.getAllByRole('spinbutton')).toHaveLength(4);
  });
  it('should render error message', function () {
    (useSettings as Mock).mockReturnValue({ error: { message: 'error' } });
    (useUpdateSettings as Mock).mockReturnValue({ isUpdating: false });

    TestRouter(<UpdateSettingsForm />);
    expect(screen.getByText('1')).toBeVisible();
  });
  it('should show default value in input fields ', function () {
    (useSettings as Mock).mockReturnValue({ settings });
    (useUpdateSettings as Mock).mockReturnValue({ isUpdating: false });

    TestRouter(<UpdateSettingsForm />);
    expect(screen.getByLabelText('Maximum nights/booking')).toHaveValue(
      settings.maxBookingLength,
    );
    expect(screen.getByLabelText('Minimum nights/booking')).toHaveValue(
      settings.minBookingLength,
    );
    expect(screen.getByLabelText('Maximum guests/booking')).toHaveValue(
      settings.maxGuestsPerBooking,
    );
    expect(screen.getByLabelText('Breakfast price')).toHaveValue(
      settings.breakfastPrice,
    );
  });
  it('should disable button when updating', async function () {
    (useSettings as Mock).mockReturnValue({ settings });
    (useUpdateSettings as Mock).mockReturnValue({ isUpdating: true });

    TestRouter(<UpdateSettingsForm />);
    const button = screen.getByRole('button');
    await act(async () => {
      await userEvent.click(button);
    });
    expect(button).toHaveProperty('disabled', true);
  });
});
