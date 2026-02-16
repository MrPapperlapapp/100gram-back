import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPostByIdQuery } from "@/features/posts/application/queries/get-post-by-id/get-post-by-id.query";
import { PostResponseDto } from "@/features/posts/dto/response/post.response.dto";
import { PostQueryRepository } from "@/features/posts/infrastructure/post.query.repository";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetPostByIdQuery)
export class GetPostByIdQueryHandler implements IQueryHandler<
	GetPostByIdQuery,
	PostResponseDto
> {
	constructor(private readonly postQueryRepository: PostQueryRepository) {}

	async execute({ postId }: GetPostByIdQuery) {
		const post = await this.postQueryRepository.getPostById(postId);
		if (!post) {
			throw new NotFoundException("Post not found");
		}
		return PostResponseDto.mapToView(post);
	}
}
