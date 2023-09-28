export default function filterTasks(tasks, activeNotes) {
  if (activeNotes === 'active') {
    return tasks.filter((item) => !item.completed);
  } if (activeNotes === 'completed') {
    return tasks.filter((item) => item.completed);
  }
  return tasks;
}
