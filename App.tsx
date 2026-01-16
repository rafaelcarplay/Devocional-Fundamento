
import React, { useState, useEffect, useMemo } from 'react';
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
    
    if (email === 'adminfundamento' && password === 'Yeshua@2026') {
      const adminUser: User = {
        id: 'admin',
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

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'musician' | 'vocal'>('musician');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('devocional_users') || '[]');
    
    if (storedUsers.some((u: any) => u.email === email)) {
      alert('Este usuário já existe!');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'member',
      subRole: role,
      completedWeeks: [],
      points: 0,
      streak: 0
    };

    localStorage.setItem('devocional_users', JSON.stringify([...storedUsers, newUser]));
    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
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

          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition-colors"
          >
            Entendi, pronto para o ensaio!
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Components ---

const Sidebar: React.FC<{ user: User, onLogout: () => void }> = ({ user, onLogout }) => {
  const location = useLocation();
  const menuItems = [
    { path: '/', label: 'Início', icon: 'fa-house' },
    { path: '/history', label: 'Jornada', icon: 'fa-calendar-days' },
    { path: '/events', label: 'Eventos', icon: 'fa-calendar-check' },
    { path: '/group', label: 'Unidade', icon: 'fa-users' },
  ];

  if (user.role === 'admin') {
    menuItems.push({ path: '/admin', label: 'Admin', icon: 'fa-shield-halved' });
  }

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between z-40">
        <h1 className="brand text-xl font-bold text-blue-600">Devocional</h1>
        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs uppercase">
          {user.name.charAt(0)}
        </div>
      </div>

      <div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-slate-100 fixed top-0 left-0 z-50">
        <div className="p-8">
          <h2 className="brand text-2xl font-bold text-blue-600">Fundamento</h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Ministério de Louvor</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-semibold ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={onLogout}
            className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-semibold"
          >
            <i className="fa-solid fa-right-from-bracket text-lg"></i>
            <span>Desconectar</span>
          </button>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 transition-colors ${
              location.pathname === item.path ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="text-[10px] font-bold uppercase">{item.label}</span>
          </Link>
        ))}
        <button 
          onClick={onLogout}
          className="flex flex-col items-center gap-1 text-slate-400"
        >
          <i className="fa-solid fa-power-off text-lg"></i>
          <span className="text-[10px] font-bold uppercase">Sair</span>
        </button>
      </div>
    </>
  );
};

