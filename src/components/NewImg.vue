<template>
  <div class="relative flex overflow-x-hidden">
    <div class="animate-marquee whitespace-nowrap">
      <div v-for="(image, index) in repeatedImages" :key="index" class="w-60 h-60 inline-block">
        <div :class="getRandomBackgroundColor()" class="w-full h-full inline-flex items-center justify-center">
          <img :src="image" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <div class="absolute top-0 animate-marquee2 whitespace-nowrap">
      <div v-for="(image, index) in repeatedImages" :key="index" class="w-60 h-60 inline-block">
        <div :class="getRandomBackgroundColor()" class="w-full h-full inline-flex items-center justify-center">
          <img :src="image" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repeatedImages: [],
      numImages: 10,
    };
  },
  created() {
    for (let i = 0; i < this.numImages; i++) {
      this.repeatedImages.push(
        "https://robohash.org/" + i + ".png?set=set2&size=400x400"
      );
    }

    // Duplicate images to create a circular loop
    this.repeatedImages = [...this.repeatedImages, ...this.repeatedImages];
  },
  methods: {
    getRandomBackgroundColor() {
      // Generate a random Tailwind CSS background color class
      const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-indigo-200'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    }
  }
};
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.animate-marquee2 {
  animation: marquee2 40s linear infinite;
}
</style>
