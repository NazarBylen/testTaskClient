'use client';

import { Quiz } from '@/types/quizz';
import QuestionPreview from '@/components/QuestionPreview';

export default function QuizDetailClient({ quiz }: { quiz: Quiz }) {
    return (
        <div style={{ maxWidth: 800, margin: '32px auto', padding: 12 }}>
            <h1>{quiz.title}</h1>
            <ol style={{ marginTop: 12, paddingLeft: 18 }}>
                {quiz.questions.map((q) => (
                    <li key={q.id} style={{ marginBottom: 12 }}>
                        <QuestionPreview q={q} />
                    </li>
                ))}
            </ol>
        </div>
    );
}
