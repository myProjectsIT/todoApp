import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import LogoutButton from '../features/auth/components/LogoutButton';
import { useLocation } from 'react-router-dom'; 

const NavigationBar: React.FC = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
    {isAuthenticated && (
      <nav className="navigation-bar">
        <ul className="navigation-menu">
          {isAdmin && isAuthenticated && (
            <li className="menu-item">
              <Link to="/" className={isActive("/") ? "active" : ""}>Todos</Link>
            </li>
          )}
          {isAdmin && isAuthenticated && (
            <li className="menu-item">
              <Link to="/users" className={isActive("/users") ? "active" : ""}>Users</Link>
            </li>
          )}
          <li className="menu-item logout-button">
            {isAuthenticated && <LogoutButton />}
          </li>
        </ul>
      </nav>
      )}
    </>
  );
};

export default NavigationBar;






// import { Menu } from 'antd';
// import { LogoutOutlined } from '@ant-design/icons';

// const NavigationBar = () => {
//   return (
//     <Menu mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//       <Menu.ItemGroup>
//         <Menu.Item key="todos">Todos</Menu.Item>
//         <Menu.Item key="users">Users</Menu.Item>
//       </Menu.ItemGroup>

//       <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ position: 'absolute', right: '20px' }} />
//     </Menu>
//   );
// };

// export default NavigationBar;

// // src/components/NavigationBar.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAppSelector } from '../app/hooks';
// import LogoutButton from '../features/auth/components/LogoutButton';

// const NavigationBar: React.FC = () => {
//   const { user, isAuthenticated } = useAppSelector((state) => state.auth);
//   const isAdmin = user?.role === 'admin';

//   return (
//     <nav>
//       <ul>
//         {isAdmin && isAuthenticated && (
//           <li>
//             <Link to="/">Todos</Link>
//           </li>
//         )}
//         {isAdmin && isAuthenticated && (
//           <li>
//             <Link to="/users">Users</Link>
//           </li>
//         )}
//         {isAuthenticated && (
//           <li>
//             <LogoutButton />
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default NavigationBar;




// // src/components/NavigationBar.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAppSelector } from '../app/hooks';
// import LogoutButton from '../features/auth/components/LogoutButton'; // Import LogoutButton

// const NavigationBar: React.FC = () => {
//   const { user, isAuthenticated } = useAppSelector((state) => state.auth);

//   return (
//     <nav>
//       <ul>
//         {isAuthenticated && (
//           <>
//             <li>
//               <Link to="/">Todos</Link>
//             </li>
//             {user?.role === 'admin' && (
//               <li>
//                 <Link to="/users">Users</Link>
//               </li>
//             )}
//             <li>
//               <LogoutButton />
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default NavigationBar;




// // src/components/NavigationBar.tsx

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAppSelector } from '../app/hooks';

// const NavigationBar: React.FC = () => {
//   const { user } = useAppSelector((state) => state.auth);

//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Todos</Link>
//         </li>
//         {user?.role === 'admin' && (
//           <li>
//             <Link to="/users">Users</Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default NavigationBar;