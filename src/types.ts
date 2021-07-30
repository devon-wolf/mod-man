export class ExpressError extends Error {
	status: number | undefined;
}

export interface NexusCategory {
	category_id: number,
	name: string,
	parent_category: number
}
export interface NexusGame {
	id: number,
	name: string,
	forum_url: string,
	nexusmods_url: string,
	genre: string, // consider being more specific based on what's available
	file_count: number,
	downloads: number,
	domain_name: string,
	approved_date: number,
	file_views: number,
	authors: number,
	file_endorsements: number,
	mods: number,
	categories: NexusCategory[]
}
export interface ErrorMessage {
	message: string
}
