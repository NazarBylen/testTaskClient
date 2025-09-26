'use client';
import Link from 'next/link';
import React from 'react';
import { Quiz } from '@/types/quizz';

type Props = {
    quiz: Quiz;
    onDelete?: (id: number) => void;
};

export default function QuizCard({ quiz, onDelete }: Props) {
    return (
        <div style={{
            border: '1px solid #e5e7eb', padding: 12, borderRadius: 8, display: 'flex',
            justifyContent: 'space-between', alignItems: 'center', gap: 12
        }}>
            <div>
                <Link href={`/quizzes/${quiz.id}`}>
                    {quiz.title}
                </Link>
            </div>

            {onDelete && (
                <button
                    onClick={() => onDelete(quiz.id)}
                    style={{
                        background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px',
                        borderRadius: 6, cursor: 'pointer'
                    }}
                >
                    Delete
                </button>
            )}
        </div>
    );
}
