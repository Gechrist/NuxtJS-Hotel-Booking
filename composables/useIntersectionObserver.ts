import { ref } from 'vue';
const useIntersection = () => {
  const observedElement = ref<Element | null>();
  const isVisible = ref<boolean>(false);
  const interOptions = {
    root: null,
    threshold: 0.9,
  };

  const interCallback = (entries: any) => {
    if (entries) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        isVisible.value = true;
      } else {
        isVisible.value = false;
      }
    }
  };
  const observer = new IntersectionObserver(interCallback, interOptions);
  return {
    observedElement,
    isVisible,
    interCallback,
    observer,
  };
};
export default useIntersection;
