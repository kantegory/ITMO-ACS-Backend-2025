export interface NoteDto {
    id: number | null;
    userId: number;
    createdAt: Date;
    editedAt: Date | null;
    content: string;
} 