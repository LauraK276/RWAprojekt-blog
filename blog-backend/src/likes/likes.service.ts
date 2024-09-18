import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';
import { UserDto } from '../users/user.dto';


@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addLike(postId: number, userId: number): Promise<void> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Provjeri je li korisnik već lajkao post
    const existingLike = await this.likesRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (!existingLike) {
      const like = new Like();
      like.post = post;
      like.user = user;
      await this.likesRepository.save(like);

      // Povećaj broj lajkova
      post.likes += 1; // Ovo se odnosi na broj lajkova, ne userLikes
      await this.postsRepository.save(post);
    }
  }

  async removeLike(postId: number, userId: number): Promise<void> {
    const like = await this.likesRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likesRepository.delete(like.id);

    // Smanji broj lajkova
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (post.likes > 0) { // Ovo se odnosi na broj lajkova, ne userLikes
      post.likes -= 1;
      await this.postsRepository.save(post);
    }
  }

  async getLikesForPost(postId: number): Promise<UserDto[]> {
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
  
    const likes = await this.likesRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
    });
  
    // Vraća popis korisnika koji su lajkali post koristeći UserDto
    return likes.map(like => new UserDto({
      id: like.user.id,
      username: like.user.username,
    }));
  }

}
