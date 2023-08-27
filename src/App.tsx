import { useEffect, useState } from 'react';
import './App.css';
import Roulette from './components/Roulette/Roulette';
import { WheelAnimation, WheelConfig, WheelSegment } from './model/types';
import AddForm from './components/AddForm/AddForm';
import RemoveBtns from './components/RemoveBtns/RemoveBtns';
import Initial from './components/Initial/Initial';
import Loading from './components/Loading/Loading';
import Alert from './components/Alert/Alert';
import getTextColorByBackgroundColor from './components/hooks/useTextColorByBgc';

interface Spin {
  spinning: boolean;
  stopping: boolean;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [rouletteConfig, setRouletteConfig] = useState<WheelConfig>({
    canvasId: 'canvas-roulette',
    numSegments: 0,
    outerRadius: 300,
    textFontSize: 25,
    responsive: false,
    lineWidth: 2,
    drawMode: 'code',
    segments: [],
    animation: {
      type: 'spinToStop',
      duration: 1,
      spins: 4,
      easing: 'Power0.easeOut',
      direction: 'clockwise',
      repeat: -1,
    },
  });
  const [segments, setSegments] = useState<WheelSegment[]>(loadSegments);
  const [animation, setAnimation] = useState<WheelAnimation>({
    type: 'spinToStop',
    duration: 1,
    spins: 4,
    easing: 'Power0.easeOut',
    direction: 'clockwise',
    repeat: -1,
  });
  const [spin, setSpin] = useState<Spin>({ spinning: false, stopping: false });
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertText, setAlertText] = useState('');

  // Alert
  const handleAlert = (alertText: string): void => {
    setAlertText(alertText);
    setAlertToggle(true);
  };

  const handleAlertClose = () => {
    setAlertToggle(false);
  };

  // 세그먼트 추가
  const handleAdd = (text: string): void => {
    const hex = setSegementBgColor(segments.length);
    const newSegment = {
      fillStyle: hex,
      text,
      strokeStyle: '#021d38',
      textFillStyle: getTextColorByBackgroundColor(hex),
    };
    if (segments.length >= 25) {
      handleAlert('선택지는 25개 이상 생성할 수 없습니다.');
      return;
    }

    setSegments(prev => [...prev, newSegment]);
  };

  // 세그먼트 삭제
  const handleDelete = () => {
    const newSegments = [...segments];
    newSegments.pop();
    setSegments(newSegments);
  };

  // 세그먼트 리셋
  const handleReset = () => {
    setSegments([]);
  };

  // 동작 & 멈춤
  const handleStartAndStop = () => {
    if (segments.length <= 1) {
      handleAlert('선택지는 2개 이상 작성해주세요.');
      return;
    }

    if (spin.stopping) return;

    if (!spin.spinning) {
      setSpin({ spinning: true, stopping: false });
    } else {
      setAnimation({ ...animation, repeat: 0, easing: 'Power3.easeOut', duration: 5 });
      setSpin({ spinning: true, stopping: true });
    }
  };

  // 룰렛 초기화
  const handleResetRoulette = () => {
    setSpin({ spinning: false, stopping: false });
    setAnimation({
      ...animation,
      repeat: -1,
      easing: 'Power0.easeOut',
      duration: 1,
    });
  };

  useEffect(() => {
    localStorage.setItem('options', JSON.stringify(segments));

    if (segments.length === 0) return;

    setRouletteConfig({
      canvasId: 'canvas-roulette',
      numSegments: segments.length,
      outerRadius: 300,
      textFontSize: 25,
      responsive: false,
      lineWidth: 2,
      drawMode: 'code',
      segments,
      animation,
    });

    const handleKeyDown = (e: KeyboardEvent): void => {
      console.log(e.code);
      if (e.code === 'Enter') handleAlertClose();
    };

    if (alertToggle) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [segments, animation, alertToggle]);

  // 로컬스토리지에서 segment 가져오기
  function loadSegments() {
    const options = localStorage.getItem('options');
    return options ? JSON.parse(options) : [];
  }

  // 세그먼트 BG컬러 변경
  const setSegementBgColor = (segmentsLength: number): string => {
    let hex;

    if (segmentsLength % 4 === 0) {
      hex = '#02366f';
    } else if (segmentsLength % 4 === 1) {
      hex = '#f74924';
    } else if (segmentsLength % 4 === 2) {
      hex = '#f8b214';
    } else {
      hex = '#01b78f';
    }

    return hex;
  };

  useEffect(() => {
    if (!loading) return;
    const delay = 1000;
    const timeoutId = setTimeout(() => {
      setLoading(prev => !prev);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading]);

  if (loading) return <Loading />;

  return (
    <main className='viewport'>
      {segments.length === 0 ? (
        <Initial />
      ) : (
        <Roulette
          rouletteConfig={rouletteConfig}
          onStartAndStop={handleStartAndStop}
          onResetRoulette={handleResetRoulette}
          onAlert={handleAlert}
          spin={spin}
        />
      )}

      {!spin.spinning && (
        <>
          <AddForm onAdd={handleAdd} onReset={handleReset} />
          {segments.length > 0 && <RemoveBtns onDelete={handleDelete} onReset={handleReset} />}
        </>
      )}

      <Alert alertToggle={alertToggle} onAlertClose={handleAlertClose}>
        <p>{alertText}</p>
      </Alert>
    </main>
  );
}

export default App;
