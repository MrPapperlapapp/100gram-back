import { ApiProperty } from "@nestjs/swagger";

export class PaginatedResponseDto<T> {
	items: T;
	@ApiProperty()
	totalCount: number;
	@ApiProperty()
	pageSize: number;

	public static mapToView<T>(data: {
		items: T;
		size: number;
		totalCount: number;
	}): PaginatedResponseDto<T> {
		return {
			totalCount: data.totalCount,
			pageSize: data.size,
			items: data.items
		};
	}
}
