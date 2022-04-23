import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import Welcome from './Components/Pages/Welcome.js';
import Settings from './Components/Pages/Settings.js';
import Dashboard from './Components/Pages/Dashboard';
import News from './Components/News/News';
import ScrollList from './Components/ScrollList/ScrollList';
import { login, logout, useAuth, getAuth, firebaseConfig, signup, getUserWatchList } from './firebase.js';
import { jest } from '@jest/globals';
import { describe, expect, it, toBeTruthy } from '@jest/globals';
import { initializeApp } from "firebase/app"
import { deleteUser } from 'firebase/auth'


import { MemoryRouter, Router, useLocation, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { act } from 'react-dom/test-utils';


//navigation test cases

describe('\nNavigation Tests:\n', () => {

    //test setup
    beforeAll(async () => {
        jest.setTimeout(10000);
        await initializeApp(firebaseConfig)
    });
    beforeEach(async () => {
        await logout();
    });

    test('render welcome correctly', () => {
        render(<Welcome></Welcome>);
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('What Do We Do?')).toBeInTheDocument();
    })

    test('render settings correctly', () => {
        render(<Settings></Settings>)
        expect(screen.getByText('Settings')).toBeInTheDocument();
    })

    test('render settings correctly', () => {
        render(<News></News>)
        expect(screen.getByText('News')).toBeInTheDocument();
    })

    test('render app correctly', () => {
        render(<App></App>)
        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByText('What Do We Do?')).toBeInTheDocument();
    })
})

//search bar/stock page test case:
export const LocationDisplay = () => {
    const location = useLocation()
    return <div data-testid="location-display">{location.pathname}</div>
}

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return render(ui, { wrapper: BrowserRouter })
}

describe('\nStock Page/Search Bar Test:\n', () => {
    test('rendering a stock page with a ticker value displayed using useLocation', () => {
        const route = '/stock/test'
        renderWithRouter(<LocationDisplay />, { route })

        expect(screen.getByTestId('location-display')).toHaveTextContent(route)
    })
})

//login/signup test cases
describe('\nFirebase Tests:\n', () => {
    //test setup
    beforeAll(async () => {
        jest.setTimeout(10000);
        await initializeApp(firebaseConfig)
    });
    beforeEach(async () => {
        await logout();
    });

    //login
    test('login works', async () => {
        const user = await login("admin@papertrader.com", "admin12");
        expect(user.user).toBeTruthy();
    })
    test('login should throw error', async () => {
        let error = '';
        try {
            await login("admin@papertrader.com", "admin13");
        }
        catch (err) {
            error = err.toString();
        }
        expect(error).toBe('FirebaseError: Firebase: Error (auth/wrong-password).');
    })

    //logout
    test('user should be logged out', async () => {
        const user = await login("admin@papertrader.com", "admin12");
        logout();
        expect(user.user).toBeFalsy;
    })

    //signup
    test('new account should be created', async () => {

        //the try catch is only for purposes of simplicity
        //for proper testing delete the test user account first
        try {
            const user = await signup('testUser@test.com', 'testpassword');
            expect(user.user).toBeTruthy();
        }
        catch{
            const user = await login('testUser@test.com','testpassword');
            expect(user.user).toBeTruthy();
        }
        
        logout();

        const user2 = await login('testuser@test.com', 'testpassword');
        expect(user2.user).toBeTruthy();
        //REMEMBER: MANUALLY DELETE THE USER BEFORE RUNNING TESTS
        //MUST HAVE A SEPARATE SERVER (RUNNING THE ADMIN SDK) TO DELETE USERS
    })
});

//watchlist test cases
describe('\nFirebase Tests:\n', () => {
    //test setup
    beforeAll(async () => {
        jest.setTimeout(60000);
        initializeApp(firebaseConfig)
    });
    beforeEach(async () => {
        await logout();
    });


    //watchlist
    test('test getUserWatchlist', async () => {
        await login("admin@papertrader.com", "admin12");
        console.log("logged in");
        //add the getUserWatchlist test here
        let watchlist = [];
        let knownWatchList = [];
        knownWatchList.push("TSLA");
        knownWatchList.push("BDX");
        //knownWatchList.push("AAPL");
        await getUserWatchList().then(result => {
            //setting watchlist to watchlist value, changes app state and will reload component with new watchlist
            watchlist = result
        });
        console.log(watchlist);
        for(let i = 0; i<2; i++){
            let test = watchlist[i].toUpperCase()===knownWatchList[i].toUpperCase();
            expect(test).toBeTruthy()
        }
    })       
});