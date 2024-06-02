import { useCallback, useEffect, useRef, useState } from "react";
import { StyledColumnList, StyledIntersection, StyledRowList } from "./styled";

interface ScrollableViewProps {
  onReachedEnd: () => void;
  reachedEnd: boolean;
  children: JSX.Element | JSX.Element[];
  loader: JSX.Element;
  style?: React.CSSProperties;
  isVertical?: boolean;
}

const ScrollableView = ({
  onReachedEnd,
  reachedEnd,
  children,
  loader,
  style,
  isVertical = false,
}: ScrollableViewProps) => {
  const intersectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const intersectionCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const intersection = entries.find(
        (entry) => entry.target === intersectionRef.current
      );

      if (!intersection) return;
      const isVisibleNow = intersection.intersectionRatio === 1;
      console.log("VISIBLE NOW", isVisibleNow);
      if (isVisibleNow && !isVisible) onReachedEnd();

      setIsVisible(isVisibleNow);
    },
    [isVisible, setIsVisible, onReachedEnd]
  );

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (intersectionRef.current) {
      observer = new IntersectionObserver(intersectionCallback, {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      });

      observer.observe(intersectionRef.current);
    }

    return () => {
      if (observer) {
        console.log("USEEFFECT Cleanup", observer);
        observer.disconnect();
      }
    };
  }, [onReachedEnd, intersectionCallback, intersectionRef]);

  return (
    <>
      {isVertical ? (
        <StyledColumnList style={style}>
          {children}
          <StyledIntersection ref={intersectionRef} />
          {isVisible && !reachedEnd ? loader : undefined}
        </StyledColumnList>
      ) : (
        <StyledRowList style={style}>
          {children}
          <StyledIntersection ref={intersectionRef} />
          {isVisible && !reachedEnd ? loader : undefined}
        </StyledRowList>
      )}
    </>
  );
};

export default ScrollableView;
