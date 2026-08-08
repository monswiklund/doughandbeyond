<script lang="ts">
	import { base } from '$app/paths';
</script>

<footer class="site-footer">
	<div class="container footer-content">
		<div class="footer-brand">
			<div class="logo">DOUGH & BEYOND</div>
			<p class="tagline">Äkta napolitansk pizzaupplevelse på vårt vis – från Staplaregatan 6 i Lidköping.</p>
			
			<div class="deg-guide-box">
				<a href={`${base}/degen`} class="deg-guide-link">
					<span>Klicka här för att se hur du använder vår deg! →</span>
				</a>
			</div>

			<div class="social-block">
				<p class="social-text">Följ oss på Instagram för att hänga med på våra senaste äventyr:</p>
				<a href="https://www.instagram.com/doughandbeyond.se" target="_blank" rel="noopener" class="social-link-btn">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
					<span>@doughandbeyond.se</span>
				</a>
			</div>
		</div>

		<div class="footer-col">
			<h4>Hitta Hit</h4>
			<p>Staplaregatan 6</p>
			<p>531 30 Lidköping</p>
			<p>Telefon: 0510-123 45</p>
		</div>

		<div class="footer-col">
			<h4>Kontakt</h4>
			<p>E-post:</p>
			<a href="mailto:info@doughandbeyond.se" class="contact-email">info@doughandbeyond.se</a>
		</div>

		<div class="footer-col">
			<h4>Produkter</h4>
			<p>• Nybakad Napolitansk Pizza</p>
			<p>• Frysta pizzor – färdiga att baka av</p>
		</div>
	</div>

	<div class="footer-bottom">
		<div class="container bottom-flex">
			<p>© {new Date().getFullYear()} Dough & Beyond AB • Lidköping. Alla rättigheter förbehållna.</p>
			<p>Demo & Utvecklingsskal i SvelteKit + TypeScript.</p>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		background: #0C0A09;
		border-top: 1px solid var(--border-subtle);
		padding-top: 4rem;
		margin-top: 4rem;
	}

	.footer-content {
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr 1fr;
		gap: 3rem;
		padding-bottom: 3rem;
	}

	.logo {
		font-family: var(--font-brand);
		font-weight: 800;
		font-size: 1.3rem;
		letter-spacing: 0.1em;
		margin-bottom: 0.75rem;
		color: var(--color-dough);
	}

	.tagline {
		font-size: 0.9rem;
		margin-bottom: 1.25rem;
		color: var(--color-dough-muted);
	}

	.deg-guide-box {
		margin-bottom: 1.25rem;
	}

	.deg-guide-link {
		display: inline-block;
		color: var(--color-gold);
		font-weight: 700;
		font-size: 0.88rem;
		text-decoration: underline;
		transition: var(--transition);
	}

	.deg-guide-link:hover {
		color: #FFF;
	}

	.social-block {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.social-text {
		font-size: 0.82rem;
		color: var(--color-dough-muted);
		line-height: 1.4;
	}

	.social-link-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-dough);
		text-decoration: none;
		font-size: 0.85rem;
		font-weight: 700;
		transition: var(--transition);
	}

	.social-link-btn:hover {
		color: var(--color-gold);
	}

	.footer-col h4 {
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 1rem;
		color: var(--color-dough);
	}

	.footer-col p {
		font-size: 0.85rem;
		margin-bottom: 0.4rem;
		color: var(--color-dough-muted);
	}

	.contact-email {
		color: var(--color-gold);
		font-size: 0.88rem;
		font-weight: 700;
		text-decoration: none;
		transition: var(--transition);
	}

	.contact-email:hover {
		color: #FFF;
		text-decoration: underline;
	}

	.footer-bottom {
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		padding: 1.5rem 0;
		font-size: 0.8rem;
		color: #777;
	}

	.bottom-flex {
		display: flex;
		justify-content: space-between;
	}

	@media (max-width: 850px) {
		.footer-content {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 550px) {
		.footer-content {
			grid-template-columns: 1fr;
		}
		.bottom-flex {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
