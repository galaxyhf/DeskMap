import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">DeskMap</h1>
          <p className="text-gray-600 text-sm">Sistema de Gerenciamento de Atendimentos Técnicos</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600 text-sm">
          © 2025 DeskMap - Sistema de Atendimentos Técnicos
        </div>
      </footer>
    </div>
  );
};
