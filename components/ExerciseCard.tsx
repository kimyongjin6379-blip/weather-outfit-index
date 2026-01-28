'use client';

import { ExerciseIndex } from '@/lib/types';

interface ExerciseCardProps {
  exercise: ExerciseIndex;
}

function getScoreColor(score: number): string {
  if (score >= 70) return '#16a34a'; // green
  if (score >= 40) return '#ca8a04'; // yellow
  return '#dc2626'; // red
}

function getLabelBadge(label: '권장' | '주의' | '비권장'): { className: string; emoji: string } {
  switch (label) {
    case '권장':
      return { className: 'badge-good', emoji: '✓' };
    case '주의':
      return { className: 'badge-moderate', emoji: '!' };
    case '비권장':
      return { className: 'badge-bad', emoji: '✕' };
  }
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const scoreColor = getScoreColor(exercise.score);
  const badge = getLabelBadge(exercise.label);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8h1a4 4 0 010 8h-1" />
          <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
        운동지수
      </h3>

      <div className="flex items-center gap-6 mb-4">
        {/* 점수 */}
        <div className="text-center">
          <div
            className="text-4xl font-bold"
            style={{ color: scoreColor }}
          >
            {exercise.score}
          </div>
          <div className="text-sm text-gray-500">/ 100</div>
        </div>

        {/* 프로그레스 바 */}
        <div className="flex-1">
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{
                width: `${exercise.score}%`,
                backgroundColor: scoreColor,
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>비권장</span>
            <span>주의</span>
            <span>권장</span>
          </div>
        </div>

        {/* 라벨 */}
        <div className={`badge ${badge.className} text-base`}>
          <span className="mr-1">{badge.emoji}</span>
          {exercise.label}
        </div>
      </div>

      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor:
            exercise.label === '권장'
              ? '#dcfce7'
              : exercise.label === '주의'
              ? '#fef9c3'
              : '#fee2e2',
        }}
      >
        <p
          className="text-sm font-medium"
          style={{
            color:
              exercise.label === '권장'
                ? '#166534'
                : exercise.label === '주의'
                ? '#854d0e'
                : '#991b1b',
          }}
        >
          {exercise.comment}
        </p>
      </div>
    </div>
  );
}
