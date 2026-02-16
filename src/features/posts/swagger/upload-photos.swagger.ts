import { applyDecorators } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOperation
} from "@nestjs/swagger";
import { PresignedPostUploadSessionResponseDto } from "@/features/posts/dto/response/presigned-post-upload-session.response.dto";

export function UploadPhotosSwagger() {
	return applyDecorators(
		ApiOperation({
			summary: "Инициализация загрузки фотографий для поста."
		}),
		ApiCreatedResponse({
			description: "Сессия загрузки создана",
			type: PresignedPostUploadSessionResponseDto
		}),
		ApiBadRequestResponse({
			description: "Ошибка валидации отправленных полей.",
			example: {
				message: [
					"contentTypes should not be empty",
					"contentTypes must contain at least 1 elements"
				],
				error: "Bad Request",
				statusCode: 400
			}
		})
	);
}
