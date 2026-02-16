export class UploadPhotosCommand {
	constructor(
		public userId: string,
		public contentTypes: string[]
	) {}
}
