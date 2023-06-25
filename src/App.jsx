import { useEffect, useRef, useState } from 'react';
import AddOptions from './components/AddOptions';
import './css/app.css';
import Roulette from './components/Roulette';
import Initial from './components/Initial';
import Navigation from './components/Navigation';
import getTextColorByBackgroundColor from './js/getTextColoir';
import Alert from './components/Alert';

function App() {
  const [loading, setLoading] = useState(false);
  const [rouletteConfig, setRouletteConfig] = useState({});
  const [segments, setSegments] = useState(loadSegments);
  const [animation, setAnimation] = useState({
    type: 'spinToStop',
    duration: 1,
    spins: 4,
    easing: 'Power0.easeOut',
    direction: 'clockwise',
    repeat: -1,
  });
  const [spin, setSpin] = useState({
    spinning: false,
    stopping: false,
  });
  const [alertToggle, setAlertToggle] = useState(false);
  const [alertText, setAlertText] = useState('');

  const handleAlert = (alertText, hasInput) => {
    if (!!hasInput) addFormRef.current.blur();
    setAlertText(prev => (prev = alertText));
    setAlertToggle(true);
  };

  const handleAlertClose = () => {
    setAlertToggle(false);
    addFormRef.current.focus();
  };

  const addFormRef = useRef(null);

  useEffect(() => {
    setLoading(true);

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

    const handleKeyDown = e => {
      console.log(e.key);
      if (e.key === 'Enter') {
        handleAlertClose();
      }
    };

    if (alertToggle) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [segments, animation, alertToggle]);

  const handleAdd = text => {
    let hex;

    if (segments.length % 4 === 0) {
      hex = '#02366f';
    } else if (segments.length % 4 === 1) {
      hex = '#f74924';
    } else if (segments.length % 4 === 2) {
      hex = '#f8b214';
    } else {
      hex = '#01b78f';
    }

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

  const handleDelete = () => {
    const newSegments = [...segments];
    newSegments.pop();
    setSegments(newSegments);
  };

  const handleReset = () => {
    setSegments([]);
  };

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

  const handleResetRoulette = () => {
    setSpin({ spinning: false, stopping: false });
    setAnimation({
      ...animation,
      repeat: -1,
      easing: 'Power0.easeOut',
      duration: 1,
    });
  };

  function loadSegments() {
    const options = localStorage.getItem('options');
    return options ? JSON.parse(options) : [];
  }

  if (!loading) {
    return <div className='viewport'></div>;
  }

  return (
    <div className='viewport'>
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
          <AddOptions
            onAdd={handleAdd}
            onReset={handleReset}
            onAlert={handleAlert}
            addFormRef={addFormRef}
          />
          {segments.length > 0 && <Navigation onDelete={handleDelete} onReset={handleReset} />}
        </>
      )}
      <Alert alertToggle={alertToggle} onAlertClose={handleAlertClose}>
        <p>{alertText}</p>
      </Alert>
    </div>
  );
}

export default App;
