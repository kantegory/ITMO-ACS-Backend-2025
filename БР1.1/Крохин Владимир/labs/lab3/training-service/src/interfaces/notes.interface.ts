import {
  CreateNoteDto,
  NoteDto,
  UpdateNoteDto,
  CreateTrainingNoteDto,
  TrainingNoteDto,
  CreateSeriesNoteDto,
  SeriesNoteDto,
} from '../dtos/note.dto';

/**
 * Интерфейс сервиса заметок
 */
export interface INoteService {
  /**
   * Получить все заметки
   */
  getAllNotes(): Promise<NoteDto[]>;

  /**
   * Получить заметку по ID
   * @param id ID заметки
   */
  getNoteById(id: number): Promise<NoteDto>;

  /**
   * Создать новую заметку
   * @param noteData Данные заметки
   */
  createNote(noteData: CreateNoteDto): Promise<NoteDto>;

  /**
   * Обновить заметку
   * @param id ID заметки
   * @param noteData Новые данные заметки
   */
  updateNote(id: number, noteData: UpdateNoteDto): Promise<NoteDto>;

  /**
   * Удалить заметку
   * @param id ID заметки
   */
  deleteNote(id: number): Promise<void>;

  /**
   * Получить все заметки к тренировкам
   */
  getAllTrainingNotes(): Promise<TrainingNoteDto[]>;

  /**
   * Получить заметку к тренировке по ID
   * @param id ID заметки к тренировке
   */
  getTrainingNoteById(id: number): Promise<TrainingNoteDto>;

  /**
   * Создать новую заметку к тренировке
   * @param noteData Данные заметки к тренировке
   */
  createTrainingNote(noteData: CreateTrainingNoteDto): Promise<TrainingNoteDto>;

  /**
   * Удалить заметку к тренировке
   * @param id ID заметки к тренировке
   */
  deleteTrainingNote(id: number): Promise<void>;

  /**
   * Получить все заметки к сериям
   */
  getAllSeriesNotes(): Promise<SeriesNoteDto[]>;

  /**
   * Получить заметку к серии по ID
   * @param id ID заметки к серии
   */
  getSeriesNoteById(id: number): Promise<SeriesNoteDto>;

  /**
   * Создать новую заметку к серии
   * @param noteData Данные заметки к серии
   */
  createSeriesNote(noteData: CreateSeriesNoteDto): Promise<SeriesNoteDto>;

  /**
   * Удалить заметку к серии
   * @param id ID заметки к серии
   */
  deleteSeriesNote(id: number): Promise<void>;

  /**
   * Получить заметки по ID тренировки
   * @param trainingId ID тренировки
   */
  getNotesByTrainingId(trainingId: number): Promise<TrainingNoteDto[]>;

  /**
   * Получить заметки по ID серии
   * @param seriesId ID серии
   */
  getNotesBySeriesId(seriesId: number): Promise<SeriesNoteDto[]>;

  /**
   * Получить заметки по ID пользователя
   * @param userId ID пользователя
   */
  getNotesByUserId(userId: number): Promise<NoteDto[]>;

  /**
   * Получить заметки к тренировкам по ID пользователя
   * @param userId ID пользователя
   */
  getTrainingNotesByUserId(userId: number): Promise<TrainingNoteDto[]>;

  /**
   * Получить заметки к сериям по ID пользователя
   * @param userId ID пользователя
   */
  getSeriesNotesByUserId(userId: number): Promise<SeriesNoteDto[]>;
}
