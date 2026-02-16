import { UpdatePostRequestDto } from "@/features/posts/dto/request/update-post.request.dto";

export class UpdatePostCommand {
	constructor(
		public dto: UpdatePostRequestDto,
		public postId: string,
		public userId: string
	) {}
}
