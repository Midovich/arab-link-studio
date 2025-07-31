export interface LinkEntry {
  id: string;
  title: string;
  url: string;
  image: string; // base64 or blob URL
  tags: string[];
  createdAt: string;
}

const STORAGE_KEY = 'linkbio_entries';

export const linkStorage = {
  // Get all entries
  getAll(): LinkEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  // Add new entry
  add(entry: Omit<LinkEntry, 'id' | 'createdAt'>): LinkEntry {
    const newEntry: LinkEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const entries = this.getAll();
    entries.unshift(newEntry); // Add to beginning
    this.save(entries);
    return newEntry;
  },

  // Update entry
  update(id: string, updates: Partial<LinkEntry>): LinkEntry | null {
    const entries = this.getAll();
    const index = entries.findIndex(entry => entry.id === id);
    
    if (index === -1) return null;
    
    entries[index] = { ...entries[index], ...updates };
    this.save(entries);
    return entries[index];
  },

  // Delete entry
  delete(id: string): boolean {
    const entries = this.getAll();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    
    if (filteredEntries.length === entries.length) return false;
    
    this.save(filteredEntries);
    return true;
  },

  // Get entry by ID
  getById(id: string): LinkEntry | null {
    const entries = this.getAll();
    return entries.find(entry => entry.id === id) || null;
  },

  // Save entries to localStorage
  save(entries: LinkEntry[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  // Clear all entries
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
};