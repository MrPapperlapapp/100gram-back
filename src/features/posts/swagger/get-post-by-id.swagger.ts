import { applyDecorators } from "@nestjs/common";
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam
} from "@nestjs/swagger";
import { PostResponseDto } from "@/features/posts/dto/response/post.response.dto";

export function GetPostByIdSwagger() {
	return applyDecorators(
		ApiOperation({ summary: "Получение поста по ID." }),
		ApiParam({
			name: "id",
			description: "ID поста",
			example: "550e8400-e29b-41d4-a716-446655440000"
		}),
		ApiOkResponse({
			description: "Пост найден",
			type: PostResponseDto
		}),
		ApiNotFoundResponse({
			description: "Пост не найден",
			example: {
				message: "Post not found",
				error: "Not Found",
				statusCode: 404
			}
		})
	);
}
