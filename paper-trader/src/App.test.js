import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import Welcome from './Components/Pages/Welcome.js';
import Settings from './Components/Pages/Settings.js';
import Dashboard from './Components/Pages/Dashboard';
import Stock from './Components/Pages/Stock.js';


import { MemoryRouter, Router, useLocation, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'


//navigation test cases

test('render welcome correctly', () => {
    render(<Welcome></Welcome>);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('What Do We Do?')).toBeInTheDocument();
})

test('render settings correctly', () => {
    render(<Settings></Settings>)
    expect(screen.getByText('Settings')).toBeInTheDocument();
})

test('render dashboard correctly', () => {
    render(<Dashboard></Dashboard>)
    expect(screen.getByText('Watch List')).toBeInTheDocument();
    expect(screen.getByText('Current Holdings:')).toBeInTheDocument();
})

test('render app correctly', () => {
    render(<App></App>)
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('What Do We Do?')).toBeInTheDocument();
})

//search bar/stock page test case:

export const LocationDisplay = () => {
    const location = useLocation()
    return <div data-testid="location-display">{location.pathname}</div>
}

const renderWithRouter = (ui, {route = '/'} = {}) => {
    window.history.pushState({}, 'Test page', route)

    return render(ui, {wrapper: BrowserRouter})
  }


test('rendering a stock page with a ticker value displayed using useLocation', () => {
    const route = '/stock/test'
    renderWithRouter(<LocationDisplay />, { route })

    expect(screen.getByTestId('location-display')).toHaveTextContent(route)
})

//login/signup test cases