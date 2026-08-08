<script lang="ts">
	import { onDestroy } from 'svelte';

	interface VideoItem {
		src: string;
		label: string;
		startTime?: number;
		startFromHalf?: boolean;
	}

	interface Props {
		videos: VideoItem[];
		class?: string;
		fadeDuration?: number; // Crossfade duration in seconds (default 1.2s)
		playDurationPerClip?: number; // How long to play each video before crossfading (default 5.5s)
	}

	let {
		videos,
		class: className = '',
		fadeDuration = 1.2,
		playDurationPerClip = 5.5
	}: Props = $props();

	let activeIdx = $state<number>(0);
	let isTransitioning = $state<boolean>(false);
	let videoRefs = $state<(HTMLVideoElement | null)[]>([]);
	let transitionTimer: ReturnType<typeof setTimeout> | null = null;
	let transitionId = 0;

	function getStartPos(idx: number, videoEl: HTMLVideoElement | null): number {
		const item = videos[idx];
		if (!item) return 0;
		if (item.startFromHalf && videoEl && videoEl.duration) {
			return videoEl.duration / 2;
		}
		return item.startTime || 0;
	}

	function seekToStart(idx: number, videoEl: HTMLVideoElement) {
		if (videoEl.readyState < 1) return;

		const startPos = getStartPos(idx, videoEl);
		if (Math.abs(videoEl.currentTime - startPos) > 0.05) {
			videoEl.currentTime = startPos;
		}
	}

	function handleMetadata(idx: number) {
		const el = videoRefs[idx];
		if (!el) return;
		seekToStart(idx, el);

		if (idx === activeIdx && !isTransitioning && el.paused && !el.ended) {
			el.play().catch(() => {});
		}
	}

	function handleCanPlay(idx: number) {
		return (e: Event) => {
			if (idx !== activeIdx && !isTransitioning) return;

			const el = e.currentTarget as HTMLVideoElement;
			if (el.paused && !el.ended) {
				el.play().catch(() => {});
			}
		};
	}

	function handleTimeUpdate(idx: number) {
		if (idx !== activeIdx || isTransitioning) return;
		const el = videoRefs[idx];
		if (!el || !el.duration) return;

		const startPos = getStartPos(idx, el);
		const playedTime = el.currentTime - startPos;
		const remainingInFile = el.duration - el.currentTime;

		// Trigger transition if played duration reached OR near end of file
		if (playedTime >= playDurationPerClip || remainingInFile <= Math.max(0.1, fadeDuration)) {
			transitionToNext(idx);
		}
	}

	function handleEnded(idx: number) {
		return () => {
			if (idx === activeIdx && !isTransitioning) {
				transitionToNext(idx);
			}
		};
	}

	function recoverCurrentVideo(current: number, id: number) {
		if (id !== transitionId) return;

		if (transitionTimer) {
			clearTimeout(transitionTimer);
			transitionTimer = null;
		}

		activeIdx = current;
		isTransitioning = false;
		const currentEl = videoRefs[current];
		if (!currentEl) return;

		if (currentEl.ended || currentEl.currentTime >= currentEl.duration - 0.05) {
			seekToStart(current, currentEl);
		}
		currentEl.play().catch(() => {});
	}

	function transitionToNext(current: number) {
		if (isTransitioning || videos.length === 0) return;
		isTransitioning = true;
		const id = ++transitionId;

		const next = (current + 1) % videos.length;
		const nextEl = videoRefs[next];

		if (nextEl) {
			seekToStart(next, nextEl);
			try {
				nextEl.play().catch(() => recoverCurrentVideo(current, id));
			} catch {
				recoverCurrentVideo(current, id);
			}
		}

		// Activate next layer for CSS crossfade
		activeIdx = next;

		transitionTimer = setTimeout(() => {
			if (id !== transitionId) return;

			// Pause previous layer after crossfade finishes
			const prevEl = videoRefs[current];
			if (prevEl && current !== activeIdx) {
				prevEl.pause();
			}
			isTransitioning = false;
			transitionTimer = null;
		}, fadeDuration * 1000);
	}

	onDestroy(() => {
		transitionId += 1;
		if (transitionTimer) clearTimeout(transitionTimer);
	});
</script>

<div class="multi-video-stack {className}">
	{#each videos as videoItem, idx}
		<video
			bind:this={videoRefs[idx]}
			src={videoItem.src}
			autoplay={idx === 0}
			muted
			playsinline
			preload="auto"
			onloadedmetadata={() => handleMetadata(idx)}
			oncanplay={handleCanPlay(idx)}
			ontimeupdate={() => handleTimeUpdate(idx)}
			onended={handleEnded(idx)}
			class="video-layer {activeIdx === idx ? 'active' : 'inactive'}"
			style="transition: opacity {fadeDuration}s cubic-bezier(0.4, 0, 0.2, 1);"
		></video>
	{/each}
</div>

<style>
	.multi-video-stack {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #000;
	}

	.video-layer {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.video-layer.active {
		opacity: 1;
		z-index: 2;
	}

	.video-layer.inactive {
		opacity: 0;
		z-index: 1;
		pointer-events: none;
	}
</style>
