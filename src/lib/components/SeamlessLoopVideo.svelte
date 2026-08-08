<script lang="ts">
	import { onDestroy } from 'svelte';

	interface Props {
		src: string;
		class?: string;
		startTime?: number;
		fadeDuration?: number; // Crossfade duration in seconds (default 1.0s)
	}

	let { src, class: className = '', startTime = 0, fadeDuration = 1.0 }: Props = $props();

	let videoA = $state<HTMLVideoElement | null>(null);
	let videoB = $state<HTMLVideoElement | null>(null);

	let activePlayer = $state<'A' | 'B'>('A');
	let isCrossfading = $state<boolean>(false);
	let transitionTimer: ReturnType<typeof setTimeout> | null = null;
	let transitionId = 0;

	function seekToStart(video: HTMLVideoElement) {
		if (video.readyState < 1) return;

		const targetTime =
			startTime > 0 && Number.isFinite(video.duration)
				? Math.min(startTime, Math.max(0, video.duration - 0.05))
				: 0;

		if (Math.abs(video.currentTime - targetTime) > 0.05) {
			video.currentTime = targetTime;
		}
	}

	function handleLoadedMetadata(e: Event) {
		const video = e.currentTarget as HTMLVideoElement;
		if (startTime > 0 && video.currentTime <= 0.05) {
			seekToStart(video);
		}
	}

	function handleCanPlay(player: 'A' | 'B') {
		return (e: Event) => {
			if (player !== activePlayer && !isCrossfading) return;

			const video = e.currentTarget as HTMLVideoElement;
			if (video.paused && !video.ended) {
				video.play().catch(() => {});
			}
		};
	}

	function handleTimeUpdate(player: 'A' | 'B') {
		return (e: Event) => {
			if (player !== activePlayer || isCrossfading) return;
			const video = e.currentTarget as HTMLVideoElement;
			if (!video.duration) return;

			const remaining = video.duration - video.currentTime;

			// Trigger crossfade when approaching the end of current video
			if (remaining <= Math.max(0.1, fadeDuration)) {
				startCrossfade(player);
			}
		};
	}

	function handleEnded(player: 'A' | 'B') {
		return () => {
			if (player === activePlayer && !isCrossfading) {
				startCrossfade(player);
			}
		};
	}

	function recoverCurrentPlayer(player: 'A' | 'B', id: number) {
		if (id !== transitionId || player !== activePlayer) return;

		if (transitionTimer) {
			clearTimeout(transitionTimer);
			transitionTimer = null;
		}

		isCrossfading = false;
		const currentPlayer = player === 'A' ? videoA : videoB;
		if (!currentPlayer) return;

		if (currentPlayer.ended || currentPlayer.currentTime >= currentPlayer.duration - 0.05) {
			seekToStart(currentPlayer);
		}
		currentPlayer.play().catch(() => {});
	}

	function startCrossfade(player: 'A' | 'B') {
		if (player !== activePlayer || isCrossfading) return;

		const nextPlayer = player === 'A' ? videoB : videoA;
		if (!nextPlayer) return;

		isCrossfading = true;
		const id = ++transitionId;
		seekToStart(nextPlayer);

		try {
			nextPlayer.play().catch(() => recoverCurrentPlayer(player, id));
		} catch {
			recoverCurrentPlayer(player, id);
		}

		transitionTimer = setTimeout(() => {
			if (id !== transitionId) return;

			if (player === 'A') {
				activePlayer = 'B';
				videoA?.pause();
			} else {
				activePlayer = 'A';
				videoB?.pause();
			}

			isCrossfading = false;
			transitionTimer = null;
		}, Math.max(0, fadeDuration * 1000));
	}

	onDestroy(() => {
		transitionId += 1;
		if (transitionTimer) clearTimeout(transitionTimer);
	});
</script>

<div class="seamless-video-container {className}">
	<video
		bind:this={videoA}
		{src}
		autoplay
		muted
		playsinline
		preload="auto"
		onloadedmetadata={handleLoadedMetadata}
		oncanplay={handleCanPlay('A')}
		ontimeupdate={handleTimeUpdate('A')}
		onended={handleEnded('A')}
		class="video-layer {activePlayer === 'A' ? 'active' : 'inactive'}"
		style="transition: opacity {fadeDuration}s cubic-bezier(0.4, 0, 0.2, 1);"
	></video>

	<video
		bind:this={videoB}
		{src}
		muted
		playsinline
		preload="auto"
		onloadedmetadata={handleLoadedMetadata}
		oncanplay={handleCanPlay('B')}
		ontimeupdate={handleTimeUpdate('B')}
		onended={handleEnded('B')}
		class="video-layer {activePlayer === 'B' ? 'active' : 'inactive'}"
		style="transition: opacity {fadeDuration}s cubic-bezier(0.4, 0, 0.2, 1);"
	></video>
</div>

<style>
	.seamless-video-container {
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
	}
</style>
