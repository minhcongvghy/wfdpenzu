import {Tag} from './tag';
import {User} from './user';

export interface Album {
  id?: string;
  title?: string;
  description?: string;
  avatar?: string;
  date?: string;
  tag?: Tag;
  user?: User;
}
