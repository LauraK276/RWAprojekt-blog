// src/users/dto/user.dto.ts

  export class UserDto {
    id: number;
    username: string;
    isActive: boolean;
  
    constructor(user: Partial<UserDto>) {
      Object.assign(this, user);
    }
  }
  