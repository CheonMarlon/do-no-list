import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function MainToDo() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const now = Date.now();

    tasks.forEach(task => {
      if (task.completed) return;

      const daysOld = Math.floor((now - new Date(task.createdAt)) / (1000 * 60 * 60 * 24));
      if (daysOld >= 1) {
        const smackTalk = getSmackTalk(daysOld);
        toast.warn(smackTalk, {
          position: 'bottom-right',
          autoClose: 5000,
        });
      }
    });
  }, [tasks]);

  const getEntryRoast = () => {
    const roasts = [
      "Oh wow, *another* task you’re gonna ignore?",
      "Cute. Like you’ll actually do this one.",
      "You're just collecting guilt at this point.",
      "Ambitious of you. Delusional, but ambitious.",
      "Adding tasks doesn’t count as productivity, champ.",
      "You love the illusion of progress, don’t you?",
      "Welcome to your growing list of shame.",
      "Another one? You couldn’t handle the last 3.",
      "Sure, add it. Pretend you'll finish it.",
    ];
    return roasts[Math.floor(Math.random() * roasts.length)];
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask.trim(),
      createdAt: new Date().toISOString(),
      completed: false,
    };

    setTasks(prev => [...prev, task]);
    setNewTask('');

    const roast = getEntryRoast();
    toast.info(roast, {
      position: 'top-center',
      autoClose: 4000,
      closeOnClick: true,
    });
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getSmackTalk = (days) => {
    if (days < 1) return '';

    const insults = {
      1: [
        "Day one and you're already slacking?",
        "You had 24 hours. What did you even do?",
        "Wow. Still not done after one day? You amaze me.",
      ],
      2: [
        "Two days? You're really committed... to doing nothing.",
        "This task is older than your motivation.",
        "You had TWO full days. But sure, scroll TikTok instead.",
      ],
      3: [
        "Day 3. This task is officially a fossil.",
        "Just rename the task to 'never happening'.",
        "You know it's been 3 days, right? Coward.",
      ],
      4: [
        "Four days. You could’ve learned a language by now.",
        "This is performance art at this point.",
        "Still not done? You're truly built different. In a bad way.",
      ],
      5: [
        "FIVE days. My disappointment is immeasurable.",
        "Even your grandma finishes tasks faster.",
        "NASA launches rockets faster than you complete chores.",
      ],
      6: [
        "Day 6. The task is decomposing.",
        "You're on a productivity strike, huh?",
        "Did you fall into a time vortex? No? Just lazy? Got it.",
      ],
      7: [
        "A whole week. Congrats. You did absolutely nothing.",
        "Seven days. You ignored this like a pro.",
        "This task now qualifies for a tax deduction. It's that old.",
      ]
    };

    const savageInsults = [
      `It's been ${days} days. Do you even remember this task's name?`,
      `${days} days later, and it's still not done? You're a legend. A lazy one.`,
      `At this point, it's a feature, not a bug in your life.`,
      `${days} days of avoidance. Incredible. Inspiring. Infuriating.`,
      `Bro. ${days} days. The task died of natural causes.`,
      `Even the sun is faster in its solar cycles.`,
      `You're in a toxic relationship with your to-do list.`,
    ];

    const options = insults[days] || savageInsults;
    return options[Math.floor(Math.random() * options.length)];
  };

  const getTaskClasses = (task) => {
    const daysOld = Math.floor((Date.now() - new Date(task.createdAt)) / (1000 * 60 * 60 * 24));
    let classes = 'task';

    if (task.completed) {
      classes += ' done';
    }

    if (!task.completed && daysOld >= 1) {
      classes += ' overdue';
    } else if (task.completed && daysOld >= 1) {
      classes += ' overdue-done';
    }

    return classes;
  };

  return (
    <div className="layout">
    <div className="app">
      <div className="input-group">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task you'll probably not gonna do"
        />
          <button onClick={addTask}>
            <span className="button_top">Add</span>
          </button>
      </div>

      <div className="task-container">
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={getTaskClasses(task)}>
              <div className="task-main" onClick={() => toggleTask(task.id)}>
                <span>{task.text}</span>
              </div>
              <div className="meta">
                {!task.completed && (
                  <button onClick={() => deleteTask(task.id)} title="Delete Task">🗑️</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      
      <ToastContainer />


    </div>
    
          <footer className="footer">
        <p>
          Made by <strong>CheonMarlon</strong>
          {' '}
          <a href="https://github.com/CheonMarlon" target="_blank" rel="noopener noreferrer" title="GitHub">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="footer-icon" />
          </a>
        </p>
      </footer>

      </div>
  );
}

export default MainToDo;
