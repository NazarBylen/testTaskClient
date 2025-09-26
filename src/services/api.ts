import { Quiz } from "@/types/quizz";

const API: string = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

export async function getQuizzes(): Promise<Quiz[]> {
    const res: Response = await fetch(`${API}/quizzes`);
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    return res.json();
}

export async function getQuiz(id: number | string): Promise<Quiz> {
    const res: Response = await fetch(`${API}/quizzes/${id}`);
    if (!res.ok) throw new Error("Failed to fetch quiz");
    return res.json();
}

// payload = Quiz без id (бо id генерується на бекенді)
export async function createQuiz(payload: Omit<Quiz, "id">): Promise<Quiz> {
    const res: Response = await fetch(`${API}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const text: string = await res.text();
        throw new Error("Create failed: " + text);
    }
    return res.json();
}

export async function deleteQuiz(id: number | string): Promise<{ success: boolean }> {
    const res: Response = await fetch(`${API}/quizzes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    return res.json();
}
