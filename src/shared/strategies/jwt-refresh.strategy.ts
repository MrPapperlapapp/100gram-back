import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UserRepository } from "@/features/users/infrastructure/user.repository";
import { ConfigService } from "@nestjs/config";
import { IAllConfigsInterface } from "@/core/env/interfaces";
import { Request } from "express";
import { IJwtPayload } from "@/shared/types";
import { User } from "@prisma/generated/client";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh"
) {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly configService: ConfigService<IAllConfigsInterface>
	) {
		super({
			jwtFromRequest: (req: Request) => {
				return req?.cookies?.refresh as string;
			},
			ignoreExpiration: false,
			secretOrKey: configService.get("jwt.secret", { infer: true })
		});
	}

	async validate(payload: IJwtPayload): Promise<User> {
		const user = await this.userRepository.findUserById(payload.userId);
		if (!user) throw new NotFoundException("Пользователь не найден.");
		return user;
	}
}
