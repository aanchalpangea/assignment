import { useRoutes } from 'react-router-dom';
import DashboardLayout from '../components/home/DashboardLayout';
import DashboardPage from '../components/home/DashboardPage';

const AppRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: <DashboardLayout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
            ],
        },
    ]);
};

export default AppRoutes;
