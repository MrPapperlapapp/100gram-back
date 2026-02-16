import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/shared/libs/prisma";
import {
	PostFindManyArgs,
	PostWhereInput
} from "@prisma/generated/models/Post";
import { PostResponseDto } from "@/features/posts/dto/response/post.response.dto";
import { GetPostsRequestDto } from "@/features/posts/dto/request/get-posts.request.dto";

@Injectable()
export class PostQueryRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getPosts(queries: GetPostsRequestDto, userId: string) {
		const where: PostWhereInput = {};
		if (userId) {
			where.userId = userId;
		}
		const findArgs: PostFindManyArgs = {
			where,
			take: queries.pageSize,
			orderBy: [
				{
					[queries.sortBy]: queries.sortDirection.toLowerCase()
				},
				{ id: queries.sortDirection }
			]
		};

		if (queries.cursor) {
			findArgs.cursor = { id: queries.cursor };
			findArgs.skip = 1;
		}

		const [res, totalCount] = await Promise.all([
			this.prisma.post.findMany({
				...findArgs,
				include: { photos: true }
			}),
			this.prisma.post.count({ where })
		]);
		if (!res) return { items: [], totalCount: 0 };
		const items = res.map((p) => PostResponseDto.mapToView(p));

		return { items, totalCount };
	}

	async getPostById(id: string) {
		return this.prisma.post.findUnique({
			where: { id },
			include: { photos: true }
		});
	}
}
