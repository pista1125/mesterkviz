import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Users, Brain, BarChart3, Gamepad2, Sparkles, ArrowRight, Trophy, Zap, Play, CheckCircle2 } from 'lucide-react';

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
    const clean = val.replace(/\D/g, '');
    
    if (!clean) {
      const next = [...digits];
      next[index] = '';
      setDigits(next);
      return;
    }

    // If multi-char (e.g. paste or quick typing)
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
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/80 via-purple-50/40 to-pink-50/50 dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-900 text-foreground overflow-x-hidden flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-8 sm:py-12 md:py-14 flex-1 flex flex-col justify-center">
        {/* Animated Background Blobs */}
        <div className="absolute -top-16 -right-16 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/25 via-purple-500/25 to-pink-500/15 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-gradient-to-tr from-amber-300/25 via-pink-400/25 to-purple-500/15 blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-300/60 dark:border-purple-700/60 bg-white/90 dark:bg-slate-900/90 shadow-sm backdrop-blur-md mb-3 sm:mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                Interaktív és Játékos Kvízplatform
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
                Tanulj{' '}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent drop-shadow-sm">
                  játékosan!
                </span>
              </h1>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-normal">
                Csatlakozz tanárod kvízszobájához egyetlen kóddal, vagy hozz létre saját látványos kvízeket pillanatok alatt!
              </p>
            </motion.div>

            {/* Join Room Box with 6 Input Slots */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mx-auto mt-6 sm:mt-8 max-w-md"
            >
              <div className="relative p-[2.5px] rounded-3xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500 shadow-xl shadow-purple-500/20">
                <div className="rounded-[22px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl p-5 sm:p-7 text-center shadow-inner">
                  {/* Card Title & Icon */}
                  <div className="flex items-center justify-center gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-700 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                      Csatlakozz egy kvízhez!
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5">
                    Írd be a tanártól kapott <span className="font-bold text-purple-600 dark:text-purple-400">6 jegyű szobakódot</span>:
                  </p>

                  {/* 6 Digit Input Boxes */}
                  <div className="flex justify-center gap-1.5 sm:gap-2.5 mb-5" onPaste={handlePaste}>
                    {digits.map((digit, idx) => {
                      const isFilled = digit !== '';
                      return (
                        <input
                          key={idx}
                          ref={(el) => (inputRefs.current[idx] = el)}
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          autoComplete="one-time-code"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className={`w-11 h-13 sm:w-13 sm:h-15 font-display text-2xl sm:text-3xl font-black text-center rounded-xl border-2 transition-all duration-150 outline-none shadow-sm ${
                            isFilled
                              ? 'border-violet-500 bg-gradient-to-b from-violet-50 to-purple-100/70 dark:from-violet-950/60 dark:to-purple-900/40 text-violet-700 dark:text-violet-300 shadow-md shadow-violet-500/10 scale-[1.02]'
                              : 'border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 hover:border-purple-300 dark:hover:border-purple-700'
                          } focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 focus:shadow-md focus:scale-105 focus:bg-white dark:focus:bg-slate-900`}
                        />
                      );
                    })}
                  </div>

                  {/* Submit Button */}
                  <Button
                    size="lg"
                    onClick={handleJoin}
                    disabled={code.length !== 6}
                    className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-base sm:text-lg h-12 sm:h-13 rounded-xl shadow-lg shadow-purple-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Belépés a Szobába</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Quick trust / feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Nincs szükség regisztrációra a diákoknak</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Élő ranglista & tengeralattjáró mód</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative border-t border-purple-100 dark:border-purple-900/40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Minden eszköz a tanárok kezében
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Készíts kvízeket, tartsd meg az órát interaktívan és értékeld a diákokat azonnal!
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-5 sm:gap-6 md:grid-cols-3">
            {[
              {
                icon: Brain,
                title: 'Kvízkészítő & AI',
                desc: 'Hozz létre matematikai képletekkel teli vagy AI által generált kvízeket másodpercek alatt.',
                gradient: 'from-violet-500 to-purple-600',
                border: 'border-violet-200/80 dark:border-violet-800/80',
              },
              {
                icon: Users,
                title: 'Élő szobák',
                desc: 'Indíts szobákat, ahová a diákok a 6 jegyű kóddal egy szempillantás alatt csatlakoznak.',
                gradient: 'from-fuchsia-500 to-pink-600',
                border: 'border-fuchsia-200/80 dark:border-fuchsia-800/80',
              },
              {
                icon: BarChart3,
                title: 'Valós idejű eredmények',
                desc: 'Kövesd nyomon a diákok válaszait és statisztikáit élőben, diagramokkal.',
                gradient: 'from-amber-500 to-orange-600',
                border: 'border-amber-200/80 dark:border-amber-800/80',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-2xl border ${feature.border} bg-white/90 dark:bg-slate-900/90 p-5 text-center shadow-md shadow-purple-500/5 hover:shadow-lg hover:shadow-purple-500/10 transition-all`}
              >
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-sm`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1.5 font-display text-lg font-bold text-card-foreground">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold px-7 py-5 rounded-xl shadow-md shadow-purple-500/20 hover:scale-105 transition-all" asChild>
              <Link to="/auth" className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Regisztrálj tanárként</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-100 dark:border-purple-900/40 py-6 bg-white/40 dark:bg-slate-950/40">
        <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© 2026 KvízMester – Interaktív Oktatási Kvízplatform</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;


