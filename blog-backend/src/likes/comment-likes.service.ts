import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentLike } from './comment-like.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectRepository(CommentLike)
    private commentLikesRepository: Repository<CommentLike>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addLike(commentId: number, userId: number): Promise<void> {
    const comment = await this.commentsRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Provjeri je li korisnik već lajkao komentar
    const existingLike = await this.commentLikesRepository.findOne({
      where: { comment: { id: commentId }, user: { id: userId } },
    });

    if (!existingLike) {
      const like = new CommentLike();
      like.comment = comment;
      like.user = user;
      await this.commentLikesRepository.save(like);

      // Povećaj broj lajkova
      comment.likes += 1;
      await this.commentsRepository.save(comment);
    }
  }

  async removeLike(commentId: number, userId: number): Promise<void> {
    const like = await this.commentLikesRepository.findOne({
      where: { comment: { id: commentId }, user: { id: userId } },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.commentLikesRepository.delete(like.id);

    // Smanji broj lajkova
    const comment = await this.commentsRepository.findOneBy({ id: commentId });
    if (comment.likes > 0) {
      comment.likes -= 1;
      await this.commentsRepository.save(comment);
    }
  }
}
