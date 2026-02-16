import { IsIn, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export enum SortDirection {
	Asc = "asc",
	Desc = "desc"
}

export class BaseQueryParams {
	@IsOptional()
	@Type(() => Number)
	pageSize: number = 10;
	@IsIn(Object.values(SortDirection))
	sortDirection: SortDirection = SortDirection.Desc;
	@IsOptional()
	@IsString()
	cursor?: string;
}
