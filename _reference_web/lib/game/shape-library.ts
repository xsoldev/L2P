// Certificate Shape Library - Various geometric shapes with different colors

export interface ShapeColors {
  primary: string;
  secondary: string;
  glow: string;
}

export interface CircleShape {
  id: string;
  type: 'circle';
  name: string;
  colors: ShapeColors;
}

export interface SquareShape {
  id: string;
  type: 'square';
  name: string;
  rotation: number;
  colors: ShapeColors;
}

export interface TriangleShape {
  id: string;
  type: 'triangle';
  name: string;
  orientation: 'up' | 'down';
  colors: ShapeColors;
}

export type Shape = CircleShape | SquareShape | TriangleShape;

export interface ShapeLibrary {
  circles: CircleShape[];
  squares: SquareShape[];
  triangles: TriangleShape[];
}

export const SHAPE_LIBRARY: ShapeLibrary = {
  circles: [
    {
      id: 'circle-blue',
      type: 'circle',
      name: 'Azure Orb',
      colors: {
        primary: '#007AFF',
        secondary: '#0056CC',
        glow: 'rgba(0,122,255,0.8)'
      }
    },
    {
      id: 'circle-purple',
      type: 'circle',
      name: 'Violet Sphere',
      colors: {
        primary: '#A78BFA',
        secondary: '#8B5CF6',
        glow: 'rgba(167,139,250,0.8)'
      }
    },
    {
      id: 'circle-green',
      type: 'circle',
      name: 'Emerald Globe',
      colors: {
        primary: '#34D399',
        secondary: '#10B981',
        glow: 'rgba(52,211,153,0.8)'
      }
    },
    {
      id: 'circle-gold',
      type: 'circle',
      name: 'Golden Orb',
      colors: {
        primary: '#FBBF24',
        secondary: '#F59E0B',
        glow: 'rgba(251,191,36,0.8)'
      }
    }
  ],
  squares: [
    {
      id: 'square-cyan',
      type: 'square',
      name: 'Cyan Crystal',
      rotation: 0,
      colors: {
        primary: '#06B6D4',
        secondary: '#0891B2',
        glow: 'rgba(6,182,212,0.8)'
      }
    },
    {
      id: 'square-pink',
      type: 'square',
      name: 'Rose Diamond',
      rotation: 45,
      colors: {
        primary: '#EC4899',
        secondary: '#DB2777',
        glow: 'rgba(236,72,153,0.8)'
      }
    },
    {
      id: 'square-orange',
      type: 'square',
      name: 'Amber Block',
      rotation: 0,
      colors: {
        primary: '#F97316',
        secondary: '#EA580C',
        glow: 'rgba(249,115,22,0.8)'
      }
    },
    {
      id: 'square-indigo',
      type: 'square',
      name: 'Indigo Gem',
      rotation: 45,
      colors: {
        primary: '#6366F1',
        secondary: '#4F46E5',
        glow: 'rgba(99,102,241,0.8)'
      }
    }
  ],
  triangles: [
    {
      id: 'triangle-red',
      type: 'triangle',
      name: 'Ruby Prism',
      orientation: 'up',
      colors: {
        primary: '#EF4444',
        secondary: '#DC2626',
        glow: 'rgba(239,68,68,0.8)'
      }
    },
    {
      id: 'triangle-teal',
      type: 'triangle',
      name: 'Teal Pyramid',
      orientation: 'down',
      colors: {
        primary: '#14B8A6',
        secondary: '#0D9488',
        glow: 'rgba(20,184,166,0.8)'
      }
    },
    {
      id: 'triangle-yellow',
      type: 'triangle',
      name: 'Sunburst Triangle',
      orientation: 'up',
      colors: {
        primary: '#EAB308',
        secondary: '#CA8A04',
        glow: 'rgba(234,179,8,0.8)'
      }
    },
    {
      id: 'triangle-lime',
      type: 'triangle',
      name: 'Lime Shard',
      orientation: 'down',
      colors: {
        primary: '#84CC16',
        secondary: '#65A30D',
        glow: 'rgba(132,204,22,0.8)'
      }
    }
  ]
};

/**
 * Get all shapes in a flat array
 */
export function getAllShapes(): Shape[] {
  return [
    ...SHAPE_LIBRARY.circles,
    ...SHAPE_LIBRARY.squares,
    ...SHAPE_LIBRARY.triangles
  ];
}

/**
 * Get a random shape from the library
 */
export function getRandomShape(): Shape {
  const allShapes = getAllShapes();
  return allShapes[Math.floor(Math.random() * allShapes.length)];
}

/**
 * Find a shape by ID
 */
export function findShapeById(id: string): Shape | undefined {
  return getAllShapes().find(shape => shape.id === id);
}
