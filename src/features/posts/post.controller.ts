import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
	CreatePostCommand,
	UploadPhotosCommand
} from "@/features/posts/application/commands";
import { CreatePostRequestDto } from "@/features/posts/dto/request/create-post.request.dto";
import { UploadInitRequestDto } from "@/features/posts/dto/request/generate-photos-presigned-urls.request.dto";
import { PresignedPostUploadSessionResponseDto } from "@/features/posts/dto/response/presigned-post-upload-session.response.dto";
import { Protected } from "@/shared/decorators/protected.decorator";
import type { Request } from "express";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { GetPostsQuery } from "@/features/posts/application/queries/get-posts";
import { PostResponseDto } from "@/features/posts/dto/response/post.response.dto";
import { GetPostsRequestDto } from "@/features/posts/dto/request/get-posts.request.dto";

@ApiTags("posts")
@ApiBearerAuth()
@Controller("posts")
export class PostController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	@Protected()
	@Post()
	async create(
		@Body() { title, content, uploadId }: CreatePostRequestDto,
		@Req() req: Request
	) {
		return this.commandBus.execute<CreatePostCommand, void>(
			new CreatePostCommand(title, content, req.user.id, uploadId)
		);
	}

	@ApiCreatedResponse({ type: PresignedPostUploadSessionResponseDto })
	@Protected()
	@Post("upload/image")
	async uploadImage(
		@Body() { contentTypes }: UploadInitRequestDto,
		@Req() req: Request
	) {
		return this.commandBus.execute<
			UploadPhotosCommand,
			PresignedPostUploadSessionResponseDto
		>(new UploadPhotosCommand(req.user.id, contentTypes));
	}

	@Get()
	async getPosts(@Query() queries: GetPostsRequestDto) {
		return this.queryBus.execute<GetPostsQuery, PostResponseDto[]>(
			new GetPostsQuery(queries)
		);
	}
}
