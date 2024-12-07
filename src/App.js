import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./App.css"

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataItem {
  label: string;
  value: number;
}


const dataSets: DataItem[][] = [
  [
    { label: 'Красный', value: 30 },
    { label: 'Синий', value: 20 },
    { label: 'Зеленый', value: 50 },
  ],
  [
    { label: 'Желтый', value: 40 },
    { label: 'Фиолетовый', value: 30 },
    { label: 'Оранжевый', value: 30 },
  ],
  // Добавьте больше массивов данных здесь
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(-1); // Состояние модального окна

  const handleOpenModal = (index : number ) => {
      setCurrentIndex(index);
  };
  const handleCloseModal = () => {
      setCurrentIndex(-1);
  };

  return (
      <div className="table-container">
        <table>
          <tbody>
          {dataSets.map((dataSet, index) => (
              <>
                <tr key={index}>
                  <td>
                    <p>абоба</p>
                  </td>
                  <td>
                    <button onClick={() => handleOpenModal(index)}>Показать статистику</button>
                  </td>
                </tr>
                <tr key={index + "_5"}>
                  <td>
                    {currentIndex === index && (
                        <div className="modal">
                          <div className="modal-content">
                            <button onClick={handleCloseModal}>Закрыть</button>
                            <p>Данные для отображения</p>
                            {<ChartComponent data={dataSet}/>}
                          </div>
                        </div>
                    )}
                  </td>
                </tr>

              </>
          ))}
          </tbody>
        </table>
      </div>
  );
};


const ChartComponent: React.FC<{ data: DataItem[] }> = ({data}) => {
  if (!data || data.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        // ... (остальной код для диаграммы)
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default App;

// Стиль для модального окна (в вашем файле стилей или inline)
const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
  }
}
