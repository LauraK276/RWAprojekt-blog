import { UserDto } from '../users/user.dto';

export class CommentDto {
  id: number;
  content: string;
  likes: number;
  author: UserDto;

  constructor(comment: Partial<CommentDto>) {
    Object.assign(this, comment);
  }
}
