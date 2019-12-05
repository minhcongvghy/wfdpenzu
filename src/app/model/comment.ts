import {Diary} from './diary';
import {User} from './user';

export interface Comment {
  id?: string;
  content?: string;
  date?: string;
  edit?: string;
  idDiary?: string;
  diary?: Diary;
  user?: User;
}
