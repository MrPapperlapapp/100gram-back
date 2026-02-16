import { applyDecorators } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOperation
} from "@nestjs/swagger";

export function CreatePostSwagger() {
	return applyDecorators(
		ApiOperation({ summary: "Создание нового поста." }),
		ApiCreatedResponse({
			description: "Пост успешно создан",
			example: {
				id: "550e8400-e29b-41d4-a716-446655440000",
				title: "My post title",
				content: "My post content",
				createdAt: "2026-02-16T12:00:00.000Z",
				photos: []
			}
		}),
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
		})
	);
}
