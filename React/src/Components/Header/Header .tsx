// src/Components/Header/Header.tsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getToken } from '../../utils/token'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const token = getToken()
  const role = localStorage.getItem('role')

  const handleRoleClick = (selectedRole: string) => {
    if (token && role === selectedRole) {
      // ✅ Already logged in with correct role
      navigate(`/${selectedRole}`)
    } else {
      // 🚀 Not logged in OR different role — go to login page
      navigate('/login', { state: { role: selectedRole } })
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#1e90ff',
        color: '#fff',
        padding: '10px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div
        style={{ fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        MyApp
      </div>

      <nav style={{ display: 'flex', gap: '20px' }}>
        <button onClick={() => handleRoleClick('admin')} style={linkStyle}>
          Admin
        </button>
        <button onClick={() => handleRoleClick('customer')} style={linkStyle}>
          Customer
        </button>
        <button onClick={() => handleRoleClick('farmer')} style={linkStyle}>
          Farmer
        </button>
        <Link to="/about" style={linkStyle}>
          About
        </Link>

        {token && (
          <button onClick={handleLogout} style={logoutStyle}>
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}

const linkStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: 500
}

const logoutStyle: React.CSSProperties = {
  ...linkStyle,
  color: '#ffcccc'
}
