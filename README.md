# Task Management App

Django REST API + Vue 3 frontend.

## Quick Start

```bash
# Setup and start
cp backend/.env.example backend/.env
docker-compose up --build

# Run migrations (new terminal)
docker-compose exec web python manage.py migrate
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **Admin**: http://localhost:8000/admin

## API Endpoints

Base: `http://localhost:8000/tasks/`

- `GET /` - List all tasks
- `POST /` - Create task
- `GET /{id}/` - Get task
- `PUT /{id}/` - Update task
- `PATCH /{id}/` - Toggle completed
- `DELETE /{id}/` - Delete task

Example:
```json
POST /tasks/
{
  "title": "My task",
  "description": "Task details"
}
```

<img width="1758" height="854" alt="image" src="https://github.com/user-attachments/assets/cfb8a889-a620-45f9-8214-34d78623d869" />

