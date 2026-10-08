import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { QuizQuestion, QuizAnswer } from '@/types/quiz';
import { MathRenderer } from './MathRenderer';

interface QuestionResultsChartProps {
  question: QuizQuestion;
  answers: QuizAnswer[];
  showResults: boolean;
}

const COLORS = [
  '#ea384c', // quiz-red
  '#0ea5e9', // quiz-blue
  '#facc15', // quiz-yellow
  '#22c55e', // quiz-green
  '#8B5CF6', // primary
  '#D946EF', // secondary
];

const ICON_MAP = ['▲', '◆', '●', '■', '★', '♦'];

const TextInputResults: React.FC<{
  question: QuizQuestion;
  answers: QuizAnswer[];
}> = ({ question, answers }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setIsRevealed(false);
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, [question.id]);

  // Group case-insensitively while preserving original text
  const countsMap = new Map<string, { display: string; count: number }>();
  answers.forEach((a) => {
    const rawVal = ((a.answer as any)?.text || '').trim();
    if (!rawVal) return;
    const lower = rawVal.toLowerCase();
    if (countsMap.has(lower)) {
      countsMap.get(lower)!.count += 1;
    } else {
      countsMap.set(lower, { display: rawVal, count: 1 });
    }
  });

  const normalizedCorrect = (question.correctAnswer || '').trim().toLowerCase();

  const data = Array.from(countsMap.values())
    .map((item) => ({
      text: item.display,
      count: item.count,
      isCorrect: item.display.trim().toLowerCase() === normalizedCorrect,
    }))
    .sort((a, b) => b.count - a.count);

  const hasCorrectAnswerInSubmissions = data.some((d) => d.isCorrect);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-md border border-border/50 bg-gradient-to-b from-card to-muted/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold font-display text-muted-foreground uppercase tracking-wider">
          Szöveges válaszok
        </h3>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-tight">
          {answers.length} diák válaszolt
        </span>
      </div>

      {data.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          <p className="text-base font-medium">Nem érkezett beküldött válasz.</p>
          {isRevealed && question.correctAnswer && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-quiz-green/10 border border-quiz-green/30 text-quiz-green font-bold"
            >
              <span>A helyes válasz:</span>
              <MathRenderer text={question.correctAnswer} />
            </motion.div>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-center gap-4 py-2">
            {data.map((item, i) => {
              const isItemCorrect = item.isCorrect;
              return (
                <motion.div
                  key={item.text}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{
                    opacity: isRevealed ? (isItemCorrect ? 1 : 0.3) : 1,
                    scale: isRevealed ? (isItemCorrect ? 1.08 : 0.95) : 1,
                    y: 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 24,
                    delay: isRevealed ? (isItemCorrect ? 0.05 : 0) : i * 0.05,
                  }}
                  className={`relative flex min-w-[150px] max-w-[280px] flex-col items-center justify-center rounded-2xl px-6 py-5 shadow-md border-2 transition-all duration-500 ${
                    isRevealed && isItemCorrect
                      ? 'bg-quiz-green/15 border-quiz-green text-foreground shadow-[0_0_25px_rgba(34,197,94,0.35)] ring-4 ring-quiz-green/20'
                      : isRevealed
                      ? 'bg-card/40 border-border/40 text-muted-foreground'
                      : 'bg-card border-border/80 hover:border-primary/40 text-card-foreground'
                  }`}
                >
                  {/* Top-right count badge */}
                  <div
                    className={`absolute -top-3 -right-3 flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-black shadow-lg transition-all duration-300 ${
                      isRevealed && isItemCorrect
                        ? 'bg-quiz-green text-white scale-110 shadow-quiz-green/40'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {item.count}
                  </div>

                  {/* Answer content */}
                  <div className="flex flex-col items-center justify-center gap-1.5 w-full">
                    <div
                      className={`text-xl md:text-2xl font-bold tracking-tight text-center break-words max-w-full ${
                        isRevealed && isItemCorrect ? 'text-quiz-green font-black' : ''
                      }`}
                    >
                      <MathRenderer text={item.text} />
                    </div>

                    {/* Animated green checkmark badge */}
                    <AnimatePresence>
                      {isRevealed && isItemCorrect && (
                        <motion.div
                          initial={{ scale: 0, rotate: -45, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 15 }}
                          className="flex items-center gap-1 text-quiz-green font-extrabold text-sm mt-1"
                        >
                          <CheckCircle2 className="h-5 w-5 text-quiz-green" />
                          <span>Helyes</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Reveal banner when nobody answered correctly */}
          <AnimatePresence>
            {isRevealed && !hasCorrectAnswerInSubmissions && question.correctAnswer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="mt-6 flex flex-col items-center justify-center p-4 rounded-2xl bg-quiz-green/10 border-2 border-quiz-green/40 shadow-sm max-w-md mx-auto text-center"
              >
                <span className="text-xs uppercase font-extrabold tracking-wider text-quiz-green mb-1">
                  A helyes válasz
                </span>
                <div className="text-2xl font-black text-foreground">
                  <MathRenderer text={question.correctAnswer} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export const QuestionResultsChart: React.FC<QuestionResultsChartProps> = ({
  question,
  answers,
  showResults,
}) => {
  if (!showResults) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 w-full overflow-hidden"
    >
      {question.type === 'multiple-choice' || question.type === 'true-false' ? (
        <div className="bg-card rounded-xl p-4 shadow-md border border-border/50 bg-gradient-to-b from-card to-muted/10">
          <h3 className="text-sm font-bold text-center mb-2 font-display text-muted-foreground uppercase tracking-wider">Válaszok eloszlása</h3>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={question.options.map((opt, index) => {
                const count = answers.filter((a) => (a.answer as any).selectedOptionId === opt.id).length;
                return {
                  name: opt.text,
                  count,
                  color: COLORS[index % COLORS.length],
                  icon: ICON_MAP[index % ICON_MAP.length],
                  isCorrect: opt.isCorrect,
                };
              })}>
                <XAxis 
                  dataKey="icon" 
                  axisLine={false} 
                  tickLine={false}
                  interval={0}
                  tick={(props: any) => {
                    const { x, y, payload } = props;
                    const index = payload.index;
                    const isCorrect = question.options[index]?.isCorrect;
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" style={{ fontSize: 20, fontWeight: 'black' }}>
                          {payload.value}
                        </text>
                        {isCorrect && (
                          <text x={0} y={20} dy={16} textAnchor="middle" fill="#22c55e" style={{ fontSize: 24, fontWeight: 'black' }}>
                            ✓
                          </text>
                        )}
                      </g>
                    );
                  }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-popover border-2 border-primary/20 p-2 rounded-lg shadow-xl backdrop-blur-md text-xs">
                          <p className="font-black text-primary mb-0.5">{item.name}</p>
                          <p className="font-bold flex items-center gap-1">
                            {item.count} szavazat 
                            {item.isCorrect && <span className="text-quiz-green">✓</span>}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" animationDuration={1000}>
                  {question.options.map((opt, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      style={{ 
                        filter: opt.isCorrect ? 'none' : 'grayscale(20%) brightness(95%)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-tight">
              {answers.length} diák válaszolt
            </span>
          </div>
        </div>
      ) : question.type === 'text-input' ? (
        <TextInputResults question={question} answers={answers} />
      ) : question.type === 'matching' ? (
        <div className="bg-card rounded-xl p-4 shadow-md border border-border/50 max-w-sm mx-auto">
          <h3 className="text-sm font-bold text-center mb-3 font-display text-muted-foreground uppercase tracking-wider">Párosítás sikere</h3>
          {(() => {
            const perfectCount = answers.filter(a => (a.answer as any).correctPairs === (a.answer as any).totalPairs).length;
            const avgPairs = answers.length > 0 
              ? (answers.reduce((acc, a) => acc + ((a.answer as any).correctPairs || 0), 0) / answers.length).toFixed(1)
              : 0;
            const totalPairs = (answers[0]?.answer as any)?.totalPairs || 0;

            return (
              <div className="text-center space-y-4">
                <div className="flex justify-around items-center">
                  <div className="space-y-0.5">
                    <div className="text-2xl font-black text-quiz-green">{perfectCount}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Hibátlan</div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="space-y-0.5">
                    <div className="text-2xl font-black text-primary">{avgPairs} / {totalPairs}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Átlagos</div>
                  </div>
                </div>
                <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${(Number(avgPairs) / totalPairs) * 100}%` }}
                     className="h-full bg-gradient-to-r from-primary to-quiz-green"
                   />
                </div>
              </div>
            );
          })()}
        </div>
      ) : null}
    </motion.div>
  );
};
