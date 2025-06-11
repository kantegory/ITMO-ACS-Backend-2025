export interface IUser {
  id: string;
  email: string;
  nickname: string;
  password_hash: string;
  google_2fa_secret?: string;
  is_2fa_enabled: boolean;
  group?: IGroup;
  group_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface IGroup {
  id: string;
  name: string;
  users: IUser[];
}

export interface ITask {
  id: string;
  number: number;
  title: string;
  description: string;
  type: ITaskType;
  type_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ITaskType {
  id: string;
  name: string;
  code: string;
  tasks: ITask[];
}

export interface ISubmission {
  id: string;
  user: IUser;
  user_id: string;
  task: ITask;
  task_id: string;
  file_path: string;
  original_filename: string;
  attachments: IAttachment[];
  created_at: Date;
  updated_at: Date;
}

export interface IAttachment {
  id: string;
  submission: ISubmission;
  submission_id: string;
  file_path: string;
  original_filename: string;
  created_at: Date;
}
