import { Response, NextFunction } from 'express';
import { NoteService } from '../../application/services/NoteService';
import { RequestWithUser } from '../types/express';

export class NoteController {
    constructor(
        private readonly noteService: NoteService
    ) {}

    public createNote = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { content, trainingId, seriesId } = req.body;
            const note = await this.noteService.createNote(content, trainingId);
            res.status(201).json(note);
        } catch (error) {
            next(error);
        }
    };

    public getNote = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { noteId } = req.params;
            const note = await this.noteService.getNoteById(Number(noteId));
            res.status(200).json(note);
        } catch (error) {
            next(error);
        }
    };

    public updateNote = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { noteId } = req.params;
            const { content } = req.body;
            const note = await this.noteService.updateNote(Number(noteId), content);
            res.status(200).json(note);
        } catch (error) {
            next(error);
        }
    };

    public deleteNote = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { noteId } = req.params;
            await this.noteService.deleteNote(Number(noteId));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };

    public getHistory = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { trainingId, seriesId } = req.query;
            const notes = await this.noteService.getNotesByTrainingId(
                trainingId ? Number(trainingId) : undefined
            );
            res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    };
} 