import { useState } from "react";
import styles from "./App.module.css";

const getDateFormat = (date, separator = ".") => {
  const newDate = new Date(date);
  let newFormatDate = newDate.getDate();
  let newFormatMonth = newDate.getMonth() + 1;
  let newFormatYear = newDate.getFullYear();
  if (newFormatDate < 10) newFormatDate = "0" + newFormatDate;
  if (newFormatMonth < 10) newFormatMonth = "0" + newFormatMonth;
  return `${newFormatDate}${separator}${newFormatMonth}${separator}${newFormatYear}`;
};

const getTimeFormat = (date, separator = ":") => {
  const newDate = new Date(date);
  let newFormatHours = newDate.getHours();
  let newFormatMinutes = newDate.getMinutes();
  let newFormatSeconds = newDate.getSeconds();
  if (newFormatHours < 10) newFormatHours = "0" + newFormatHours;
  if (newFormatMinutes < 10) newFormatMinutes = "0" + newFormatMinutes;
  if (newFormatSeconds < 10) newFormatSeconds = "0" + newFormatSeconds;
  return `${newFormatHours}${separator}${newFormatMinutes}${separator}${newFormatSeconds}`;
};

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

  const noListItems = (
    <p className={styles.noMarginText}>Нет добавленных элементов</p>
  );

  const thereIsListItems = (
    <ul className={styles.list}>
      {list.map(({ id, value, date, time }) => {
        return (
          <li className={styles.listItem} key={id}>
            {value} ({date} / {time})
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={styles.app}>
      <h1 className={styles.pageHeading}>Ввод значения</h1>
      <p className={styles.noMarginText}>
        Текущее значение <code>value</code>: "
        <output className={styles.currentValue}>{value}</output>"
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
        {list.length === 0 ? noListItems : thereIsListItems}
      </div>
    </div>
  );
};
