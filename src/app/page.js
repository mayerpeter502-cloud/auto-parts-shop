import Search from '../components/Search';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '24px',
          color: '#111827'
        }}>
          🔧 Автозапчасти
        </h1>
        <Search />
      </div>
    </main>
  );
}