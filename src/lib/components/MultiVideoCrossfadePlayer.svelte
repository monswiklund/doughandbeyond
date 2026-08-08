<script lang="ts">
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

	function getStartPos(idx: number, videoEl: HTMLVideoElement | null): number {
		const item = videos[idx];
		if (!item) return 0;
		if (item.startFromHalf && videoEl && videoEl.duration) {
			return videoEl.duration / 2;
		}
		return item.startTime || 0;
	}

	function handleMetadata(idx: number) {
		const el = videoRefs[idx];
		if (!el) return;
		const startPos = getStartPos(idx, el);
		if (startPos > 0) {
			el.currentTime = startPos;
		}
	}

	function handleTimeUpdate(idx: number) {
		if (idx !== activeIdx || isTransitioning) return;
		const el = videoRefs[idx];
		if (!el || !el.duration) return;

		const startPos = getStartPos(idx, el);
		const playedTime = el.currentTime - startPos;
		const remainingInFile = el.duration - el.currentTime;

		// Trigger transition if played duration reached OR near end of file
		if ((playedTime >= playDurationPerClip || remainingInFile <= fadeDuration) && remainingInFile > 0.1) {
			transitionToNext(idx);
		}
	}

	function transitionToNext(current: number) {
		if (isTransitioning) return;
		isTransitioning = true;

		const next = (current + 1) % videos.length;
		const nextEl = videoRefs[next];

		if (nextEl) {
			const startPos = getStartPos(next, nextEl);
			nextEl.currentTime = startPos;
			nextEl.play().catch(() => {});
		}

		// Activate next layer for CSS crossfade
		activeIdx = next;

		setTimeout(() => {
			// Pause previous layer after crossfade finishes
			const prevEl = videoRefs[current];
			if (prevEl && current !== activeIdx) {
				prevEl.pause();
			}
			isTransitioning = false;
		}, fadeDuration * 1000);
	}
</script>

<div class="multi-video-stack {className}">
	{#each videos as videoItem, idx}
		<video
			bind:this={videoRefs[idx]}
			src={videoItem.src}
			autoplay={idx === 0}
			muted
			playsinline
			onloadedmetadata={() => handleMetadata(idx)}
			ontimeupdate={() => handleTimeUpdate(idx)}
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
