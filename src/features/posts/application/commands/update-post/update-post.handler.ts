import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePostCommand } from "@/features/posts/application/commands/update-post/update-post.command";
import { PostRepository } from "@/features/posts/infrastructure/post.repository";
import { ForbiddenException, NotFoundException } from "@nestjs/common";

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler implements ICommandHandler<
	UpdatePostCommand,
	void
> {
	constructor(private readonly postRepository: PostRepository) {}

	async execute({ userId, postId, dto }: UpdatePostCommand) {
		const post = await this.postRepository.getPostById(postId);
		if (!post) {
			throw new NotFoundException("Post not found.()");
		}
		if (post.userId !== userId) {
			throw new ForbiddenException("Forbidden()");
		}

		await this.postRepository.updatePostById(postId, dto);
	}
}
