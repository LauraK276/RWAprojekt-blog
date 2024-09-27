import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { PostDto } from './post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Dodaj UsersRepository
  ) {}

  async createPost(title: string, content: string, authorData: { userId: number }): Promise<PostDto> {
    const author = await this.usersRepository.findOneBy({ id: authorData.userId });
    if (!author) {
      throw new NotFoundException('User not found');
    }

    const post = new Post();
    post.title = title;
    post.content = content;
    post.author = author;

    const savedPost = await this.postsRepository.save(post);
    return new PostDto({
      id: savedPost.id,
      title: savedPost.title,
      content: savedPost.content,
      likes: savedPost.likes,
      author: {
        id: author.id,
        username: author.username,
      },
    });
}
  

async getAllPosts(): Promise<PostDto[]> {
    const posts = await this.postsRepository.find({ relations: ['author'] });
    return posts.map(post => new PostDto({
      id: post.id,
      title: post.title,
      content: post.content,
      likes: post.likes,
      author: {
        id: post.author.id,
        username: post.author.username,
      },
    }));
  }
  

  async getPostById(id: number): Promise<PostDto> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return new PostDto({
      id: post.id,
      title: post.title,
      content: post.content,
      likes: post.likes,
      author: {
        id: post.author.id,
        username: post.author.username,
      },
    });
  }
  

  async updatePost(id: number, title: string, content: string): Promise<PostDto> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.title = title;
    post.content = content;
    const updatedPost = await this.postsRepository.save(post);
    return new PostDto({
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      likes: updatedPost.likes,
      author: {
        id: updatedPost.author.id,
        username: updatedPost.author.username,
      },
    });
  }
  
  

  async deletePost(id: number): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Post not found');
    }
  }
  
  
}