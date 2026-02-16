export class DeletePostCommand {
	constructor(
		public postId: string,
		public userId: string
	) {}
}
