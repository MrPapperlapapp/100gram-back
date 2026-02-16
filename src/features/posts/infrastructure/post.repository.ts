import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/shared/libs/prisma";
import { UpdatePostRequestDto } from "@/features/posts/dto/request/update-post.request.dto";

@Injectable()
export class PostRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(
		data: { title: string; content?: string },
		userId: string,
		photos?: Array<{ key: string; url: string }>
	): Promise<string> {
		const { content, title } = data;
		const post = await this.prisma.post.create({
			data: {
				...(content != null && { content }),
				title,
				user: {
					connect: { id: userId }
				},
				...(photos != null &&
					photos.length > 0 && {
						photos: {
							createMany: {
								data: photos
							}
						}
					})
			}
		});

		return post.id;
	}

	async getPostById(id: string) {
		return this.prisma.post.findUnique({ where: { id } });
	}

	async deletePostById(id: string) {
		return this.prisma.post.delete({ where: { id } });
	}

	async updatePostById(id: string, dto: UpdatePostRequestDto) {
		const { content, title } = dto;
		return this.prisma.post.update({
			where: { id },
			data: {
				...(content != null && { content }),
				title
			}
		});
	}
}
