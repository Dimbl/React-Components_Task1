import { useState } from "react";
import styles from "./App.module.css";
import { getDateFormat, getTimeFormat } from "./utils/dateTimeFormat";

export const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const isValueValid = (word) => {
    if (word.length >= 3) {
      setError(false);
      return word;
    } else {
      setError(true);
    }
  };

  const newValue = () => {
    const promptValue = isValueValid(prompt("Введите значение"));
    if (promptValue) {
      setValue(promptValue);
    }
  };

  const addListItem = () => {
    if (value !== "") {
      const newDate = Date.now();
      const date = getDateFormat(newDate);
      const time = getTimeFormat(newDate);
      const updateList = [
        ...list,
        { id: newDate, value: value, date: date, time: time },
      ];
      setList(updateList);
      setError(false);
      setValue("");
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.pageHeading}>Ввод значения</h1>
      <p className={styles.noMarginText}>
        Текущее значение <code>value</code>: &quot;
        <output className={styles.currentValue}>{value}</output>&quot;
      </p>
      {!error ? null : (
        <div className={styles.error}>
          Введенное значение должно содержать минимум 3 символа
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={newValue}>
          Ввести новое
        </button>
        <button
          className={styles.button}
          disabled={value === ""}
          onClick={addListItem}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles.listContainer}>
        <h2 className={styles.listHeading}>Список:</h2>
        {list.length === 0 ? (
          <p className={styles.noMarginText}>Нет добавленных элементов</p>
        ) : (
          <ul className={styles.list}>
            {list.map(({ id, value, date, time }) => {
              return (
                <li className={styles.listItem} key={id}>
                  {value} ({date} / {time})
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
