import styles from './Initial.module.scss';
import RouletteCanvas from '../RouletteCanvas/RouletteCanvas';
import getTextColorByBackgroundColor from '../hooks/useTextColorByBgc';

export default function Initial() {
  const rouletteConfig = {
    canvasId: 'canvas-default',
    numSegments: 8,
    outerRadius: 300,
    textFontSize: 25,
    responsive: false,
    lineWidth: 2,
    drawMode: 'code',
    segments: [
      {
        fillStyle: '#02366f',
        strokeStyle: '#021d38',
        text: 'Prize 1',
        textFillStyle: getTextColorByBackgroundColor('#02366f'),
      },
      {
        fillStyle: '#f74924',
        strokeStyle: '#021d38',
        text: 'Prize 2',
        textFillStyle: getTextColorByBackgroundColor('#f74924'),
      },
      {
        fillStyle: '#f8b214',
        strokeStyle: '#021d38',
        text: 'Prize 3',
        textFillStyle: getTextColorByBackgroundColor('#f8b214'),
      },
      {
        fillStyle: '#01b78f',
        strokeStyle: '#021d38',
        text: 'Prize 4',
        textFillStyle: getTextColorByBackgroundColor('#01b78f'),
      },
      {
        fillStyle: '#02366f',
        strokeStyle: '#021d38',
        text: 'Prize 5',
        textFillStyle: getTextColorByBackgroundColor('#02366f'),
      },
      {
        fillStyle: '#f74924',
        strokeStyle: '#021d38',
        text: 'Prize 6',
        textFillStyle: getTextColorByBackgroundColor('#f74924'),
      },
      {
        fillStyle: '#f8b214',
        strokeStyle: '#021d38',
        text: 'Prize 7',
        textFillStyle: getTextColorByBackgroundColor('#f8b214'),
      },
      {
        fillStyle: '#01b78f',
        strokeStyle: '#021d38',
        text: 'Prize 8',
        textFillStyle: getTextColorByBackgroundColor('#01b78f'),
      },
    ],
    animation: {
      type: 'spinAndBack',
      duration: 5,
      spins: 3,
      easing: 'Power2.easeInOut',
      stopAngle: 0,
      direction: 'clockwise',
      repeat: -1,
      yoyo: true,
    },
  };

  return (
    <section className={styles.section}>
      <hgroup>
        <h1>Roulette Event</h1>
        <p>
          사용자에게 입력 폼을 제공하여 선택지를 추가할 수 있는 룰렛 이벤트입니다. <br />
          사용자가 입력한 선택지는 동적으로 룰렛에 추가되어 화면에 표시됩니다. <br />
          선택지를 생성한 후 <span>SPIN / STOP</span> 버튼을 클릭하여 룰렛을 돌려보세요!
        </p>
      </hgroup>
      <RouletteCanvas rouletteConfig={rouletteConfig} />
    </section>
  );
}
