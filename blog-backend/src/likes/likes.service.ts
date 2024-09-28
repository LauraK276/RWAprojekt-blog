/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';
import { UserDto } from '../users/user.dto';
import { Post as PostEntity } from '../posts/post.entity';

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

  async addLike(postId: number, userId: number): Promise<PostEntity> {
    console.log(`Pokušavam pronaći post s ID-em: ${postId}`);
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post nije pronađen');
    }
    console.log('Pronađen post:', post);
  
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Korisnik nije pronađen');
    }
    console.log('Pronađen korisnik:', user);
  
    const existingLike = await this.likesRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
  
    if (!existingLike) {
      const like = new Like();
      like.post = post;
      like.user = user;
      await this.likesRepository.save(like);
  
      post.likes += 1; // Povećaj broj lajkova
      await this.postsRepository.save(post);
      console.log('Ažurirani broj lajkova:', post.likes);
    } else {
      console.log('Korisnik je već lajkao ovaj post.');
    }
  
    // Vraća ažurirani post
    const updatedPost = await this.postsRepository.findOneBy({ id: postId });
    console.log('Vraćam ažurirani post:', updatedPost); // Ovo bi trebalo prikazati ažurirani post
    return updatedPost;
  }

  async removeLike(postId: number, userId: number): Promise<Post> {
    const like = await this.likesRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likesRepository.delete(like.id);

    // Smanji broj lajkova
    const post = await this.postsRepository.findOneBy({ id: postId });
    if (post.likes > 0) {
      post.likes -= 1; // Smanji broj lajkova
      await this.postsRepository.save(post);
    }

    return post; // Vraća ažurirani post
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
