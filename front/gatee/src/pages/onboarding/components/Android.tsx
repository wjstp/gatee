import React, {useEffect, useState} from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BeforeInstallPromptEvent } from "@type/index";

interface HandleFinishTab {
  handleFinishTab: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Android = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallPrompt(null);
      });
    }
  };

  console.log(installPrompt)
  return (
    <div className="android">
      <div className="android-header">
        <div className="android-header__part--01">
          '가티'는 앱에서 더 최적화되어 있습니다!
        </div>
        <div className="android-header__part--02">
          <div className="text--01">
            <BsThreeDotsVertical
              className="icon"
            />
            <span className="text">
              &nbsp;→ 홈 화면에 추가
            </span>
          </div>
          <div className="text--02">
            &nbsp;로 빠른 앱 실행을 해 보세요!
          </div>
        </div>

        <button onClick={handleInstallClick}>
          Install App
        </button>
      </div>
    </div>
  );
};

export default Android;