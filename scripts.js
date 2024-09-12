// Function to add a new task
function addTask(event) {
    event.preventDefault();

    const taskInput = document.getElementById('taskInput').value;
    const dueDateInput = document.getElementById('dueDateInput').value;
    const priorityInput = document.getElementById('priorityInput').value;
    const statusInput = document.getElementById('statusInput').value;

    if (!taskInput || !dueDateInput || !priorityInput || !statusInput) return;

    const taskList = document.getElementById('tasksList');
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    taskDiv.innerHTML = `
        <div>
            <h3>${taskInput}</h3>
            <p>Due Date: ${dueDateInput}</p>
            <p>Priority: ${priorityInput}</p>
            <p>Status: ${statusInput}</p>
        </div>
        <div>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(taskDiv);
    document.getElementById('taskForm').reset();
    filterTasks();
}

// Function to delete a task
function deleteTask(button) {
    const taskDiv = button.closest('.task');
    taskDiv.remove();
}

// Function to open the modal with task details for editing
function editTask(button) {
    const taskDiv = button.closest('.task');
    document.querySelector('.task.editing')?.classList.remove('editing');
    taskDiv.classList.add('editing');

    const taskInput = taskDiv.querySelector('h3').innerText;
    const dueDate = taskDiv.querySelector('p').innerText.split(': ')[1];
    const priority = taskDiv.querySelectorAll('p')[1].innerText.split(': ')[1];
    const status = taskDiv.querySelectorAll('p')[2].innerText.split(': ')[1];

    document.getElementById('editTaskInput').value = taskInput;
    document.getElementById('editDueDateInput').value = dueDate;
    document.getElementById('editPriorityInput').value = priority;
    document.getElementById('editStatusInput').value = status;

    document.getElementById('taskModal').style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

// Function to save edited task
function saveTask() {
    const taskDiv = document.querySelector('.task.editing');
    const taskInput = document.getElementById('editTaskInput').value;
    const dueDateInput = document.getElementById('editDueDateInput').value;
    const priorityInput = document.getElementById('editPriorityInput').value;
    const statusInput = document.getElementById('editStatusInput').value;

    taskDiv.querySelector('h3').innerText = taskInput;
    taskDiv.querySelector('p').innerText = `Due Date: ${dueDateInput}`;
    taskDiv.querySelectorAll('p')[1].innerText = `Priority: ${priorityInput}`;
    taskDiv.querySelectorAll('p')[2].innerText = `Status: ${statusInput}`;

    closeModal();
}

// Function to filter tasks based on search and filters
function filterTasks() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;

    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        const taskText = task.innerText.toLowerCase();
        const taskStatus = task.querySelectorAll('p')[2].innerText.split(': ')[1];
        const taskPriority = task.querySelectorAll('p')[1].innerText.split(': ')[1];

        const matchesSearch = taskText.includes(searchQuery);
        const matchesStatus = statusFilter === 'all' || taskStatus === statusFilter;
        const matchesPriority = priorityFilter === 'all' || taskPriority === priorityFilter;

        if (matchesSearch && matchesStatus && matchesPriority) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Add event listener for form submission
document.getElementById('taskForm').addEventListener('submit', addTask);

// Add event listener for save button in the modal
document.getElementById('saveTaskBtn').addEventListener('click', saveTask);

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
