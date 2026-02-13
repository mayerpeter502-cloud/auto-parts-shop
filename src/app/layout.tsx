import { AuthProvider } from '@/contexts/AuthContext';

// Внутри body обернуть children:
<body>
  <AuthProvider>
    {children}
  </AuthProvider>
</body>