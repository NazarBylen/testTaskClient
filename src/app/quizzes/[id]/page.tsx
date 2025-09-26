import QuizDetailClient from './QuizDetailClient';
export default async function QuizDetailPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
    const res = await fetch(`${API}/quizzes/${id}`, {cache: 'no-store'});

    if (!res.ok) {
        return <div style={{padding: 20}}>Failed to load quiz</div>;
    }

    const quiz = await res.json();
    return <QuizDetailClient quiz={quiz}/>;
}

