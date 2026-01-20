
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Devotion, Badge, MinistryEvent } from './types.ts';
import { INITIAL_DEVOTIONS, INITIAL_EVENTS, BADGES, MOTIVATIONAL_PHRASES } from './constants.tsx';

// --- Auth Components ---
const Login: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Login Admin Fixo
    if (email === 'adminfundamento' && password === 'Yeshua@2026') {
      const adminUser: User = {
        id: 'admin-root',
        name: 'Admin Fundamento',
        email: 'adminfundamento',
        role: 'admin',
        completedWeeks: [],
        points: 0,
        streak: 0
      };
      onLogin(adminUser);
      navigate('/admin');
      return;
    }

    // Login Membros
    const storedUsers = JSON.parse(localStorage.getItem('devocional_users') || '[]');
    const user = storedUsers.find((u: any) => (u.email === email || u.name === email) && u.password === password);
    
    if (user) {
      onLogin(user);
      navigate('/');
    } else {
      setError('Credenciais inválidas. Verifique seu login e senha.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <i className="fa-solid fa-guitar text-blue-600 text-3xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Devocional</h1>
          <p className="text-slate-400 mt-2 font-medium">Ministério Fundamento Church</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Acesso</label>
            <input 
              type="text" 
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-slate-300 text-slate-700"
              placeholder="Usuário ou e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Chave</label>
            <input 
              type="password" 
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-slate-300 text-slate-700"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-sm rounded-xl animate-shake">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </div>
          )}
          <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-200 active:scale-95">
            Entrar no Altar
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-sm">Ainda não faz parte?</p>
          <Link to="/signup" className="text-blue-600 font-bold hover:text-blue-700 transition-colors mt-1 inline-block">Criar nova conta</Link>
        </div>
      </div>
    </div>
  );
};

