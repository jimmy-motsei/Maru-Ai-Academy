import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Fallback Mock Data
const MOCK_MODULES = [
  { id: "1", title: "AI Made Simple", stream: "beginner", description: "Foundations & Safety", slug: "ai-made-simple", order: 1 },
  { id: "2", title: "Prompts That Work at Work", stream: "beginner", description: "Mastering Prompting", slug: "prompts-that-work", order: 2 },
  { id: "3", title: "Picking Tools & No-Code Quick Wins", stream: "beginner", description: "Tools Landscape", slug: "no-code-quick-wins", order: 3 },
  { id: "4", title: "Your First Live Workflow", stream: "beginner", description: "Capstone", slug: "first-live-workflow", order: 4 },
  { id: "5", title: "From Ad-Hoc to Repeatable", stream: "intermediate", description: "Standardization", slug: "ad-hoc-to-repeatable", order: 1 },
  { id: "6", title: "Semantic Search & Private Knowledge", stream: "intermediate", description: "RAG & Vector DBs", slug: "semantic-search-private-knowledge", order: 2 },
  { id: "7", title: "No-Code Automations That Stick", stream: "intermediate", description: "Robust Automation", slug: "no-code-automations", order: 3 },
  { id: "8", title: "Measurement, Governance & Handover", stream: "intermediate", description: "Leading AI", slug: "measurement-governance", order: 4 }
];

// GET all modules
router.get('/', async (req: Request, res: Response) => {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { order: 'asc' }
    });
    
    // If DB is empty or connection failed (handled by catch), usage fallback
    if (modules.length === 0) {
      console.log('No modules found in DB, returning mock data');
      return res.status(200).json({ modules: MOCK_MODULES });
    }

    res.status(200).json({ modules });
  } catch (error) {
    console.error('Database error (Using fallback):', error);
    res.status(200).json({ 
      modules: MOCK_MODULES,
      _notice: "Served from Mock Data (Database Connection Failed)" 
    });
  }
});

// GET specific module
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const module = await prisma.module.findUnique({
      where: { id },
      include: { lessons: true }
    });

    if (!module) {
       // Fallback check
       const mock = MOCK_MODULES.find(m => m.id === id);
       if (mock) return res.status(200).json(mock);
       return res.status(404).json({ error: "Module not found" });
    }

    res.status(200).json(module);
  } catch (error) {
    console.error('Database error:', error);
    // Fallback
    const mock = MOCK_MODULES.find(m => m.id === id);
    if (mock) return res.status(200).json(mock);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create module
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, stream, slug, order } = req.body;
    const module = await prisma.module.create({
      data: {
        title,
        description,
        stream, // Ensure this matches enum 'BEGINNER' | 'INTERMEDIATE'
        slug,
        order
      }
    });
    res.status(201).json(module);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: "Failed to create module" });
  }
});

export default router;
