import { applyDecorators } from "@nestjs/common";
import {
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiUnauthorizedResponse
} from "@nestjs/swagger";

export function DeletePostSwagger() {
	return applyDecorators(
		ApiOperation({ summary: "Удаление поста по ID." }),
		ApiNoContentResponse({ description: "Пост успешно удален" }),
		ApiNotFoundResponse({
			description: "Пост не найден",
			example: {
				message: "Post not found",
				error: "Not Found",
				statusCode: 404
			}
		}),
		ApiUnauthorizedResponse({
			description:
				"Пользователь не авторизован или не имеет прав на удаление",
			example: {
				message: "Unauthorized",
				statusCode: 401
			}
		})
	);
}
