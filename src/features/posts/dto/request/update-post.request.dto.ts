import { PickType } from "@nestjs/mapped-types";
import { CreatePostRequestDto } from "@/features/posts/dto/request/create-post.request.dto";

export class UpdatePostRequestDto extends PickType(CreatePostRequestDto, [
	"title",
	"content"
] as const) {}
