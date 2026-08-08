interface ScrollRevealOptions {
	threshold?: number;
	rootMargin?: string;
}

export function scrollReveal(node: HTMLElement, options: ScrollRevealOptions = {}) {
	const { threshold = 0.14, rootMargin = '0px 0px -8% 0px' } = options;

	if (typeof window === 'undefined') {
		return { destroy() {} };
	}

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reducedMotion || !('IntersectionObserver' in window)) {
		node.classList.add('is-visible');
		return { destroy() {} };
	}

	node.classList.add('is-pending');

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry?.isIntersecting) return;

			node.classList.add('is-visible');
			node.classList.remove('is-pending');
			observer.unobserve(node);
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
