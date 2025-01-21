import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react';
import '../styling/FormatResult.css';

const formatResult = (data) => {
  if (!data || !data.analysis) return <div>Aucun résultat disponible</div>;

  const lines = data.analysis.split("\n");
  const resultComponents = [];
  let currentBox = [];

  lines.forEach((line, index) => {
    console.log(line);
    if (line.startsWith("**") && (line.endsWith("**") || line.endsWith("** ") || line.endsWith("**  "))) {
      if (currentBox.length > 0) {
        resultComponents.push(
          <div key={`box-${index}`} className="result-box">
            {currentBox}
          </div>
        );
        currentBox = [];
      }
      let title;
      if (line.endsWith("**")) {
        title = line.slice(2, -2).trim();
      } else if (line.endsWith("** ")) {
        title = line.slice(2, -3).trim();
      } else if (line.endsWith("**  ")) {
        title = line.slice(2, -4).trim();
      }
      currentBox.push(
        <h2 key={index} className="result-title">
          {title}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      currentBox.push(
        <li key={index} className="result-list-item">
          {line.slice(2).trim()}
        </li>
      );
    } else if (line.includes("%")) {
      const percentage = line.match(/\d+%/)[0];
      const value = parseInt(percentage, 10);
      currentBox.push(
        <div key={index} className="progress-bar-container">
          <CircularProgressbar
            value={value}
            text={`${percentage}`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `rgba(127, 255, 212, ${value / 100})`,
              textColor: '#ffff',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          />
        </div>
      );
    } else {
      currentBox.push(
        <p key={index} className="result-paragraph">
          {line}
        </p>
      );
    }
  });

  if (currentBox.length > 0) {
    resultComponents.push(
      <div key={`box-${lines.length}`} className="result-box">
        {currentBox}
      </div>
    );
  }

  return resultComponents;
};

export default formatResult;