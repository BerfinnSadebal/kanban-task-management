export const boardService = {
  async getBoard(slug: string) {
    const res = await fetch(`/api/boards/${slug}`);
    if (!res.ok) throw new Error('Board not found');
    return res.json();
  },

  async createBoard(slug: string, title?: string) {
    const res = await fetch('/api/boards', {
      method: 'POST',
      body: JSON.stringify({ slug, title }),
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  },

  async createTask(boardId: string, content: string, status: string, description?: string, color?: string) {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ boardId, content, status, description, color }),
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  },

  async updateTask(id: string, updates: any) {
    const res = await fetch('/api/tasks', {
      method: 'PATCH',
      body: JSON.stringify({ id, ...updates }),
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  },

  async deleteTask(id: string) {
    const res = await fetch('/api/tasks', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
  }
};
