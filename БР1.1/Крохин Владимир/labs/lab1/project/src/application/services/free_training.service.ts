import { FreeTrainingModel } from '../domain/free-training.model';
import { SeriesModel } from '../domain/series.model';
import { NoteModel } from '../domain/note.model';
import { UserModel } from '../domain/user.model';

export class FreeTrainingService {
    addSeriesToTraining(
        training: FreeTrainingModel,
        maxShots: number
    ): SeriesModel {
        const series = new SeriesModel(maxShots);
        training.addSeries(series);
        return series;
    }

    addNoteToTraining(
        training: FreeTrainingModel,
        user: UserModel,
        content: string
    ): NoteModel {
        const note = new NoteModel(user, content);
        training.addNote(note);
        return note;
    }

    removeNoteFromTraining(
        training: FreeTrainingModel,
        note: NoteModel
    ): void {
        training.removeNote(note);
    }

    completeTraining(training: FreeTrainingModel): void {
        training.endTimeStamp = new Date();
    }
} 