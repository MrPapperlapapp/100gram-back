import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletePostCommand } from "@/features/posts/application/commands/delete-post/delete-post.command";
import { PostRepository } from "@/features/posts/infrastructure/post.repository";
import { ForbiddenException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeletePostCommand)
export class DeletePostCommandHandler implements ICommandHandler<
	DeletePostCommand,
	void
> {
	constructor(private readonly postRepository: PostRepository) {}

	async execute({ postId, userId }: DeletePostCommand) {
		const post = await this.postRepository.getPostById(postId);
		if (!post) {
			throw new NotFoundException("Post not found.");
		}
		if (post.userId !== userId) {
			throw new ForbiddenException("Forbidden");
		}

		await this.postRepository.deletePostById(postId);
	}
}
