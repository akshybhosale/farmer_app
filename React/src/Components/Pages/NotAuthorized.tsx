// src/Components/Pages/NotAuthorized.tsx
import React from 'react'

const NotAuthorized: React.FC = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold text-red-600">Access Denied 🚫</h1>
    <p className="mt-4 text-gray-700">
      You are not authorized to view this page.
    </p>
  </div>
)

export default NotAuthorized
