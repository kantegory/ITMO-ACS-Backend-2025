import { QualificationTrainingModel } from '../domain/qualification-training.model';
import { SeriesModel } from '../domain/series.model';
import { NoteModel } from '../domain/note.model';
import { UserModel } from '../domain/user.model';

export class QualificationTrainingService {
    addSeriesToTraining(
        training: QualificationTrainingModel,
        maxShots: number
    ): SeriesModel {
        const series = new SeriesModel(maxShots);
        training.addSeries(series);
        return series;
    }

    addNoteToTraining(
        training: QualificationTrainingModel,
        user: UserModel,
        content: string
    ): NoteModel {
        const note = new NoteModel(user, content);
        training.addNote(note);
        return note;
    }

    removeNoteFromTraining(
        training: QualificationTrainingModel,
        note: NoteModel
    ): void {
        training.removeNote(note);
    }

    completeTraining(training: QualificationTrainingModel): void {
        training.endTimeStamp = new Date();
    }
} 