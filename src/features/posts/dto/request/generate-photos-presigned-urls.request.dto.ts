import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn } from "class-validator";

const ALLOWED_CONTENT_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp"
] as const;

export class UploadInitRequestDto {
	@ApiProperty({
		example: ["image/jpeg", "image/png", "image/jpeg"],
		type: [String],
		description: "Array of content types for images to upload",
		enum: ALLOWED_CONTENT_TYPES
	})
	@IsArray()
	@ArrayMinSize(1)
	@ArrayMaxSize(10)
	@IsIn(ALLOWED_CONTENT_TYPES, { each: true })
	contentTypes: string[];
}
