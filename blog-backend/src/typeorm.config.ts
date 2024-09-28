import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { Comment } from './comments/comment.entity';
import { Like } from './likes/like.entity';
import { CommentLike } from './likes/comment-like.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'blog-db.sqlite',
  entities: [User, Post, Comment, Like, CommentLike],
  synchronize: true,
};
