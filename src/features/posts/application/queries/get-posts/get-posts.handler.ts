import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPostsQuery } from "@/features/posts/application/queries/get-posts/get-posts.query";
import { PostQueryRepository } from "@/features/posts/infrastructure/post.query.repository";
import { PostResponseDto } from "@/features/posts/dto/response/post.response.dto";
import { PaginatedResponseDto } from "@/shared/dto/base-paginated.response.dto";

@QueryHandler(GetPostsQuery)
export class GetPostsQueryHandler implements IQueryHandler<
	GetPostsQuery,
	PaginatedResponseDto<PostResponseDto[]>
> {
	constructor(private readonly postQueryRepository: PostQueryRepository) {}

	async execute({ queries, userId }: GetPostsQuery) {
		const { items, totalCount } = await this.postQueryRepository.getPosts(
			queries,
			userId
		);

		return PaginatedResponseDto.mapToView({
			items,
			size: queries.pageSize,
			totalCount
		});
	}
}
