"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useLogin } from "./logincontext";

const AdminContext = createContext({
  isAdmin: false,
  adminUser: null,
  loading: true,
});

export const AdminProvider = ({ children }) => {
  const { user } = useLogin();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      // Check if user is logged in through the main auth system
      if (user) {
        const adminEmails = [
          "admin@agrogram.com",
          "superadmin@agrogram.com",
        ];
        const isUserAdmin = adminEmails.includes(user.email) ||
                          user.user_metadata?.role === 'admin' ||
                          user.app_metadata?.role === 'admin';

        setIsAdmin(isUserAdmin);
        setAdminUser(isUserAdmin ? user : null);
      } else {
        // Check for admin user in localStorage (for demo purposes)
        const storedAdminUser = localStorage.getItem('adminUser');
        if (storedAdminUser) {
          try {
            const adminUser = JSON.parse(storedAdminUser);
            const adminEmails = [
              "admin@agrogram.com",
              "superadmin@agrogram.com",
            ];
            const isUserAdmin = adminEmails.includes(adminUser.email) ||
                              adminUser.user_metadata?.role === 'admin' ||
                              adminUser.app_metadata?.role === 'admin';

            setIsAdmin(isUserAdmin);
            setAdminUser(isUserAdmin ? adminUser : null);
          } catch (error) {
            console.error('Error parsing admin user:', error);
            setIsAdmin(false);
            setAdminUser(null);
          }
        } else {
          setIsAdmin(false);
          setAdminUser(null);
        }
      }
      setLoading(false);
    };
    checkAdminStatus();
  }, [user]);

  return (
    <AdminContext.Provider value={{ isAdmin, adminUser, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext); 