import { useEffect, useRef } from 'react';

interface ObserverOptions {
  fetcher: () => void;
  dependency: any;
  isLoading: boolean;
}

const useObserver = (options: ObserverOptions) => {
  const { fetcher, dependency, isLoading } = options;
  const target = useRef(null);

  useEffect(() => {
    // observer 선언
    let observer: IntersectionObserver;

    // 타겟 존재하고 데이터를 불러오는 중이 아닐 때
    if (target.current && !isLoading) {

      // IntersectionObserver 생성자 할당
      observer = new IntersectionObserver(onIntersect);

      // 타켓 관찰
      observer.observe(target.current);
    }
    // 언마운트 시 연결 해제
    return () => observer && observer.disconnect();
  }, [dependency]);

  // observer가 타켓을 관찰할 때 추가 데이터를 가져오는 fetcher()를 실행
  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {

      // 0.3초 후에 실행하여 추가 데이터 렌더링
      if (entry.isIntersecting) {
        setTimeout(() => {
          fetcher();
        }, 500);
      }
    });
  };

  return { target };
}

export default useObserver;