import { PostGetPayload } from "@prisma/generated/models/Post";
import { ApiProperty } from "@nestjs/swagger";

class PhotoTypeDto {
	@ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
	id: string;

	@ApiProperty({ example: "https://cdn.example.com/photos/abc.jpg" })
	url: string;

	@ApiProperty({ example: "posts/USER_ID/UPLOAD_ID/photo.jpg" })
	key: string;
}

export class PostResponseDto {
	@ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
	id: string;

	@ApiProperty({ example: "My post title" })
	title: string;

	@ApiProperty({ example: "My post content" })
	content: string;

	@ApiProperty({ example: "2026-02-16T12:00:00.000Z" })
	createdAt: string;

	@ApiProperty({ type: [PhotoTypeDto] })
	photos: PhotoTypeDto[];

	static mapToView(post: PostGetPayload<{ include: { photos: true } }>) {
		const self = new PostResponseDto();

		self.id = post.id;
		self.title = post.title;
		self.content = post.content;
		self.createdAt = post.createdAt.toString();
		self.photos = post.photos.map((p) => ({
			id: p.id,
			url: p.url,
			key: p.key
		}));
		return self;
	}
}
