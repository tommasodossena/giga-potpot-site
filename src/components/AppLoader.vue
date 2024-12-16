<script setup lang="ts">
import { gsap } from "gsap";
import { LOADER_ANIMATION, POT, EASINGS } from "@/lib/constants";
import pot1 from "@/assets/images/pot-1.png";
import pot2 from "@/assets/images/pot-2.png";
import pot3 from "@/assets/images/pot-3.png";
import pot4 from "@/assets/images/pot-4.png";
import pot5 from "@/assets/images/pot-5.png";
import pot6 from "@/assets/images/pot-6.png";

const props = defineProps<{
	isVisible: boolean;
}>();

const emit = defineEmits<{
	"loading-complete": [];
}>();

const hintText = ref<HTMLElement | null>(null);

let lastMouseX = 0;
let lastMouseY = 0;
let lastPotTime = 0;

const potImages = [pot1, pot2, pot3, pot4, pot5, pot6];

function animateLoader() {
	// First rotation
	gsap.to(".loader", {
		rotate: "+=180",
		duration: LOADER_ANIMATION.ROTATION_DURATION,
		ease: EASINGS.ROTATION,
		onComplete: () => {
			// Second rotation
			gsap.to(".loader", {
				rotate: "+=180",
				duration: LOADER_ANIMATION.ROTATION_DURATION,
				ease: EASINGS.ROTATION,
				onComplete: () => {
					// Scale down
					animateHintText();
					gsap.to(".loader", {
						scale: 0,
						duration: LOADER_ANIMATION.SCALE_DURATION,
						ease: EASINGS.SCALE,
						onComplete: () => emit("loading-complete"),
					});
				},
			});
		},
	});
}

function animatePreloader() {
	gsap.to(".preloader", {
		clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
		duration: LOADER_ANIMATION.CLIP_PATH_DURATION,
		ease: EASINGS.CLIP_PATH,
	});
}

function animateHintText() {
	gsap.to(hintText.value, {
		opacity: 0,
		duration: 1,
		ease: "power2.in",
	});
}

function createPot(mouseX: number, mouseY: number) {
	const potElement = document.createElement("div");
	const size = POT.SIZES[Math.floor(Math.random() * POT.SIZES.length)];
	const potVariant = Math.floor(Math.random() * POT.VARIANTS);

	const imgElement = document.createElement("img");
	imgElement.src = potImages[potVariant];
	imgElement.style.width = "100%";
	imgElement.style.height = "100%";
	imgElement.style.objectFit = "contain";

	potElement.classList.add("pot");
	potElement.style.width = `${size}px`;
	potElement.style.height = `${size}px`;
	potElement.style.position = "absolute";
	potElement.style.transform = "translate(-50%, -50%)";
	potElement.style.left = `${mouseX}px`;
	potElement.style.top = `${mouseY}px`;

	potElement.appendChild(imgElement);
	document.querySelector(".pots")?.appendChild(potElement);

	const initialRotation =
		POT.ROTATIONS[Math.floor(Math.random() * POT.ROTATIONS.length)];
	const timeline = gsap.timeline();

	const currentTime = Date.now();
	const delayFromLastPot =
		Math.max(0, POT.FALL_DELAY - (currentTime - lastPotTime)) / 1000;

	gsap.set(potElement, {
		scale: 0,
		rotate: initialRotation,
	});

	timeline
		.to(potElement, {
			scale: 1,
			rotation: 0,
			duration: 0.5,
			ease: EASINGS.POT_IN,
		})
		.to(potElement, {
			y: window.innerHeight + size,
			rotation: initialRotation,
			duration: 0.5,
			ease: EASINGS.POT_OUT,
			delay: POT.WAIT_TIME / 1000 + delayFromLastPot,
			onComplete: () => {
				potElement.remove();
			},
		});

	return currentTime;
}

onMounted(() => {
	animateLoader();
	animatePreloader();

	window.addEventListener("mousemove", (event) => {
		if (!props.isVisible) return;

		const currentX = event.clientX;
		const currentY = event.clientY;

		const distance = Math.sqrt(
			(currentX - lastMouseX) ** 2 + (currentY - lastMouseY) ** 2,
		);

		if (distance > POT.MOUSE_DISTANCE) {
			lastPotTime = createPot(currentX, currentY);
			lastMouseX = currentX;
			lastMouseY = currentY;
		}
	});
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="props.isVisible"
      class="fixed inset-0 z-50 grid place-content-center bg-background"
    >
      <div class="preloader">
        <div class="grid place-content-center">
          <div class="loader" />
        </div>

        <p class="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-md text-muted-foreground transition-opacity duration-300" ref="hintText">
          (Move around to summon magical pots)
        </p>
      </div>

      <div class="pots" />
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.preloader {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: grid;
  place-content: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  will-change: clip-path;
  overflow: hidden;
  z-index: 1;
}

.loader {
  position: relative;
  width: 40px;
  height: 40px;
  background-color: #999999;
  will-change: transform;
}

.pots {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.pot {
  position: absolute;
  border-radius: 100%;
  overflow: hidden;
  pointer-events: none;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
