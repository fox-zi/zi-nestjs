export abstract class DTO {

	public abstract paramsDTO: any;
	public abstract queryDTO: any;
	public abstract bodyDTO: any;
	public abstract readonly url: string;
	public abstract readonly method: METHOD;

	public get interpolatedUrl(): string {
		let url = this.url;
		if (this.paramsDTO) {
			Object.keys(this.paramsDTO).forEach((key) => {
				url = url.replace(":" + key, String(this.paramsDTO[key]));
			});
		}
		if (this.queryDTO) {
			Object.keys(this.queryDTO).forEach((key, index) => {
				if (this.queryDTO[key]) {
					url += (index === 0 ? "?" : "&") + key + "=" + String(this.queryDTO[key]);
				}
			});
		}
		return url;
	}
}

export class ResponseDTO<T> {
	public instanceId?: string;

	constructor(
		public data: T,
		public message: string,
		public systemCode: string,
	) {
	}
}

export class ResponseNewTokenDTO {
	constructor(
		public newToken: string,
		public hashing: string,
	) {
	}
}

export enum METHOD {
	GET = "GET",
	POST = "POST",
}
