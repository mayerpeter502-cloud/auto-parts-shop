'use client';

import { useState, useEffect, useRef } from 'react';

const mockParts = [
  { id: 1, name: "Тормозные колодки Brembo", number: "P85020", brand: "Brembo", price: 2450, icon: "🛑" },
  { id: 2, name: "Масло моторное Castrol 5W-30", number: "CAST5W30", brand: "Castrol", price: 890, icon: "🛢" },
  { id: 3, name: "Аккумулятор Varta 60Ah", number: "VARTA60", brand: "Varta", price: 8900, icon: "⚡" },
  { id: 4, name: "Воздушный фильтр Mann", number: "C30130", brand: "Mann", price: 450, icon: "🌪" },
  { id: 5, name: "Свечи зажигания NGK", number: "BKR6E", brand: "NGK", price: 320, icon: "⚡" },
  { id: 6, name: "Амортизатор KYB Excel-G", number: "341322", brand: "KYB", price: 3400, icon: "🌀" },
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Автоскрытие toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    setTimeout(() => {
      const filtered = mockParts.filter(part => 
        part.name.toLowerCase().includes(value.toLowerCase()) ||
        part.number.toLowerCase().includes(value.toLowerCase()) ||
        part.brand.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
  };

  const addToCart = (item) => {
    setToast({ name: item.name, type: 'cart' });
    setQuery('');
    setIsOpen(false);
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={i} style={{background: '#dbeafe', color: '#1d4ed8', padding: '0 2px', borderRadius: '2px'}}>{part}</span> : part
    );
  };

  return (
    <>
      <div ref={wrapperRef} style={{position: 'relative', width: '100%', maxWidth: '600px'}}>
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Поиск по номеру или названию..."
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            color: '#111827',
            background: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            outline: 'none'
          }}
        />
        
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 100
          }}>
            {loading ? (
              <div style={{padding: '16px', color: '#6b7280'}}>Поиск...</div>
            ) : results.length === 0 ? (
              <div style={{padding: '24px', textAlign: 'center', color: '#6b7280'}}>
                <div style={{fontSize: '24px', marginBottom: '8px'}}>🔍</div>
                <div>Ничего не найдено</div>
              </div>
            ) : (
              <>
                <div style={{
                  padding: '12px 16px',
                  background: '#f3f4f6',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#6b7280',
                  textTransform: 'uppercase'
                }}>
                  Найдено {results.length} товаров
                </div>
                {results.map(item => (
                  <div
                    key={item.id}
                    style={{
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      borderBottom: '1px solid #f3f4f6'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: '#f3f4f6',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <div style={{
                        fontWeight: 500,
                        color: '#111827',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {highlightText(item.name, query)}
                      </div>
                      <div style={{fontSize: '14px', color: '#6b7280', marginTop: '4px'}}>
                        {item.brand} • {item.number}
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div style={{fontWeight: 600, color: '#2563eb', whiteSpace: 'nowrap'}}>
                        {item.price.toLocaleString()} ₽
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        style={{
                          marginTop: '6px',
                          padding: '6px 12px',
                          background: '#2563eb',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#10b981',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease'
        }}>
          <span style={{fontSize: '20px'}}>✓</span>
          <div>
            <div style={{fontWeight: 600}}>Добавлено в корзину</div>
            <div style={{fontSize: '14px', opacity: 0.9}}>{toast.name}</div>
          </div>
          <button 
            onClick={() => setToast(null)}
            style={{
              marginLeft: '8px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              opacity: 0.8
            }}
          >
            ×
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}