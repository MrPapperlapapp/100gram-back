import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RefreshCommand } from "./refresh.command";
import { SignInResponseDto } from "@/features/auth/dto/responses/sign-in.response.dto";
import { JwtWrapperService } from "@/shared/libs/jwt/jwt.service";

@CommandHandler(RefreshCommand)
export class RefreshCommandHandler implements ICommandHandler<
	RefreshCommand,
	SignInResponseDto & {
		refreshToken: string;
	}
> {
	constructor(private readonly jwtService: JwtWrapperService) {}

	async execute({ userId }: RefreshCommand) {
		const refreshToken = this.jwtService.generateRefreshToken(userId);
		const accessToken = this.jwtService.generateAccessToken(userId);

		return Promise.resolve({ refreshToken, accessToken });
	}
}
