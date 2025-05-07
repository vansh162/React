import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import Footer from './components/Footer';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" /> : <Login />
              }
            />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <div className="container mx-auto px-4 py-8">
                    <MovieList />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <div className="container mx-auto px-4 py-8">
                    <SearchBar />
                    <MovieList />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/movie/:title"
              element={
                <PrivateRoute>
                  <div className="container mx-auto px-4 py-8">
                    <MovieDetails />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <div className="container mx-auto px-4 py-8">
                    <MovieList />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/watchlist"
              element={
                <PrivateRoute>
                  <div className="container mx-auto px-4 py-8">
                    <MovieList />
                  </div>
                </PrivateRoute>
              }
            />
            <Route
              path="/popular"
              element={
                <PrivateRoute>
                  <div className="container mx-auto px-4 py-8">
                    <MovieList />
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;