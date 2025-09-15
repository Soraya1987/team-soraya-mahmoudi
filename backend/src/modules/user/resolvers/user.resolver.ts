// src/modules/user/resolvers/user.resolver.ts
import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { AuthService } from '../services/auth.service';
import { RegisterInput, LoginInput , ResetPasswordInput, PublicUser, LoginResponse} from '../types/user.types';
//import { User } from '../entity/user.entity';
import { UserService } from '../services/user.service';

@Resolver()
@Service()
export class UserResolver {
  constructor(
    @Inject() private authService: AuthService,
    @Inject() private userService: UserService,
  ) {}

  @Mutation(() => PublicUser)
  async register(@Arg('data') data: RegisterInput): Promise<PublicUser> {
    const user = await this.authService.register(data.email, data.password, data.role);

    return {
      id: user.id,     
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  @Mutation(() => LoginResponse)
  async login(@Arg('data') data: LoginInput): Promise<LoginResponse> {
    return this.authService.login(data.email, data.password);
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Mutation(() => Boolean)
  async resetPassword(@Arg('data') data: ResetPasswordInput) {
    return this.authService.resetPassword(data.email, data.token, data.newPassword);
  }

  @Query(() => PublicUser, { nullable: true })
  async me(@Ctx() ctx: any) : Promise<PublicUser | null>{
    if (!ctx.user?.id) {
      throw new Error('Not authenticated');
    }
    const user = await this.userService.getUserById(ctx.user.id);
    if (!user) return null;

    return {
      id: user.id,      
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
