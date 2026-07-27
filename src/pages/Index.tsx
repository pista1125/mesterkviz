import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Users, Brain, BarChart3, Gamepad2, Sparkles, ArrowRight, Trophy, Zap } from 'lucide-react';

const Index = () => {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const code = digits.join('');

  useEffect(() => {
    // Focus first box on load
    inputRefs.current[0]?.focus();
  }, []);

  const handleJoin = () => {
    if (code.length === 6) {
      navigate(`/join/${code}`);
    }
  };

  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
    
    if (!clean) {
      const next = [...digits];
      next[index] = '';
      setDigits(next);
      return;
    }

    // If multi-char (e.g. paste)
    if (clean.length > 1) {
      const next = [...digits];
      for (let i = 0; i < clean.length && index + i < 6; i++) {
        next[index + i] = clean[i];
      }
      setDigits(next);
      const nextFocus = Math.min(index + clean.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    // Single character
    const next = [...digits];
    next[index] = clean.slice(-1);
    setDigits(next);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const next = [...digits];
        next[index - 1] = '';
        setDigits(next);
        inputRefs.current[index - 1]?.focus();
      } else if (digits[index]) {
        const next = [...digits];
        next[index] = '';
        setDigits(next);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      if (code.length === 6) handleJoin();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9a-zA-Z]/g, '').toUpperCase().slice(0, 6);
    if (pasted) {
      const next = Array(6).fill('');
      pasted.split('').forEach((char, i) => {
        next[i] = char;
      });
      setDigits(next);
      const nextFocus = Math.min(pasted.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/90 via-purple-50/50 to-pink-100/60 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-900 text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-28">
        {/* Animated Background Blobs */}
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400/30 via-purple-500/30 to-pink-500/20 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-tr from-amber-300/30 via-pink-400/30 to-purple-500/20 blur-3xl animate-pulse pointer-events-none style={{ animationDuration: '7s' }}" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-300/60 dark:border-purple-700/60 bg-white/80 dark:bg-slate-900/80 shadow-md backdrop-blur-md mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-sm font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Interaktív és Játékos Kvízplatform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-foreground leading-tight">
                Tanulj{' '}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                  játékosan!
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Csatlakozz tanárod kvízszobájához egyetlen kóddal, vagy hozz létre saját látványos kvízeket pillanatok alatt!
              </p>
            </motion.div>

            {/* Join Room Box with 6 Input Slots */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-10 max-w-md"
            >
              <div className="relative p-[3px] rounded-3xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500 shadow-2xl shadow-purple-500/25">
                <div className="rounded-[21px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl p-6 sm:p-8 text-center shadow-inner">
                  {/* Card Title & Icon */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md">
                      <Gamepad2 className="w-6 h-6" />
                    </div>
                    <h2 className="font-display text-2xl font-bold bg-gradient-to-r from-violet-700 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                      Csatlakozz egy kvízhez!
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Írd be a tanártól kapott <span className="font-semibold text-purple-600 dark:text-purple-400">6 jegyű szobakódot</span>:
                  </p>

                  {/* 6 Digit Input Boxes */}
                  <div className="flex justify-center gap-2 sm:gap-3 mb-6" onPaste={handlePaste}>
                    {digits.map((digit, idx) => {
                      const isFilled = digit !== '';
                      return (
                        <input
                          key={idx}
                          ref={(el) => (inputRefs.current[idx] = el)}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className={`w-11 h-14 sm:w-13 sm:h-16 font-display text-2xl sm:text-3xl font-black text-center rounded-2xl border-2 transition-all duration-200 outline-none shadow-sm ${
                            isFilled
                              ? 'border-violet-500 bg-gradient-to-b from-violet-50 to-purple-100/70 dark:from-violet-950/60 dark:to-purple-900/40 text-violet-700 dark:text-violet-300 shadow-md shadow-violet-500/10 scale-[1.03]'
                              : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 hover:border-purple-300 dark:hover:border-purple-700'
                          } focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/25 focus:shadow-lg focus:shadow-fuchsia-500/20 focus:scale-105 focus:bg-white dark:focus:bg-slate-900`}
                        />
                      );
                    })}
                  </div>

                  {/* Submit Button */}
                  <Button
                    size="lg"
                    onClick={handleJoin}
                    disabled={code.length !== 6}
                    className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-lg h-13 sm:h-14 rounded-2xl shadow-xl shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    <span>Belépés a Szobába</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative border-t border-purple-100 dark:border-purple-900/40 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Minden eszköz a tanárok kezében
            </h2>
            <p className="mt-3 text-muted-foreground">
              Készíts kvízeket, tartsd meg az órát interaktívan és értékeld a diákokat azonnal!
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 sm:gap-8 md:grid-cols-3">
            {[
              {
                icon: Brain,
                title: 'Kvízkészítő',
                desc: 'Hozz létre statikus vagy dinámiás kvízeket másodpercek alatt.',
                gradient: 'from-violet-500 to-purple-600',
                border: 'border-violet-200 dark:border-violet-800',
              },
              {
                icon: Users,
                title: 'Élő szobák',
                desc: 'Indíts szobákat, ahová a diákok a 6 jegyű kóddal csatlakoznak.',
                gradient: 'from-fuchsia-500 to-pink-600',
                border: 'border-fuchsia-200 dark:border-fuchsia-800',
              },
              {
                icon: BarChart3,
                title: 'Valós idejű eredmények',
                desc: 'Kövesd nyomon a diákok válaszait és teljesítményét élőben.',
                gradient: 'from-amber-500 to-orange-600',
                border: 'border-amber-200 dark:border-amber-800',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`rounded-2xl border ${feature.border} bg-white/90 dark:bg-slate-900/90 p-6 text-center shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/10 transition-all`}
              >
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-md`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-card-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-purple-500/20 hover:scale-105 transition-all" asChild>
              <Link to="/auth" className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-300" />
                <span>Regisztrálj tanárként</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-100 dark:border-purple-900/40 py-8 bg-white/40 dark:bg-slate-950/40">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 KvízMester – Interaktív Oktatási Kvízplatform</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

