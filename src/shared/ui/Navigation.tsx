import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '홈' },
    { path: '/competition', label: '대회 조회' },
    { path: '/registration', label: '등록 조회' },
  ];

  return (
    <nav
      style={{
        backgroundColor: '#343a40',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
            marginRight: 'auto',
          }}
        >
          CCK Payment
        </Link>

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: location.pathname === item.path ? '#4fc3f7' : 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor:
                location.pathname === item.path
                  ? 'rgba(255,255,255,0.1)'
                  : 'transparent',
              transition: 'all 0.3s ease',
              fontWeight: location.pathname === item.path ? 'bold' : 'normal',
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
