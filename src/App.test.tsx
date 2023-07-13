import { render, screen } from '@testing-library/react';
import App from './App.tsx';
import { describe, expect, it } from 'vitest';

describe('it should render App', function () {
  it('should return GlobalStyles', function () {
    render(<App />);
  });
});
