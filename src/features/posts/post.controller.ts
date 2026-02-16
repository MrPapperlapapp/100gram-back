import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	Req
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
	CreatePostCommand,
	DeletePostCommand,
	UpdatePostCommand,
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
import { GetPostByIdQuery } from "@/features/posts/application/queries";
import { UpdatePostRequestDto } from "@/features/posts/dto/request/update-post.request.dto";

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

	@Get(":id")
	async getPost(@Param("id") id: string) {
		return this.queryBus.execute<GetPostByIdQuery, PostResponseDto>(
			new GetPostByIdQuery(id)
		);
	}

	@Protected()
	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deletePost(@Param("id") id: string, @Req() req: Request) {
		return this.commandBus.execute<DeletePostCommand, void>(
			new DeletePostCommand(id, req.user.id)
		);
	}

	@Protected()
	@Patch(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async updatePost(
		@Param("id") id: string,
		@Body() dto: UpdatePostRequestDto,
		@Req() req: Request
	) {
		return this.commandBus.execute<UpdatePostCommand, void>(
			new UpdatePostCommand(dto, id, req.user.id)
		);
	}
}
