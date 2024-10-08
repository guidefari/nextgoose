"use client";
import React, {
	createContext,
	type ReactNode,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { Track } from "../types";

const AudioContext = createContext<AudioPlayerContext | null>(null);

export const useAudioPlayerContext = (): AudioPlayerContext => {
	const context = React.useContext(AudioContext);
	if (context === null) {
		throw new Error(
			"useAudioPlayerContext must be used within an AudioProvider",
		);
	}
	return context;
};

export const AudioProvider = ({ children }: Props) => {
	const audioRef: HTMLAudioElement | null = useMemo(
		() => (typeof window === "undefined" ? null : new Audio()),
		[],
	);
	const [playAudio, setPlayAudio] = useState(false);
	const [thumbnailUrl, setThumbnailUrl] = useState("");
	const [progress, setProgress] = useState(0);
	const [nowPlayingContext, setNowPlayingContext] = useState<NowPlayingContext>(
		{
			url: typeof window === "undefined" ? "/" : window.location.pathname,
		},
	);

	useEffect(() => {
		if (audioRef) {
			audioRef.onended = () => {
				handlers.pause();
			};
			audioRef.ontimeupdate = handleTimeUpdate;
		}
	}, [audioRef]);

	const handleTimeUpdate = () => {
		if (audioRef) {
			const progress = (audioRef.currentTime / audioRef.duration) * 100 || 0;
			setProgress(progress);
		}
	};

	const handlers = React.useMemo(
		() => ({
			play: () => {
				setPlayAudio(true);
				audioRef?.play();
				setNowPlayingContext({
					...nowPlayingContext,
					url: window.location.pathname,
				});
			},
			pause: () => {
				setPlayAudio(false);
				audioRef?.pause();
			},
			togglePlayPause: () => setPlayAudio(!playAudio),
			handleAlbumArtClick: (src: string, thumbnailUrl: string) => {
				if (!audioRef) return;
				if (!src) {
					alert("Yo, there's no preview audio for this one");
				} else if (src === audioRef.src && playAudio === false) {
					handlers.play();
				} else if (src === audioRef.src) {
					handlers.pause();
				} else {
					audioRef.src = src;
					if (thumbnailUrl) {
						setThumbnailUrl(thumbnailUrl);
					}
					handlers.play();
				}
			},
			jumpForward: () => {
				if (!audioRef || !audioRef.src) return;
				audioRef.currentTime += 30;
			},
			jumpBackward: () => {
				if (!audioRef || !audioRef.src) return;
				audioRef.currentTime -= 15;
			},
			setTimeUsingPercentage: (percentage: number) => {
				if (!audioRef) return;
				setProgress(percentage);
				audioRef.currentTime = (percentage / 100) * audioRef.duration;
			},
		}),
		[audioRef, playAudio, nowPlayingContext],
	);

	const contextValue = useMemo<AudioPlayerContext>(
		() => [
			audioRef,
			handlers,
			playAudio,
			thumbnailUrl,
			progress,
			nowPlayingContext,
		],
		[audioRef, handlers, playAudio, thumbnailUrl, progress, nowPlayingContext],
	);

	return (
		<AudioContext.Provider value={contextValue}>
			{children}
		</AudioContext.Provider>
	);
};

type AudioPlayerContext = [
	audioRef: HTMLAudioElement | null,
	handlers: {
		play: () => void;
		pause: () => void;
		togglePlayPause: () => void;
		handleAlbumArtClick: (src: string, thumbnailUrl: string) => void;
		jumpForward: () => void;
		jumpBackward: () => void;
		setTimeUsingPercentage: (percentage: number) => void;
	},
	playAudio: boolean,
	thumbnailUrl: string,
	progress: number,
	nowPlayingContext: NowPlayingContext,
];

type Props = {
	children: ReactNode;
};

type NowPlayingContext = {
	url: string;
	// tracklist: NowPlayingTrack[]
};

interface NowPlayingTrack
	extends Required<
		Pick<Track, "albumImageUrl" | "title" | "trackUrl" | "artists">
	> {
	queuedByUrl: string;
}
