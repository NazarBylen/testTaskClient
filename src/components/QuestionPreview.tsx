import type { Question } from '@/types/quizz';

export default function QuestionPreview({ q }: { q: Question }) {
    const groupName = `q-${q.id ?? Math.random().toString(36).slice(2, 8)}`;

    return (
        <div style={{ padding: 8, border: '1px dashed #e5e7eb', borderRadius: 6 }}>
            <div style={{ fontWeight: 600 }}>{q.text}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{q.type}</div>

            {q.type === 'input' && (
                <input
                    type="text"
                    placeholder="Type your answer..."
                    disabled
                    style={{ marginTop: 8, width: '100%' }}
                />
            )}

            {q.type === 'boolean' && (
                <div style={{ marginTop: 8 }}>
                    <label>
                        <input
                            type="radio"
                            name={groupName}
                            disabled
                        />{' '}
                        True
                    </label>
                    <label style={{ marginLeft: 12 }}>
                        <input
                            type="radio"
                            name={groupName}
                            disabled
                        />{' '}
                        False
                    </label>
                </div>
            )}

            {q.type === 'checkbox' && (
                <div style={{ marginTop: 8 }}>
                    {(q.options || []).map((o, i) => (
                        <label key={i} style={{ display: 'block' }}>
                            <input type="checkbox" disabled /> {o}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
