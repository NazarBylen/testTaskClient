import Link from 'next/link';

export default function HomePage() {
    return (
        <main style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
            <h1>Quiz Builder</h1>
            <p>Welcome — use the links below to view or create quizzes.</p>
            <nav style={{ marginTop: 20, display: 'flex', gap: 16 }}>
                <Link href="/quizzes" style={{ padding: '8px 12px', background: 'var(--accent)', color: '#fff', borderRadius: 6 }}>View Quizzes</Link>
                <Link href="/create" style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb' }}>Create Quiz</Link>
            </nav>
        </main>
    );
}
