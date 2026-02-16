import { BaseQueryParams } from "@/shared/dto/base-query.request.dto";
import { IsIn } from "class-validator";

export enum PostSortBy {
	CreatedAt = "createdAt",
	Title = "title",
	Content = "content"
}

export class GetPostsRequestDto extends BaseQueryParams {
	constructor() {
		super();
		this.pageSize = 8;
	}
	@IsIn(Object.values(PostSortBy))
	sortBy: PostSortBy = PostSortBy.CreatedAt;
}
