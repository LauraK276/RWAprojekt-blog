import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addComment(postId: number, content: string, userId: number): Promise<Comment> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const author = await this.usersRepository.findOneBy({ id: userId });
    if (!author) {
      throw new NotFoundException('User not found');
    }

    const comment = new Comment();
    comment.content = content;
    comment.author = author;
    comment.post = post;

    return this.commentsRepository.save(comment);
  }

  async getCommentsForPost(postId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { post: { id: postId } },
      relations: ['author'],
    });
  }

  async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId, author: { id: userId } },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    await this.commentsRepository.delete(commentId);
  }
}
