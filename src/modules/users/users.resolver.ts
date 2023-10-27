import { Query, Mutation, Args, Resolver } from '@nestjs/graphql'
import {User} from './entities/user'
import { Status } from './entities/status'
import { UserService } from './users.service'
import { CreateUserInput } from './dto/inputs/createUser.input'

@Resolver(() => User)
export class UsersResolver {

    constructor(private readonly userService: UserService) {}
    
    @Query(() => Status)
    status() {
      return this.userService.getStatus()
    }

    @Mutation(() => User)
    createUser(@Args('createUserData') createUserData: CreateUserInput){
      return this.userService.createUserRecord(createUserData)
    }
}