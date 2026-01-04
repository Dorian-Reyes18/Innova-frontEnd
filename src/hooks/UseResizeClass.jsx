import { useEffect, useRef, useState } from "react";

const useResizeClass = ({
  breakpoint = 928,
  smallClass = "lg",
  largeClass = "xxl",
  initialClass = "lg",
} = {}) => {
  const ref = useRef(null);
  const [sizeClass, setSizeClass] = useState(initialClass);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      console.warn("useResizeClass: ref aún no asignado");
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;

      setSizeClass((prev) => {
        if (width < breakpoint && prev !== smallClass) return smallClass;
        if (width >= breakpoint && prev !== largeClass) return largeClass;
        return prev;
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [breakpoint, smallClass, largeClass]);

  return { ref, sizeClass };
};

export default useResizeClass;