const Signup: React.FC<{ onSignup: (u: User) => boolean }> = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'musician' | 'vocal'>('musician');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `u-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      password,
      role: 'member',
      subRole: role,
      completedWeeks: [],
      points: 0,
      streak: 0
    };

    const isOk = onSignup(newUser);
    if (isOk) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Novo Alistamento</h1>
          <p className="text-slate-500 mt-2">Sua excelência começa aqui</p>
        </div>

        {success ? (
          <div className="bg-emerald-50 text-emerald-700 p-6 rounded-2xl text-center space-y-3">
            <i className="fa-solid fa-circle-check text-4xl"></i>
            <p className="font-bold">Bem-vindo ao time!</p>
            <p className="text-sm opacity-80">Redirecionando você para o acesso...</p>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase px-1 mb-1">Nome de Louvor</label>
              <input 
                type="text" 
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all"
                placeholder="Ex: David Voice"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase px-1 mb-1">Usuário / E-mail</label>
              <input 
                type="text" 
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all"
                placeholder="usuario.louvor"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase px-1 mb-1">Chamado</label>
              <select 
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
              >
                <option value="musician">Instrumentista</option>
                <option value="vocal">Vocalista</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase px-1 mb-1">Senha Secreta</label>
              <input 
                type="password" 
                className="w-full px-5 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg mt-4">
              Confirmar Cadastro
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="text-slate-400 text-sm hover:text-blue-600 transition-colors">Já tenho uma conta</Link>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Sub-Components ---
const QuickReadModal: React.FC<{ devotion: Devotion, isOpen: boolean, onClose: () => void }> = ({ devotion, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in">
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold">Modo Leitura Rápida</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Tema da Semana</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">{devotion.theme}</h2>
            <p className="text-slate-500 font-medium">{devotion.reference}</p>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Resumo da Reflexão</h4>
              <p className="text-slate-700 italic">"{devotion.reflection.substring(0, 100)}..."</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <h4 className="text-xs font-bold text-amber-600 uppercase mb-2">Desafio Prático</h4>
              <p className="text-amber-900 font-medium">{devotion.challenge}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition-colors">
            Entendi, pronto para o ensaio!
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sidebar ---
const Sidebar: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
  const location = useLocation();
  const menuItems = [
    { path: '/', label: 'Início', icon: 'fa-house' },
    { path: '/history', label: 'Jornada', icon: 'fa-calendar-days' },
    { path: '/events', label: 'Eventos', icon: 'fa-calendar-check' },
    { path: '/group', label: 'Unidade', icon: 'fa-users' },
  ];
  if (user.role === 'admin') menuItems.push({ path: '/admin', label: 'Admin', icon: 'fa-shield-halved' });

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between z-40">
        <h1 className="brand text-xl font-bold text-blue-600">Devocional</h1>
        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs uppercase">{user.name.charAt(0)}</div>
      </div>
      <div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-100 fixed top-0 left-0 z-50">
        <div className="p-8">
          <h2 className="brand text-2xl font-bold text-blue-600">Fundamento</h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Ministério de Louvor</p>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-semibold ${location.pathname === item.path ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}`}>
              <i className={`fa-solid ${item.icon} text-lg`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-50">
          <button onClick={onLogout} className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-semibold">
            <i className="fa-solid fa-right-from-bracket text-lg"></i>
            <span>Desconectar</span>
          </button>
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === item.path ? 'text-blue-600' : 'text-slate-400'}`}>
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="text-[10px] font-bold uppercase">{item.label}</span>
          </Link>
        ))}
        <button onClick={onLogout} className="flex flex-col items-center gap-1 text-slate-400">
          <i className="fa-solid fa-power-off text-lg"></i>
          <span className="text-[10px] font-bold uppercase">Sair</span>
        </button>
      </div>
    </>
  );
};

// --- Main Pages ---
const Dashboard: React.FC<{ user: User, devotions: Devotion[], onCheckIn: (id: number) => void }> = ({ user, devotions, onCheckIn }) => {
  const devotion = useMemo(() => {
    const pending = devotions.find(d => !user.completedWeeks.includes(d.id));
    return pending || devotions[devotions.length - 1] || devotions[0];
  }, [devotions, user.completedWeeks]);

  const isCompleted = user.completedWeeks.includes(devotion.id);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationText, setMotivationText] = useState('');
  const [isQuickReadOpen, setIsQuickReadOpen] = useState(false);

  const handleComplete = () => {
    onCheckIn(devotion.id);
    setMotivationText(MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)]);
    setShowMotivation(true);
    setTimeout(() => setShowMotivation(false), 5000);
  };

  const progress = (user.completedWeeks.length / Math.max(devotions.length, 1)) * 100;

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto pb-32 md:pb-12 mt-16 md:mt-0">
      <QuickReadModal devotion={devotion} isOpen={isQuickReadOpen} onClose={() => setIsQuickReadOpen(false)} />
      <div className="relative bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center overflow-hidden">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
            <i className="fa-solid fa-sparkles"></i>
            <span>Bem-vindo de volta</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Shalom, {user.name}!</h2>
          <p className="text-slate-500 font-medium">Sua técnica serve ao seu altar.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-slate-50 p-5 rounded-3xl text-center min-w-[120px]">
            <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Caminhada</span>
            <span className="text-2xl font-black text-slate-800">{user.completedWeeks.length}</span>
          </div>
          <div className="bg-blue-50 p-5 rounded-3xl text-center min-w-[120px]">
            <span className="block text-[10px] uppercase font-bold text-blue-400 mb-1">Pontos</span>
            <span className="text-2xl font-black text-blue-600">{user.points}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="h-2 w-full bg-slate-100">
               <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="p-8 md:p-12 space-y-10">
              <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight italic">"{devotion.theme}"</h2>
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">{devotion.reference}</div>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg md:text-xl italic text-center font-medium px-4">"{devotion.reflection}"</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100"><h4 className="text-blue-600 font-bold text-xs uppercase mb-2">Atitude</h4><p className="text-slate-700 text-sm">{devotion.application}</p></div>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100"><h4 className="text-emerald-600 font-bold text-xs uppercase mb-2">Oração</h4><p className="text-emerald-900 text-sm italic">{devotion.prayer}</p></div>
              </div>
              <div className="p-8 bg-blue-900 rounded-3xl text-white flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 animate-pulse"><i className="fa-solid fa-bolt"></i></div>
                <div className="text-center md:text-left"><h4 className="text-blue-300 font-bold text-xs uppercase">Desafio</h4><p className="text-xl font-bold">{devotion.challenge}</p></div>
              </div>
              {!isCompleted ? (
                <button onClick={handleComplete} className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-4 text-xl active:scale-95">
                  <i className="fa-solid fa-circle-check"></i> Concluir Momento
                </button>
              ) : (
                <div className="w-full py-5 bg-emerald-50 text-emerald-600 font-black rounded-2xl flex items-center justify-center gap-4 text-xl border-2 border-emerald-100 border-dashed">
                  <i className="fa-solid fa-heart text-2xl animate-pulse"></i> Ofertado com Amor
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
             <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><i className="fa-solid fa-medal text-blue-500"></i> Medalhas</h3>
             <div className="grid grid-cols-2 gap-4">
               {BADGES.map(badge => {
                 const unlocked = (badge.id === 'constancy' && user.streak >= 4) || (badge.id === 'faithful-servant' && user.completedWeeks.length >= 12) || (badge.id === 'excellence' && user.completedWeeks.length >= 24) || (badge.id === 'unity' && user.completedWeeks.length >= 1);
                 return (
                   <div key={badge.id} className={`p-4 rounded-3xl border flex flex-col items-center justify-center transition-all ${unlocked ? 'bg-white border-blue-100' : 'bg-slate-50 border-transparent opacity-20 grayscale'}`}>
                     <i className={`fa-solid ${badge.icon} text-2xl mb-2 ${unlocked ? 'text-blue-600' : 'text-slate-300'}`}></i>
                     <span className="text-[10px] font-black uppercase text-slate-500">{badge.name}</span>
                   </div>
                 );
               })}
             </div>
           </div>
        </div>
      </div>
      {showMotivation && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6 animate-bounce-soft pointer-events-auto border border-emerald-100">
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl shadow-lg"><i className="fa-solid fa-trophy"></i></div>
            <div className="text-center"><h4 className="text-2xl font-black text-slate-800">Glória a Deus!</h4><p className="text-slate-600 font-medium">{motivationText}</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

const History: React.FC<{ user: User, devotions: Devotion[] }> = ({ user, devotions }) => (
  <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto mt-16 md:mt-0">
    <h2 className="text-3xl font-black text-slate-800">Minha Jornada</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {devotions.map(d => {
        const done = user.completedWeeks.includes(d.id);
        return (
          <div key={d.id} className={`p-6 rounded-3xl border transition-all ${done ? 'bg-white border-blue-100 shadow-sm' : 'bg-slate-50 opacity-40'}`}>
            <span className="text-[10px] font-black text-blue-500 uppercase">Semana {d.week}</span>
            <h4 className="font-bold text-slate-800 my-2">{d.theme}</h4>
            {done && <i className="fa-solid fa-circle-check text-emerald-500"></i>}
          </div>
        );
      })}
    </div>
  </div>
);

const Events: React.FC<{ events: MinistryEvent[] }> = ({ events }) => {
  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const formatDate = (ds: string) => {
    const [y, m, d] = ds.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'long' });
  };
  return (
    <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto mt-16 md:mt-0">
      <h2 className="text-3xl font-black text-slate-800">Escala e Eventos</h2>
      <div className="grid gap-4">
        {sorted.map(ev => (
          <div key={ev.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col md:flex-row gap-6">
            <div className="bg-blue-50 p-4 rounded-2xl text-center md:min-w-[120px] flex flex-col items-center">
              <i className={`fa-solid ${ev.type === 'rehearsal' ? 'fa-guitar' : 'fa-calendar'} text-blue-600 text-xl mb-2`}></i>
              <span className="text-[10px] font-black uppercase text-blue-400">{ev.type}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800">{ev.title}</h3>
              <div className="flex flex-wrap gap-4 mt-3 text-slate-500 text-sm">
                <span><i className="fa-regular fa-calendar mr-2"></i>{formatDate(ev.date)}</span>
                <span><i className="fa-regular fa-clock mr-2"></i>{ev.time}</span>
                <span><i className="fa-solid fa-location-dot mr-2"></i>{ev.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Admin Panel ---
const AdminPanel: React.FC<{ 
  devotions: Devotion[], events: MinistryEvent[], users: User[],
  onUpdateDevotion: (d: Devotion) => void, onAddDevotion: (d: Devotion) => void,
  onUpdateEvent: (e: MinistryEvent) => void, onAddEvent: (e: MinistryEvent) => void, onDeleteEvent: (id: number) => void,
  onUpdateUser: (u: User) => void, onDeleteUser: (id: string) => void
}> = ({ devotions, events, users, onUpdateDevotion, onAddDevotion, onUpdateEvent, onAddEvent, onDeleteEvent, onUpdateUser, onDeleteUser }) => {
  const [activeTab, setActiveTab] = useState<'devotions' | 'events' | 'users'>('devotions');
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (item: any) => { setEditingId(item.id); setFormData({ ...item }); };
  const saveEdit = () => {
    if (activeTab === 'devotions') onUpdateDevotion(formData);
    else if (activeTab === 'events') onUpdateEvent(formData);
    else if (activeTab === 'users') onUpdateUser(formData);
    setEditingId(null); setFormData(null);
  };

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto mt-16 md:mt-0">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Catedral do Conteúdo</h2>
        {activeTab !== 'users' && (
          <button onClick={() => {setIsAdding(true); setFormData({});}} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2"><i className="fa-solid fa-plus"></i> Novo</button>
        )}
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {['devotions', 'events', 'users'].map((t: any) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>{t === 'devotions' ? 'Semanas' : t === 'events' ? 'Eventos' : 'Membros'}</button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === 'users' && (
          <div className="grid gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl text-blue-800 font-bold text-sm">Total de membros registrados: {users.length}</div>
            {users.map(u => (
              <div key={u.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white ${u.subRole === 'vocal' ? 'bg-purple-500' : 'bg-blue-500'}`}>{u.name.charAt(0)}</div>
                  <div>
                    <h3 className="font-bold text-slate-800">{u.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full text-slate-500 font-bold uppercase">{u.email}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full text-white font-bold uppercase ${u.subRole === 'vocal' ? 'bg-purple-400' : 'bg-blue-400'}`}>{u.subRole || 'membro'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pontos</p><p className="font-black text-blue-600">{u.points}</p></div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(u)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 flex items-center justify-center"><i className="fa-solid fa-user-pen"></i></button>
                    <button onClick={() => onDeleteUser(u.id)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 flex items-center justify-center"><i className="fa-solid fa-trash-can"></i></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'devotions' && devotions.map(d => (
          <div key={d.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center">
            <div><span className="text-[10px] font-black text-slate-400 uppercase">Semana {d.week}</span><h3 className="font-bold text-slate-800">{d.theme}</h3></div>
            <button onClick={() => handleEdit(d)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 flex items-center justify-center"><i className="fa-solid fa-pen"></i></button>
          </div>
        ))}
        {activeTab === 'events' && events.map(e => (
          <div key={e.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center">
            <div><h3 className="font-bold text-slate-800">{e.title}</h3><p className="text-xs text-slate-400">{e.date}</p></div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(e)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 flex items-center justify-center"><i className="fa-solid fa-pen"></i></button>
              <button onClick={() => onDeleteEvent(e.id)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 flex items-center justify-center"><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-scale-in">
            <h3 className="text-2xl font-black text-slate-800 mb-6">Editar Registro</h3>
            <div className="space-y-4">
              {activeTab === 'users' && (
                <>
                  <input className="w-full p-4 rounded-xl ring-1 ring-slate-100 outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nome" />
                  <input className="w-full p-4 rounded-xl ring-1 ring-slate-100 outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email/User" />
                  <div className="grid grid-cols-2 gap-4">
                    <select className="p-4 rounded-xl ring-1 ring-slate-100" value={formData.subRole} onChange={e => setFormData({...formData, subRole: e.target.value})}>
                      <option value="vocal">Vocal</option><option value="musician">Músico</option>
                    </select>
                    <input className="p-4 rounded-xl ring-1 ring-slate-100" type="number" value={formData.points} onChange={e => setFormData({...formData, points: Number(e.target.value)})} placeholder="Pontos" />
                  </div>
                </>
              )}
              {activeTab === 'devotions' && (
                <>
                  <input className="w-full p-4 rounded-xl ring-1 ring-slate-100" value={formData.theme} onChange={e => setFormData({...formData, theme: e.target.value})} placeholder="Tema" />
                  <textarea className="w-full p-4 rounded-xl ring-1 ring-slate-100 h-32" value={formData.reflection} onChange={e => setFormData({...formData, reflection: e.target.value})} placeholder="Reflexão" />
                </>
              )}
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={saveEdit} className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl">Salvar</button>
              <button onClick={() => {setEditingId(null); setFormData(null);}} className="px-8 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl">Voltar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- App Root ---
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [devotions, setDevotions] = useState<Devotion[]>(INITIAL_DEVOTIONS);
  const [events, setEvents] = useState<MinistryEvent[]>(INITIAL_EVENTS);
  const [users, setUsers] = useState<User[]>([]);

  // Carregamento inicial de dados
  useEffect(() => {
    const savedDevs = localStorage.getItem('devocional_data_v2');
    if (savedDevs) setDevotions(JSON.parse(savedDevs));

    const savedEvs = localStorage.getItem('devocional_events_v1');
    if (savedEvs) setEvents(JSON.parse(savedEvs));

    const savedUsers = localStorage.getItem('devocional_users');
    if (savedUsers) setUsers(JSON.parse(savedUsers));

    const logged = localStorage.getItem('devocional_current_user');
    if (logged) setUser(JSON.parse(logged));
  }, []);

  // Helper para salvar e atualizar estado de usuários simultaneamente
  const saveUsersData = useCallback((updatedList: User[]) => {
    localStorage.setItem('devocional_users', JSON.stringify(updatedList));
    setUsers(updatedList);
  }, []);

  const handleSignup = (newUser: User) => {
    const current = JSON.parse(localStorage.getItem('devocional_users') || '[]');
    if (current.some((u: User) => u.email === newUser.email)) {
      alert('Usuário já existe!'); return false;
    }
    const updated = [...current, newUser];
    saveUsersData(updated);
    return true;
  };

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('devocional_current_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('devocional_current_user');
  };

  const handleCheckIn = (id: number) => {
    if (!user) return;
    const isNew = !user.completedWeeks.includes(id);
    if (isNew) {
      const updatedUser = { ...user, completedWeeks: [...user.completedWeeks, id], points: user.points + 10, streak: user.streak + 1, lastCheckIn: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('devocional_current_user', JSON.stringify(updatedUser));
      const updatedList = JSON.parse(localStorage.getItem('devocional_users') || '[]').map((u: User) => u.id === updatedUser.id ? updatedUser : u);
      saveUsersData(updatedList);
    }
  };

  const handleUpdateDevotion = (upd: Devotion) => {
    const next = devotions.map(d => d.id === upd.id ? upd : d);
    setDevotions(next); localStorage.setItem('devocional_data_v2', JSON.stringify(next));
  };

  const handleAddDevotion = (newDev: Devotion) => {
    const next = [...devotions, newDev]; setDevotions(next); localStorage.setItem('devocional_data_v2', JSON.stringify(next));
  };

  const handleUpdateEvent = (upd: MinistryEvent) => {
    const next = events.map(e => e.id === upd.id ? upd : e);
    setEvents(next); localStorage.setItem('devocional_events_v1', JSON.stringify(next));
  };

  const handleAddEvent = (newEv: MinistryEvent) => {
    const next = [...events, newEv]; setEvents(next); localStorage.setItem('devocional_events_v1', JSON.stringify(next));
  };

  const handleDeleteEvent = (id: number) => {
    const next = events.filter(e => e.id !== id); setEvents(next); localStorage.setItem('devocional_events_v1', JSON.stringify(next));
  };

  const handleUpdateUser = (upd: User) => {
    const next = users.map(u => u.id === upd.id ? upd : u);
    saveUsersData(next);
    if (user && user.id === upd.id) {
      setUser(upd); localStorage.setItem('devocional_current_user', JSON.stringify(upd));
    }
  };

  const handleDeleteUser = (id: string) => {
    if (id === 'admin-root') return alert('Admin principal não pode ser removido.');
    if (confirm("Remover este membro?")) {
      const next = users.filter(u => u.id !== id);
      saveUsersData(next);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 md:flex">
        {user ? (
          <>
            <Sidebar user={user} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard user={user} devotions={devotions} onCheckIn={handleCheckIn} />} />
                <Route path="/history" element={<History user={user} devotions={devotions} />} />
                <Route path="/events" element={<Events events={events} />} />
                <Route path="/admin" element={user.role === 'admin' ? (
                  <AdminPanel devotions={devotions} events={events} users={users} onUpdateDevotion={handleUpdateDevotion} onAddDevotion={handleAddDevotion} onUpdateEvent={handleUpdateEvent} onAddEvent={handleAddEvent} onDeleteEvent={handleDeleteEvent} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
                ) : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes bounce-soft { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bounce-soft { animation: bounce-soft 3s ease-in-out infinite; }
      `}</style>
    </Router>
  );
};

export default App;
