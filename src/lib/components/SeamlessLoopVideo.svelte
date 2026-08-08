<script lang="ts">
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

	function handleLoadedMetadata(e: Event) {
		const video = e.currentTarget as HTMLVideoElement;
		if (startTime > 0 && video.currentTime === 0) {
			video.currentTime = startTime;
		}
	}

	function handleTimeUpdate(player: 'A' | 'B') {
		return (e: Event) => {
			if (player !== activePlayer || isCrossfading) return;
			const video = e.currentTarget as HTMLVideoElement;
			if (!video.duration) return;

			const remaining = video.duration - video.currentTime;

			// Trigger crossfade when approaching the end of current video
			if (remaining <= fadeDuration && remaining > 0.05) {
				isCrossfading = true;

				const nextPlayer = player === 'A' ? videoB : videoA;
				if (nextPlayer) {
					nextPlayer.currentTime = startTime;
					nextPlayer.play().catch(() => {});
				}

				setTimeout(() => {
					if (player === 'A') {
						activePlayer = 'B';
						videoA?.pause();
					} else {
						activePlayer = 'A';
						videoB?.pause();
					}
					isCrossfading = false;
				}, fadeDuration * 1000);
			}
		};
	}
</script>

<div class="seamless-video-container {className}">
	<video
		bind:this={videoA}
		{src}
		autoplay
		muted
		playsinline
		onloadedmetadata={handleLoadedMetadata}
		ontimeupdate={handleTimeUpdate('A')}
		class="video-layer {activePlayer === 'A' ? 'active' : 'inactive'}"
		style="transition: opacity {fadeDuration}s cubic-bezier(0.4, 0, 0.2, 1);"
	></video>

	<video
		bind:this={videoB}
		{src}
		muted
		playsinline
		onloadedmetadata={handleLoadedMetadata}
		ontimeupdate={handleTimeUpdate('B')}
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
