import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
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
          <h3 className="text-sm font-bold text-center mb-4 font-display text-muted-foreground uppercase tracking-wider">Válaszok eloszlása</h3>
          <div className="h-40 w-full">
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
                  tick={{ fontSize: 20, fontWeight: 'black' }}
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
        <div className="bg-card rounded-xl p-4 shadow-md border border-border/50">
          <h3 className="text-sm font-bold text-center mb-4 font-display text-muted-foreground uppercase tracking-wider">Szöveges válaszok</h3>
          <div className="space-y-3">
            {(() => {
              const counts: Record<string, number> = {};
              answers.forEach((a) => {
                const val = ((a.answer as any).text || '').trim();
                if (val) counts[val] = (counts[val] || 0) + 1;
              });

              const data = Object.entries(counts)
                .map(([text, count]) => ({
                  text,
                  count,
                  isCorrect: text.toLowerCase() === (question.correctAnswer || '').toLowerCase(),
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

              if (data.length === 0) return <p className="text-center text-muted-foreground py-4 text-sm">Nincsenek válaszok</p>;

              const maxCount = Math.max(...data.map(d => d.count));

              return data.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <div className="flex justify-between items-center mb-0.5 px-1 text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <MathRenderer text={item.text} />
                      {item.isCorrect && <span className="text-quiz-green font-black">✓</span>}
                    </span>
                    <span className="font-black text-primary">{item.count}</span>
                  </div>
                  <div className="h-4 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / maxCount) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full ${item.isCorrect ? 'bg-quiz-green shadow-[0_0_8px_rgba(34,197,94,0.3)]' : 'bg-primary/70'}`}
                    />
                  </div>
                </motion.div>
              ));
            })()}
          </div>
        </div>
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
