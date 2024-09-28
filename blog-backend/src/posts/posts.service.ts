/* eslint-disable prettier/prettier */
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
    console.log('createPost - userId:', authorData.userId); // Dodaj ispis userId

    const author = await this.usersRepository.findOneBy({ id: authorData.userId });
    if (!author) {
      throw new NotFoundException('User not found');
    }

    const post = new Post();
    post.title = title;
    post.content = content;
    post.author = author;

    const savedPost = await this.postsRepository.save(post);
    console.log('Post kreiran:', savedPost); // Ispis za potvrdu kreiranog posta

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
    console.log('getAllPosts - Dohvaćam sve postove'); // Ispis kad dohvaćamo sve postove
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
    console.log('getPostById - postId:', id); // Ispis postId
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'likes'], // Dodajemo 'likes' ovdje
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    console.log('Post pronađen:', post); // Ispis pronađenog posta
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
    console.log('updatePost - postId:', id); // Ispis postId
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.title = title;
    post.content = content;
    const updatedPost = await this.postsRepository.save(post);
    console.log('Post ažuriran:', updatedPost); // Ispis ažuriranog posta
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
    console.log('deletePost - postId:', id); // Ispis postId
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Post not found');
    }
    console.log('Post obrisan - postId:', id); // Potvrda brisanja
  }

  async getPostsByUser(userId: number): Promise<PostDto[]> {
    console.log('getPostsByUser - userId:', userId); // Ispis userId-a

    if (isNaN(userId)) {
      console.error('getPostsByUser - userId je NaN!'); // Ispis greške ako je userId NaN
      throw new Error('Neispravan userId: ' + userId);
    }

    const posts = await this.postsRepository.find({
      where: { author: { id: userId } },
      relations: ['author'], // Osiguraj da je relacija prema authoru ispravna
    });

    if (!posts || posts.length === 0) {
      throw new NotFoundException('No posts found for this user');
    }

    console.log('Postovi pronađeni za userId:', userId); // Ispis pronađenih postova
    return posts.map(post => new PostDto(post));
  }
}
