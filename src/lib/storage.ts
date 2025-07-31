export interface LinkEntry {
  id: string;
  title: string;
  url: string;
  image: string; // base64 or blob URL
  tags: string[];
  createdAt: string;
}

const STORAGE_KEY = 'linkbio_entries';

// Initialize with dummy data if empty
const initializeDummyData = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const dummyData: LinkEntry[] = [
      {
        id: crypto.randomUUID(),
        title: "موقع أعمالي الفنية",
        url: "https://example.com/portfolio",
        image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=600&fit=crop",
        tags: ["فن", "تصميم", "معرض"],
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "متجر المنتجات اليدوية",
        url: "https://example.com/handmade",
        image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=600&fit=crop",
        tags: ["متجر", "يدوي", "حرف"],
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "ورشة التصوير الفوتوغرافي",
        url: "https://example.com/photography",
        image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=600&fit=crop",
        tags: ["تصوير", "ورشة", "تعليم"],
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "مدونة السفر والمغامرات",
        url: "https://example.com/travel",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
        tags: ["سفر", "مغامرة", "مدونة"],
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "قناة الطبخ والوصفات",
        url: "https://example.com/cooking",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop",
        tags: ["طبخ", "وصفات", "طعام"],
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "حديقة الزهور والنباتات",
        url: "https://example.com/garden",
        image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=600&fit=crop",
        tags: ["زهور", "حديقة", "نباتات"],
        createdAt: new Date().toISOString(),
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
  }
};

export const linkStorage = {
  // Get all entries
  getAll(): LinkEntry[] {
    try {
      initializeDummyData(); // Initialize dummy data if needed
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