import { PostGetPayload } from "@prisma/generated/models/Post";

type PhotoType = {
	id: string;
	url: string;
	key: string;
};

export class PostResponseDto {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	photos: PhotoType[];

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
