'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createQuiz } from '@/services/api';
import type { QuestionType } from '@/types/quizz';

type QForm = { id: string; type: QuestionType; text: string; options: string[] };

const box = { border: '1px solid #eee', padding: 10, marginBottom: 8, borderRadius: 6 };
const btn = { padding: '6px 10px', borderRadius: 6, border: 'none' };

export default function CreatePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QForm[]>([
        { id: Date.now().toString(), type: 'input', text: '', options: [] },
    ]);

    const addQuestion = () =>
        setQuestions(s => [...s, { id: Date.now().toString(), type: 'input', text: '', options: [] }]);

    const updateQuestion = (i: number, patch: Partial<QForm>) =>
        setQuestions(s => s.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));

    const removeQuestion = (i: number) =>
        setQuestions(s => s.filter((_, idx) => idx !== i));

    const updateOption = (qi: number, oi: number, val: string) =>
        setQuestions(s =>
            s.map((q, i) =>
                i !== qi ? q : { ...q, options: q.options.map((o, j) => (j === oi ? val : o)) }
            )
        );

    const addOption = (qi: number) =>
        setQuestions(s =>
            s.map((q, i) => (i !== qi ? q : { ...q, options: [...q.options, `Option ${q.options.length + 1}`] }))
        );

    const removeOption = (qi: number, oi: number) =>
        setQuestions(s =>
            s.map((q, i) => (i !== qi ? q : { ...q, options: q.options.filter((_, j) => j !== oi) }))
        );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return alert('Title is required');
        if (!questions.length) return alert('Add at least one question');

        const payload = {
            title,
            questions: questions.map(q => ({
                type: q.type,
                text: q.text,
                options: q.type === 'boolean' ? ['True', 'False'] : q.options.filter(Boolean),
            })),
        };

        try {
            setLoading(true);
            await createQuiz(payload);
            router.push('/quizzes');
        } catch (err) {
            console.error(err);
            alert('Create failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 900, margin: '32px auto', padding: 12 }}>
            <h1>Create quiz</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: 8 }} />
                </div>

                <h3>Questions</h3>
                {questions.map((q, idx) => (
                    <div key={q.id} style={box}>
                        <label>
                            Type
                            <select
                                value={q.type}
                                onChange={e => updateQuestion(idx, { type: e.target.value as QuestionType })}
                                style={{ marginLeft: 8 }}
                            >
                                <option value="input">Input</option>
                                <option value="boolean">Boolean</option>
                                <option value="checkbox">Checkbox</option>
                            </select>
                        </label>

                        <div style={{ marginTop: 8 }}>
                            <label>Question</label>
                            <input
                                value={q.text}
                                onChange={e => updateQuestion(idx, { text: e.target.value })}
                                style={{ width: '100%', padding: 8 }}
                            />
                        </div>

                        {q.type === 'boolean' && (
                            <div style={{ marginTop: 8 }}>
                                <label><input type="radio" disabled /> True</label>
                                <label style={{ marginLeft: 12 }}><input type="radio" disabled /> False</label>
                            </div>
                        )}

                        {q.type === 'checkbox' && (
                            <div style={{ marginTop: 8 }}>
                                {q.options.map((opt, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                                        <input value={opt} onChange={e => updateOption(idx, i, e.target.value)} style={{ flex: 1, padding: 6 }} />
                                        <button type="button" onClick={() => removeOption(idx, i)} style={{ ...btn, background: '#ef4444', color: '#fff' }}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addOption(idx)} style={{ ...btn, marginTop: 6 }}>Add option</button>
                            </div>
                        )}

                        <button type="button" onClick={() => removeQuestion(idx)} style={{ ...btn, background: '#ef4444', color: '#fff', marginTop: 8 }}>
                            Remove question
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addQuestion} style={{ ...btn, marginTop: 8 }}>Add question</button>
                <div style={{ marginTop: 16 }}>
                    <button type="submit" disabled={loading} style={{ ...btn, background: '#10b981', color: '#fff', padding: '8px 12px' }}>
                        {loading ? 'Creating...' : 'Create quiz'}
                    </button>
                </div>
            </form>
        </div>
    );
}
