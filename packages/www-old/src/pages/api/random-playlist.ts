import type { NextApiRequest, NextApiResponse } from "next";
import { getUsersPlaylists } from "../../lib/spotify";
import { getSession } from "next-auth/react";
import type { PlaylistInput, PlaylistResponse } from "@/types";
import { Session } from "next-auth";

const stringsss: string[] = [];
let looping = true;

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
	const session = await getSession({ req });
	if (!session || !session.token) {
		return res.status(401).json("Unauthorized");
	}

	const { accessToken, sub } = session.token;

	await getBatch({ refresh_token: accessToken, user_id: sub });

	if (!looping) {
		const random = stringsss[Math.floor(Math.random() * stringsss.length)];
		return res.status(200).redirect(random);
	}
};

export default handler;

const getBatch = async ({
	offset,
	refresh_token,
	user_id,
	next_url,
}: PlaylistInput): Promise<void> => {
	const response = await getUsersPlaylists({
		refresh_token,
		user_id,
		offset,
		next_url,
	});
	const stuffToClean: PlaylistResponse = await response.json();
	const clean = await cleanShitUp(stuffToClean);
	stringsss.push(...clean);
	if (stuffToClean.next) {
		await getBatch({ refresh_token, user_id, next_url: stuffToClean.next });
	}

	looping = false;
};

const cleanShitUp = async (stuff: PlaylistResponse) => {
	return stuff.items.map((item) => item.external_urls.spotify);
};