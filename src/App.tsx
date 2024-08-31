import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { GlobalStyles } from './styles/global'
import { theme } from './styles/theme'

import { RequireAuth } from './components/RequireAuth/RequireAuth'

import { SignIn } from './pages/Auth/SignIn'
import { SignUp } from './pages/Auth/SignUp'
import { AuthProvider } from './context/AuthContext'
import { Home } from './pages/Home'
import { Books } from './pages/Books'
import { BookDetail } from './pages/BookDetail'
import { MyBooks } from './pages/MyBooks'
import { Profile } from './pages/Profile'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/registro" element={<SignUp />} />
              <Route
                path="/home"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/livros"
                element={
                  <RequireAuth>
                    <Books />
                  </RequireAuth>
                }
              />
              <Route
                path="/livros/:bookId"
                element={
                  <RequireAuth>
                    <BookDetail />
                  </RequireAuth>
                }
              />
              <Route
                path="/meus-livros"
                element={
                  <RequireAuth>
                    <MyBooks />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
