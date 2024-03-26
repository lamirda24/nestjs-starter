import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpadetUserDTO } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Person 1',
      email: 'person1@mail.com',
      role: 'INTERNS',
    },
    ,
    {
      id: 2,
      name: 'Person 2',
      email: 'person2@mail.com',
      role: 'INTERNS',
    },
    {
      id: 3,
      name: 'Person 3',
      email: 'person3@mail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Person 4',
      email: 'person4@mail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERNS' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const data = this.users.filter((user) => user.role === role);
      if (data?.length === 0) {
        throw new NotFoundException('Role Not Found');
      }
      return data;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user?.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  createUsers(user: CreateUserDTO) {
    const usersLastId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersLastId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, userUpdateDto: UpadetUserDTO) {
    this.users = this.users?.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdateDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  deleteUser(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
