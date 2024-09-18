import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
@Unique(['user', 'comment'])
export class CommentLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.commentLikes)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.commentLikes, { onDelete: 'CASCADE' })
  comment: Comment;
}
