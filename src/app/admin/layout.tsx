"use client";

import AdminHeader from "../../components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