const Dashboard: React.FC<{ user: User, devotions: Devotion[], onCheckIn: (id: number) => void }> = ({ user, devotions, onCheckIn }) => {
  const currentWeekIndex = useMemo(() => {
    const pending = devotions.find(d => !user.completedWeeks.includes(d.id));
    return pending ? devotions.indexOf(pending) : devotions.length - 1;
  }, [devotions, user.completedWeeks]);

  const devotion = devotions[currentWeekIndex] || devotions[0];
  const isCompleted = user.completedWeeks.includes(devotion.id);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationText, setMotivationText] = useState('');
  const [isQuickReadOpen, setIsQuickReadOpen] = useState(false);

  const handleComplete = () => {
    onCheckIn(devotion.id);
    const phrase = MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)];
    setMotivationText(phrase);
    setShowMotivation(true);
    setTimeout(() => setShowMotivation(false), 5000);
  };

  const progress = (user.completedWeeks.length / devotions.length) * 100;

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto pb-32 md:pb-12 mt-16 md:mt-0">
      <QuickReadModal 
        devotion={devotion} 
        isOpen={isQuickReadOpen} 
        onClose={() => setIsQuickReadOpen(false)} 
      />

      <div className="relative group">
        <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="relative bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center overflow-hidden">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
              <i className="fa-solid fa-sparkles"></i>
              <span>Bem-vindo de volta</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Shalom, {user.name}!
            </h2>
            <p className="text-slate-500 font-medium max-w-md">
              Mais uma semana para crescermos em graça, técnica e intimidade com o Pai.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-slate-50 p-5 rounded-3xl text-center min-w-[120px]">
              <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Caminhada</span>
              <span className="text-2xl font-black text-slate-800">{user.completedWeeks.length} <span className="text-xs font-normal opacity-40">/ {devotions.length}</span></span>
            </div>
            <div className="bg-blue-50 p-5 rounded-3xl text-center min-w-[120px]">
              <span className="block text-[10px] uppercase font-bold text-blue-400 mb-1">Pontuação</span>
              <span className="text-2xl font-black text-blue-600">{user.points}</span>
            </div>
          </div>
          <i className="fa-solid fa-leaf absolute -right-8 -top-8 text-9xl text-slate-50 opacity-50 pointer-events-none"></i>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm">
                <i className="fa-solid fa-scroll"></i>
              </div>
              Semana {devotion.week}
            </h3>
            <button 
              onClick={() => setIsQuickReadOpen(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-2"
            >
              Leitura Rápida (Antes do Ensaio)
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden group">
            <div className="h-2 w-full bg-slate-100">
               <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
            
            <div className="p-8 md:p-12 space-y-10">
              <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight italic px-4">
                  "{devotion.theme}"
                </h2>
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold border border-blue-100">
                  {devotion.reference}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0 text-slate-100 text-7xl font-serif">“</div>
                <p className="text-slate-600 leading-relaxed text-lg md:text-xl italic relative z-10 px-4 text-center font-medium">
                  {devotion.reflection}
                </p>
                <div className="absolute -right-6 bottom-0 text-slate-100 text-7xl font-serif">”</div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <i className="fa-solid fa-hands-praying"></i>
                    <h4 className="font-bold text-xs uppercase tracking-widest">Atitude</h4>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">{devotion.application}</p>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 mb-2">
                    <i className="fa-solid fa-microphone-lines"></i>
                    <h4 className="font-bold text-xs uppercase tracking-widest">Oração do Vocal/Músico</h4>
                  </div>
                  <p className="text-emerald-900 text-sm font-medium leading-relaxed italic">{devotion.prayer}</p>
                </div>
              </div>

              <div className="p-8 bg-blue-900 rounded-3xl text-white relative overflow-hidden group/challenge">
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 animate-pulse">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <div className="space-y-1 text-center md:text-left">
                    <h4 className="text-blue-300 font-bold text-xs uppercase tracking-widest">Desafio do Ministério</h4>
                    <p className="text-xl font-bold">{devotion.challenge}</p>
                  </div>
                </div>
              </div>

              {!isCompleted ? (
                <button 
                  onClick={handleComplete}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-4 text-xl active:scale-95"
                >
                  <i className="fa-solid fa-circle-check"></i>
                  Concluir Momento com Deus
                </button>
              ) : (
                <div className="w-full py-5 bg-emerald-50 text-emerald-600 font-black rounded-2xl flex items-center justify-center gap-4 text-xl border-2 border-emerald-100 border-dashed">
                  <i className="fa-solid fa-heart text-2xl animate-pulse"></i>
                  Ofertado com Amor
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-medal text-blue-500"></i>
              Suas Medalhas
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {BADGES.map((badge) => {
                const unlocked = (badge.id === 'constancy' && user.streak >= 4) ||
                                 (badge.id === 'faithful-servant' && user.completedWeeks.length >= 12) ||
                                 (badge.id === 'excellence' && user.completedWeeks.length >= 24) ||
                                 (badge.id === 'unity' && user.completedWeeks.length >= 1);
                return (
                  <div 
                    key={badge.id} 
                    className={`group relative p-4 rounded-3xl border flex flex-col items-center justify-center transition-all duration-500 ${
                      unlocked ? 'bg-white border-blue-100 shadow-sm' : 'bg-slate-50 border-transparent opacity-20 grayscale'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transform transition-transform group-hover:scale-110 ${
                      unlocked ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-300'
                    }`}>
                      <i className={`fa-solid ${badge.icon} text-2xl`}></i>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2rem] text-white space-y-4">
            <div className="flex items-center gap-2 text-slate-400">
               <i className="fa-solid fa-fire-flame-curved text-amber-500"></i>
               <span className="text-xs font-bold uppercase tracking-widest">Constância</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{user.streak}</span>
              <span className="text-slate-400 font-medium">semanas seguidas</span>
            </div>
          </div>
        </div>
      </div>

      {showMotivation && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md border border-emerald-100 p-8 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(16,185,129,0.25)] flex flex-col items-center gap-6 animate-bounce-soft pointer-events-auto">
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl shadow-lg shadow-emerald-200">
              <i className="fa-solid fa-trophy"></i>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-black text-slate-800">Glória a Deus!</h4>
              <p className="text-slate-600 font-medium mt-1">{motivationText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const History: React.FC<{ user: User, devotions: Devotion[] }> = ({ user, devotions }) => {
  return (
    <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto pb-32 md:pb-12 mt-16 md:mt-0">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Minha Jornada</h2>
        <p className="text-slate-400 font-medium">Retrospectiva do seu crescimento espiritual e musical.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devotions.map((d) => {
          const done = user.completedWeeks.includes(d.id);
          return (
            <div key={d.id} className={`p-6 rounded-[1.5rem] border transition-all duration-300 ${done ? 'bg-white border-blue-100 shadow-sm' : 'bg-slate-50 border-transparent opacity-40 grayscale'}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Semana {d.week}</span>
                {done && <i className="fa-solid fa-circle-check text-emerald-500"></i>}
              </div>
              <h4 className="font-bold text-slate-800 leading-tight mb-2">{d.theme}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 italic">"{d.reflection}"</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Events: React.FC<{ events: MinistryEvent[] }> = ({ events }) => {
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'rehearsal': return 'fa-guitar';
      case 'service': return 'fa-church';
      case 'meeting': return 'fa-comments';
      case 'special': return 'fa-star';
      default: return 'fa-calendar';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'rehearsal': return 'Ensaio';
      case 'service': return 'Culto';
      case 'meeting': return 'Reunião';
      case 'special': return 'Especial';
      default: return 'Geral';
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'long' });
  };

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto pb-32 md:pb-12 mt-16 md:mt-0">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Escala e Eventos</h2>
        <p className="text-slate-400 font-medium">Prepare-se para os próximos compromissos do ministério.</p>
      </div>

      <div className="grid gap-6">
        {sortedEvents.map((event) => (
          <div key={event.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
            <div className="flex md:flex-col items-center justify-center text-center p-4 bg-blue-50 rounded-2xl md:min-w-[120px]">
              <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center text-xl shadow-sm mb-2">
                <i className={`fa-solid ${getIcon(event.type)}`}></i>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">{getTypeLabel(event.type)}</span>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{event.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{event.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl text-sm font-medium">
                  <i className="fa-regular fa-calendar text-blue-500"></i>
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl text-sm font-medium">
                  <i className="fa-regular fa-clock text-blue-500"></i>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl text-sm font-medium">
                  <i className="fa-solid fa-location-dot text-blue-500"></i>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {sortedEvents.length === 0 && (
          <div className="text-center p-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <i className="fa-solid fa-calendar-xmark text-4xl text-slate-200 mb-4"></i>
            <p className="text-slate-400 font-medium">Nenhum evento agendado no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const GroupProgress: React.FC<{ users: User[], devotions: Devotion[] }> = ({ users, devotions }) => {
  const totalWeeksPossible = devotions.length * users.length;
  const totalCompleted = users.reduce((acc, u) => acc + u.completedWeeks.length, 0);
  const averageProgress = totalWeeksPossible > 0 ? (totalCompleted / totalWeeksPossible) * 100 : 0;

  return (
    <div className="p-6 md:p-12 space-y-12 max-w-5xl mx-auto pb-32 md:pb-12 mt-16 md:mt-0">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight italic">"Sendo muitos, somos um só corpo em Cristo"</h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">Nosso progresso não é individual, é a soma de cada oferta entregue em secreto.</p>
      </div>

      <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-50 text-center space-y-10 relative overflow-hidden">
        <div className="relative inline-block">
          <svg className="w-56 h-56 -rotate-90">
            <circle cx="112" cy="112" r="100" fill="transparent" stroke="#f8fafc" strokeWidth="16" />
            <circle
              cx="112" cy="112" r="100" fill="transparent" stroke="#6366f1" strokeWidth="16"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={2 * Math.PI * 100 * (1 - averageProgress / 100)}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-slate-800 tracking-tighter">{Math.round(averageProgress)}%</span>
            <span className="text-[10px] uppercase font-black text-indigo-400 tracking-widest">Alvo Comum</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPanel: React.FC<{ 
  devotions: Devotion[], 
  events: MinistryEvent[],
  onUpdateDevotion: (d: Devotion) => void, 
  onAddDevotion: (d: Devotion) => void,
  onUpdateEvent: (e: MinistryEvent) => void,
  onAddEvent: (e: MinistryEvent) => void,
  onDeleteEvent: (id: number) => void
}> = ({ devotions, events, onUpdateDevotion, onAddDevotion, onUpdateEvent, onAddEvent, onDeleteEvent }) => {
  const [activeTab, setActiveTab] = useState<'devotions' | 'events'>('devotions');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const startEditDevotion = (d: Devotion) => {
    setEditingId(d.id);
    setFormData({ ...d });
  };

  const startEditEvent = (e: MinistryEvent) => {
    setEditingId(e.id);
    setFormData({ ...e });
  };

  const saveEdit = () => {
    if (activeTab === 'devotions') {
      onUpdateDevotion(formData);
    } else {
      onUpdateEvent(formData);
    }
    setEditingId(null);
    setFormData(null);
  };

  const startAdd = () => {
    setIsAdding(true);
    if (activeTab === 'devotions') {
      setFormData({
        id: Date.now(),
        week: devotions.length + 1,
        theme: "",
        reference: "",
        reflection: "",
        application: "",
        prayer: "",
        challenge: ""
      });
    } else {
      setFormData({
        id: Date.now(),
        title: "",
        date: new Date().toISOString().split('T')[0],
        time: "19:30",
        location: "",
        type: "rehearsal",
        description: ""
      });
    }
  };

  const saveAdd = () => {
    if (activeTab === 'devotions') {
      onAddDevotion(formData);
    } else {
      onAddEvent(formData);
    }
    setIsAdding(false);
    setFormData(null);
  };

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-5xl mx-auto pb-32 md:pb-12 mt-16 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Catedral do Conteúdo</h2>
          <p className="text-slate-400 font-medium">Gestão do ministério e alimentação do rebanho.</p>
        </div>
        <button 
          onClick={startAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
        >
          <i className="fa-solid fa-plus"></i>
          Adicionar {activeTab === 'devotions' ? 'Semana' : 'Evento'}
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('devotions')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'devotions' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Devocionais
        </button>
        <button 
          onClick={() => setActiveTab('events')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'events' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Eventos
        </button>
      </div>

      <div className="space-y-6">
        {isAdding && (
          <div className="bg-blue-50 p-8 rounded-[2rem] border-2 border-blue-200 border-dashed space-y-4 animate-scale-in">
             <h3 className="font-black text-blue-700 uppercase tracking-widest text-xs">Novo {activeTab === 'devotions' ? 'Devocional' : 'Evento'}</h3>
             {activeTab === 'devotions' ? (
               <div className="space-y-4">
                 <div className="grid md:grid-cols-2 gap-4">
                    <input className="p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Tema" value={formData?.theme} onChange={e => setFormData({ ...formData, theme: e.target.value })} />
                    <input className="p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Referência" value={formData?.reference} onChange={e => setFormData({ ...formData, reference: e.target.value })} />
                 </div>
                 <textarea className="w-full p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500 h-32" placeholder="Reflexão" value={formData?.reflection} onChange={e => setFormData({ ...formData, reflection: e.target.value })} />
                 <input className="w-full p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Desafio" value={formData?.challenge} onChange={e => setFormData({ ...formData, challenge: e.target.value })} />
               </div>
             ) : (
               <div className="space-y-4">
                 <div className="grid md:grid-cols-2 gap-4">
                    <input className="p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Título do Evento" value={formData?.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    <select className="p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData?.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                      <option value="rehearsal">Ensaio</option>
                      <option value="service">Culto</option>
                      <option value="meeting">Reunião</option>
                      <option value="special">Especial</option>
                    </select>
                 </div>
                 <div className="grid md:grid-cols-3 gap-4">
                    <input type="date" className="p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData?.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                    <input type="time" className="p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData?.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                    <input className="p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Local" value={formData?.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                 </div>
                 <textarea className="w-full p-4 rounded-xl border-none ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Descrição" value={formData?.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
               </div>
             )}
             <div className="flex gap-3">
                <button onClick={saveAdd} className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl">Confirmar</button>
                <button onClick={() => setIsAdding(false)} className="px-8 py-4 bg-slate-200 text-slate-600 font-bold rounded-2xl">Cancelar</button>
             </div>
          </div>
        )}

        {activeTab === 'devotions' ? (
          devotions.map(d => (
            <div key={d.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center group">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Semana {d.week}</span>
                <h3 className="text-lg font-bold text-slate-800">{d.theme}</h3>
              </div>
              <button onClick={() => startEditDevotion(d)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center">
                <i className="fa-solid fa-pen"></i>
              </button>
            </div>
          ))
        ) : (
          events.map(e => (
            <div key={e.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex justify-between items-center group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                   <i className={`fa-solid ${e.type === 'rehearsal' ? 'fa-guitar' : 'fa-calendar'}`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{e.title}</h3>
                  <p className="text-xs text-slate-400">{e.date} às {e.time}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEditEvent(e)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center">
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button onClick={() => onDeleteEvent(e.id)} className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [devotions, setDevotions] = useState<Devotion[]>(INITIAL_DEVOTIONS);
  const [events, setEvents] = useState<MinistryEvent[]>(INITIAL_EVENTS);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedDevotions = localStorage.getItem('devocional_data_v2');
    if (storedDevotions) setDevotions(JSON.parse(storedDevotions));

    const storedEvents = localStorage.getItem('devocional_events_v1');
    if (storedEvents) setEvents(JSON.parse(storedEvents));

    const storedUsers = JSON.parse(localStorage.getItem('devocional_users') || '[]');
    setUsers(storedUsers);

    const currentUser = localStorage.getItem('devocional_current_user');
    if (currentUser) setUser(JSON.parse(currentUser));
  }, []);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    localStorage.setItem('devocional_current_user', JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('devocional_current_user');
  };

  const handleCheckIn = (devotionId: number) => {
    if (!user) return;
    const isNewCheckin = !user.completedWeeks.includes(devotionId);
    if (isNewCheckin) {
      const updatedUser: User = { ...user, completedWeeks: [...user.completedWeeks, devotionId], points: user.points + 10, streak: user.streak + 1, lastCheckIn: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('devocional_current_user', JSON.stringify(updatedUser));
      const storedUsers = JSON.parse(localStorage.getItem('devocional_users') || '[]');
      const newUsers = storedUsers.map((u: User) => u.email === updatedUser.email ? updatedUser : u);
      localStorage.setItem('devocional_users', JSON.stringify(newUsers));
      setUsers(newUsers);
    }
  };

  const handleUpdateDevotion = (updated: Devotion) => {
    const next = devotions.map(d => d.id === updated.id ? updated : d);
    setDevotions(next);
    localStorage.setItem('devocional_data_v2', JSON.stringify(next));
  };

  const handleAddDevotion = (newDev: Devotion) => {
    const next = [...devotions, newDev];
    setDevotions(next);
    localStorage.setItem('devocional_data_v2', JSON.stringify(next));
  };

  const handleUpdateEvent = (updated: MinistryEvent) => {
    const next = events.map(e => e.id === updated.id ? updated : e);
    setEvents(next);
    localStorage.setItem('devocional_events_v1', JSON.stringify(next));
  };

  const handleAddEvent = (newEvent: MinistryEvent) => {
    const next = [...events, newEvent];
    setEvents(next);
    localStorage.setItem('devocional_events_v1', JSON.stringify(next));
  };

  const handleDeleteEvent = (id: number) => {
    const next = events.filter(e => e.id !== id);
    setEvents(next);
    localStorage.setItem('devocional_events_v1', JSON.stringify(next));
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
                <Route path="/group" element={<GroupProgress users={users} devotions={devotions} />} />
                {user.role === 'admin' && (
                  <Route path="/admin" element={<AdminPanel 
                    devotions={devotions} 
                    events={events} 
                    onUpdateDevotion={handleUpdateDevotion} 
                    onAddDevotion={handleAddDevotion}
                    onUpdateEvent={handleUpdateEvent}
                    onAddEvent={handleAddEvent}
                    onDeleteEvent={handleDeleteEvent}
                  />} />
                )}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
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
