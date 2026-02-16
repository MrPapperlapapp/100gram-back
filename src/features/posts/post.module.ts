import { Module } from "@nestjs/common";
import { PostController } from "@/features/posts/post.controller";
import { PostRepository } from "@/features/posts/infrastructure/post.repository";
import { PostPhotoUploadRepository } from "@/features/posts/infrastructure/post-photo-upload.repository";
import {
	CreatePostCommandHandler,
	UploadPhotosHandler
} from "@/features/posts/application/commands";
import { StorageModule } from "@/shared/libs/storage/storage.module";
import { PostQueryRepository } from "@/features/posts/infrastructure/post.query.repository";
import { GetPostsQueryHandler } from "@/features/posts/application/queries/get-posts";

const commands = [CreatePostCommandHandler, UploadPhotosHandler];
const queries = [GetPostsQueryHandler];

@Module({
	imports: [StorageModule],
	controllers: [PostController],
	providers: [
		PostRepository,
		PostQueryRepository,
		PostPhotoUploadRepository,
		...commands,
		...queries
	]
})
export class PostModule {}
