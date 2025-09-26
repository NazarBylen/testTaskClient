'use client';
import React, { useEffect, useState } from 'react';
import { getQuizzes, deleteQuiz } from '@/services/api';
import { Quiz } from '@/types/quizz';
import QuizCard from '../../components/QuizCard';
import Link from 'next/link';

export default function QuizzesPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getQuizzes();
                setQuizzes(data);
            } catch (err) {
                console.error(err);
                alert('Cannot load quizzes');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function handleDelete(id: number) {
        if (!confirm('Delete quiz?')) return;
        try {
            await deleteQuiz(id);
            setQuizzes(prev => prev.filter(q => q.id !== id));
        } catch (err) {
            console.error(err);
            alert('Delete failed');
        }
    }

    return (
        <div style={{ maxWidth: 900, margin: '32px auto', padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Quizzes</h1>
                <Link
                    href="/create"
                    style={{ padding: '8px 12px', background: '#2563eb', color: '#fff', borderRadius: 6 }}
                >
                    Create
                </Link>

            </div>

            {loading ? <p>Loading...</p> : (
                quizzes.length === 0 ? <p>No quizzes yet</p> : (
                    <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
                        {quizzes.map(q => <QuizCard key={q.id} quiz={q} onDelete={handleDelete} />)}
                    </div>
                )
            )}
        </div>
    );
}
