/* eslint-disable prettier/prettier */

export class PostDto {
  id: number;
  title: string;
  content: string;
  likes: number;
  author: {
    id: number;
    username: string;
  };

  constructor(post: Partial<PostDto>) {
    Object.assign(this, post);
  }
}
