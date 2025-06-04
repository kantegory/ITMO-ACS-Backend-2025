import { Repository } from 'typeorm';
import { NoteModel } from '../../../application/domain/note.model';
import { NoteRepository } from '../interfaces/note.repository';
import { NoteEntity } from './models/note.entity';
import { NoteMapper } from './models/mappers/note.mapper';

export class NoteTypeOrmRepository implements NoteRepository {
    constructor(private readonly repository: Repository<NoteEntity>) {}

    async findById(id: number): Promise<NoteModel | null> {
        const note = await this.repository.findOne({ 
            where: { id: id.toString() }, 
            relations: ['user'] 
        });
        if (!note) return null;
        return NoteMapper.toDomain(note);
    }

    async save(note: NoteModel): Promise<NoteModel> {
        const entity = NoteMapper.toEntity(note);
        const saved = await this.repository.save(entity);
        return NoteMapper.toDomain(saved);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id.toString());
    }

    async findAllByUser(userId: number): Promise<NoteModel[]> {
        const notes = await this.repository.find({
            where: { user_id: userId },
            relations: ['user'],
            order: { created_at: 'DESC' }
        });
        return notes.map(note => NoteMapper.toDomain(note));
    }

    async getHistory(id: number): Promise<NoteModel[]> {
        const notes = await this.repository.find({
            where: { id: id.toString() },
            relations: ['user'],
            order: { 
                created_at: 'DESC',
                edited_at: 'DESC'
            }
        });
        return notes.map(note => NoteMapper.toDomain(note));
    }
} 