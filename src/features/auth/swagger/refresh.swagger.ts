import { applyDecorators } from "@nestjs/common";
import {
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { SignInResponseDto } from "@/features/auth/dto/responses/sign-in.response.dto";

export function RefreshSwagger() {
	return applyDecorators(
		ApiOperation({ summary: "Обновление пары ключей по refresh cookie" }),
		ApiOkResponse({ description: "Успешно", type: SignInResponseDto }),
		ApiUnauthorizedResponse({
			description: "Не валидный refresh token в refresh cookie",
			example: {
				message: "Unauthorized",
				statusCode: 401
			}
		})
	);
}
