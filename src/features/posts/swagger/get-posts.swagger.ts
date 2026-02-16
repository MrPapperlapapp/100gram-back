import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { PostResponseDto } from "@/features/posts/dto/response/post.response.dto";

export function GetPostsSwagger() {
	return applyDecorators(
		ApiOperation({ summary: "Получение списка постов с пагинацией." }),
		ApiQuery({
			name: "pageSize",
			required: false,
			type: Number,
			description: "Количество элементов на странице",
			example: 8
		}),
		ApiQuery({
			name: "sortBy",
			required: false,
			type: String,
			enum: ["createdAt", "title", "content"],
			description: "Поле для сортировки",
			example: "createdAt"
		}),
		ApiQuery({
			name: "sortDirection",
			required: false,
			type: String,
			enum: ["asc", "desc"],
			description: "Направление сортировки",
			example: "desc"
		}),
		ApiOkResponse({
			description: "Список постов",
			type: [PostResponseDto]
		})
	);
}
