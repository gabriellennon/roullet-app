import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}