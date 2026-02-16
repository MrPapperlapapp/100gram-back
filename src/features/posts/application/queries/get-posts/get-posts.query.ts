import { GetPostsRequestDto } from "@/features/posts/dto/request/get-posts.request.dto";

export class GetPostsQuery {
	constructor(
		public queries: GetPostsRequestDto,
		public userId?: string
	) {}
}
