import { applyDecorators } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiUnauthorizedResponse
} from "@nestjs/swagger";

export function UpdatePostSwagger() {
	return applyDecorators(
		ApiOperation({ summary: "Обновление поста по ID." }),
		ApiNoContentResponse({ description: "Пост успешно обновлен" }),
		ApiBadRequestResponse({
			description: "Ошибка валидации отправленных полей.",
			example: {
				message: [
					"title should not be empty",
					"title must be longer than or equal to 3 characters"
				],
				error: "Bad Request",
				statusCode: 400
			}
		}),
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
				"Пользователь не авторизован или не имеет прав на редактирование",
			example: {
				message: "Unauthorized",
				statusCode: 401
			}
		})
	);
}
