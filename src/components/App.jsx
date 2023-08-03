import React, { useState } from 'react';
import Feedback from './FeedbackWidget/FeedbackWidget';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';


const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = (type) => {
    setState((prevState) => ({ ...prevState, [type]: prevState[type] + 1 }));
  };

  const countTotalFeedback = () => {
    return state.good + state.neutral + state.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedbacks = countTotalFeedback();
    if (totalFeedbacks === 0) {
      return 0;
    }
    return (state.good / totalFeedbacks) * 100;
  };

  return (
    <div>
      <Section title="Please leave your feedback">
        <Feedback options={['good', 'neutral', 'bad']} onLeaveFeedback={handleFeedback} />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
};

export default App;
